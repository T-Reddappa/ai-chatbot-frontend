import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "@/store/slices/charactersSlice";

interface Character {
  _id: string;
  name: string;
  image: string;
  description: string;
}

// const characters: Character[] = [
//   {
//     id: "1",
//     name: "Tony Stark",
//     image: "/characters/tony-stark.jpg",
//     description: "Genius, billionaire, playboy, philanthropist",
//   },
//   {
//     id: "2",
//     name: "Darth Vader",
//     image: "/characters/darth-vader.jpg",
//     description: "Dark Lord of the Sith",
//   },
//   {
//     id: "3",
//     name: "Gandalf",
//     image: "/characters/gandalf.jpg",
//     description: "The Grey Wizard",
//   },
//   {
//     id: "4",
//     name: "Wonder Woman",
//     image: "/characters/wonder-woman.jpg",
//     description: "Amazonian Princess and Warrior",
//   },
// ];

export function CharacterSelection() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const { characters, loading, error } = useSelector(
    (state: RootState) => state.characters
  );

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (characters.length < 1) {
      dispatch(fetchCharacters());
    }
  }, []);

  const handleStartChat = () => {
    if (selectedCharacter) {
      navigate(`/chat/${selectedCharacter._id}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-20 py-10 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 border border-yellow-600">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">
          Choose Your Fav Character
        </h1>
        <p className="text-gray-300">
          Select a character to start chatting with
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
        {characters?.map((character) => (
          // <motion.div
          //                   key={character._id}
          //                   layoutId={character._id}
          //                   variants={{
          //                     hidden: { opacity: 0, y: 20 },
          //                     show: { opacity: 1, y: 0 },
          //                   }}
          //                   whileHover={{
          //                     scale: 1.03,
          //                     boxShadow: "0 0 20px rgba(111, 66, 193, 0.3)",
          //                   }}
          //                   whileTap={{ scale: 0.98 }}
          //                   onClick={() => setSelectedCharacter(character)}
          //                 >
          <motion.div
            key={character._id}
            layoutId={character._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 20px rgba(111, 66, 193, 0.3)",
            }}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedCharacter?._id === character._id
                ? "border-red-500 shadow-lg"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => setSelectedCharacter(character)}
          >
            <div
              className="mb-4 m-auto rounded-lg bg-center bg-no-repeat aspect-square bg-cover w-[10rem]"
              style={{
                backgroundImage: character.image
                  ? `url(${character.image})`
                  : `url(
                  "https://cdn.usegalileo.ai/sdxl10/cfee24ae-5bde-4dda-856c-7ca1211154eb.png"
                )`,
              }}
            ></div>
            <h3 className="text-xl font-semibold text-center mb-2">
              {character.name}
            </h3>
            <p className="text-gray-300 text-[12px]">{character.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button
          variant={"secondary"}
          onClick={handleStartChat}
          disabled={!selectedCharacter}
          className="px-8 cursor-pointer"
        >
          Start chatting with {selectedCharacter?.name}
        </Button>
      </div>
    </div>
  );
}
