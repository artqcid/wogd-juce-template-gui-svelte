import { writable } from 'svelte/store'
import { PluginService } from '../services/plugin.service'

/**
 * Svelte Store for Plugin Communication
 * Provides reactive state for plugin connection
 */
function createPluginStore() {
  const service = new PluginService()
  const { subscribe, set, update } = writable({
    service,
    isConnected: service.isInWebView2()
  })

  // Register message listener
  service.onMessage((message) => {
    console.log('Message from plugin:', message)
  })

  return {
    subscribe,
    sendMessage: (message: any) => service.sendMessage(message),
    setParameter: (paramId: string, value: number) => service.setParameter(paramId, value),
    requestParameters: () => service.requestParameters(),
    setWindowSize: (width: number, height: number) => service.setWindowSize(width, height)
  }
}

export const pluginStore = createPluginStore()
