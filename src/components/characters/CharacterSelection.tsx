import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

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
  const [characters, setCharacters] = useState<Character[] | null>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch("http://localhost:3002/characters");
      const characters = await response.json();
      setCharacters(characters.characters);
    };
    fetchCharacters();
  }, []);

  const handleStartChat = () => {
    if (selectedCharacter) {
      navigate(`/chat/${selectedCharacter._id}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">
          Choose Your Character
        </h1>
        <p className="text-gray-300">
          Select a character to start chatting with
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
        {characters?.map((character) => (
          <div
            key={character._id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedCharacter?._id === character._id
                ? "border-blue-500 shadow-lg"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => setSelectedCharacter(character)}
          >
            <div className="aspect-square mb-4 rounded-lg overflow-hidden">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{character.name}</h3>
            <p className="text-gray-300 text-sm">{character.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleStartChat}
          disabled={!selectedCharacter}
          className="px-8"
        >
          Start Chat
        </Button>
      </div>
    </div>
  );
}
