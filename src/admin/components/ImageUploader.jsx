import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import {
  deleteLocationImage,
  deleteLocationImageMetadata,
  uploadLocationImages,
} from '../services/uploadService';
import '../styles/form.css';

/**
 * ImageUploader Component
 * Handles multiple image uploads for locations (1-10 images, typically 3)
 * Features: Drag & drop, preview, reordering, delete, S3 upload
 */
function ImageUploader({ locationId, initialImages = [], onImagesChange, disabled = false }) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileUploadRef = useRef(null);
  const toast = useRef(null);

  const MAX_IMAGES = 10;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  // Notify parent component of changes
  useEffect(() => {
    if (onImagesChange) {
      onImagesChange(images);
    }
  }, [images, onImagesChange]);

  const handleUpload = async (event) => {
    const files = event.files;

    if (images.length + files.length > MAX_IMAGES) {
      toast.current.show({
        severity: 'warn',
        summary: 'Upload Limit',
        detail: `Maximum ${MAX_IMAGES} images allowed. You can upload ${
          MAX_IMAGES - images.length
        } more.`,
        life: 4000,
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress (in production, track actual upload progress)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      // Upload to S3 (mock for now)
      const uploadedImages = await uploadLocationImages(files, locationId || 'temp');

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Add uploaded images to state with display order
      const newImages = uploadedImages.map((img, index) => ({
        id: `temp-${Date.now()}-${index}`, // Temporary ID
        locationId: locationId || 'temp',
        imageUrl: img.imageUrl,
        thumbnailUrl: img.thumbnailUrl,
        displayOrder: images.length + index,
        uploadedAt: new Date().toISOString(),
        isNew: true, // Flag for newly uploaded images
      }));

      setImages((prev) => [...prev, ...newImages]);

      toast.current.show({
        severity: 'success',
        summary: 'Upload Successful',
        detail: `${files.length} image(s) uploaded successfully`,
        life: 3000,
      });

      // Clear file upload
      fileUploadRef.current.clear();
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Upload Failed',
        detail: error.message || 'Failed to upload images. Please try again.',
        life: 5000,
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (imageToDelete) => {
    try {
      // Delete from S3
      await deleteLocationImage(imageToDelete.imageUrl);

      // Delete metadata from database (if not new)
      if (!imageToDelete.isNew && imageToDelete.id) {
        await deleteLocationImageMetadata(imageToDelete.id);
      }

      // Remove from state
      setImages((prev) => {
        const filtered = prev.filter((img) => img.id !== imageToDelete.id);
        // Reorder remaining images
        return filtered.map((img, index) => ({ ...img, displayOrder: index }));
      });

      toast.current.show({
        severity: 'info',
        summary: 'Image Deleted',
        detail: 'Image removed successfully',
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Delete Failed',
        detail: error.message || 'Failed to delete image',
        life: 4000,
      });
    }
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    // Swap images
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];

    // Update display order
    newImages.forEach((img, idx) => {
      img.displayOrder = idx;
    });

    setImages(newImages);
  };

  const customUploadHandler = (event) => {
    handleUpload(event);
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="upload-item-template">
        <img
          alt={file.name}
          role="presentation"
          src={file.objectURL}
          width={60}
          style={{ borderRadius: '4px' }}
        />
        <div className="upload-item-details">
          <span className="font-semibold">{file.name}</span>
          <span className="text-sm text-600">{(file.size / 1024).toFixed(2)} KB</span>
        </div>
        <Tag value={props.formatSize} severity="info" />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="upload-empty-template">
        <i className="pi pi-image text-6xl text-400 mb-3" style={{ fontSize: '4rem' }}></i>
        <span className="text-600 text-center">
          Drag and drop images here
          <br />
          or click to browse
        </span>
        <small className="text-500 mt-2">
          Max {MAX_IMAGES} images | JPG, PNG, WebP | Max 5MB each
        </small>
      </div>
    );
  };

  return (
    <div className="image-uploader">
      <Toast ref={toast} />

      {/* Uploaded Images Grid */}
      {images.length > 0 && (
        <Card className="mb-3">
          <div className="image-uploader-header">
            <h3>
              <i className="pi pi-images mr-2"></i>
              Uploaded Images ({images.length}/{MAX_IMAGES})
            </h3>
            {images.length < MAX_IMAGES && (
              <Tag value={`${MAX_IMAGES - images.length} more allowed`} severity="info" />
            )}
          </div>

          <div className="image-uploader-grid">
            {images.map((image, index) => (
              <div key={image.id}>
                <Card className="relative">
                  {/* Image Preview */}
                  <img
                    src={image.thumbnailUrl || image.imageUrl}
                    alt={`Location ${index + 1}`}
                    className="w-full border-round"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />

                  {/* Display Order Badge */}
                  <Tag
                    value={`#${index + 1}`}
                    severity="info"
                    className="absolute"
                    style={{ top: '0.5rem', left: '0.5rem' }}
                  />

                  {/* Action Buttons */}
                  <div className="image-actions" style={{ opacity: disabled ? 0.5 : 1 }}>
                    <Button
                      icon="pi pi-arrow-up"
                      outlined
                      size="small"
                      disabled={disabled || index === 0}
                      onClick={() => moveImage(index, 'up')}
                      tooltip="Move up"
                      tooltipOptions={{ position: 'bottom' }}
                    />
                    <Button
                      icon="pi pi-arrow-down"
                      outlined
                      size="small"
                      disabled={disabled || index === images.length - 1}
                      onClick={() => moveImage(index, 'down')}
                      tooltip="Move down"
                      tooltipOptions={{ position: 'bottom' }}
                    />
                    <div className="flex-1"></div>
                    <Button
                      icon="pi pi-trash"
                      outlined
                      severity="danger"
                      size="small"
                      disabled={disabled}
                      onClick={() => handleDelete(image)}
                      tooltip="Delete"
                      tooltipOptions={{ position: 'bottom' }}
                    />
                  </div>

                  {/* New Image Badge */}
                  {image.isNew && (
                    <Tag
                      value="New"
                      severity="success"
                      className="absolute"
                      style={{ top: '0.5rem', right: '0.5rem' }}
                    />
                  )}
                </Card>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* File Upload */}
      {images.length < MAX_IMAGES && !disabled && (
        <Card>
          <FileUpload
            ref={fileUploadRef}
            name="images"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            maxFileSize={MAX_FILE_SIZE}
            customUpload
            uploadHandler={customUploadHandler}
            itemTemplate={itemTemplate}
            emptyTemplate={emptyTemplate}
            chooseLabel="Choose Images"
            uploadLabel="Upload"
            cancelLabel="Clear"
            auto={false}
            disabled={uploading}
          />

          {uploading && (
            <div className="mt-3">
              <ProgressBar value={uploadProgress} showValue={false} />
              <p className="text-center text-600 mt-2">
                <i className="pi pi-spin pi-spinner mr-2"></i>
                Uploading images to S3...
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Upload Limit Message */}
      {images.length >= MAX_IMAGES && (
        <Card>
          <div className="text-center p-4">
            <i className="pi pi-check-circle text-5xl text-green-500 mb-3"></i>
            <h3 className="text-900 mb-2">Maximum Images Reached</h3>
            <p className="text-600 m-0">
              You have uploaded the maximum of {MAX_IMAGES} images for this location.
              <br />
              Delete an image to upload a new one.
            </p>
          </div>
        </Card>
      )}

      {/* View Mode Message */}
      {disabled && images.length === 0 && (
        <Card>
          <div className="text-center p-4">
            <i className="pi pi-image text-5xl text-400 mb-3"></i>
            <p className="text-600 m-0">No images uploaded for this location.</p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default ImageUploader;
