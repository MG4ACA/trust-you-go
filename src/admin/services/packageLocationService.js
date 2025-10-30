import axios from 'axios';

const API_URL = 'http://localhost:3001';

class PackageLocationService {
  async getByPackageId(packageId) {
    const response = await axios.get(`${API_URL}/package-locations?package_id=${packageId}`);
    return response.data;
  }

  async create(data) {
    const response = await axios.post(`${API_URL}/package-locations`, data);
    return response.data;
  }

  async update(id, data) {
    const response = await axios.put(`${API_URL}/package-locations/${id}`, data);
    return response.data;
  }

  async delete(id) {
    await axios.delete(`${API_URL}/package-locations/${id}`);
    return id;
  }
}

export const packageLocationService = new PackageLocationService();
