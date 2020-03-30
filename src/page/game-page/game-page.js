import React from 'react';
import {useContext} from 'react';
import PlayerContext from '../../context/player-context';

import { GameBoard, emojiParty} from '../../components/game/game.component';
import { Client } from 'boardgame.io/react';

import './game-page.styles.scss';

//Game Page that renders the game client using the MainGame component;
const GamePage = () => {
    const { playerNum } = useContext(PlayerContext);

    const gameObj = {
        game: emojiParty,
        board: GameBoard,
        numPlayers: playerNum,
    };

    const Game = Client(gameObj);

    return (
        <div className="game-page">
            <Game />
        </div>
    )
}

export default GamePage;