import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/context/token-context';
import { fetchFromApi } from '@/api/platform-api';
import type { Customer } from '@commercetools/platform-sdk';

export const useCustomerQuery = () => {
  const { token } = useToken();

  return useQuery({
    queryKey: ['customer', token],
    queryFn: async () => fetchFromApi<Customer>('/me', token),
    enabled: !!token,
  });
};
