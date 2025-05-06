import type { LoginFormInputs } from '@/ui/form/login-form-ui';
import { LoginPageUi } from '@/ui/pages/login-page-ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function LoginPage() {
  const [generalError, setGeneralError] = useState('temp error');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }, // наверное лучше будет использовать что-то что будет по приходу ответа от екоммерс
  } = useForm<LoginFormInputs>({ mode: 'onChange' }); // + валидация resolver: resolver(schema)

  // для вывода ошибок с инпутами, нужны будут еще имена полей, остальные можно посмотреть как сделать чтобы отличать их можно было

  // через TanStack/кастомный?? можно подумать насчет вынести в отдельный файл
  // const { error, mutate, isPending} = useMutation({
  //   mutationFn: interactionWithApi,
  //   onSuccess: auth/redirect,
  //   onError: (err) => handleError(err)
  // });
  // mutationFn: (variables: TVariables) => Promise<TData>;

  const onSubmit = handleSubmit((data: LoginFormInputs) => {
    console.log(data);
  });

  const handleUserTouch = () => {
    if (generalError) {
      setGeneralError('');
    }
  };

  return (
    <>
      <LoginPageUi
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        generalError={generalError}
        handleUserTouch={handleUserTouch}
        isPending={isSubmitting}
        isValidForm={isValid}
      />
    </>
  );
}
