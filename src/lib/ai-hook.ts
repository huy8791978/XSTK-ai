import {
  fetchServerSentEvents,
  useChat,
  createChatClientOptions,
} from '@tanstack/ai-react'
import type { InferChatMessages } from '@tanstack/ai-react'

import type { ProcessId } from '@/lib/processes'

// Default chat options for simple usage
const defaultChatOptions = createChatClientOptions({
  connection: fetchServerSentEvents('/api/chat'),
})

export type ChatMessages = InferChatMessages<typeof defaultChatOptions>

// `mode` is sent to the server as `body.data.mode` to pick the learning process.
export const useAIChat = (mode: ProcessId) => {
  const chatOptions = createChatClientOptions({
    connection: fetchServerSentEvents('/api/chat'),
    body: { mode },
  })

  return useChat(chatOptions)
}
