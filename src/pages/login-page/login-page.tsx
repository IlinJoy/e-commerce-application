import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@/components/login-form/login-form';
import type { LoginFormInputs } from '@/components/login-form/login-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './login-page.module.scss';
import { loginSchema } from '@/validation/login-validation';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import { fetchLoggedInCustomer } from '@/api/clientAuth';
import type { Customer } from '@commercetools/platform-sdk';

type FetchedCustomer = { customer: Customer; customerToken: string } | undefined;

//Existing customer for testing
//testLogin@example.com
//Test123!

export function LoginPage() {
  const { onLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema), mode: 'onChange' });

  const { mutate, isPending } = useMutation<FetchedCustomer, Error, LoginFormInputs>({
    mutationFn: ({ email, password }) => fetchLoggedInCustomer(email, password),
    onSuccess: (data) => onLogin(data?.customerToken),
    onError: (error) => console.log(error),
  });

  const onSubmit = handleSubmit((data: LoginFormInputs) => mutate(data));

  return (
    <>
      <div className={styles.formWrapper}>
        <Typography variant="h2">Login</Typography>
        <LoginForm
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isSubmitting={isPending}
          isValidForm={isValid}
        />
        {/* TODO make a component to display general errors*/}
      </div>
      <div className={styles.loginBg}></div>
    </>
  );
}
