import React, { useState } from 'react';
import './App.css';
import Square from './components/Square'


var CurrentPlayer: string = 'X';
function App() {

  const winnerConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [winnerText, setWinnerText] = useState('None');
  const [quareList, setSquareList] = useState(['', '', '', '', '', '', '', '', '', '']);

  const resetAll = () => {
    setSquareList(['', '', '', '', '', '', '', '', '', '']);
    setWinnerText('None');
    CurrentPlayer = 'X';
  }

  const clickSquare = (index: number) => {
    if (quareList[index] !== '' || winnerText !== 'None') return;
    let newList = quareList;
    newList[index] = CurrentPlayer;
    validation(newList, CurrentPlayer);
    setSquareList([...newList]);
    CurrentPlayer = (CurrentPlayer === 'X') ? 'O' : 'X';
  }

  const validation = (list: string[], player: string) => {
    let collectionIndex = [];
    list.forEach(
      (letter, i) => { if (letter === player) collectionIndex.push(i); }
    );

    if (collectionIndex.length > 2) {
      for (let winningCondition of winnerConditions) {
        let cell1 = list[winningCondition[0]];
        let cell2 = list[winningCondition[1]];
        let cell3 = list[winningCondition[2]];
        if (cell1 === '' || cell2 === '' || cell3 === '') continue;
        if (cell1 === cell2 && cell2 === cell3) {
          setWinnerText(player);
          return;
        }
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">

        <div className="game__board">
          <div className="status instruction__text">Next player: {CurrentPlayer}</div>
          <div className="winner instruction__text">Winner: {winnerText}</div>
          <button className="reset_button" onClick={resetAll}>Reset</button>
          <div className="boardStyle">
            <div className="board__row">
              {quareList && quareList.map((letter, i) => {
                if (i >= 0 && i <= 2) return (<Square key={i} onClick={() => { clickSquare(i) }} initialValue={letter} />)
                else return null;
              })}
            </div>
            <div className="board__row">
              {quareList && quareList.map((item, i) => {
                if (i >= 3 && i <= 5) return (<Square key={i} onClick={() => { clickSquare(i) }} initialValue={item} />);
                else return null;
              })}
            </div>
            <div className="board__row">
              {quareList && quareList.map((item, i) => {
                if (i >= 6 && i <= 8) return (<Square key={i} onClick={() => { clickSquare(i) }} initialValue={item} />);
                else return null;
              })}
            </div>
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
