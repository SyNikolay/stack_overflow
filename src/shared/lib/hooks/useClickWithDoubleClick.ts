import { useCallback, useEffect, useRef } from "react";

const DOUBLE_CLICK_DELAY_MS = 150;

interface ClickHandlers {
  onClick: () => void;
  onDoubleClick: () => void;
}

export const useClickWithDoubleClick = (
  { onClick, onDoubleClick }: ClickHandlers,
  delay: number = DOUBLE_CLICK_DELAY_MS,
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const handlersRef = useRef({ onClick, onDoubleClick });

  useEffect(() => {
    handlersRef.current = { onClick, onDoubleClick };
  }, [onClick, onDoubleClick]);

  const clearPendingClick = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  useEffect(() => clearPendingClick, [clearPendingClick]);

  const handleClick = useCallback(() => {
    clearPendingClick();

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = undefined;
      handlersRef.current.onClick();
    }, delay);
  }, [clearPendingClick, delay]);

  const handleDoubleClick = useCallback(() => {
    clearPendingClick();
    handlersRef.current.onDoubleClick();
  }, [clearPendingClick]);

  return { handleClick, handleDoubleClick };
};
