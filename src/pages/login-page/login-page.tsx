import { type LoginFormInputs } from '@/ui/form/login-form-ui';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './login-page.module.scss';
import { LoginForm } from '@/components/login-form/login-form';

export function LoginPage() {
  const [generalError, setGeneralError] = useState('temp Something went wrong on our side. Please try again later.');

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isValid, isSubmitting }, // заменить на isPending от запроса
  } = useForm<LoginFormInputs>({ mode: 'onChange' }); // + валидация resolver: resolver(schema)

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
      <Stack className={`${styles.formWrapper} ${generalError ? styles.generalError : ''}`}>
        <Typography variant="h2">Login</Typography>
        <LoginForm
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          generalError={generalError}
          setGeneralError={setGeneralError}
          isPending={isSubmitting}
          isValidForm={isValid}
        />
      </Stack>
      {/* TO DO replace with a custom component */}
      {generalError && <Typography className={styles.generalErrorMessage}>{generalError}</Typography>}
    </div>
  );
}
