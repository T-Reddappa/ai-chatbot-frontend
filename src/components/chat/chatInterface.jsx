import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { filterChatsByCharacter } from "../../store/slices/chatSlice";

const ChatInterface = () => {
  const { characterId } = useParams();
  const dispatch = useDispatch();
  const filteredChats = useSelector((state) => state.chat.filteredChats);
  console.log(filteredChats, "filterdcats");

  useEffect(() => {
    if (characterId) {
      dispatch(filterChatsByCharacter(characterId));
    }
  }, [dispatch, characterId]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Chat Interface
        </h2>
        <div className="overflow-y-auto max-h-96 space-y-4 p-4">
          {filteredChats[0]?.messages?.length > 0 ? (
            filteredChats[0].messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-xs p-3 rounded-xl text-sm shadow-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No messages found for this character.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
