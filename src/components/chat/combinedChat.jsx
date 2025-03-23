import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  addMessage,
  filterChatsByCharacter,
} from "../../store/slices/chatSlice";

const CombinedWebSocketChat = () => {
  console.log("combined ws chat comp");
  const filteredChats = useSelector((state) => state.chat.filteredChats);
  console.log(filteredChats);
  const dispatch = useDispatch();
  const { characterId } = useParams();
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.bmlydmlrYQ.FtZbve7iGXBlHevHyMctibDaddf2EhJRdGZqCMGr6LI";

  useEffect(() => {
    if (characterId) {
      dispatch(filterChatsByCharacter(characterId));
    }
  }, [dispatch, characterId]);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:3002?token=${token}`);

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("New WebSocket message:", message);
      dispatch(addMessage({ characterId, message }));
      // setMessages((prev) => [...prev, message]);
      setIsWaiting(false);
    };

    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onclose = () => console.log("WebSocket disconnected");
    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsWaiting(false);
    };

    return () => ws.current?.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredChats]);

  const sendMessage = () => {
    if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
      const message = {
        userId: "67cc839b55653d884b64e940",
        characterId,
        user_message: input.trim(),
      };

      setIsWaiting(true);
      ws.current.send(JSON.stringify(message));
      setInput("");
    }
  };

  return (
    <div className="flex p-20 border border-red-50 bg-[#111822]">
      <div className="flex-1/2 w-[50%] border border-black"></div>
      <div className="flex flex-col max-w-[50%] mx-auto border rounded-lg shadow-lg p-4 h-[500px] ">
        <div className="flex-1 overflow-y-auto mb-4 flex flex-col border border-red-400 bg-gray-400">
          {filteredChats[0]?.messages?.length > 0 ? (
            filteredChats[0]?.messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-2 my-2 max-w-[75%] rounded-lg shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                <p className="font-semibold">
                  {msg.sender === "user" ? "You" : "AI"}:
                </p>
                <p>{msg.text}</p>
              </div>
            ))
          ) : (
            <p>No messages found for this character.</p>
          )}
          {isWaiting && (
            <div className="self-start bg-gray-100 p-3 rounded-lg my-2 flex items-center">
              <div className="flex items-center">
                <span className="h-2 w-2 mx-0.5 bg-gray-500 rounded-full animate-pulse"></span>
                <span className="h-2 w-2 mx-0.5 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                <span className="h-2 w-2 mx-0.5 bg-gray-500 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isWaiting}
          />
          <button
            onClick={sendMessage}
            className={`px-4 rounded-r-lg text-white ${
              isWaiting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isWaiting}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombinedWebSocketChat;
