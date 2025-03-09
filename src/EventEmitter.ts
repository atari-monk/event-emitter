type Listener<T> = (payload: T) => void

export class EventEmitter<Events extends Record<symbol, any>> {
  private listeners: Map<symbol, Set<Listener<any>>> = new Map()

  on<K extends keyof Events & symbol>(
    event: K,
    listener: Listener<Events[K]>
  ): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(listener)
  }

  off<K extends keyof Events & symbol>(
    event: K,
    listener: Listener<Events[K]>
  ): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.delete(listener)
      if (eventListeners.size === 0) {
        this.listeners.delete(event)
      }
    }
  }

  emit<K extends keyof Events & symbol>(event: K, payload: Events[K]): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach(listener => listener(payload))
    }
  }

  clear(event?: keyof Events & symbol): void {
    if (event) {
      this.listeners.delete(event)
    } else {
      this.listeners.clear()
    }
  }

  once<K extends keyof Events & symbol>(
    event: K,
    listener: Listener<Events[K]>
  ): void {
    const onceListener: Listener<Events[K]> = payload => {
      listener(payload)
      this.off(event, onceListener)
    }
    this.on(event, onceListener)
  }
}
