import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// import axios from '../../plugins/axios'
import axios from 'axios';
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
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    try {
      const { data, status } = await axios.post('http://localhost:5000/auth/login', formData);

      if (status === 200) {
        // setCookies('refreshToken', data.refreshToken, {
        //   secure: true,
        //   sameSite: 'lax',
        //   maxAge: 2 * 60 //TODO add expire time in response 60 * 120
        // });

        localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('accessToken', JSON.stringify(data.token));

        navigate('/');
      }
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div>
      <div className='bg-slate-200 flex h-screen'>
        <div className='m-auto'>
          <div className='w-80'>
            <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4 h-20'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                <input
                  defaultValue={'userTest1@op.pl'}
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
                  Don't have account?&nbsp;
                </span>

                <NavLink
                  to='/register'
                  className="font-bold duration-200 text-stone-400 hover:text-stone-700"
                >
                  Create

                </NavLink>

                <div className='flex mt-2'>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;