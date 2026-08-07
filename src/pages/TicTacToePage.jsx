import { useState, useEffect } from "react";

const room_api = "https://game-room-api.fly.dev/api/rooms";

function Square({ value, onClick}){
    return(
        <button className="square" onClick={onClick}>{value}</button>
    );
}
function Board({ xIsNext, squares, onPlay, disabled }){
    function handleClick(i) {
        if(calculateWinner(squares) || squares[i] || disabled){
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext){
            nextSquares[i] = 'X';
        }
        else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }
    
    
    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status = `Winner: ${winner}`
    }
    else{
        status = `Next player: ${(xIsNext ? 'X' : 'O')}`
    }

    return (
        <div className="game">
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
        </div>
    );
}
export function TicTacToePage() {
    const [roomId, setRoomId] = useState(null);
    const [roomIdInput, setRoomIdInput] = useState("");
    const [playerSymbol, setPlayerSymbol] = useState(null);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const isMyTurn = (playerSymbol === "X" && xIsNext) || (playerSymbol === "O" && !xIsNext);
    const winner = calculateWinner(squares);
    
    useEffect(() => {
        if(!roomId) return;
        const interval = setInterval(async () => {
            const response = await fetch(`${room_api}/${roomId}`);
            const data = await response.json();
            setSquares(data.gameState.squares);
            setXIsNext(data.gameState.xIsNext);
        }, 1000);
        return () => clearInterval(interval);
    }, [roomId]);

    async function createRoom() {
        const response = await fetch(room_api, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                initialState: {
                    squares: Array(9).fill(null),
                    xIsNext: true,
                },
            }),
        });
        const data = await response.json();
        setRoomId(data.roomId);
        setPlayerSymbol("X");
        setSquares(data.gameState.squares);
        setXIsNext(data.gameState.xIsNext);
    }

    async function joinRoom() {
        if(!roomIdInput) return;
        const response = await fetch(`${room_api}/${roomIdInput}`);
        const data = await response.json();
        setRoomId(roomIdInput);
        setPlayerSymbol("O");
        setSquares(data.gameState.squares);
        setXIsNext(data.gameState.xIsNext);
    }

    function handlePlay(nextSquares){
        const newXIsNext = !xIsNext;
        setSquares(nextSquares);
        setXIsNext(newXIsNext);

        fetch(`${room_api}/${roomId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                gameState: {
                    squares: nextSquares,
                    xIsNext: newXIsNext,
                },
            }),
        });
    }

    function leaveRoom() {
        setRoomId(null);
        setPlayerSymbol(null);
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }
    if(!roomId) {
        return (
            <div className="game">
                <h2>Tic-Tac-Toe</h2>
                <button onClick={createRoom}>Create Room</button>
                <div>
                    <input 
                        type="text"
                        value={roomIdInput}
                        onChange={(e) => setRoomIdInput(e.target.value)}
                        placeholder="Enter Room ID"
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            </div>
        );
    }


    return(
        <div className="game">
            <h2>Multiplayer Tic-Tac-Toe</h2>
            <p>Room ID: {roomId}</p>
            <p>You are: {playerSymbol}</p>
            <p>{winner ? (winner === playerSymbol ? "You win!" : "You lose!") : (isMyTurn ? "Your turn!" : "Waiting for opponent...")}</p>
            <div className="game-board">
                <Board 
                    xIsNext={xIsNext} 
                    squares={squares}
                    onPlay={handlePlay}
                    disabled={!isMyTurn}
                />
            </div>
            <button onClick={leaveRoom}>Leave Room</button>
        </div>
    );
}
function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for(let i = 0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a]
        }
    }
    return null;
}