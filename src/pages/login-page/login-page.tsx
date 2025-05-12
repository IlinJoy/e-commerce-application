import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@/components/login-form/login-form';
import type { LoginFormInputs } from '@/components/login-form/login-form';
import styles from './login-page.module.scss';

export function LoginPage() {
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
    <>
      <div className={styles.loginBg}>
        <div className={styles.formWrapper}>
          <Typography variant="h2">Login</Typography>
          <LoginForm
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            isValidForm={isValid}
          />
        </div>
        {/* TODO make a component to display general errors*/}
      </div>
      <div className={styles.temp} />
    </>
  );
}
