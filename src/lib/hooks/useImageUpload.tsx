import { useRef, useState } from 'react';

export const useImageUpload = () => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const limit = 3;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (limit - uploadedImages.length <= 0) return;
      const files = Array.from(event.target.files).slice(
        0,
        limit - uploadedImages.length,
      );
      const fileUrls = files.map((file) => URL.createObjectURL(file));
      setUploadedImages((prevImages) => [...prevImages, ...fileUrls]);
    }
  };

  return {
    uploadRef,
    uploadedImages,
    handleClick,
    handleChange,
  };
};
