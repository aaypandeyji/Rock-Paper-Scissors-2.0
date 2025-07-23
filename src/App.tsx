import { useState } from "react"; 
import rock from "../src/assets/rock.png";
import paper from "../src/assets/paper.png";
import scissors from "../src/assets/scissors.png";

const options = [
  { name: "rock", img: rock },
  { name: "paper", img: paper },
  { name: "scissors", img: scissors },
] as const;

type Choice = typeof options[number]["name"];

const getBotChoice = (): Choice => {
  const index = Math.floor(Math.random() * options.length);
  return options[index].name;
};

const App = () => {
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [drawCount, setDrawCount] = useState(0);  
  const [message, setMessage] = useState("Choose your move!");
  const [messageColor, setMessageColor] = useState("bg-blue-800");

  const playGame = (userChoice: Choice) => {
    const botChoice = getBotChoice();

    if (userChoice === botChoice) {
      setDrawCount((prev) => prev + 1);  
      setMessage("It's a Draw! Try again.");
      setMessageColor("bg-blue-800");
      return;
    }

    const userWins =
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "paper" && botChoice === "rock") ||
      (userChoice === "scissors" && botChoice === "paper");

    if (userWins) {
      setUserScore((prev) => prev + 1);
      setMessage(`You Win! ${userChoice} beats ${botChoice}`);
      setMessageColor("bg-green-600");
    } else {
      setBotScore((prev) => prev + 1);
      setMessage(`You Lose! ${botChoice} beats ${userChoice}`);
      setMessageColor("bg-red-600");
    }
  };

  // Restart game function
  const restartGame = () => {
    setUserScore(0);
    setBotScore(0);
    setDrawCount(0);
    setMessage("Choose your move!");
    setMessageColor("bg-blue-800");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Rock Paper Scissors</h1>
      <br />
      <br />
      <div className="flex flex-wrap justify-center gap-12 mb-12"> 
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => playGame(option.name)}
            className="w-32 h-32 rounded-full overflow-hidden hover:scale-110 transition-transform duration-200 ring-2 ring-white"
          >
            <img
              src={option.img}
              alt={option.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-24 text-2xl font-semibold mb-8"> {/* Increased gap */}
        <div className="text-center">
          <p className="text-3xl">{userScore}</p>
          <p>You</p>
        </div>
        <div className="text-center">
          <p className="text-3xl">{drawCount}</p>
          <p>Draws</p>
        </div>
        <div className="text-center">
          <p className="text-3xl">{botScore}</p>
          <p>Bot</p>
        </div>
      </div>

      <div className={`rounded-lg px-6 py-3 text-lg ${messageColor} transition-colors duration-300 mb-8`}> 
        {message}
      </div>

      {/* Restart Button */}
      <button
        onClick={restartGame}
        className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
      >
        Restart Game
      </button>
    </div>
  );
};

export default App;
