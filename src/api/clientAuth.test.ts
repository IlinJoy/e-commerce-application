import { loginCustomer } from './clientAuth';
import { getCustomerToken, fetchFromApi } from '@/api/platformApi';

vi.mock('@/api/platformApi', () => ({
  getCustomerToken: vi.fn(),
  fetchFromApi: vi.fn(),
}));
vi.mock('@/utils/mapApiErrorToMessage', () => ({
  mapApiErrorToMessage: vi.fn(),
}));

describe('fetchLoggedInCustomer', () => {
  const mockEmail = 'test@gmail.com';
  const mockPassword = 'Test123!';
  const mockToken = 'token';
  const mockCustomer = { id: '123' };
  const mockedGetCustomerToken = vi.mocked(getCustomerToken);
  const mockedFetchFromApi = vi.mocked(fetchFromApi);

  it('should log in customer', async () => {
    mockedGetCustomerToken.mockResolvedValue(mockToken);
    mockedFetchFromApi.mockResolvedValue(mockCustomer);

    const result = await loginCustomer(mockEmail, mockPassword);
    expect(mockedGetCustomerToken).toHaveBeenCalledWith(mockEmail, mockPassword);
    expect(mockedFetchFromApi).toHaveBeenCalledWith('/me', mockToken);
    expect(result).toEqual({ customer: mockCustomer, customerToken: mockToken });
  });
});
