import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

export type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
  control: Control<T>;
  ariaLabel?: string;
};

export function SelectFormInput<T extends FieldValues>({
  name,
  label,
  isRequired = false,
  isDisabled = false,
  control,
  children,
  ariaLabel,
}: FormSelectProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const shouldShrink = !!field.value;

  return (
    <FormControl error={!!error} fullWidth disabled={isDisabled}>
      {label && (
        <InputLabel shrink={shouldShrink} required={isRequired} htmlFor={name}>
          {label}
        </InputLabel>
      )}
      <Select
        {...field}
        id={name}
        disabled={isDisabled}
        inputProps={{
          'aria-label': ariaLabel,
        }}
      >
        {children}
      </Select>
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
}
