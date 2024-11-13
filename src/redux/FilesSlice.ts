import { FileMetadata } from '@/interfaces/File-interface';
import { del, get, post } from '@/util/GlobalMethods';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const uploadFiles = createAsyncThunk(
  'uploads/uploadFiles',
  async ({ file, activeConversation }: { file: File; activeConversation: string }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', activeConversation);
    const response = await post('/files', formData, {}, 'multipart/form-data');
    return response as FileMetadata;
  },
);

export const fetchFiles = createAsyncThunk('uploads/fetchFiles', async (id: string) => {
  const response = await get(`/files?purpose=${id}`);
  return response.data;
});

export const deleteFileById = createAsyncThunk('uploads/deleteFileById', async (id: string) => {
  await del(`/files/${id}`);
  return id;
});
const initialState: FileMetadata[] = [];
const fileSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadFiles.fulfilled, (state, action) => {
      if (action.payload) state.unshift(action.payload);
    });
    builder.addCase(fetchFiles.fulfilled, (_state, action) => {
      return action.payload;
    });
    builder.addCase(deleteFileById.fulfilled, (state, action) => {
      return state.filter((file) => file.id !== action.payload);
    });
  },
});

export default fileSlice.reducer;
