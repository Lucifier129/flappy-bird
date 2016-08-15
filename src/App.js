import React from 'react'
import classnames from 'classnames'
import Bird from './components/Bird'
import Piping from './components/Piping'
import Menu from './components/Menu'

export default function App({ state, actions, record }) {
    let { bird, pipings, game, player } = state
    let { FLY_UP, START_PLAY } = actions
    let recordState = record.getRecord()
    let { isRecording, history } = recordState
    let isPlaying = game.status === 'playing'
    let onFlyUp = isPlaying && !isRecording && FLY_UP
    let onReplay = history.length > 0 && record.replay
    let landClasses = classnames({
      land: true,
      sliding: isPlaying,
    })
    return (
      <div className="game">
        <div className="scene" onMouseDown={onFlyUp} onTouchStart={onFlyUp}>
            { isPlaying &&
              <div className="score">{player.score}</div>
            }
            <Bird {...bird} isFlying={isPlaying}  />
            {
              pipings.list.map(piping => <Piping key={piping.timestamp} {...piping} />)
            }
            <div className={landClasses} />
            { game.status === 'over' &&
              <Menu score={player.score} onPlay={START_PLAY} onReplay={onReplay} onReverse={record.reverse} />
            }
        </div>
      </div>
    )
}