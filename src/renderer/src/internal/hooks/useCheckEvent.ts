import { useEffect } from 'react';

/**
 * Custom hook to abstract checking Promise-based Electron API events.
 * On component mount (or when enabled changes), it calls the specified API method,
 * awaits the result, and executes the provided callback with the data.
 * Intended for no-argument Promise-returning methods like 'loginUserAccess'.
 *
 * @param options - Configuration options
 * @param options.event - The API event/method name (e.g., 'loginUserAccess')
 * @param options.callback - Function to execute with the API response data
 * @param options.enabled - Whether to execute the check (default: true)
 * @returns void
 *
 * @example
 * useCheckEvent({
 *   event: 'loginUserAccess',
 *   callback: (access: boolean) => {
 *     if (access) {
 *       console.log('Access granted');
 *     }
 *   },
 *   enabled: true
 * });
 */

type NoArgPromiseMethod = () => Promise<any>;

interface UseCheckEventOptions {
  event: keyof typeof window.api;
  callback: (data: any) => Promise<void> | void;
  enabled?: boolean;
}

export const useCheckEvent = ({
  event,
  callback,
  enabled = true,
}: UseCheckEventOptions) => {
  useEffect(() => {
    if (!enabled || !window.api?.[event]) {
      return;
    }

    const checkEvent = async () => {
      try {
        const apiMethod = window.api[event] as NoArgPromiseMethod;
        const data = await apiMethod();
        callback(data);
      } catch (error) {
        console.error(`Error in checkEvent for ${String(event)}:`, error);
        callback(null);
      }
    };

    checkEvent();
  }, [event, callback, enabled]);
};
