import { useEffect } from "react";
import { useState } from "react";

const useWebSocket = (url, token) => {
  const [socket, setSocket] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!url || !token) return;

    const ws = new WebSocket(`${url}?token=${encodeURIComponent(token)}`);
    setSocket(ws);

    ws.onopen = () => {
      setIsConnected(true);
      console.log("connected to ws server");
    };

    ws.onmessage = (event) => {
      console.log("Received", event.data);
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    };

    ws.onerror = (error) => {
      console.log("ws error:", error);
    };

    return () => {
      ws.close();
      setIsConnected(false);
      console.log("disconnedted from ws server");
    };
  }, [url, token]);

  return { socket, isConnected, messages };
};

export default useWebSocket;
