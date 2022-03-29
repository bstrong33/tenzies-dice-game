import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';

function App() {

  const [diceInfo, setDiceInfo] = useState([
    {id: 1, rollable: true, value: randomNumber()},
    {id: 2, rollable: true, value: randomNumber()},
    {id: 3, rollable: true, value: randomNumber()},
    {id: 4, rollable: true, value: randomNumber()},
    {id: 5, rollable: true, value: randomNumber()},
    {id: 6, rollable: true, value: randomNumber()},
    {id: 7, rollable: true, value: randomNumber()},
    {id: 8, rollable: true, value: randomNumber()},
    {id: 9, rollable: true, value: randomNumber()},
    {id: 10, rollable: true, value: randomNumber()}
  ])

  function toggleRollable(id) {
    const newState = diceInfo.slice()
    newState[id - 1].rollable = !newState[id - 1].rollable
    setDiceInfo(newState)
  }

  function randomNumber() {
    return Math.floor(Math.random() * 6) + 1
  }

  function rollDice() {
    const newStateValues = diceInfo.map(die => {
      if (die.rollable === false) {
        return {...die}
      }
      else {
        const newValue = randomNumber()
        return {...die, value: newValue}
      }
    })
    setDiceInfo(newStateValues)
  }

  const dieElement = diceInfo.map(die => {
    return <Die 
      key={die.id}
      id={die.id}
      value={die.value}
      rollable={die.rollable}
      toggleRollable={toggleRollable}
    />
  })

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {dieElement}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
