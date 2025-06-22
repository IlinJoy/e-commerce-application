import { RegisterForm } from '@/components/registration-form/registration-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@/validation/registration-validation';
import type { Addresses, RegisterFormInputs } from '@/validation/registration-validation';
import styles from './registration-page.module.scss';
import { getCustomerToken } from '@/api/platformApi';
import { registerCustomer } from '@/api/clientAuth';
import { useAuth } from '@/hooks/use-auth';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { useToast } from '@/context/toast-provider';
import { useMutation } from '@tanstack/react-query';
import { useToken } from '@/context/token-context';
import { ROUTES } from '@/router/routes';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useCart } from '@/context/cart-context';
import { FormWrapper } from '@/components/form-wrapper/form-wrapper';

const defaultAddress: Addresses = {
  country: '',
  streetName: '',
  postalCode: '',
  city: '',
};

const defaultValues: RegisterFormInputs = {
  customerData: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  },
  shippingAddress: defaultAddress,
  billingAddress: defaultAddress,
  sameAddress: false,
};

export function RegistrationPage() {
  const {
    handleSubmit,
    formState: { isValid },
    control,
    setValue,
    resetField,
    trigger,
    clearErrors,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });
  const { onLogout } = useAuth();
  const { showToast } = useToast();
  const { updateToken } = useToken();
  const { setCart } = useCart();
  const navigate = useNavigate();

  const handleRegistration = async (data: RegisterFormInputs) => {
    const customerInfo = await registerCustomer(data);
    if (!customerInfo?.customer.id || !customerInfo.cart) {
      throw new Error(ERROR_MESSAGES.REGISTRATION_FAIL);
    }
    return { customer: customerInfo.customer, password: data.customerData.password, cart: customerInfo.cart };
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleRegistration,
    onSuccess: async (data) => {
      setCart(data.cart);
      await mutateToken({ email: data.customer.email, password: data.password });
      showToast({ message: SUCCESS_MESSAGES.REGISTRATION });
    },
    onError: (error) => showToast({ message: error.message, isError: true }),
  });

  const { mutateAsync: mutateToken } = useMutation({
    mutationFn: (data: { email: string; password: string }) => getCustomerToken(data.email, data.password),
    onSuccess: (token) => updateToken(token),
    onError: () => {
      showToast({ message: ERROR_MESSAGES.UPDATE_INFO, isError: true });
      onLogout();
    },
    retry: 5,
    retryDelay: (attempt) => {
      const retryRequestDelay = 2000;
      return retryRequestDelay * (attempt + 1);
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormInputs) => {
    mutate(data);
  });

  return (
    <FormWrapper>
      <RegisterForm
        onSubmit={onSubmit}
        isSubmitting={isPending}
        isValidForm={isValid}
        setValue={setValue}
        control={control}
        resetField={resetField}
        trigger={trigger}
        clearErrors={clearErrors}
      />
      <Typography className={styles.signin}>
        Already have an account? <span onClick={() => navigate(`/${ROUTES.LOGIN.path}`)}>Sign In</span>
      </Typography>
    </FormWrapper>
  );
}
