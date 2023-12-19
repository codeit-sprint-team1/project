import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  forwardRef,
} from 'react';

export type InputProps = {
  value: string | number;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  hasError?: boolean;
  helperText?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  maxLength?: number;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      placeholder,
      type = 'text',
      hasError = false,
      helperText,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <div>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {helperText && <p>{helperText}</p>}
      </div>
    );
  }
);
