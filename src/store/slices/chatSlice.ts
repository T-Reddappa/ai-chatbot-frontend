import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types for Message and Chat
interface Message {
  sender: string;
  text: string;
  timestamp: {
    $date: string;
  };
  _id: string;
}

interface NewMessage {
  message: Message;
  characterId: string;
}

interface Chat {
  _id: {
    $oid: string;
  };
  character: string;
  user: {
    $oid: string;
  };
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  messages: Message[];
}

// Define initial state type
interface ChatState {
  allChats: Chat[];
  filteredChats: Chat[];
}

const initialState: ChatState = {
  allChats: [],
  filteredChats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAllChats: (state, action: PayloadAction<Chat[]>) => {
      state.allChats = action.payload;
    },
    addMessage: (state, action: PayloadAction<NewMessage>) => {
      const { characterId, message } = action.payload;

      // Find the index of the chat with the matching characterId
      const chatIndex = state.allChats.findIndex(
        (chat) => chat.character === characterId
      );

      if (chatIndex >= 0) {
        // Create a new copy of the messages array with the new message
        const updatedMessages = [
          ...state.allChats[chatIndex].messages,
          message,
        ];

        // Update the chat with the new messages array (immutably)
        state.allChats = state.allChats.map((chat, index) =>
          index === chatIndex ? { ...chat, messages: updatedMessages } : chat
        );
      } else {
        // Create a new chat with proper structure
        const newChat: Chat = {
          _id: { $oid: Date.now().toString() }, // Generate a temporary ID
          character: characterId,
          user: { $oid: "current-user-id" }, // You would need to get this from somewhere
          createdAt: { $date: new Date().toISOString() },
          updatedAt: { $date: new Date().toISOString() },
          messages: [message],
        };

        // Add the new chat to allChats
        state.allChats = [...state.allChats, newChat];
      }

      // Update filteredChats if they're currently filtered by this character
      if (
        state.filteredChats.length > 0 &&
        state.filteredChats[0]?.character === characterId
      ) {
        state.filteredChats = state.allChats.filter(
          (chat) => chat.character === characterId
        );
      }
    },
    filterChatsByCharacter: (state, action: PayloadAction<string>) => {
      const characterId = action.payload;
      state.filteredChats = state.allChats.filter(
        (chat) => chat.character === characterId
      );
    },
  },
});

export const { setAllChats, addMessage, filterChatsByCharacter } =
  chatSlice.actions;
export default chatSlice.reducer;
