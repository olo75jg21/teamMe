import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from '../../plugins/axios';
import { RegisterFormValues } from '../../types/types';

const registrationSchema = yup.object({
  username: yup.string().min(6, 'At least 6 characters long').max(14, 'Max length is 14').required('Username is required'),
  email: yup.string().email('Provide a valid email').required('Email is required'),
  password: yup.string().min(8, 'At least 8 characters long').max(64, 'Max length is 64'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords aren\'t the same'),
  age: yup.number().min(16, 'You need to be at least 16').max(120, 'I dont think so').required('Age is required'),
  gender: yup.string()
});

const RegisterForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: yupResolver(registrationSchema)
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (formData: RegisterFormValues) => {
    try {
      const { status } = await axios.post('/auth/register', formData)

      if (status === 201) {
        navigate('/login')
      }
    } catch (e) {
      console.error(e)
    }
  };

  return (

    <div className='bg-slate-200 flex h-screen'>
      <div className='m-auto'>
        <div className='w-80 max-w-xs'>
          <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register("username")}
              />
              {errors.username?.message && <span className='text-red-600'>{errors.username?.message}</span>}
            </div>

            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register("email")}
              />
              {errors.email?.message && <span className='text-red-600'>{errors.email?.message}</span>}
            </div>

            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='password'
                {...register("password")}
              />
              {errors.password?.message && <span className='text-red-600'>{errors.password?.message}</span>}
            </div>

            <div className='mb-5 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Repeat password</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='password'
                {...register("repeatPassword")}
              />
              {errors.repeatPassword?.message && <span className='text-red-600'>{errors.repeatPassword?.message}</span>}
            </div>

            <div className='flex justify-between'>
              <div className='mb-5 h-20 mr-5'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Gender</label>
                <select {...register('gender')} className="bg-gray-50 w-28 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                {errors.gender?.message && <span className='text-red-600'>{errors.gender?.message}</span>}
              </div>

              <div className='mb-5 h-20'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Age</label>
                <input
                  className='shadow appearance-none border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='number'
                  defaultValue={0}
                  {...register("age")}
                />
                {errors.age?.message && <span className='text-red-600'>{errors.age?.message}</span>}
              </div>

            </div>

            <input type="submit" value='Sign In' className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button' />

            <div className='flex mt-5'>
              <p>Have an account?&nbsp;</p>
              <NavLink
                to='/login'
                className="font-bold duration-200 text-stone-400 hover:text-stone-700"
              >
                Login
              </NavLink>
            </div>

            <div className='flex mt-2'>
              <p>Go back to home page&nbsp;</p>
              <NavLink
                to='/'
                className="font-bold duration-200 text-stone-400 hover:text-stone-700"
              >
                Home
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;