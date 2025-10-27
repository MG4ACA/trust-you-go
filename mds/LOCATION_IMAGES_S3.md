# Location Images with AWS S3 Integration

## Overview
The admin portal now supports uploading 1-10 images per location (typically 3 images). Images are stored in AWS S3 bucket with metadata tracked in the database.

## Features Implemented

### 1. Image Upload Component (`ImageUploader.jsx`)
- **Drag & Drop**: FileUpload component with drag-and-drop support
- **Preview**: Grid display of uploaded images with thumbnails
- **Reordering**: Move images up/down to change display order
- **Delete**: Remove images with confirmation
- **Limits**: Maximum 10 images per location, 5MB file size limit
- **Formats**: JPG, JPEG, PNG, WebP
- **Progress**: Upload progress indicator with S3 integration

### 2. Upload Service (`uploadService.js`)
Handles all S3 upload operations:
- `uploadLocationImage(file, locationId)` - Upload single image
- `uploadLocationImages(files, locationId)` - Batch upload (up to 10)
- `deleteLocationImage(imageUrl)` - Delete from S3
- `saveLocationImagesMetadata()` - Save image records to database
- `getLocationImages(locationId)` - Fetch images for location
- `deleteLocationImageMetadata(imageId)` - Remove database record
- `updateImageDisplayOrder()` - Update image order

**Current Implementation**: Mock upload (simulates S3)
**Production Ready**: See TODO comments for actual S3 integration

### 3. Database Schema
Added `location_images` table in mock-db.json:
```json
{
  "id": "string",
  "locationId": "string",
  "imageUrl": "https://bucket.s3.amazonaws.com/path",
  "thumbnailUrl": "https://bucket.s3.amazonaws.com/path/thumbs",
  "displayOrder": 0,
  "uploadedAt": "ISO timestamp"
}
```

### 4. Location Form Integration (`Locations.jsx`)
- **TabView**: Separate tabs for "Location Details" and "Images"
- **Auto-save**: Images metadata saved with location data
- **Edit Support**: Load existing images when editing
- **View Mode**: Display-only image gallery
- **Validation**: Prevents submission if image upload fails

## AWS S3 Setup (Production)

### Prerequisites
1. AWS Account
2. S3 Bucket created: `trust-you-go-bucket`
3. IAM User with S3 permissions
4. Backend API with pre-signed URL generation

### S3 Bucket Configuration

#### 1. Create Bucket
```bash
aws s3 mb s3://trust-you-go-bucket --region us-east-1
```

#### 2. Folder Structure
```
trust-you-go-bucket/
├── locations/
│   ├── {location-id}/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   ├── thumbs/
│   │   │   ├── image1.jpg
│   │   │   ├── image2.jpg
```

#### 3. CORS Configuration
Enable CORS for your frontend domain:
```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com", "http://localhost:3000"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

#### 4. Bucket Policy (Public Read)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::trust-you-go-bucket/locations/*"
    }
  ]
}
```

### Backend API Implementation

#### 1. Generate Pre-signed URL Endpoint
```javascript
// POST /api/upload/presigned-url
// Request: { fileName, fileType, locationId }
// Response: { uploadUrl, imageUrl, thumbnailUrl }

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: 'us-east-1',
  signatureVersion: 'v4',
});

app.post('/api/upload/presigned-url', async (req, res) => {
  const { fileName, fileType, locationId } = req.body;
  
  const key = `locations/${locationId}/${Date.now()}-${fileName}`;
  const params = {
    Bucket: 'trust-you-go-bucket',
    Key: key,
    Expires: 60, // URL valid for 60 seconds
    ContentType: fileType,
  };

  const uploadUrl = s3.getSignedUrl('putObject', params);
  const imageUrl = `https://trust-you-go-bucket.s3.amazonaws.com/${key}`;
  const thumbnailUrl = imageUrl.replace(`/${locationId}/`, `/${locationId}/thumbs/`);

  res.json({ uploadUrl, imageUrl, thumbnailUrl });
});
```

#### 2. Delete Image Endpoint
```javascript
// DELETE /api/upload/image
// Request: { imageUrl }

app.delete('/api/upload/image', async (req, res) => {
  const { imageUrl } = req.body;
  const key = imageUrl.split('.amazonaws.com/')[1];
  
  const params = {
    Bucket: 'trust-you-go-bucket',
    Key: key,
  };

  await s3.deleteObject(params).promise();
  res.json({ success: true });
});
```

### Frontend Integration (Production)

Update `uploadService.js`:

```javascript
// Replace mock upload with actual S3 upload
export const uploadLocationImage = async (file, locationId) => {
  try {
    validateImage(file);

    // 1. Get pre-signed URL from backend
    const { data } = await apiClient.post('/upload/presigned-url', {
      fileName: file.name,
      fileType: file.type,
      locationId,
    });

    // 2. Upload to S3 using pre-signed URL
    await fetch(data.uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });

    // 3. Return final S3 URLs
    return {
      imageUrl: data.imageUrl,
      thumbnailUrl: data.thumbnailUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
```

### Thumbnail Generation

#### Option 1: AWS Lambda (Recommended)
Create Lambda function triggered by S3 upload:
```javascript
const sharp = require('sharp');

exports.handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  
  // Download image
  const image = await s3.getObject({ Bucket: bucket, Key: key }).promise();
  
  // Generate thumbnail
  const thumbnail = await sharp(image.Body)
    .resize(300, 300, { fit: 'cover' })
    .toBuffer();
  
  // Upload thumbnail
  const thumbKey = key.replace(/\/([^/]+)$/, '/thumbs/$1');
  await s3.putObject({
    Bucket: bucket,
    Key: thumbKey,
    Body: thumbnail,
    ContentType: 'image/jpeg',
  }).promise();
};
```

#### Option 2: CloudFront (Alternative)
Use CloudFront with Lambda@Edge for dynamic resizing.

## Current Mock Behavior

For development without AWS setup:
1. Files are "uploaded" with 1-second delay simulation
2. Mock S3 URLs are generated: `https://trust-you-go-bucket.s3.amazonaws.com/locations/{id}/{timestamp}-{filename}`
3. Thumbnail URLs automatically generated with `/thumbs/` path
4. Image metadata saved to `location_images` in mock-db.json
5. Delete simulates 500ms delay

## Usage

### Create Location with Images
1. Navigate to `/admin/locations/create`
2. Fill location details in "Location Details" tab
3. Switch to "Images" tab
4. Upload 1-10 images (drag & drop or browse)
5. Reorder images as needed
6. Click "Create Location" - saves both location and images

### Edit Location Images
1. Navigate to `/admin/locations/edit/{id}`
2. Switch to "Images" tab
3. Existing images load automatically
4. Add new images, delete old ones, or reorder
5. Click "Update Location"

### View Location Images
1. Navigate to `/admin/locations/{id}`
2. "Images" tab shows gallery (read-only)
3. Cannot upload/delete in view mode

## Security Considerations

### Production Checklist
- [ ] Enable S3 bucket versioning
- [ ] Set up CloudTrail for audit logging
- [ ] Implement rate limiting on upload endpoints
- [ ] Add virus scanning (ClamAV or third-party)
- [ ] Validate file content (not just extension)
- [ ] Set up S3 lifecycle policies (delete unused images)
- [ ] Use CloudFront CDN for image delivery
- [ ] Enable S3 Transfer Acceleration for faster uploads
- [ ] Implement image optimization (WebP conversion)
- [ ] Add watermarking for protection
- [ ] Set up backup/replication to another region

### IAM Policy (Backend)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::trust-you-go-bucket/locations/*"
    }
  ]
}
```

## Cost Estimation (AWS)

### Monthly Costs (Example)
- S3 Storage: 10GB @ $0.023/GB = $0.23
- PUT Requests: 1,000 @ $0.005/1,000 = $0.005
- GET Requests: 100,000 @ $0.0004/1,000 = $0.04
- Data Transfer Out: 50GB @ $0.09/GB = $4.50
- **Total: ~$5/month** (scales with usage)

### Optimization Tips
- Enable S3 Intelligent-Tiering for old images
- Use CloudFront to reduce data transfer costs
- Implement lazy loading on frontend
- Compress images before upload
- Set expiration on thumbnail cache

## Testing Checklist

- [ ] Upload single image
- [ ] Upload multiple images (batch)
- [ ] Upload maximum (10 images)
- [ ] Exceed file size limit (5MB)
- [ ] Upload invalid file type
- [ ] Reorder images
- [ ] Delete image
- [ ] Edit location with existing images
- [ ] View location in read-only mode
- [ ] Check image URLs in database
- [ ] Verify display order persistence

## Migration from Mock to Production

### Steps
1. Set up AWS S3 bucket with configuration
2. Create backend API endpoints for pre-signed URLs
3. Update `uploadService.js` with production code
4. Test with development bucket first
5. Update environment variables (bucket name, region)
6. Deploy backend API
7. Deploy frontend with updated service
8. Monitor CloudWatch logs for errors
9. Migrate existing mock images (if any)

---

**Status**: ✅ Mock implementation complete, production-ready architecture documented
**Next Steps**: Set up AWS S3 bucket and implement backend API endpoints
