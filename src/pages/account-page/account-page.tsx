import styles from './account-page.module.scss';
import { NavLink, Outlet } from 'react-router';
import { ACCOUNT_LINKS } from '@/utils/constants/ui';
import { useToken } from '@/context/token-context';
import { useUser } from '@/context/user-context';
import { useToast } from '@/context/toast-provider';

export function AccountPage() {
  const { token } = useToken();
  const { updateProfile } = useUser();
  const { showToast } = useToast();

  // const {
  //   handleSubmit,
  //   control,
  //   formState: { isValid, isDirty },
  //   clearErrors,
  //   reset,
  // } = useForm<ProfileFormInputs>({
  //   defaultValues: {
  //     customerData: {
  //       email: '',
  //       firstName: '',
  //       lastName: '',
  //       dateOfBirth: '',
  //     },
  //     shippingAddresses: [],
  //     billingAddresses: [],
  //   },
  //   resolver: zodResolver(profileSchema),
  //   mode: 'onChange',
  // });

  // useEffect(() => {
  //   const fetchCustomer = async () => {
  //     try {
  //       const data = await fetchFromApi<Customer>('/me', token);
  //       const shippingAddresses = data.addresses.filter(
  //         (addr) => addr.id && data.shippingAddressIds?.includes(addr.id)
  //       );
  //       const billingAddresses = data.addresses.filter((addr) => addr.id && data.billingAddressIds?.includes(addr.id));

  //       const shippingDefaultAddress = data.addresses.find((addr) => addr.id === data.defaultShippingAddressId);
  //       const billingDefaultAddress = data.addresses.find((addr) => addr.id === data.defaultBillingAddressId);

  //       const formattedShippingAddresses = shippingAddresses.map((addr) => ({
  //         streetName: addr?.streetName || '',
  //         city: addr?.city || '',
  //         state: '-',
  //         country: addr?.country as 'US' | 'CN' | '',
  //         postalCode: addr?.postalCode || '',
  //         isDefault: addr.id === shippingDefaultAddress,
  //       }));

  //       const formattedBillingAddresses = billingAddresses.map((addr) => ({
  //         streetName: addr?.streetName || '',
  //         city: addr?.city || '',
  //         state: '-',
  //         country: addr?.country as 'US' | 'CN' | '',
  //         postalCode: addr?.postalCode || '',
  //         isDefault: addr.id === billingDefaultAddress,
  //       }));

  //       reset({
  //         customerData: {
  //           email: data.email,
  //           firstName: data.firstName,
  //           lastName: data.lastName,
  //           dateOfBirth: data.dateOfBirth,
  //         },
  //         shippingAddresses: formattedShippingAddresses,
  //         billingAddresses: formattedBillingAddresses,
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCustomer();
  // }, [reset, token]);

  // const handleProfileUpdate = async (data: ProfileFormInputs) => {
  //   const freshCustomer = await fetchFromApi<Customer>('/me', token);

  //   const actions: CustomerUpdateAction[] = [
  //     { action: 'setFirstName', firstName: data.customerData.firstName },
  //     { action: 'setLastName', lastName: data.customerData.lastName },
  //     { action: 'setDateOfBirth', dateOfBirth: data.customerData.dateOfBirth },
  //   ];

  //   const updatedCustomer = await fetchFromApi<Customer>('/me', token, {
  //     method: 'POST',
  //     body: JSON.stringify({ version: freshCustomer.version, actions }),
  //   });

  //   return updatedCustomer;
  // };

  // const { mutate, isPending } = useMutation({
  //   mutationFn: handleProfileUpdate,
  //   onSuccess: (updatedCustomer) => {
  //     updateProfile(updatedCustomer);
  //     showToast({ message: 'The profile updated' });
  //     clearErrors();
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //     showToast({ message: 'Updating error', isError: true });
  //   },
  // });

  // const onSubmit = handleSubmit((data: ProfileFormInputs) => {
  //   mutate(data);
  // });

  return (
    <>
      {ACCOUNT_LINKS.map((element) => (
        <NavLink key={element} to={element === 'Profile' ? '' : element.toLowerCase()}>
          {element}
        </NavLink>
      ))}
      <div className={styles.formWrapper}>
        <Outlet />
        <div className={styles.profileBg}></div>
      </div>
    </>
  );
}
