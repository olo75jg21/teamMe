import { useState, useEffect } from 'react';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import axios from '../../plugins/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";


interface IUserProfileData {
  _id: string;
  age: number;
  email: string;
  gender: string;
  language: string[];
  username: string;
  games: string[];
  createdAt: string;
}

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
  const token = userData.accessToken;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/user/getProfileData', {
        params: {
          id: userId
        }
      });
      setUser(data);
    })();
  }, [userId, token]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<IUserProfileData> = async formData => {
    console.log('XD');
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">User Profile</h1>
      <form className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Age"
            {...register("age", { required: true })}
          />
          {errors.age && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("gender", { required: true })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="games">
            Games
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Games"
            {...register("games")}
          />
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
    </div>
  );
};