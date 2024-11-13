import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import FileSlice from './FilesSlice';
import ConversationSlice from './ConversationSlice';
import MessagesSlice from './MessagesSlice';
import DebugModeSlice from './DebugModeSlice';
import PersistenceSlice from './PersistenceSlice';

export const store = configureStore({
  reducer: {
    files: FileSlice,
    conversation: ConversationSlice,
    messages: MessagesSlice,
    debugMode: DebugModeSlice,
    persistence: PersistenceSlice,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
