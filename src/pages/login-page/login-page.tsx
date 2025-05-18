import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@/components/login-form/login-form';
import type { LoginFormInputs } from '@/components/login-form/login-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validation/login-validation';
import { useMutation } from '@tanstack/react-query';
import { fetchLoggedInCustomer } from '@/api/clientAuth';
import { useAuth } from '@/hooks/use-auth';
import styles from './login-page.module.scss';

export function LoginPage() {
  const { onLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema), mode: 'onChange' });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormInputs) => fetchLoggedInCustomer(data.email, data.password),
    onSuccess: (data) => {
      onLogin(data);
      //showSuccess
    },
    onError: (error) => console.log(error), //showError
  });

  console.info('test testLogin@example.com > Test123!');
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
      </div>
      <div className={styles.loginBg}></div>
    </>
  );
}
