import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (!(target instanceof Node) || ref.current?.contains(target)) {
        return;
      }

      handlerRef.current(event);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  return ref;
};
