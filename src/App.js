import React, { Component } from 'react'
import classnames from 'classnames'
import Bird from './components/Bird'
import Piping from './components/Piping'
import Menu from './components/Menu'

export default function App({ state, actions }) {
    let { bird, pipings, game, player } = state
    let { FLY_UP, START_PLAY } = actions
    let isPlaying = game.status === 'playing'
    let landClasses = classnames({
      land: true,
      sliding: isPlaying
    })
    return (
      <div className="game">
        <div className="scene" onMouseDown={isPlaying && FLY_UP} onTouchStart={isPlaying && FLY_UP}>
            { isPlaying &&
              <div className="score">{player.score}</div>
            }
            <Bird {...bird} isFlying={isPlaying}  />
            {
              pipings.list.map(piping => <Piping key={piping.timestamp} {...piping} />)
            }
            <div className={landClasses} />
            { game.status === 'over' &&
              <Menu score={player.score} onPlay={START_PLAY} />
            }
        </div>
      </div>
    )
}
