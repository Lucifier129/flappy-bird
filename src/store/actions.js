/**
 * actions
 */

export let START_PLAY = (state) => {
    let game = {...state.game }
    game.status = 'playing'
    let nextState = {
        ...state,
        ...state.initialState,
        game,
    }
    return FLY_UP(nextState)
}

export let FLY_UP = (state) => {
    if (state.bird.height >= state.game.range.max) {
        return state
    }

    let bird = {...state.bird }
    bird.status = 'up'
    bird.originalHeight = bird.height
    bird.targetHeight = bird.height + bird.flyHeight
    bird.timestamp = Date.now()

    let { range } = state.game
    if (bird.targetHeight > range.max) {
        bird.targetHeight = range.max
    }

    return {
        ...state,
        bird,
    }
}

export let PLAYING = (state) => {
    let gameStatus = state.game.status
    if (gameStatus === 'over') {
        return state
    }
    let nextState = flying(state)
    nextState = sliding(nextState)
    nextState = collisitionDetection(nextState)
    return nextState
}


function dropDown(state) {
    let bird = {...state.bird }
    bird.status = 'down'
    bird.originalHeight = bird.height
    bird.targetHeight = state.game.range.min
    bird.timestamp = Date.now()
    return {
        ...state,
        bird,
    }
}

function flying(state) {
    let bird = {...state.bird }
    if (bird.height === bird.targetHeight) {
        return dropDown(state)
    }

    let { timestamp, flyTime, dropTime } = bird
    let time = Date.now() - timestamp

    if (bird.height < bird.targetHeight) {
        let ratio = time / flyTime
        if (ratio > 1) {
            ratio = 1
        }
        bird.height = bird.originalHeight + (bird.targetHeight - bird.originalHeight) * ratio
    } else {
        let shift = time * (state.game.range.max - state.game.range.min) / dropTime

        bird.height = bird.originalHeight - shift
    }

    return {
        ...state,
        bird,
    }
}

function sliding(state) {
    let pipings = {...state.pipings }
    let now = Date.now()
    if (now - pipings.timestamp >= pipings.interval) {
        let { game } = state
        let heightRange = game.range.max - game.range.min
        let shift = pipings.range.y.min + (pipings.range.y.max - pipings.range.y.min) * Math.random()
        let piping = {
            timestamp: now,
            x: pipings.range.x.min,
            upper: heightRange - shift - pipings.range.gap,
            below: shift,
            bottom: shift,
            top: shift + pipings.range.gap,
        }
        pipings.list = pipings.list.concat(piping)
        pipings.timestamp = now
    }

    let { bird, game } = state
    let collisitionRange = getCollisitionRange(bird.size.width, game.size.width, pipings.size.width)
    let player = {...state.player}

    pipings.list = pipings.list.map(piping => {
        piping = {...piping }
        if (piping.x < pipings.range.x.max) {
            let ratio = (now - piping.timestamp) / pipings.speed
            if (ratio > 1) {
                ratio = 1
            }
            piping.x = ratio * pipings.range.x.max
        } else {
            piping.x = pipings.range.x.max
        }

        if (piping.x > collisitionRange.to && !piping.isPassed) {
            piping.isPassed = true
            player.score += 1
        }

        return piping
    }).filter(piping => {
        return piping.x < pipings.range.x.max
    })

    return {
        ...state,
        pipings,
        player,
    }
}

function getCollisitionRange(birdWidth, gameWidth, pipingWidth) {
    let from = (gameWidth - birdWidth) / 2
    let to = from + birdWidth / 2 + pipingWidth
    return { from, to }
}

function collisitionDetection(state) {
    let { game, bird, pipings } = state

    let collisitionRange = getCollisitionRange(bird.size.width, game.size.width, pipings.size.width)

    let list = pipings.list.filter(piping => {
        return piping.x > collisitionRange.from && piping.x < collisitionRange.to
    })

    let birdBottom = bird.height
    let birdTop = bird.height + bird.size.height

    for (let i = 0, len = list.length; i < len; i += 1) {
        let piping = list[i]
        if (birdBottom < piping.bottom || birdTop > piping.top) {
            game = {
                ...game,
                status: 'over'
            }
            return {
                ...state,
                game,
            }
        }
    }
    return state
}