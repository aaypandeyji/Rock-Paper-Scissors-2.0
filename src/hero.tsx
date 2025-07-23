import React, { useState } from "react";

const options = ["rock", "paper", "scissors"] as const;
type Choice = typeof options[number];

const genBotChoice = (): Choice => {
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const Hero: React.FC = () => {
    const [userScore, setUserScore] = useState(0);
    const [drawCount, setDrawCount] = useState(0);  
    const [botScore, setBotScore] = useState(0);
    const [msg, setMsg] = useState("Choose your move!");
    const [msgColor, setMsgColor] = useState("#081b31");

    const playGame = (userChoice: Choice) => {
        const botChoice = genBotChoice();

        if (userChoice === botChoice) {
            setDrawCount((prev) => prev + 1);  
            setMsg("Game was Draw. Play again.");
            setMsgColor("#081b31");
        } else {
            let userWin = true;
            if (userChoice === "rock") {
                userWin = botChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = botChoice === "scissors" ? false : true;
            } else {
                userWin = botChoice === "rock" ? false : true;
            }
            if (userWin) {
                setUserScore((score) => score + 1);
                setMsg(`You Win! Your ${userChoice} beats ${botChoice}`);
                setMsgColor("green");
            } else {
                setBotScore((score) => score + 1);
                setMsg(`You Lost. ${botChoice} beats Your ${userChoice}`);
                setMsgColor("red");
            }
        }
    };

    // Restart game function
    const restartGame = () => {
        setUserScore(0);
        setDrawCount(0);
        setBotScore(0);
        setMsg("Choose your move!");
        setMsgColor("#081b31");
    };

    return (
        <div>
            <h2>Rock Paper Scissors</h2>
            <div className="mb-6">
                {options.map((choice) => (
                    <button
                        key={choice}
                        onClick={() => playGame(choice)}
                        style={{ margin: "0 16px" }} 
                    >
                        {choice}
                    </button>
                ))}
            </div>
            <div className="mb-4">
                <span id="user-score" style={{ marginRight: "12px" }}>User: {userScore}</span>
                <span id="draw-count">Draws: {drawCount}</span>
                <span id="bot-score" style={{ marginRight: "12px" }}>Bot: {botScore}</span>
            </div>
            <div
                id="msg"
                style={{
                    background: msgColor,
                    color: "#fff",
                    padding: "8px",
                    marginTop: "12px",
                    marginBottom: "20px",  
                }}
            >
                {msg}
            </div>

            {/* Restart Button */}
            <button
                onClick={restartGame}
                style={{
                    padding: "10px 20px",
                    background: "#444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Restart Game
            </button>
        </div>
    );
};

export default Hero;
