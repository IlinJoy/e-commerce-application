import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

type CheckBoxProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  onClick?: () => void;
} & Omit<Partial<FormControlLabelProps>, 'control'>;

export function CheckBox<T extends FieldValues>({ name, label, control, onClick, ...rest }: CheckBoxProps<T>) {
  const { field } = useController({ name, control });

  return (
    <FormControlLabel
      {...rest}
      checked={field.value || false}
      control={<Checkbox {...field} onClick={onClick} />}
      label={label}
    />
  );
}
