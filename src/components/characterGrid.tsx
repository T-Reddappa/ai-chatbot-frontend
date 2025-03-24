import { useEffect, useState } from "react";

interface Character {
  _id: string;
  name: string;
  image: string;
  description: string;
}

const CharacterGrid = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch("http://localhost:3002/characters");
      const characters = await response.json();
      console.log(characters);
      setCharacters(characters.characters);
    };
    fetchCharacters();
  }, []);
  return (
    <div className="">
      <h3>Chat with your fav character</h3>
      <div className="flex gap-2">
        {characters.map((char) => (
          <div className="flex flex-col gap-2 pb-3">
            <div
              className="w-[20px] bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
              style={{
                backgroundImage: `url(
                  "https://cdn.usegalileo.ai/sdxl10/cfee24ae-5bde-4dda-856c-7ca1211154eb.png"
                )`,
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                {char.name}
              </p>
              <p className="text-[#93aac8] text-sm font-normal leading-normal">
                Genius. Billionaire. Philanthropist.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterGrid;
