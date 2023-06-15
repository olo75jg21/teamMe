import axios from "../../../plugins/axios";
import * as yup from "yup";
import { gamesRanks } from "./data";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import CirclesLoader from "../../utils/CirclesLoader";
import ResponseError from "../../utils/ResponseError";
import { useNavigate } from "react-router";

interface FormData {
  name: string;
  title: string;
  description: string;
  game: string;
  minRank: string;
  maxRank: string;
  teamType: string;
  slots: number;
  minAge: number;
  maxAge: number;
}

interface AddTeamFormProps {
  userId: string;
}

const addOffferSchema = yup.object({
  name: yup.string().required("Title is required"),
  title: yup
    .string()
    .min(16, "At least 16 characters long")
    .max(64, "Max length is 64")
    .required("Title is required"),
  description: yup
    .string()
    .min(30, "At least 30 characters long")
    .max(256, "Max length is 256")
    .required("Description is required"),
  game: yup.string().required("Game is required"),
  minRank: yup.string().required("Rank is required"),
  maxRank: yup.string().required("Rank is required"),
  teamType: yup.string().required("Team type is required"),
});

const AddTeamForm = ({ userId }: AddTeamFormProps): JSX.Element => {
  const [responseError, setResponseError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedGame, setSelectedGame] = useState<string>("");
  const [selectedLowestRank, setSelectedLowestRank] = useState<string>("");
  const [selectedHighestRank, setSelectedHighestRank] = useState<string>("");
  const [teamType, setTeamType] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(addOffferSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      setIsLoading(true);
      setResponseError("");
      const { data, status } = await axios.post("/team", {
        _user: userId,
        ...formData,
      });

      if (status === 201) {
        // @TODO navigate to profile
        setIsLoading(false);
        // navigate("/account");
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      if (axiosError.response?.status === 500) {
        setResponseError("Something went wrong, try again...");
      }
      setIsLoading(false);
    }
  };

  const getRanksByGame = (game: string): string[] => {
    switch (game) {
      case "lol":
        return gamesRanks.lolRanks;
      case "valorant":
        return gamesRanks.valoRanks;
      case "csgo":
        return gamesRanks.csgoRanks;
      default:
        return [];
    }
  };

  const handleGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(e.target.value);
    setSelectedLowestRank("");
    setSelectedHighestRank("");
  };

  return (
    <div className="flex h-screen bg-gray-800">
      <div className="mx-auto mt-12">
        {isLoading ? (
          <CirclesLoader />
        ) : (
          <form
            className="mb-4 h-addOfferForm rounded-lg bg-gray-700 px-8 pt-6 shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ResponseError message={responseError} />

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="mb-5 h-20">
                  <label className="mb-2 block text-sm font-bold text-gray-100">
                    Name
                  </label>
                  <input
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    type="text"
                    defaultValue="Nazwa 123"
                    {...register("name")}
                  />

                  {errors.name?.message && (
                    <span className="text-red-600">{errors.name.message}</span>
                  )}
                </div>
                <div className="mb-5 h-20">
                  <label className="mb-2 block text-sm font-bold text-gray-100">
                    Title
                  </label>
                  <input
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    type="text"
                    defaultValue="Team title example"
                    {...register("title")}
                  />

                  {errors.title?.message && (
                    <span className="text-red-600">{errors.title.message}</span>
                  )}
                </div>

                <div className="mb-12 h-20">
                  <label className="mb-2 block text-sm font-bold text-gray-100">
                    Description
                  </label>

                  <textarea
                    className="text-md focus:shadow-outline h-48 w-full resize-none rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    defaultValue="Lorem Ibook. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in"
                    {...register("description")}
                  />

                  {errors.description?.message && (
                    <span className="text-red-600">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <input
                  type="submit"
                  value="Add team"
                  className='focus:shadow-outline" type="button mt-48 cursor-pointer rounded bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 focus:outline-none'
                />
              </div>

              <div>
                <div>
                  <div className="mb-5 h-20">
                    <label className="mb-2 block text-sm font-bold text-gray-100">
                      Game
                    </label>

                    <select
                      className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                      {...register("game")}
                      value={selectedGame}
                      onChange={handleGameChange}
                    >
                      <option value="">Select a game</option>
                      <option value="lol">League of Legends</option>
                      <option value="valorant">Valorant</option>
                      <option value="csgo">CS:GO</option>
                    </select>
                    {errors.game && (
                      <span className="text-red-600">
                        {errors.game.message}
                      </span>
                    )}
                  </div>

                  {selectedGame && (
                    <div>
                      <div className="mb-5 h-20">
                        <label className="mb-2 block text-sm font-bold text-gray-100">
                          Lowest rank:
                        </label>
                        <select
                          className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                          {...register("minRank")}
                          value={selectedLowestRank}
                          onChange={(e) =>
                            setSelectedLowestRank(e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select a rank
                          </option>
                          {getRanksByGame(selectedGame).map((rank) => (
                            <option key={rank} value={rank}>
                              {rank}
                            </option>
                          ))}
                        </select>
                        {errors.minRank?.message && (
                          <span className="text-red-600">
                            {errors.minRank.message}
                          </span>
                        )}
                      </div>

                      <div className="mb-5 h-20">
                        <label className="mb-2 block text-sm font-bold text-gray-100">
                          Highest rank:
                        </label>
                        <select
                          className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                          {...register("maxRank")}
                          value={selectedHighestRank}
                          onChange={(e) =>
                            setSelectedHighestRank(e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select a rank
                          </option>
                          {getRanksByGame(selectedGame).map((rank) => (
                            <option key={rank} value={rank}>
                              {rank}
                            </option>
                          ))}
                        </select>
                        {errors.maxRank?.message && (
                          <span className="text-red-600">
                            {errors.maxRank.message}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-5 h-20">
                  <label className="mb-2 block text-sm font-bold text-gray-100">
                    Team type
                  </label>
                  <select
                    {...register("teamType")}
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    onChange={(e) => setTeamType(e.target.value)}
                  >
                    <option value="">Select team type</option>
                    <option value="solo">
                      I'm a solo player looking for team
                    </option>
                    <option value="team">
                      I have a team and I am looking for players
                    </option>
                  </select>
                  {errors.teamType?.message && (
                    <span className="text-red-600">
                      {errors.teamType.message}
                    </span>
                  )}
                </div>

                <div className="h-20">
                  <label className="mb-2 block text-sm font-bold text-gray-100">
                    Amount of players
                  </label>
                  <input
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    type="number"
                    defaultValue={1}
                    min={1}
                    max={10}
                    {...register("slots")}
                  />
                  {errors.slots?.message && (
                    <span className="text-red-600">
                      {errors.slots?.message}
                    </span>
                  )}
                </div>

                <div className="flex justify-between">
                  <div className="w-2/5">
                    <label className="mb-2 block text-sm font-bold text-gray-100">
                      Minimum age:
                    </label>
                    <input
                      className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                      type="number"
                      defaultValue={16}
                      {...register("minAge")}
                    />
                    {errors.minAge?.message && (
                      <span className="text-red-600">
                        {errors.minAge?.message}
                      </span>
                    )}
                  </div>

                  <div className="w-2/5">
                    <label className="mb-2 block text-sm font-bold text-gray-100">
                      Maximum age:
                    </label>
                    <input
                      className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                      type="number"
                      defaultValue={16}
                      {...register("maxAge")}
                    />
                    {errors.minAge?.message && (
                      <span className="text-red-600">
                        {errors.maxAge?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddTeamForm;
