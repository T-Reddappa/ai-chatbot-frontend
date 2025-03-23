import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

interface Message {
  sender: string;
  text: string;
  timestamp: string;
  _id: { $oid: string };
}

const WebSocketChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { characterId } = useParams();
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.bmlydmlrYQ.FtZbve7iGXBlHevHyMctibDaddf2EhJRdGZqCMGr6LI";

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:3002?token=${token}`);

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setMessages((prev) => [...prev, message]);
      setIsWaiting(false); // Hide loading indicator when response is received
    };

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsWaiting(false); // Also hide indicator if there's an error
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (
      input.trim() &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      const message = {
        userId: "67cc839b55653d884b64e940",
        characterId: characterId,
        user_message: input.trim(),
      };

      // Show the loading indicator
      setIsWaiting(true);

      // Send the message to the server
      ws.current.send(JSON.stringify(message));

      // Add user message to the messages array
      const userMessage: Message = {
        sender: "user",
        text: input.trim(),
        timestamp: new Date().toISOString(),
        _id: { $oid: Math.random().toString(36).substring(2, 15) }, // Generate a temporary ID
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto border rounded-lg shadow-lg p-4 h-[500px]">
      <div className="flex-1 overflow-y-auto mb-4 flex flex-col">
        {messages.map((msg) => (
          <div
            key={msg._id.$oid}
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
            <p className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}

        {/* Loading indicator with Tailwind styles */}
        {isWaiting && (
          <div className="self-start bg-gray-100 p-3 rounded-lg my-2 flex items-center">
            <div className="flex items-center">
              <span className="h-2 w-2 mx-0.5 bg-gray-500 rounded-full inline-block opacity-40 animate-pulse"></span>
              <span className="h-2 w-2 mx-0.5 bg-gray-500 rounded-full inline-block opacity-40 animate-pulse delay-150"></span>
              <span className="h-2 w-2 mx-0.5 bg-gray-500 rounded-full inline-block opacity-40 animate-pulse delay-300"></span>
            </div>
          </div>
        )}

        {/* Auto-scroll reference div */}
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
          disabled={isWaiting} // Optionally disable input while waiting
        />
        <button
          onClick={sendMessage}
          className={`px-4 rounded-r-lg text-white ${
            isWaiting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isWaiting} // Disable button while waiting
        >
          Send
        </button>
      </div>

      {/* Add this to your global styles instead, not inline in the component */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default WebSocketChat;

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router";

// interface Message {
//   sender: string;
//   text: string;
//   timestamp: string;
//   _id: { $oid: string };
// }

// const WebSocketChat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const { characterId } = useParams();

//   const [input, setInput] = useState("");
//   const ws = useRef<WebSocket | null>(null);
//   const token =
//     "eyJhbGciOiJIUzI1NiJ9.bmlydmlrYQ.FtZbve7iGXBlHevHyMctibDaddf2EhJRdGZqCMGr6LI";
//   useEffect(() => {
//     ws.current = new WebSocket(`ws://localhost:3002?token=${token}`);

//     ws.current.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       console.log(message);
//       setMessages((prev) => [...prev, message]);
//     };

//     ws.current.onclose = () => console.log("WebSocket disconnected");

//     return () => {
//       ws.current?.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (input.trim() && ws.current) {
//       const message = {
//         userId: "67cc839b55653d884b64e940",
//         characterId: characterId,
//         user_message: input.trim(),
//       };

//       ws.current.send(JSON.stringify(message));
//       setInput("");
//     }
//   };

//   return (
//     <div className="flex flex-col max-w-lg mx-auto border rounded-lg shadow-lg p-4 h-[500px]">
//       <div className="flex-1 overflow-y-auto mb-4">
//         {messages.map((msg) => (
//           <div
//             key={msg._id.$oid}
//             className={`p-2 my-2 max-w-[75%] rounded-lg shadow-md ${
//               msg.sender === "user"
//                 ? "bg-blue-500 text-white self-end"
//                 : "bg-gray-200 text-gray-800 self-start"
//             }`}
//           >
//             <p className="font-semibold">
//               {msg.sender === "user" ? "You" : "AI"}:
//             </p>
//             <p>{msg.text}</p>
//             <p className="text-xs text-gray-500">
//               {new Date(msg.timestamp).toLocaleTimeString()}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="flex">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none"
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WebSocketChat;
