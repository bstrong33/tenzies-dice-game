import React, { useState, useEffect } from 'react';
import './App.css';
import Die from './components/Die';
import Confetti from 'react-confetti'

function App() {

  const [diceInfo, setDiceInfo] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    let sameNumArr = diceInfo.filter(die => {
      return die.value === diceInfo[0].value && die.rollable === false
    })
    if (sameNumArr.length === 10) {
      setTenzies(true)
    }
  }, [diceInfo])

  function allNewDice() {
    let allDice = []
    for (let i = 1; i <= 10; i++) {
      allDice.push({
        id: i,
        rollable: true,
        value: randomNumber()
      })
    }
    return allDice;
  }

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

  function startNewGame() {
    setTenzies(false)
    setDiceInfo(allNewDice())
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
    // <main>
    //   {tenzies && <Confetti />}
    //   <h1 className="title">Tenzies</h1>
    //   <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    //   <div className='dice-container'>
    //     {dieElement}
    //   </div>
    //   {tenzies ? 
    //     <button onClick={startNewGame}>New Game</button> :  
    //     <button onClick={rollDice}>Roll</button>
    //   }
    // </main>
    <div>
      {tenzies ?
        <main>
          <Confetti />
          <h1 className="title">You Won! 🎉</h1>
          <p className='instructions'>Press the button below to play again</p>
          <div className='dice-container'>
            {dieElement}
          </div>
          <button onClick={startNewGame}>New Game</button>
        </main>
         :
         <main>
           <h1 className="title">Tenzies</h1>
          <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='dice-container'>
            {dieElement}
          </div>
          <button onClick={rollDice}>Roll</button>
        </main>
      }
    </div>
  );
}

export default App;
