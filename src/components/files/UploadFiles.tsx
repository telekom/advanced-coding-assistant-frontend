import { UploadIcon } from '@/assets/icons';
import { uploadFiles } from '@/redux/FilesSlice';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import React from 'react';

const UploadFiles = () => {
  const dispatch = useAppDispatch();
  const activeConversation = useAppSelector((state) => state.conversation.activeConversation);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && activeConversation) {
      const file: File = e.target.files[0];
      dispatch(uploadFiles({ file, activeConversation }));
    }
  };

  return (
    <div>
      <label htmlFor="file-upload" className="flex " style={{ cursor: 'pointer' }}>
        <UploadIcon></UploadIcon>
      </label>
      <input id="file-upload" type="file" title="file-Upload" placeholder="upload file" onChange={handleFileUpload} style={{ display: 'none' }} />
    </div>
  );
};

export default UploadFiles;
