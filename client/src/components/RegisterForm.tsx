import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

const registrationSchema = yup.object({
  email: yup.string().email('Provide a valid email').required('Email is required'),
  password: yup.string().min(8, 'At least 8 characters long').max(64, 'Max length is 64'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords aren\'t the same')
});

const RegisterForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(registrationSchema)
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = data => {
    axios.post('/users/register', data)
      .then(res => {
        console.log(res.data);
      })
      .then(res => {
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='w-80 max-w-xs'>
      <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </div>
  );
};

export default RegisterForm;