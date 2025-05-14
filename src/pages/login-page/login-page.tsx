import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@/components/login-form/login-form';
import type { LoginFormInputs } from '@/components/login-form/login-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './login-page.module.scss';
import { loginSchema } from '@/validation/login-validation';
import { useMutation } from '@tanstack/react-query';
import { fetchLoggedInCustomer } from '@/api/clientAuth';
import { useAuth } from '@/hooks/use-auth';

//Existing customer for testing
//testLogin@example.com
//Test123!

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema), mode: 'onChange' });
  const { onLogin } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormInputs) => fetchLoggedInCustomer(data.email, data.password),
    onSuccess: (data) => onLogin(data),
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
