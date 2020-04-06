import React from 'react';
import { useEffect, useState, useRef } from 'react';

import './game.styles.scss';

//this component sets up the view layer
const GameBoard = ({ ctx, G, moves, events, mapLayout, ...otherProps }) => {
  const [moveTrigger, setMoveTrigger] = useState(1);

  const firstRender = useRef(true);

  useEffect(()=> {
    if (firstRender.current){
      firstRender.current = false;
      return;
    } else {
    let currentPlayer = G.players[Number(ctx.currentPlayer)];
    let rollValue = G.dieRoll;
    let goalPosition = currentPlayer.position + rollValue;
    //move player position and end turn after move is done;
    if (goalPosition < G.spaces.length - 1) {
      for (let i = 0; i < rollValue; i++) {
        setTimeout(() => moves.traverse(), i * 500);
        if (i === rollValue - 1) {
          setTimeout(() => events.endTurn(), i * 500);
        }
      }
    } else {
      for (let i = 0; i < ((G.spaces.length - 1) - currentPlayer.position); i++) {
        setTimeout(() => moves.traverse(), i * 500);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }},[moveTrigger])

  const onClick = () => {
    // moves.traverse()
    if (!ctx.gameover) {
      //roll dice
      moves.rollDie();
      let temp = moveTrigger +1;
      setMoveTrigger(temp);
    }
  }

  // generate cell;
  const cellWidth = 50;
  const cellHeight = 50;

  const cellStyle = {
    width: `${cellWidth}px`,
    height: `${cellHeight}px`,
  };

  // translate into an array of node
  // Generates board with Top Left at 0,0
  const boardNode = mapLayout.map((e, idx) =>
    (<div
      className='cell'
      style={{
        ...cellStyle,
        top: `${cellHeight * e.top}px`,
        left: `${cellWidth * e.left}px`,
        transform: `translateZ(${(e.elevation * 50)}px) rotateX(0deg)`,
      }}
      key={idx}
    >
      {G.spaces[idx]}
    </div>
    )
  )

  // f
  let winner = null;
  if (ctx.gameover) {
    winner = ctx.gameover.winner !== undefined ? (<div id="winner">Winner: {ctx.gameover.winner}</div>)
      : (<div id="winner"></div>);
  }
  return (
    <React.Fragment>
      <div className='cell-container'>
        {boardNode}
      </div>

      <button onClick={onClick}>roll dice</button>
      <div>{winner}</div>
    </React.Fragment>
  );
}

export default GameBoard;