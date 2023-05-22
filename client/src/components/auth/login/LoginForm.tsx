import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// import axios from '../../plugins/axios'
import axios, { AxiosError } from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CirclesLoader from '../../utils/CirclesLoader';
import ResponseError from '../../utils/ResponseError';

interface FormValues {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup.string().email('Provide a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

const LoginForm = (): JSX.Element => {
  const [responseError, setResponseError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    try {
      setIsLoading(true);

      const { data, status } = await axios.post('http://localhost:5000/auth/login', formData);

      if (status === 200) {
        localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('accessToken', JSON.stringify(data.token));

        navigate('/');
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      if (axiosError.response?.status === 401) {
        setResponseError('Wrong credentials');
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='bg-gray-800 flex h-screen'>
        <div className='m-auto'>
          <div className='w-80'>
            {isLoading ? <CirclesLoader /> :
              <form className='bg-gray-700 shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>

                <ResponseError message={responseError} />

                <div className='mb-4 h-20'>
                  <label
                    className="block text-sm text-gray-100 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    defaultValue={'userTest1@op.pl'}
                    className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("email")}
                  />
                  {errors.email?.message && <span className='text-red-600'>{errors.email?.message}</span>}
                </div>

                <div className='mb-5 h-20'>
                  <label
                    className="block text-sm text-gray-100 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    type='password'
                    defaultValue={123123123}
                    {...register("password")}
                  />
                  {errors.password?.message && <span className='text-red-600'>{errors.password?.message}</span>}
                </div>

                <input
                  type="submit"
                  value='Login'
                  className='bg-violet-600 cursor-pointer hover:bg-violet-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button'
                />

                <div className='mt-4'>
                  <span className='text-gray-100'>
                    Don't have account?&nbsp;
                  </span>

                  <NavLink
                    to='/register'
                    className="font-bold duration-200 text-stone-400 hover:text-stone-700"
                  >
                    Create

                  </NavLink>

                  <div className='flex mt-2 text-gray-100'>
                    <p>Go back to home page&nbsp;</p>
                    <NavLink
                      to='/'
                      className="font-bold duration-200 text-stone-400 hover:text-stone-700"
                    >
                      Home
                    </NavLink>
                  </div>

                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;