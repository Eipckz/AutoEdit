
import React, { useCallback } from 'react';
import { UploadIcon } from './icons';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onFileSelect(event.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <div 
      className="border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-xl p-8 md:p-12 text-center cursor-pointer transition-colors duration-200 ease-in-out bg-gray-700 hover:bg-gray-600"
      onClick={() => document.getElementById('fileInput')?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="video/*,.mkv" // Accept standard video types and MKV
        onChange={handleFileChange}
      />
      <UploadIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
      <p className="text-xl font-semibold text-gray-200">Drag & drop your video file here</p>
      <p className="text-gray-400">or click to select file</p>
      <p className="text-xs text-gray-500 mt-2">(Supports MP4, MOV, AVI, MKV, etc.)</p>
    </div>
  );
};
