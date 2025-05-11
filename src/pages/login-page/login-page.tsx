import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@/components/login-form/login-form';
import type { LoginFormInputs } from '@/components/login-form/login-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './login-page.module.scss';
import { loginSchema } from '@/validation/login-validation';

export function LoginPage() {
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isValid, isSubmitting }, // заменить на isPending от запроса
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema), mode: 'onChange' });

  // для вывода ошибок с инпутами,желательно еще имена полей
  // через TanStack/кастомный??
  // const { error, mutate, isPending} = useMutation({
  //   mutationFn: interactionWithApi,
  //   onSuccess: auth/redirect,
  //   onError: (err) => {
  //      if(field) setError(field, { message: err.message })
  //    }else{
  //      setGeneralError(err.message);
  //    }
  // });
  // mutationFn: (variables: TVariables) => Promise<TData>;

  const onSubmit = handleSubmit((data: LoginFormInputs) => {
    console.log(data);
  });

  return (
    <div className={styles.loginBg}>
      <Stack className={styles.formWrapper}>
        <Typography variant="h2">Login</Typography>
        <LoginForm
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          isValidForm={isValid}
        />
      </Stack>
      {/* TODO make a component to display general errors*/}
    </div>
  );
}
