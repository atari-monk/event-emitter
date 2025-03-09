# EventEmitter Documentation

## Overview
The `EventEmitter` class provides a strongly-typed event handling mechanism using TypeScript. It allows registering, unregistering, and emitting events, ensuring type safety with generics. Events are identified by `symbol` keys, making them unique.

## Type Definitions
```ts
type Listener<T> = (payload: T) => void
```
A `Listener` is a function that takes a payload of type `T` and performs an action when an event is emitted.

## Class: `EventEmitter<Events>`
```ts
export class EventEmitter<Events extends Record<symbol, any>>
```
A generic event emitter that manages event listeners and event dispatching.

### Properties
- `private listeners: Map<symbol, Set<Listener<any>>>`
  - A map storing event listeners for each event symbol.

### Methods

#### `on(event: symbol, listener: Listener<T>): void`
Registers a listener for a given event.

**Parameters:**
- `event: K` - The event identifier (a `symbol`).
- `listener: Listener<Events[K]>` - A callback function that executes when the event is emitted.

**Usage:**
```ts
const emitter = new EventEmitter<{ myEvent: string }>()
const myEvent = Symbol("myEvent")
emitter.on(myEvent, (payload) => console.log(payload))
```

#### `off(event: symbol, listener: Listener<T>): void`
Removes a specific listener from an event.

**Parameters:**
- `event: K` - The event identifier.
- `listener: Listener<Events[K]>` - The callback function to remove.

**Usage:**
```ts
emitter.off(myEvent, myListener)
```

#### `emit(event: symbol, payload: T): void`
Triggers an event, invoking all registered listeners with the given payload.

**Parameters:**
- `event: K` - The event identifier.
- `payload: Events[K]` - The data to pass to the listeners.

**Usage:**
```ts
emitter.emit(myEvent, "Hello, World!")
```

#### `clear(event?: symbol): void`
Removes all listeners for a specific event or clears all events if no parameter is provided.

**Parameters:**
- `event?: K` (Optional) - The event identifier to clear.

**Usage:**
```ts
emitter.clear(myEvent) // Clears listeners for myEvent
emitter.clear() // Clears all listeners
```

#### `once(event: symbol, listener: Listener<T>): void`
Registers a one-time listener that executes once and then removes itself.

**Parameters:**
- `event: K` - The event identifier.
- `listener: Listener<Events[K]>` - A callback function to execute once.

**Usage:**
```ts
emitter.once(myEvent, (payload) => console.log("Received:", payload))
```

## Example Usage
```ts
const emitter = new EventEmitter<{ myEvent: string }>()
const myEvent = Symbol("myEvent")

const listener = (msg: string) => console.log("Event received:", msg)
\emitter.on(myEvent, listener)
emitter.emit(myEvent, "Hello!") // Logs: "Event received: Hello!"
\emitter.off(myEvent, listener)
emitter.emit(myEvent, "Hello again!") // No output, listener removed
```
