import { RegisterForm } from '@/components/registration-form/registration-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@/validation/registration-validation';
import type { RegisterFormInputs } from '@/validation/registration-validation';
import styles from './registration-page.module.scss';
import { getAnonymousToken, getCustomerToken } from '@/api/platformApi';
import { mapRegistrationFormData } from '@/utils/map-form-data';
import { registerCustomer } from '@/api/clientAuth';
import { useAuth } from '@/hooks/use-auth';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { useToast } from '@/context/toast-provider';
import { useMutation } from '@tanstack/react-query';
import { useToken } from '@/context/token-context';

const defaultValues: RegisterFormInputs = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  shippingStreet: '',
  shippingCity: '',
  shippingCountry: '',
  shippingPostalCode: '',
  billingCountry: '',
  billingCity: '',
  billingStreet: '',
  billingPostalCode: '',
  shippingDefaultAddress: false,
  billingDefaultAddress: false,
};

export function RegistrationPage() {
  const {
    handleSubmit,
    formState: { isValid },
    control,
    setValue,
    resetField,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });
  const { onRegistration, onLogout } = useAuth();
  const { showToast } = useToast();
  const { updateToken } = useToken();

  const handleRegistration = async (data: RegisterFormInputs) => {
    const token = await getAnonymousToken(data.email);
    const customerInfo = await registerCustomer(token, mapRegistrationFormData(data));
    if (!customerInfo?.customer.id) {
      throw new Error(ERROR_MESSAGES.REGISTRATION_FAIL);
    }
    return { customer: customerInfo.customer, password: data.password };
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleRegistration,
    onSuccess: (data) => {
      onRegistration(data.customer);
      showToast({ message: SUCCESS_MESSAGES.REGISTRATION });
    },
    onError: (error) => showToast({ message: error.message, isError: true }),
  });

  const { mutate: mutateToken } = useMutation({
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
    mutateToken(data);
  });

  return (
    <>
      <div className={styles.formWrapper}>
        <RegisterForm
          onSubmit={onSubmit}
          isSubmitting={isPending}
          isValidForm={isValid}
          setValue={setValue}
          control={control}
          resetField={resetField}
        />
      </div>
      <div className={styles.registrationBg}></div>
    </>
  );
}
