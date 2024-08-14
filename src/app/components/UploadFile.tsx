import React, { HTMLProps, useRef } from 'react';
import DeleteIcon from './icons/DeleteIcon';
import UploadIcon from './icons/UploadIcon';
import { ALLOWED_IMAGE_FORMATS } from '../../constants';

type Props = HTMLProps<HTMLDivElement> & {
  file: File | null;
  setFile: (file: File | null) => void;
};

function UploadFile(props: Props) {
  const { className, file, setFile, ...containerProps } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (fileInputRef.current !== null) fileInputRef.current.value = '';
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    updateFile(file);
    if (fileInputRef.current !== null) {
      fileInputRef.current.files = e.dataTransfer.files;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateFile(file);
  };

  const updateFile = (file: File) => {
    const ext = file.name.split('.').pop() ?? '';
    if (!ALLOWED_IMAGE_FORMATS.includes(ext?.toLowerCase())) return;
    setFile(file);
  };

  const handleDeleteFile = () => setFile(null);

  return (
    <>
      <div
        className={`flex items-center justify-center w-full ${className && className}`}
        {...containerProps}
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {!file ? (
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full aspect-video border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <UploadIcon />
              <p className='mb-2 text-sm text-gray-500'>
                <span className='font-semibold'>Presiona para subir el archivo</span> o arrástralo y sueltalo aquí
              </p>
              <p className='text-xs text-gray-500'>JPEG, JPG o PNG (MAX. 30MB)</p>
            </div>
            <input
              ref={fileInputRef}
              id='dropzone-file'
              type='file'
              className='hidden'
              onChange={handleFileChange}
              accept='.jpg,.png,.jpeg'
            />
          </label>
        ) : (
          <div className='bg-gray-50 w-full aspect-video relative border-2 border-gray-300 border-dashed rounded-lg overflow-hidden p-0'>
            <img
              className='w-full h-full object-contain'
              src={URL.createObjectURL(file)}
              alt='documento de identidad'
            />
            <button
              className='absolute rounded-lg w-7 sm:w-9 md:w-7 lg:w-9 p-1 top-2 right-2 bg-error hover:scale-105 transition-transform'
              type='button'
              onClick={handleDeleteFile}
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default UploadFile;
