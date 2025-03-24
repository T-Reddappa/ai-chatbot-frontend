import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  addMessage,
  filterChatsByCharacter,
} from "../../store/slices/chatSlice";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdArrowBack } from "react-icons/io";

const CombinedWebSocketChat = () => {
  const filteredChats = useSelector((state) => state.chat.filteredChats);
  const characters = useSelector((state) => state.characters.characters);
  console.log("characters from chat", characters);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { characterId } = useParams();
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);
  const selectedCharacter = characters?.find(
    (char) => char._id === characterId
  );
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

  // bg-gradient-to-br from-indigo-100 to-purple-500"
  return (
    <motion.div
      className="flex py-8 px-4 min-h-screen items-center justify-center border border-yellow-500 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-3xl h-[90vh] shadow-2xl flex flex-col rounded-2xl
        "
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Chat header */}
        <motion.div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex gap-3 items-center rounded-t-2xl">
          <IoMdArrowBack
            className="size-5 cursor-pointer"
            onClick={() => navigate("/characters")}
          />

          <motion.div
            className="w-3 h-3 bg-green-400 rounded-full mr-2 "
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <img
            className="w-10 h-10 object-contain bg-black rounded-full p-1"
            src={`${selectedCharacter?.image}`}
            alt="character"
          />
          <h2 className="font-bold text-lg">
            {selectedCharacter?.name || "AI Chat Assistant"}
          </h2>
        </motion.div>

        {/* Chat messages area */}
        <div className="flex-1 p-4 bg-[#000] overflow-y-auto">
          <AnimatePresence>
            {filteredChats[0]?.messages?.length > 0 ? (
              <div className="space-y-3">
                {filteredChats[0]?.messages?.map((msg) => (
                  <motion.div
                    key={msg._id}
                    className={`p-3 rounded-2xl shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white ml-auto text-end w-[20rem]"
                        : "bg-gray-100 text-gray-800 mr-auto"
                    } max-w-[80%] relative`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    {/* <p className="text-sm font-medium mb-1">
                      {msg.sender === "user" ? "You" : "AI"}
                    </p> */}
                    {/* <div
                      className="w-10 h-10 border border-red-500 rounded-full  "
                      style={{
                        backgroundImage: selectedCharacter?.image
                          ? `url(${selectedCharacter?.image})`
                          : `url(
                  "https://cdn.usegalileo.ai/sdxl10/cfee24ae-5bde-4dda-856c-7ca1211154eb.png"
                )`,
                      }}
                    ></div> */}
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        msg.sender === "user"
                          ? " "
                          : `${selectedCharacter?.image}`
                      }
                    />
                    <p className="text-sm">{msg.text}</p>

                    <motion.div
                      className={`w-2 h-2 absolute ${
                        msg.sender === "user"
                          ? "right-0 -bottom-1 bg-blue-500"
                          : "left-0 -bottom-1 bg-gray-100"
                      } rotate-45`}
                    />
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-3 text-gray-300"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </motion.svg>
                <p>No messages yet. Start a conversation!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input area */}
        <motion.div
          className="p-4 border-t border-gray-100 flex bg-white rounded-b-2xl"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 py-3 px-4 rounded-l-full focus:outline-none bg-gray-50"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isWaiting}
            whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
          />
          <motion.button
            onClick={sendMessage}
            className={`px-6 py-3 rounded-r-full text-white font-medium ${
              isWaiting || !input.trim() ? "bg-blue-300" : "bg-blue-500"
            }`}
            disabled={isWaiting || !input.trim()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isWaiting ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CombinedWebSocketChat;
