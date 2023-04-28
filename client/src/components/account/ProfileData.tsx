import { useState, useEffect } from 'react';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import axios from '../../plugins/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { IUser } from '../../types/user';
import GamesList from './GamesList';

interface IUserProfileData extends IUser { }

const schema = yup.object().shape({
  age: yup
    .number()
    .positive("Age must be a positive number")
    .integer("Age must be a whole number")
    .required("Age is required"),
  email: yup.string().email("Email must be a valid email address").required("Email is required"),
  gender: yup.string().oneOf(["male", "female", "other"], "Gender must be male, female, or other").required("Gender is required"),
  username: yup.string().required("Username is required"),
});

export const ProfileData = (): JSX.Element => {
  const [user, setUser] = useState<IUserProfileData>();

  const { userData } = useGetLoggedUserData()

  const userId = userData.user._id;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/user/getProfileData', {
        params: {
          id: userId
        }
      });
      setUser(data);
    })();
  }, [userId]);


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<IUserProfileData> = async formData => {
    console.log('XD');
  }

  return (
    <div className="flex flex-col items-center">
      <div className='my-4 bg-violet-500 rounded'>
        <p className="text-xl text-gray-100 font-bold px-4 py-2">User Profile</p>
      </div>

      <form className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm text-gray-100 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            defaultValue={user?.username}
            {...register("username")}
          />
          {errors.username && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-100 font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            defaultValue={user?.email}
            {...register("email")}
          />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>

        <div className='flex justify-between'>
          <div className="mb-4 w-1/3">
            <label className="block text-sm text-gray-100 font-bold mb-2" htmlFor="username">
              Age
            </label>
            <input
              className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              defaultValue={user?.age}
              {...register("age")}
            />
            {errors.age && <span className="text-red-500">This field is required</span>}
          </div>

          <div className="mb-4 w-1/2">
            <label className="block text-sm text-gray-100 font-bold mb-2" htmlFor="username">
              Gender
            </label>
            <select
              className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              // className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("gender")}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="text-red-500">This field is required</span>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="language">
            Language
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Language"
            {...register("language")}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>

      <GamesList />
    </div>
  );
};