import {useState} from "react";

const colors = ["red", "green", "blue", "yellow"];

export function SimonSaysPage() {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [message, setMessage] = useState("Watch the sequence!");
  const [currentStep, setCurrentStep] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [level, setLevel] = useState(0);
  function startGame() {
        setSequence([]);
        setUserSequence([]);
        setIsUserTurn(false);
        setMessage("Watch the sequence!");
        setCurrentStep(0);
        setIsGameOver(false);
        addStep([]);
    }

  function addStep(currentSequence) {
        const nextColor = colors[Math.floor(Math.random() * colors.length)];
        const newSequence = [...currentSequence, nextColor];
        setSequence(newSequence);
        setUserSequence([]);
        setCurrentStep(0);
        setMessage("Watch the sequence!");
        playSequence(newSequence);
    }

    async function playSequence(sequence) {
        for (let i = 0; i < sequence.length; i++) {
            await flashColor(sequence[i]);
        }
        setIsUserTurn(true);
        setMessage("Your turn!");
    }

    function flashColor(color) {
        return new Promise((resolve) => {
            setActiveColor(color);
            setTimeout(() => {
                setActiveColor(null);
                setTimeout(resolve, 250);
            }, 500);
        });
    }
    function handleColorClick(color) {
        if (!isUserTurn || isGameOver) return;
        const newUserSequence = [...userSequence, color];
        setUserSequence(newUserSequence);

        if (color !== sequence[currentStep]){
            setIsGameOver(true);
            setIsUserTurn(false);
            setMessage("Game Over!");
            return;
        }

        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);

        if (nextStep === sequence.length) {
            const nextLevel = level + 1;
            setLevel(nextLevel);
            setIsUserTurn(false);
            setMessage(`Level ${nextLevel}`);
            setTimeout(() => addStep(sequence), 1000);
        }
    }
    return (
        <div className="game">
            <h1>Simon Says</h1>
            <div className="status">{message}</div>
            <div className="level">Level: {level}</div>
            <div className="simon-board">
                {colors.map((color) => (
                    <button
                        key={color}
                        className={`simon-button ${color} ${activeColor === color ? 'active' : ''}`}
                        onClick={() => handleColorClick(color)}
                        disabled={!isUserTurn || isGameOver}
                    >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                    </button>
                ))}
            </div>
            {(isGameOver || sequence.length === 0) && (
                <button onClick={startGame}>Start Game</button>
            )}
        </div>
    );
}