import { FormInput } from '../input/input';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { type Control } from 'react-hook-form';
import { SelectFormInput } from '../select/select';
import type { RegisterFormInputs } from '@/validation/registration-validation';
import { CheckBox } from '../checkbox/checkbox';

interface AddressFormProps {
  prefix: 'shipping' | 'billing';
  title: string;
  control: Control<RegisterFormInputs>;
  isDisabled: boolean;
}

export const AddressForm: React.FC<AddressFormProps> = ({ prefix, title, control, isDisabled }) => {
  return (
    <>
      <Typography variant="h6">{title}</Typography>

      <FormInput name={`${prefix}Street`} control={control} label="Street" isDisabled={isDisabled} />
      <FormInput name={`${prefix}City`} control={control} label="City" isDisabled={isDisabled} />
      <SelectFormInput name={`${prefix}Country`} control={control} label="Country" isDisabled={isDisabled}>
        <MenuItem value="US">USA</MenuItem>
        <MenuItem value="CN">Canada</MenuItem>
      </SelectFormInput>
      <FormInput name={`${prefix}PostalCode`} control={control} label="Postal Code" isDisabled={isDisabled} />
      <CheckBox control={control} name={`${prefix}DefaultAddress`} label="Set as default address" />
    </>
  );
};
