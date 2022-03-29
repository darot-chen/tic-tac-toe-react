import { click } from '@testing-library/user-event/dist/click';
import React, { useState, useEffect } from 'react'
import Board from './Board'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: "center",
  justifyContent: 'center'
}

const buttonStyle = {
  width: "200px"
}



const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);
  const [clickedIndex, setClickedIndex] = useState([]);
  const [isTimeTravel, setIsTimeTravel] = useState(false)

  const handleClick = (i) => {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? "X" : "O";
    setClickedIndex([...clickedIndex, i]);
    console.log(boardCopy);

    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  useEffect(() => {
    console.log(clickedIndex);
  }, [clickedIndex])

  const restart = () => {
    console.log('restart');
    setIsTimeTravel(false)
    setClickedIndex([])
    setBoard(Array(9).fill(null))
  }

  const goToMove = (i) => {
    // console.log(clickedIndex[i]);
    // X EVEN
    // O ODD
    const historyBoard = Array(9).fill(null);
    for (let j = 0; j <= i; j++) {
      historyBoard[clickedIndex[j]] = j % 2 ? 'O' : 'X';
      setBoard(historyBoard);
    }
    setIsTimeTravel(true)
  }

  return (
    <>
      <Board squares={board} onClick={handleClick} />
      <div style={style}>
        <p>
          {winner ? "Winner: " + winner : "Next Player: " + (xIsNext ? "X" : "O")}
        </p>
        {(winner || isTimeTravel) &&
          <>
            <li>
              <button style={buttonStyle} onClick={restart} >Start the Game</button>
            </li>
            {clickedIndex.map((index, i) => (
              <li key={i}><button value={index} onClick={() => goToMove(i)}>Go to move#{i} </button></li>
            ))}
          </>
        }
      </div>
    </>
  )
}

export default Game