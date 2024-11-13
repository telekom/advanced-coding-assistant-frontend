import { AiMessagesInterface, MessageInterface, ToolExecutionResultInterface } from '@/interfaces/Messages-interface';
import { get } from '@/util/GlobalMethods';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchAllMessages = createAsyncThunk('messages/fetchAllMessages', async (id: string) => {
  const response = await get(`/conversations/${id}/messages`);
  if ('error' in response) {
    return response;
  }

  return response as (MessageInterface | AiMessagesInterface | ToolExecutionResultInterface)[];
});

const initialState: (MessageInterface | AiMessagesInterface)[] = [];

export const MessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (_state, action: PayloadAction<(MessageInterface | AiMessagesInterface | ToolExecutionResultInterface)[]>) => {
      return action.payload;
    },
    removeMessagesFromStore: () => {
      return [];
    },
    addMessage: (state, action: PayloadAction<MessageInterface | AiMessagesInterface>) => {
      state.push(action.payload);
    },
    deleteMessage: (state) => {
      state.pop();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllMessages.fulfilled,
      (_state, action: PayloadAction<(MessageInterface | AiMessagesInterface | ToolExecutionResultInterface)[] | undefined>) => {
        return action.payload || [];
      },
    );
  },
});

export const { setMessages, addMessage, deleteMessage, removeMessagesFromStore } = MessagesSlice.actions;
export default MessagesSlice.reducer;
