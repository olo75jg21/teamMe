import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';

type FormValues = {
  email: string;
  username: string;
  password: string;
};

const RegisterForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    axios.post('/users/register', data)
      .then(res => {
        console.log(res.data);
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
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' {...register("email")} />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="email" {...register("username")} />
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" {...register("password")} />
        </div>

        <input type="submit" value='Sign In' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button' />
      </form>
    </div>
  );
};

export default RegisterForm;