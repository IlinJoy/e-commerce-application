import { RegisterForm } from '@/components/registration-form/registration-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@/validation/registration-validation';
import type { RegisterFormInputs } from '@/validation/registration-validation';
import styles from './registration-page.module.scss';

const defaultValues: RegisterFormInputs = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  shippingStreet: '',
  shippingCity: '',
  shippingCountry: '',
  shippingPostalCode: '',
  billingCountry: '',
  billingCity: '',
  billingStreet: '',
  billingPostalCode: '',
};

export function RegistrationPage() {
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    control,
    setValue,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit((data: RegisterFormInputs) => {
    console.log(data);
  });

  return (
    <>
      <div className={styles.formWrapper}>
        <RegisterForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          isValidForm={isValid}
          setValue={setValue}
          control={control}
        />
      </div>
      <div className={styles.registrationBg}></div>
    </>
  );
}
