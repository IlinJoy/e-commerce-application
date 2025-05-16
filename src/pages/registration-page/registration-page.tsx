import { RegisterForm } from '@/components/registration-form/registration-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@/validation/registration-validation';
import type { RegisterFormInputs } from '@/validation/registration-validation';
import styles from './registration-page.module.scss';

export function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    setValue,
  } = useForm<RegisterFormInputs>({ resolver: zodResolver(registrationSchema), mode: 'onChange' });

  const onSubmit = handleSubmit((data: RegisterFormInputs) => {
    console.log(data);
  });

  return (
    <>
      <div className={styles.formWrapper}>
        <RegisterForm
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          isValidForm={isValid}
          watch={watch}
          setValue={setValue}
        />
      </div>
      <div className={styles.registrationBg}></div>
    </>
  );
}
