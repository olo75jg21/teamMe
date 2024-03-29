import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from '../../../plugins/axios';
import { RegisterFormValues } from '../../../types/types';
import { AxiosError } from 'axios';
import { useState } from 'react';
import CirclesLoader from '../../utils/CirclesLoader';
import ResponseError from '../../utils/ResponseError';

const registrationSchema = yup.object({
  username: yup.string().min(5, 'At least 5 characters long').max(14, 'Max length is 14').required('Username is required'),
  email: yup.string().email('Provide a valid email').required('Email is required'),
  password: yup.string().min(8, 'At least 8 characters long').max(64, 'Max length is 64'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords aren\'t the same'),
  age: yup.number().min(16, 'You need to be at least 16').max(120, 'I dont think so').required('Age is required'),
  gender: yup.string()
});

const RegisterForm = (): JSX.Element => {
  const [responseError, setResponseError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: yupResolver(registrationSchema)
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (formData: RegisterFormValues) => {
    try {
      setIsLoading(true);
      const { status } = await axios.post('/auth/register', formData)

      if (status === 201) {
        setResponseError('');
        navigate('/login')
      }

      setIsLoading(false);
    } catch (e) {
      const axiosError = e as AxiosError;
      if (axiosError.response?.status === 409) {
        setResponseError('Email or username is taken');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gray-800 flex h-screen'>
      <div className='m-auto'>
        <div className='w-80 max-w-xs'>
          {isLoading ? <CirclesLoader /> :
            <form className='bg-gray-700 shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>

              <ResponseError message={responseError} />

              <div className='mb-4 h-20'>
                <label
                  className="block text-sm text-gray-100 font-bold mb-2"
                >
                  Username
                </label>
                <input
                  className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue="userTest1"
                  {...register("username")}
                />
                {errors.username?.message && <span className='text-red-600'>{errors.username?.message}</span>}
              </div>

              <div className='mb-4 h-20'>
                <label
                  className="block text-sm text-gray-100 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue="userTest1@op.pl"
                  {...register("email")}
                />
                {errors.email?.message && <span className='text-red-600'>{errors.email?.message}</span>}
              </div>

              <div className='mb-4 h-20'>
                <label
                  className="block text-sm text-gray-100 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  type='password'
                  defaultValue='123123123'
                  {...register("password")}
                />
                {errors.password?.message && <span className='text-red-600'>{errors.password?.message}</span>}
              </div>

              <div className='mb-5 h-20'>
                <label
                  className="block text-sm text-gray-100 font-bold mb-2"
                >
                  Repeat password
                </label>
                <input
                  className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  type='password'
                  defaultValue='123123123'
                  {...register("repeatPassword")}
                />
                {errors.repeatPassword?.message && <span className='text-red-600'>{errors.repeatPassword?.message}</span>}
              </div>

              <div className='flex justify-between'>
                <div className='mb-5 h-20 mr-5 w-2/5'>
                  <label
                    className="block text-sm text-gray-100 font-bold mb-2"
                  >
                    Gender
                  </label>
                  <select
                    {...register('gender')}
                    className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender?.message && <span className='text-red-600'>{errors.gender?.message}</span>}
                </div>

                <div className='w-2/5'>
                  <label
                    className="block text-sm text-gray-100 font-bold mb-2"
                  >
                    Age
                  </label>
                  <input
                    className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    type='number'
                    defaultValue={16}
                    {...register("age")}
                  />
                  {errors.age?.message && <span className='text-red-600'>{errors.age?.message}</span>}
                </div>

              </div>

              <input
                type="submit"
                value='Sign In'
                className='bg-violet-600 cursor-pointer hover:bg-violet-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button'
              />

              <div className='flex mt-5 text-gray-100'>
                <p>Have an account?&nbsp;</p>
                <NavLink
                  to='/login'
                  className="font-bold duration-200 text-stone-400 hover:text-stone-700"
                >
                  Login
                </NavLink>
              </div>

              <div className='flex mt-2 text-gray-100'>
                <p>Go back to home page&nbsp;</p>
                <NavLink
                  to='/'
                  className="font-bold duration-200 text-stone-400 hover:text-stone-700"
                >
                  Home
                </NavLink>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;