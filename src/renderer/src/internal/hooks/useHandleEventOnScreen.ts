import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for handling listener-based Electron API events (e.g., onSuccessCreate, onError).
 * Registers a callback to be executed when the event is emitted.
 * For Promise-based checks (e.g., loginUserAccess), use useCheckEvent instead.
 *
 * @param options - Configuration options
 * @param options.event - The API event name (e.g., 'onSuccessCreate')
 * @param options.callback - Function to execute when event is emitted
 * @returns void
 */

export const useHandleEventOnScreen = ({
  event,
  callback,
}: {
  event: keyof typeof window.api;
  callback: (data: any) => Promise<void> | void;
}) => {
  const electronAPI = useRef(window.api || null);

  const handleCallback = useCallback(
    (data: any) => {
      console.log('handleCallback', data);
      callback(data);
    },
    [callback]
  );

  useEffect(() => {
    if (!electronAPI.current || !electronAPI.current[event]) {
      return;
    }

    // Only for methods that accept callbacks (listeners like onSuccessCreate)
    // For Promise methods, use useCheckEvent hook instead
    const apiMethod = electronAPI.current[event];
    if (typeof apiMethod === 'function') {
      apiMethod(handleCallback);
    }

    return () => {
      // Cleanup if the method supports removal (e.g., removeListener)
      if (typeof apiMethod === 'function' && 'removeListener' in apiMethod) {
        // Note: Actual cleanup depends on API; add if needed
      }
    };
  }, [event, handleCallback]);

  return {};
};
