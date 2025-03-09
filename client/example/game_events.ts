import {EventEmitter} from '../../src/index'

const PLAYER_MOVE = Symbol('playerMove')
const GAME_START = Symbol('gameStart')
const GAME_OVER = Symbol('gameOver')

type GameEvents = {
  [PLAYER_MOVE]: {x: number; y: number}
  [GAME_START]: {}
  [GAME_OVER]: {reason: string}
}

export function example() {
  const eventEmitter = new EventEmitter<GameEvents>()

  eventEmitter.on(PLAYER_MOVE, payload => {
    console.log(`Player moved to (${payload.x}, ${payload.y})`)
  })

  eventEmitter.emit(PLAYER_MOVE, {x: 10, y: 20})

  eventEmitter.emit(GAME_START, {})

  eventEmitter.clear(GAME_OVER)

  eventEmitter.clear()
}
