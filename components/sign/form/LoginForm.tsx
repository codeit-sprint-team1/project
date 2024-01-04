import { Controller, useForm } from 'react-hook-form';
import {
  BUTTON_TEXT,
  ERROR_MESSAGE,
  PLACEHOLDER,
  VALID_EMAIL_REG,
  VALID_PASSWORD_REG,
} from '../constants';
import { useEffect } from 'react';
import { Button, PasswordInput, Input } from '@/components';
import { useLogin } from '../data';
import { useUserInfo, useStoreAccessToken } from '@/store/memos';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const { setUserInfo } = useUserInfo();
  const { setAccessToken } = useStoreAccessToken();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isValid },
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });
  const {
    execute: login,
    data,
    error,
  } = useLogin({
    email: watch('email'),
    password: watch('password'),
  });

  const router = useRouter();

  //로그인상태면 내 대시보드로 이동
  const isLogin = localStorage.getItem('accessToken');
  useEffect(() => {
    if (isLogin) {
      router.replace('/mydashboard');
    }
  }, []);

  useEffect(() => {
    if (data?.user) {
      setUserInfo(data?.user);
      setAccessToken(data?.accessToken);
      localStorage.setItem('accessToken', data?.accessToken);
      router.push('/mydashboard');
    }
  }, [data?.user, setUserInfo]);

  useEffect(() => {
    if (error) {
      setError('email', { type: 'invalid', message: ERROR_MESSAGE.emailCheck });
      setError('password', {
        type: 'invalid',
        message: ERROR_MESSAGE.passwordCheck,
      });
    }
  }, [error, setError]);

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="flex flex-col w-520pxr gap-16pxr mobile:mx-12pxr mobile:w-350pxr "
    >
      <div>
        <Controller
          control={control}
          name="email"
          rules={{
            required: ERROR_MESSAGE.emailRequired,
            pattern: {
              value: VALID_EMAIL_REG,
              message: ERROR_MESSAGE.emailInvalid,
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder={PLACEHOLDER.email}
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              value={field.value}
              label="이메일"
              size="sm"
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="password"
          rules={{
            required: ERROR_MESSAGE.passwordRequired,
            pattern: {
              value: VALID_PASSWORD_REG,
              message: ERROR_MESSAGE.passwordInvalid,
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              hasEyeIcon
              label="비밀번호"
              size="sm"
              value={field.value}
              placeholder={PLACEHOLDER.password}
              hasError={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={!isValid}
        size="sign"
        variant={isValid ? 'primary' : 'inactive'}
      >
        {BUTTON_TEXT.login}
      </Button>
    </form>
  );
}
