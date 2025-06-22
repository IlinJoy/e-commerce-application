import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@/components/login-form/login-form';
import type { LoginFormInputs } from '@/components/login-form/login-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validation/login-validation';
import { useMutation } from '@tanstack/react-query';
import { loginCustomer } from '@/api/client-auth';
import { useAuth } from '@/hooks/use-auth';
import styles from './login-page.module.scss';
import { useToast } from '@/context/toast-provider';
import { SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router/routes';
import { FormWrapper } from '@/components/form-wrapper/form-wrapper';

const defaultValues: LoginFormInputs = {
  email: '',
  password: '',
};

export function LoginPage() {
  const { onLogin } = useAuth();
  const { showToast } = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema), mode: 'onChange', defaultValues });
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormInputs) => loginCustomer(data.email, data.password),
    onSuccess: (data) => {
      onLogin(data);
      showToast({ message: SUCCESS_MESSAGES.LOGIN });
    },
    onError: (error) => showToast({ message: error.message, severity: 'error' }),
  });

  const onSubmit = handleSubmit((data: LoginFormInputs) => mutate(data));

  return (
    <FormWrapper>
      <Typography variant="h2">Login</Typography>
      <LoginForm onSubmit={onSubmit} control={control} errors={errors} isSubmitting={isPending} isValidForm={isValid} />
      <Typography className={styles.signup}>
        Don’t have an account? <span onClick={() => navigate(`/${ROUTES.REGISTRATION.path}`)}>Sign Up</span>
      </Typography>
    </FormWrapper>
  );
}
