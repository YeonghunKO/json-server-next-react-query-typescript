import { useState } from 'react';

export default function useToggleState(initalState: boolean = false) {
  const [state, setState] = useState(initalState);
  const handleState = () => {
    setState(!state);
  };

  const reset = () => {
    setState(false);
  };

  return [state, handleState, reset] as const;
}
