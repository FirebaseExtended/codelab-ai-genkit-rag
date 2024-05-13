import clsx from 'clsx';
import Image from 'next/image';

import { Photo } from './svg';
import { useImageUpload } from '@/lib/hooks/useImageUpload';

export default function UploadImages() {
  const { uploadRef, uploadedImages, handleChange, handleClick } =
    useImageUpload();

  return (
    <div
      className={clsx(
        'grid gap-3',
        uploadedImages.length === 0 ? 'grid-cols-1' : 'grid-cols-3',
      )}
    >
      {/* Uploaded images */}
      {uploadedImages.map((image, index) => (
        <div key={index} className="w-full">
          <Image
            width={300}
            height={300}
            src={image}
            alt={`Uploaded ${index + 1}`}
            className="w-full h-[118px] object-cover rounded-xl animate-scale-in scale-[0.8] opacity-0 bg-gray-200"
            style={{ animationDelay: `${index * 50}ms` }}
          />
        </div>
      ))}

      {/* Image upload element */}
      <div
        className={clsx('w-full flex flex-col items-center gap-3', {
          hidden: uploadedImages.length === 3,
        })}
      >
        <input
          type="file"
          ref={uploadRef}
          name="images[]"
          className="hidden"
          multiple
          onChange={handleChange}
        />
        <button
          className={clsx(
            'flex flex-col gap-4 justify-center items-center w-full bg-surface-muted rounded-xl text-foreground font-normal active:scale-95 transition-transform duration-200 ease-in-out',
            uploadedImages.length === 0 ? 'py-6' : 'h-[118px]',
          )}
          type="button"
          onClick={handleClick}
        >
          <Photo />
          {uploadedImages.length === 0 ? 'Add Images for Inspiration' : ''}
        </button>
      </div>
    </div>
  );
}
