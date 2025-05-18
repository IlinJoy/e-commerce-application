import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

type CheckBoxProps<T extends FieldValues> = { name: Path<T>; label: string; control: Control<T>; onClick?: () => void };

export function CheckBox<T extends FieldValues>({ name, label, control, onClick }: CheckBoxProps<T>) {
  const { field } = useController({ name, control });

  return <FormControlLabel control={<Checkbox {...field} onClick={onClick} />} label={label} />;
}
