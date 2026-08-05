import { useState, useEffect } from "react";

console.log("JavaScript loaded");
const rows = 6;
const cols = 5;

function Cell({ value, status }){
  return <div className={`letter ${status || ""}`}>{value}</div>
}
function Row({ letters, statuses, shake }){
  return (
    <div className={`board-row ${shake ? "animate__animated animate__shakeX" : ""}`}>
      {letters.map((letter, i) =>
        <Cell key={i} value={letter} status={statuses[i]} />
      )}
    </div>
  );
}
export function WordlePage(){
  const [grid, setGrid] = useState(Array.from({ length:rows }, () => Array(cols).fill("")));
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [word, setWord] = useState("");
  const [shakeRow, setShakeRow] = useState("");
  const [results, setResults] = useState(Array.from({ length:rows }, () => Array(cols).fill("")));
  useEffect(() => {
    function onKeyDown(event){
      if(event.key === "Backspace"){
        handleBackSpace();
      }
      else if(event.key === "Enter"){
        handleSubmit();
      }
      else if(event.key.length === 1 && event.key.match(/[a-z]/i)){
        handleLetter(event.key.toUpperCase());
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });
  useEffect(() => {
    async function fetchWord(){
      const randomWord = await getRandomWord();
      setWord(randomWord);
    }
    fetchWord();
  }, []);
  function handleLetter(letter){
    if(gameOver || currentPosition >= cols) return;
    const newGrid = grid.map(row => [...row]);
    newGrid[currentAttempt][currentPosition] = letter;
    setCurrentPosition(currentPosition + 1);
    setGrid(newGrid);
  }
  function handleBackSpace(){
    if(currentPosition == 0) return;
    const newGrid = grid.map(row => [...row]);
    newGrid[currentAttempt][currentPosition - 1] = "";
    setCurrentPosition(currentPosition - 1);
    setGrid(newGrid);
  }
  async function handleSubmit(){
    if(currentPosition < cols) return;
    const guess = grid[currentAttempt].join("");
    if(!(await isValidWord(guess))) {
      setShakeRow(currentAttempt);
      setTimeout(() => setShakeRow(""), 500);
      return;
    }
    const result = checkWord(guess, word);
    const newResults = results.map(row => [...row]);
    newResults[currentAttempt] = result;
    setResults(newResults);
    if(guess === word){
      setGameOver(true);
      alert("You win!");
      return;
    }
    const nextAttempt = currentAttempt + 1;
    if(nextAttempt >= rows){
      setGameOver(true);
      return;
    }
    setCurrentAttempt(nextAttempt);
    setCurrentPosition(0);
  }
  async function resetGame(){
    setGrid(Array.from({ length:rows }, () => Array(cols).fill("")));
    setCurrentPosition(0);
    setCurrentAttempt(0);
    setGameOver(false);
    setResults(Array.from({ length:rows }, () => Array(cols).fill("")));
    await getRandomWord().then(word => setWord(word));
  }
  return (
    <div className="wordle-page">
      <h1>Wordle</h1>
      <div id="wordle-grid">
        {grid.map((letters, row) => (
          <Row key={row} letters={letters} statuses={results[row]} shake={shakeRow === row} />
        ))}
      </div>
      {gameOver && <button onClick={resetGame}>Play Again</button>}
    </div>
  );
}

async function getRandomWord(){
  try{
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${cols}`);
    const data = await response.json();
    return data[0].toUpperCase();
  }
  catch(error){
    console.log("Error", error);
  }
}
async function isValidWord(word) {
  try{
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.ok;
  }
  catch(error){
    return false;
  }
}
function checkWord(guess, answer){
  const result = [];
  for(let i=0; i<guess.length; i++){
    if(guess[i] === answer[i]){
      result.push('correct');
    }
    else if(answer.includes(guess[i])){
      result.push('misplaced');
    }
    else{
      result.push('incorrect');
    }
  }
  return result;
}