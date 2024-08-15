import axios from '../../../api-config/axios';

export default function MomentaryFileUpload(formData, onProgress) {
  return axios({
    url: 'admin/momentary-upload-file',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    onUploadProgress: (progressEvent) => {
      const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (onProgress) {
        onProgress(progressPercentage);
      }
    },
  });
}
