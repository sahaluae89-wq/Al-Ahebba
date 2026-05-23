import { createServerFn } from '@tanstack/react-start'
import { v2 as cloudinary } from 'cloudinary'

const getEnv = (key: string): string => {
  const val = (import.meta.env?.[key] || process.env?.[key] || '') as string;
  return val.replace(/^["']|["']$/g, '').trim();
};

export const getCloudinarySignature = createServerFn({ method: 'GET' }).handler(
  async () => {
    const cloudName = getEnv('VITE_CLOUDINARY_CLOUD_NAME');
    const apiKey = getEnv('VITE_CLOUDINARY_API_KEY');
    const apiSecret = getEnv('CLOUDINARY_API_SECRET');

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Missing Cloudinary configuration:", {
        hasCloudName: !!cloudName,
        hasApiKey: !!apiKey,
        hasApiSecret: !!apiSecret
      });
      throw new Error("Missing Cloudinary configuration environment variables.");
    }

    // Configure Cloudinary inside the server function
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      apiSecret
    );

    return {
      timestamp,
      signature,
      cloudName,
      apiKey,
    };
  }
)

export const deleteCloudinaryImage = createServerFn({ method: 'POST' })
  .inputValidator((data: { imageUrl: string }) => data)
  .handler(async ({ data }) => {
    try {
      const cloudName = getEnv('VITE_CLOUDINARY_CLOUD_NAME');
      const apiKey = getEnv('VITE_CLOUDINARY_API_KEY');
      const apiSecret = getEnv('CLOUDINARY_API_SECRET');

      if (!cloudName || !apiKey || !apiSecret) {
        throw new Error("Missing Cloudinary configuration environment variables.");
      }

      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });

      const urlParts = data.imageUrl.split('/');
      const uploadIndex = urlParts.findIndex(p => p === 'upload');
      
      if (uploadIndex !== -1) {
        let pathParts = urlParts.slice(uploadIndex + 1);
        if (pathParts[0].startsWith('v') && !isNaN(parseInt(pathParts[0].substring(1)))) {
            pathParts = pathParts.slice(1);
        }
        
        const publicIdWithExt = pathParts.join('/');
        const lastDotIndex = publicIdWithExt.lastIndexOf('.');
        const actualPublicId = lastDotIndex !== -1 ? publicIdWithExt.substring(0, lastDotIndex) : publicIdWithExt;
        
        await cloudinary.uploader.destroy(actualPublicId);
      }
      
      return { success: true };
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });

export function optimizeCloudinaryUrl(url: string, width: number): string {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;
  
  // Add format auto, quality auto, and resize width
  return `${parts[0]}/upload/f_auto,q_auto,w_${width}/${parts[1]}`;
}
