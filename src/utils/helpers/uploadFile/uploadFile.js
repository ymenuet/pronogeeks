import axios from 'axios';

import openNotification from '../openNotification';

const baseURL = process.env.REACT_APP_CLOUDINARY_URL;

const fileService = axios.create({
  baseURL,
});

export default async (file, path) => {
  let url;

  if (file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'pronogeeks');

    try {
      const {
        /* eslint-disable camelcase */
        data: { secure_url },
      } = await fileService.post(path, data);

      url = secure_url;
    } catch {
      openNotification('error', 'Erreur lors de la sauvegarde du fichier');
    }
  }

  return url;
};
