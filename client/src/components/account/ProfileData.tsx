import { useState, useEffect } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

// import Select from "react-tailwindcss-select";
import axios from '../../plugins/axios';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import { IUser } from '../../types/user';
import { IGame } from '../../types/game';
import AddGameModal from './AddGameModal';
import { renderProperGameName } from '../../utils/renderProperGameName';

interface IUserProfileData extends IUser { }

const schema = yup.object().shape({
  age: yup
    .number()
    .positive("Age must be a positive number")
    .integer("Age must be a whole number"),
  email: yup.string().email("Email must be a valid email address"),
  gender: yup.string().oneOf(["male", "female", "other"], "Gender must be male, female, or other"),
  username: yup.string(),
});

export const ProfileData = (): JSX.Element => {
  const [user, setUser] = useState<IUserProfileData>();

  const { userData } = useGetLoggedUserData()

  const userId = userData.user._id;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/users/profile/${userId}`);
      setUser(data);
    })();
  }, [userId]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: user,
  });

  const handleAddEmptyGame = (game: string, rank: string) => {
    if (!user) return;

    const newGame = { name: game, rank };
    const newUser = { ...user, games: [...user.games, newGame] };
    setUser(newUser);
  };

  const handleDelete = (index: number) => {
    if (!user) return;

    const updatedGames = [...user?.games];
    updatedGames.splice(index, 1);

    const newUser = { ...user, games: updatedGames };

    setUser(newUser);
  };

  const onSubmit: SubmitHandler<IUserProfileData> = async formData => {
    if (!user) return;
    try {
      const updatedUser = { ...user, ...formData, games: [...user.games] };
      const { status } = await axios.put(`/users/${user._id}`, updatedUser);

      if (status === 200) {
        // @TODO do smth
      }
    } catch (e) {
      console.error(e);
    }
  }

  const renderGames = () => {
    return user?.games.map((game: IGame, index) => {
      return (
        <li
          key={index}
          className="text-md text-gray-100 font-bold px-4 py-2"
        >
          <div className='flex justify-between'>
            {renderProperGameName(game.name) + ' | ' + game.rank}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        </li>
      );
    });
  };

  const renderNoGames = () => {
    return (
      <div className='mb-4'>
        <p className="text-gray-200 font-semibold text-xl">There are no games added...</p>
      </div>
    );
  };

  return user ? (
    <div className="flex flex-col items-center">
      <div className='my-4 bg-violet-600 rounded'>
        <p className="text-xl text-gray-100 font-bold px-4 py-2">User Profile</p>
      </div>

      <form className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm text-gray-100 font-bold mb-2">
            Username
          </label>
          <input
            className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            defaultValue={user.username}
            {...register("username")}
          />
          {errors.username && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-100 font-bold mb-2">
            Description
          </label>
          <input
            className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            defaultValue={user.description}
            {...register("description")}
          />
          {errors.username && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-100 font-bold mb-2">
            Email
          </label>
          <input
            className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            disabled
            defaultValue={user.email}
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
              defaultValue={user.age}
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
              defaultValue={user.gender}
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

        <label className="block text-sm text-gray-100 font-bold mb-2" htmlFor="username">
          Games:
        </label>

        {user.games.length !== 0 ? renderGames() : renderNoGames()}

        <AddGameModal handleAddEmptyGame={handleAddEmptyGame} />

        <div className="flex items-center justify-center">
          <button
            className="bg-violet-600 hover:bg-violet-800 w-48 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  ) : <></>;
};