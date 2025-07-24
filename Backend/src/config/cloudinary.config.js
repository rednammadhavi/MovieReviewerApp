import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDIBARY_CLOUD_NAME,
  api_key: process.env.CLOUDIBARY_API_KEY,
  api_secret: process.env.CLOUDIBARY_API_SECRET
});

export { cloudinary };
