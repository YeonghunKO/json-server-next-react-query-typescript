import { useState } from 'react';

const useInputState = (initVal: string) => {
  const [value, setValue] = useState(initVal);
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue('');
  };
  return [value, handleValue, reset] as const;
};

export default useInputState;
