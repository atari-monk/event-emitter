import {EventEmitter} from './../src/index'

type Events = {
  [key: symbol]: any
}

describe('EventEmitter', () => {
  let emitter: EventEmitter<Events>
  const EVENT_A = Symbol('EVENT_A')
  const EVENT_B = Symbol('EVENT_B')

  beforeEach(() => {
    emitter = new EventEmitter<Events>()
  })

  test('should register and call event listeners', () => {
    const listener = jest.fn()
    emitter.on(EVENT_A, listener)
    emitter.emit(EVENT_A, 'payload')

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith('payload')
  })

  test('should unregister event listeners', () => {
    const listener = jest.fn()
    emitter.on(EVENT_A, listener)
    emitter.off(EVENT_A, listener)
    emitter.emit(EVENT_A, 'payload')

    expect(listener).not.toHaveBeenCalled()
  })

  test('should not fail when unregistering a non-existent listener', () => {
    const listener = jest.fn()
    expect(() => emitter.off(EVENT_A, listener)).not.toThrow()
  })

  test('should call listeners multiple times unless removed', () => {
    const listener = jest.fn()
    emitter.on(EVENT_A, listener)
    emitter.emit(EVENT_A, 'payload1')
    emitter.emit(EVENT_A, 'payload2')

    expect(listener).toHaveBeenCalledTimes(2)
    expect(listener).toHaveBeenLastCalledWith('payload2')
  })

  test('should support once listeners', () => {
    const listener = jest.fn()
    emitter.once(EVENT_A, listener)
    emitter.emit(EVENT_A, 'payload1')
    emitter.emit(EVENT_A, 'payload2')

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith('payload1')
  })

  test('should clear all listeners for a specific event', () => {
    const listener = jest.fn()
    emitter.on(EVENT_A, listener)
    emitter.clear(EVENT_A)
    emitter.emit(EVENT_A, 'payload')

    expect(listener).not.toHaveBeenCalled()
  })

  test('should clear all listeners for all events', () => {
    const listenerA = jest.fn()
    const listenerB = jest.fn()
    emitter.on(EVENT_A, listenerA)
    emitter.on(EVENT_B, listenerB)
    emitter.clear()
    emitter.emit(EVENT_A, 'payloadA')
    emitter.emit(EVENT_B, 'payloadB')

    expect(listenerA).not.toHaveBeenCalled()
    expect(listenerB).not.toHaveBeenCalled()
  })
})
