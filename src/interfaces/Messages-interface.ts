export interface MessageInterface {
  conversationId?: string;
  id?: string;
  text: string;
  chatMessageType: string;
}
export interface AiMessagesInterface extends MessageInterface {
  toolExecutionRequests?: string;
}

export interface ToolExecutionResultInterface extends MessageInterface {
  toolId: string;
  toolName: string;
  toolText: string;
}

export const isUserMessage = (msg: MessageInterface | AiMessagesInterface): msg is MessageInterface => {
  return (msg as MessageInterface).chatMessageType === 'USER';
};
export const isSystemMessage = (msg: MessageInterface | AiMessagesInterface): msg is MessageInterface => {
  return (msg as MessageInterface).chatMessageType === 'SYSTEM';
};
export const isAiMessageType = (msg: MessageInterface | AiMessagesInterface): msg is AiMessagesInterface => {
  return (msg as AiMessagesInterface).chatMessageType === 'AI';
};
export const isAiMessageRequestType = (msg: MessageInterface | AiMessagesInterface): msg is AiMessagesInterface => {
  return (msg as AiMessagesInterface).toolExecutionRequests !== undefined;
};

export const isToolExecutionResult = (msg: MessageInterface | AiMessagesInterface): msg is ToolExecutionResultInterface => {
  return (msg as ToolExecutionResultInterface).chatMessageType === 'TOOL_EXECUTION_RESULT';
};
