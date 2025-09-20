import { ERROR_CHANNEL, SUCCESS_CHANNEL } from '../ipcHandlers/ipcHandlers.constants.js'

// Promise<{ success: boolean; data: T | null; error: any | null }>

export const handleIpcHelper = async <T>({
  event,
  data,
  callback,
  successMsg = '',
  notifier = { send: false, nameEvent: '' }
}: {
  event: any
  data: T
  callback: (data: T) => Promise<any | null>
  successMsg?: string
  notifier?: {
    send: boolean
    nameEvent: string
  }
}): Promise<void> => {
  try {
    const results = await callback(data)

    event.sender.send(SUCCESS_CHANNEL, {
      type: SUCCESS_CHANNEL,
      message: successMsg,
      data: results,
      timestamp: new Date().toISOString()
    })

    if (notifier.send && notifier.nameEvent) {
      event.sender.send(notifier.nameEvent, results)
    }
  } catch (error: any) {
    event.sender.send(ERROR_CHANNEL, {
      type: ERROR_CHANNEL,
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
}
