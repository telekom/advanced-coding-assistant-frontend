import { ConversationInterface } from '@/interfaces/Conversation-interface';
import { del, get } from '@/util/GlobalMethods';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const fetchAllConversations = createAsyncThunk('conversations/fetchAllConversations', async () => {
  const response = await get('/conversations');
  return response as ConversationInterface[];
});

export const updateTitle = createAsyncThunk('conversations/updateNewConversationTitle', async (id: string) => {
  const response = await get(`/conversations/${id}`);
  return response as ConversationInterface;
});

export const deleteConversationById = createAsyncThunk('conversations/deleteConversationById', async (id: string) => {
  await del(`/conversations/${id}`);
  return id;
});

export const setActiveConversation = createAsyncThunk('conversations/setActiveConversation', (conversationId: string | null) => {
  return conversationId;
});

const initialState = {
  conversations: [] as ConversationInterface[],
  activeConversation: null as string | null,
};

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setActiveChatAtTop: (state, action: PayloadAction<string>) => {
      if (state.conversations[0].id === action.payload) return;
      const conversation = state.conversations.find((chat) => chat.id === action.payload);
      if (conversation) {
        state.conversations = state.conversations.filter((chat) => chat.id !== action.payload);
        state.conversations.unshift(conversation);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllConversations.fulfilled, (state, action: PayloadAction<ConversationInterface[]>) => {
      state.conversations = action.payload;
    });
    builder.addCase(updateTitle.fulfilled, (state, action: PayloadAction<ConversationInterface | undefined>) => {
      const data: ConversationInterface | undefined = action.payload;
      const conversation = state.conversations.find((chat) => chat.id === data?.id);
      if (data && conversation) {
        conversation.title = data.title;
      } else {
        state.conversations.unshift(data as ConversationInterface);
      }
    });
    builder.addCase(deleteConversationById.fulfilled, (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) return state;
      return {
        ...state,
        conversations: state.conversations.filter((conversation) => conversation.id !== action.payload),
      };
    });

    builder.addCase(setActiveConversation.fulfilled, (state, action) => {
      state.activeConversation = action.payload;
    });
  },
});

export const { setActiveChatAtTop } = conversationSlice.actions;
export default conversationSlice.reducer;
