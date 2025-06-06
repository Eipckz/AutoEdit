import React from 'react';

interface IconProps {
  className?: string;
}

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

export const LightBulbIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75-2.311V21m0 0a2.25 2.25 0 01-2.25-2.25V15m2.25 2.25V15m0 0a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0118 15v2.25a2.25 2.25 0 01-2.25 2.25h-1.5A2.25 2.25 0 0112 18.75M12 18.75a2.25 2.25 0 002.25-2.25V15m-2.25 2.25V15m0 0a2.25 2.25 0 00-2.25-2.25H8.25A2.25 2.25 0 006 15v2.25a2.25 2.25 0 002.25 2.25h1.5A2.25 2.25 0 0012 18.75M12 3v9M12 3a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
  </svg>
);

export const ScissorsIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5A.75.75 0 018.25 6H10a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75V7.5zm0 9A.75.75 0 018.25 15H10a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75v-2.25zm7.5-9a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75H16a.75.75 0 01-.75-.75V7.5zm0 9A.75.75 0 0116 15h1.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75H16a.75.75 0 01-.75-.75v-2.25zM12 1C6.477 1 2 5.477 2 11s4.477 10 10 10 10-4.477 10-10S17.523 1 12 1zm0 2.25a7.75 7.75 0 100 15.5 7.75 7.75 0 000-15.5zm-3.155 4.31a.75.75 0 01.144-.737L10.5 5.54a.75.75 0 011 0l1.51 1.283a.75.75 0 01.145.737l-.87 4.965a.75.75 0 01-1.478-.26l.574-3.268-1.096-.93-1.096.93.574 3.268a.75.75 0 01-1.478.26l-.87-4.965z" />
  </svg>
);

export const TextAaIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12M12.75 4.5l-1.5 7.5M12.75 4.5l1.5 7.5M16.5 4.5v15" />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.287.094M5.116 5.79l-.048-.285A1.875 1.875 0 016.94 3.655h10.12a1.875 1.875 0 011.873 1.851l-.048.285" />
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const WandSparklesIcon: React.FC<IconProps> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813-2.846a.75.75 0 011.437 0l.813 2.846a.75.75 0 010 1.437l-.813 2.846a.75.75 0 01-1.437 0l-.813-2.846a.75.75 0 010-1.437zM15.75 15.75l-.813 2.846a.75.75 0 001.437 0l.813-2.846a.75.75 0 000-1.437l.813-2.846a.75.75 0 00-1.437 0l-.813 2.846a.75.75 0 000 1.437z" />
</svg>
);

export const RocketLaunchIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a12.023 12.023 0 01-7.38 5.84H1.25A2.25 2.25 0 013.5 14.37v-5.49m12.09 5.49a6 6 0 00-5.84-7.38V1.25A2.25 2.25 0 0111.5 3.5v5.49m0 0a12.023 12.023 0 007.38-5.84H22.75a2.25 2.25 0 01-2.25 2.25v13.5A2.25 2.25 0 0118.25 21h-5.49m0-5.49a6 6 0 015.84 7.38M15.59 14.37l-5.49 5.49m0 0a6.002 6.002 0 01-5.49-5.49M10.1 8.88a6 6 0 00-5.84-7.38V1.25a2.25 2.25 0 00-2.25 2.25v5.49m5.49-5.49a12.023 12.023 0 00-7.38 5.84h13.5m-5.49-5.49a6 6 0 015.84 7.38v4.82m-5.84 2.56a12.023 12.023 0 017.38-5.84h5.49A2.25 2.25 0 0120.5 14.37v5.49m-12.09-5.49a6 6 0 005.84 7.38V22.75A2.25 2.25 0 0111.5 20.5v-5.49" />
  </svg>
);