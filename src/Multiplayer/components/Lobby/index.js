import React from 'react'
import LobbyButton from '../LobbyButtons'
import './style.css'

function Lobby({roomid, name, gameState}){

    return(
        <div className="lobby__container">
            <h3 className="lobby__title">Lobby</h3>
            <div className="lobby__list_container">
                <h4 className="lobby__list_title">Players</h4>
                <ol className="lobby__list">
                    {gameState.players && gameState.players.map((player, index)=><li 
                                        className="lobby__list_item"key={index}>{player}</li>)}
                </ol>
            </div>
            { gameState.players.length == 2 ? <LobbyButton roomid={roomid} name={name} gameState={gameState} /> :
                <p>Waiting for players...</p>}
        </div>
    )
}

export default Lobby