import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { setAllChats } from "../../store/slices/chatSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3002/chats", {
          params: {
            userId: "67cc839b55653d884b64e940",
          },
        });
        console.log(response);
        dispatch(setAllChats(response.data));
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();
  }, []);
  return (
    <div className="bg-[#111822] h-[90vh] flex ">
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-[80%] m-auto  bg-[url(/home-image.jpeg)] bg-contain repeat-0 rounded-xl ">
        <motion.h1
          className="text-xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to ChatVerse!
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/90 mb-6 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Connect, communicate, and collaborate with your friends in real-time.
          Experience fast, secure, and engaging messaging like never before!
        </motion.p>

        <motion.button
          className="bg-white text-blue-500 font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-blue-100 transition cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/characters")}
        >
          Get Started
        </motion.button>
      </div>
      //{" "}
    </div>
  );
};

export default Home;
