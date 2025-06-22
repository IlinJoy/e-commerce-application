import { loginCustomer } from './client-auth';
import { fetchFromApi, getCustomerToken } from '@/api/platform-api';
import { getRequestToken } from '@/utils/request-token-handler';

vi.mock('@/api/platform-api', () => ({
  fetchFromApi: vi.fn(),
  getCustomerToken: vi.fn(),
}));

vi.mock('@/utils/request-token-handler', () => ({
  getRequestToken: vi.fn(),
}));

vi.mock('@/utils/map-api-error-to-message', () => ({
  mapApiErrorToMessage: vi.fn(),
}));

describe('fetchLoggedInCustomer', () => {
  const mockEmail = 'test@gmail.com';
  const mockPassword = 'Test123!';
  const mockToken = 'token';
  const mockCustomer = { id: '123' };
  const mockCustomerToken = 'customer token';

  const mockedGetRequestToken = vi.mocked(getRequestToken);
  const mockedFetchFromApi = vi.mocked(fetchFromApi);
  const mockedGetCustomerToken = vi.mocked(getCustomerToken);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should log in customer', async () => {
    mockedGetRequestToken.mockResolvedValue(mockToken);
    mockedFetchFromApi.mockResolvedValue(mockCustomer);
    mockedGetCustomerToken.mockResolvedValue(mockCustomerToken);

    const result = await loginCustomer(mockEmail, mockPassword);

    expect(mockedGetRequestToken).toHaveBeenCalled();
    expect(mockedFetchFromApi).toHaveBeenCalledWith('/me/login', mockToken, {
      method: 'POST',
      body: JSON.stringify({ email: mockEmail, password: mockPassword }),
    });
    expect(mockedGetCustomerToken).toHaveBeenCalledWith(mockEmail, mockPassword);
    expect(result).toEqual({ customer: mockCustomer, customerToken: mockCustomerToken });
  });
});
