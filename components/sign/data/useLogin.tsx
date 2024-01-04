import { useAsync } from '@/hooks/useAsync';
import { axiosInstance } from '@/utils';
import { useCallback, useEffect } from 'react';

interface UseLoginParams {
  email: string;
  password: string;
}

function useLogin({ email, password }: UseLoginParams) {
  const Login = useCallback(
    () =>
      axiosInstance.post('auth/login', {
        email,
        password,
      }),
    [email, password]
  );
  const { execute, loading, error, data } = useAsync(Login, true);

  return {
    execute,
    loading,
    error,
    data,
  };
}

export default useLogin;
