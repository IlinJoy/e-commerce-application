import { FormInput } from '../input/input';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { type Control } from 'react-hook-form';
import { SelectFormInput } from '../select/select';
import type { RegisterFormInputs } from '@/validation/registration-validation';
import { CheckBox } from '../checkbox/checkbox';

interface AddressFormProps {
  prefix: 'shippingAddress' | 'billingAddress';
  title: string;
  control: Control<RegisterFormInputs>;
  isDisabled: boolean;
}

export const AddressForm = ({ prefix, title, control, isDisabled }: AddressFormProps) => {
  const checkboxName = prefix === 'shippingAddress' ? 'shippingDefaultAddress' : 'billingDefaultAddress';

  return (
    <>
      <Typography variant="h6">{title}</Typography>

      <FormInput name={`${prefix}.streetName`} control={control} label="Street" isDisabled={isDisabled} />
      <FormInput name={`${prefix}.city`} control={control} label="City" isDisabled={isDisabled} />
      <SelectFormInput name={`${prefix}.country`} control={control} label="Country" isDisabled={isDisabled}>
        <MenuItem value="US">USA</MenuItem>
        <MenuItem value="CN">Canada</MenuItem>
      </SelectFormInput>
      <FormInput name={`${prefix}.postalCode`} control={control} label="Postal Code" isDisabled={isDisabled} />
      <CheckBox control={control} name={checkboxName} label="Set as default address" />
    </>
  );
};
