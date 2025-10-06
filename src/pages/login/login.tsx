import { FC, FormEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';
import useForm from '../../hooks/useForm';

export const Login: FC = () => {
  const { values, createSetter } = useForm({ email: '', password: '' });

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.user);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={values.email}
      setEmail={createSetter('email')}
      password={values.password}
      setPassword={createSetter('password')}
      handleSubmit={handleSubmit}
    />
  );
};
