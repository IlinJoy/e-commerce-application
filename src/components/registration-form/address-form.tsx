/* eslint-disable no-restricted-imports */
import { FormInput } from '../input/input';
import { Checkbox, FormControlLabel, MenuItem, Typography } from '@mui/material';
import { type Control } from 'react-hook-form';
import { SelectFormInput } from '../select/select';
import type { RegisterFormInputs } from '@/validation/registration-validation';

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
        <MenuItem value="USA">USA</MenuItem>
        <MenuItem value="Canada">Canada</MenuItem>
      </SelectFormInput>
      <FormInput name={`${prefix}PostalCode`} control={control} label="Postal Code" isDisabled={isDisabled} />

      <FormControlLabel control={<Checkbox defaultChecked />} label="Set as default address" />
    </>
  );
};
