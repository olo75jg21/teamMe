import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setCredentials } from '../redux/features/authSlice';

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = data => {
    axios.post('/users/login', data)
      .then(res => {
        dispatch(setCredentials({
          user: res.data.user,
          token: res.data.token
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='w-full max-w-xs'>
      <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            {...register("email", {
              required: true,
            })}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='password'
            {...register("password", {
              required: true,
            })}
          />
        </div>

        <input type="submit" value='Login' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button' />
      </form>
      <NavLink to="/">to</NavLink>
    </div>
  );
};

export default LoginForm;