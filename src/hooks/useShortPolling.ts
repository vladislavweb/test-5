import { useEffect, useRef, useState } from "react";

export const useShortPolling = <T extends () => any>(callback: T, delay: number) => {
  const savedCallback = useRef<T>(callback);
  const [amountOfCalls, setAmountOfCalls] = useState(0);
  const [result, setResult] = useState<null | ReturnType<T>>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const response = savedCallback.current();

      setResult(response);
      setAmountOfCalls((prevValue) => prevValue + 1);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [amountOfCalls]);

  return { amountOfCalls, result };
};
