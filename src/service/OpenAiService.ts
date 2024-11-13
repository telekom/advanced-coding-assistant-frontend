import { AiMessagesInterface, MessageInterface } from '@/interfaces/Messages-interface';
import { updateTitle } from '@/redux/ConversationSlice';
import { addMessage, deleteMessage } from '@/redux/MessagesSlice';
import { isValidUrl } from '@/util/IsValidUrl';
import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

export const sendMessage = async (
  message: string,
  dispatch: ThunkDispatch<{ messages: MessageInterface[] }, undefined, UnknownAction> & Dispatch<UnknownAction>,
  activeConversation: string | null,
  messages: MessageInterface[],
  persistence: boolean,
) => {
  if (message.trim() !== '') {
    const newMessage: MessageInterface = {
      chatMessageType: 'USER',
      text: message.trim(),
    };
    dispatch(addMessage(newMessage));
    const tempProcessingMessage: MessageInterface = {
      chatMessageType: 'AI',
      text: 'Advanced Coding Assistant is thinking...',
    };
    dispatch(addMessage(tempProcessingMessage));
    if (persistence) {
      const {
        newAgentMessage,
        conversationId,
      }: {
        newAgentMessage: AiMessagesInterface;
        conversationId: string | null;
      } = await handleCustomAi(message.trim(), activeConversation);
      if (conversationId && !activeConversation) dispatch(updateTitle(conversationId));
      dispatch(deleteMessage());
      dispatch(addMessage(newAgentMessage));
      return conversationId || null;
    } else {
      const {
        newAgentMessage,
      }: {
        newAgentMessage: AiMessagesInterface;
      } = await handleOpenAISubmit(message.trim(), messages);
      dispatch(deleteMessage());
      dispatch(addMessage(newAgentMessage));
    }
  }
  return '';
};

const handleCustomAi = async (
  message: string,
  activeConversation: string | null,
): Promise<{
  newAgentMessage: AiMessagesInterface;
  conversationId: string | null;
}> => {
  try {
    const params = {
      messages: [
        {
          role: 'USER',
          content: message,
        },
      ],
      model: 'gpt-4o',
    };
    const headers: {
      [key: string]: string;
    } = {
      'Content-Type': 'application/json; charset=utf-8',
      'Persist-Conversation': 'true',
    };
    if (activeConversation && activeConversation !== 'New') {
      headers['Conversation-Id'] = activeConversation;
    }
    const BASE_URL = import.meta.env.VITE_APP_BACKEND_ENDPOINT;

    if (!isValidUrl(BASE_URL)) {
      throw new Error('Invalid URL: Access to the requested resource is not allowed.');
    }
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });

    const conversationId: string | null = response.headers.get('Conversation-Id');

    const result = await response.json();
    const newAgentMessage: AiMessagesInterface = {
      chatMessageType: 'AI',
      text: result.choices[result.choices.length - 1].message.content,
    };

    return {
      newAgentMessage,
      conversationId,
    };
  } catch (e: unknown) {
    const newAgentMessage = {
      chatMessageType: 'AI',
      text: '🤖 ' + (e as Error).message,
    };
    const conversationId = null;

    return {
      newAgentMessage,
      conversationId,
    };
  }
};

const handleOpenAISubmit = async (
  message: string,
  messages: MessageInterface[],
): Promise<{
  newAgentMessage: AiMessagesInterface;
}> => {
  try {
    const params = {
      messages: messages.map((msg) => ({
        role: msg.chatMessageType === 'USER' ? 'USER' : 'AI',
        content: msg.text,
      })),
      model: 'gpt-4o',
    };
    params.messages.push({
      role: 'USER',
      content: message,
    });
    const headers: {
      [key: string]: string;
    } = {
      'Content-Type': 'application/json; charset=utf-8',
    };
    const BASE_URL = import.meta.env.VITE_APP_BACKEND_ENDPOINT;
    if (!isValidUrl(BASE_URL)) {
      throw new Error('Invalid URL: Access to the requested resource is not allowed.');
    }

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });

    const result = await response.json();
    const newAgentMessage: AiMessagesInterface = {
      chatMessageType: 'AI',
      text: result.choices[result.choices.length - 1].message.content,
    };
    return {
      newAgentMessage,
    };
  } catch (e: unknown) {
    const newAgentMessage = {
      chatMessageType: 'AI',
      text: '🤖 ' + (e as Error).message,
    };
    return {
      newAgentMessage,
    };
  }
};
