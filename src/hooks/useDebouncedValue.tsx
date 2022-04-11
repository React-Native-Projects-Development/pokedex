import {useEffect, useState} from 'react';

export const useDebouncedValue = (input: string = '', time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    // creates new timeout instance
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      // clear previous instance whenever there is a chance on state
      clearTimeout(timeout);
    };
  }, [input]);

  return {debouncedValue};
};
