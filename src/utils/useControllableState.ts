import { useState, useCallback } from "react";

function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (isControlled) {
        onChange?.(newValue);
      } else {
        setUncontrolledValue(newValue);
      }
    },
    [isControlled, onChange],
  );

  return [value, setValue] as const;
}

export { useControlledState };
