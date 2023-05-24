import { useState, useEffect } from "react";
// import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { BsTrash } from "react-icons/bs";

// import Select from "react-tailwindcss-select";
import axios from "../../plugins/axios";
import useGetLoggedUserData from "../../hooks/useGetLoggedUserData";
import { IUser } from "../../types/user";
import { IGame } from "../../types/game";
import AddGameModal from "./AddGameModal";
import { renderProperGameName } from "../../utils/renderProperGameName";
import { gamesRanks } from "../team/addTeam/data";

interface IUserProfileData extends IUser {}

const schema = yup.object().shape({
  age: yup
    .number()
    .positive("Age must be a positive number")
    .integer("Age must be a whole number"),
  email: yup.string().email("Email must be a valid email address"),
  gender: yup
    .string()
    .oneOf(
      ["male", "female", "other"],
      "Gender must be male, female, or other"
    ),
  username: yup.string(),
});

export const ProfileData = (): JSX.Element => {
  const [user, setUser] = useState<IUserProfileData>();

  const { userData } = useGetLoggedUserData();

  const userId = userData.user._id;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/users/profile/${userId}`);
      setUser(data);
    })();
  }, [userId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

  const onSubmit: SubmitHandler<IUserProfileData> = async (formData) => {
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
  };

  const isAddGameButtonDisabled = () => {
    return user?.games.length === 3;
  };

  const renderGames = () => {
    return user?.games.map((game: IGame, index) => {
      return (
        <li key={index} className="text-md py-2 font-bold text-gray-100">
          <div className="flex justify-between">
            {renderProperGameName(game.name) + " | " + game.rank}
            <button onClick={() => handleDelete(index)}>
              <BsTrash className="text-lg duration-500  hover:text-xl" />
            </button>
          </div>
        </li>
      );
    });
  };

  const renderNoGames = () => {
    return (
      <div className="mb-4">
        <p className="text-xl font-semibold text-gray-200">
          There are no games added...
        </p>
      </div>
    );
  };

  return user ? (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-full rounded-t border border-gray-700 bg-gray-900 text-center">
        <p className="px-4 py-2 text-xl font-bold text-gray-100">
          User Profile
        </p>
      </div>

      <form className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-100">
            Username
          </label>
          <input
            className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
            type="text"
            defaultValue={user.username}
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-100">
            Description
          </label>
          <input
            className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
            type="text"
            defaultValue={user.description}
            {...register("description")}
          />
          {errors.username && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-100">
            Email
          </label>
          <input
            className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
            type="email"
            disabled
            defaultValue={user.email}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex justify-between">
          <div className="mb-4 w-1/3">
            <label
              className="mb-2 block text-sm font-bold text-gray-100"
              htmlFor="username"
            >
              Age
            </label>
            <input
              className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
              type="number"
              defaultValue={user.age}
              {...register("age")}
            />
            {errors.age && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4 w-1/2">
            <label
              className="mb-2 block text-sm font-bold text-gray-100"
              htmlFor="username"
            >
              Gender
            </label>
            <select
              className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
              defaultValue={user.gender}
              {...register("gender")}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <label
          className="mb-2 block text-sm font-bold text-gray-100"
          htmlFor="username"
        >
          Games:
        </label>

        <ul>{user.games.length !== 0 ? renderGames() : renderNoGames()}</ul>

        <AddGameModal
          handleAddEmptyGame={handleAddEmptyGame}
          isAddGameButtonDisabled={isAddGameButtonDisabled()}
          userGames={user.games}
        />

        <div className="mt-4 flex items-center justify-center">
          <button
            className="focus:shadow-outline w-full rounded bg-violet-600 px-4 py-2 font-bold text-white hover:bg-violet-800 focus:outline-none"
            type="submit"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  ) : (
    <></>
  );
};
