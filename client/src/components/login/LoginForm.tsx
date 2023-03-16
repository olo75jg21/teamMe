import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useCookies } from 'react-cookie';
import axios from '../../plugins/axios'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup.string().email('Provide a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

const LoginForm = (): JSX.Element => {
  const [, setCookies] = useCookies(['credentials']);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    try {
      const { data, status } = await axios.post('/users/login', formData);

      if (status === 200) {
        setCookies('credentials', data, {
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 15
        });

        navigate('/');
      }
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div className='w-80'>
      <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 h-20'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
          <input
            defaultValue={'uwuuwu@uwu.com'}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            {...register("email")}
          />
          {errors.email?.message && <span className='text-red-600'>{errors.email?.message}</span>}
        </div>

        <div className='mb-5 h-20'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='password'
            defaultValue={123123123}
            {...register("password")}
          />
          {errors.password?.message && <span className='text-red-600'>{errors.password?.message}</span>}
        </div>

        <input type="submit" value='Login' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button' />

        <div className='mt-4'>
          <span className=''>
            Dont have account?&nbsp;
          </span>

          <NavLink
            to='/register'
            className="font-bold duration-200 text-stone-400 hover:text-stone-700"
          >
            Create
          </NavLink>

        </div>
      </form>
    </div>
  );
};

export default LoginForm;