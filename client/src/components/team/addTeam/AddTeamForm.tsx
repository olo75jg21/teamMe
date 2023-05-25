import axios from "../../../plugins/axios";
import * as yup from "yup";
import { gamesRanks } from "./data";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import CirclesLoader from "../../utils/CirclesLoader";
import ResponseError from "../../utils/ResponseError";

interface FormData {
  name: string;
  title: string;
  description: string;
  game: string;
  rank: string;
  teamType: string;
  slots: number;
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
  rank: yup.string().required("Rank is required"),
  teamType: yup.string().required("Team type is required"),
});

const AddTeamForm = ({ userId }: AddTeamFormProps): JSX.Element => {
  const [responseError, setResponseError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedGame, setSelectedGame] = useState<string>("");
  const [selectedRank, setSelectedRank] = useState<string>("");
  const [teamType, setTeamType] = useState<string>("");

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
        console.log(data);
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
    setSelectedRank("");
  };

  return (
    <div className="flex h-screen bg-gray-800">
      <div className="mx-auto mt-20">
        {isLoading ? (
          <CirclesLoader />
        ) : (
          <form
            className="mb-4 h-addOfferForm rounded bg-gray-700 px-8 pb-8 pt-6 shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ResponseError message={responseError} />

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="mb-6 h-20">
                  <label className="mb-2 block text-sm font-bold text-gray-100">
                    Name
                  </label>
                  <input
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    type="text"
                    defaultValue="CmonBrugowie2115"
                    {...register("name")}
                  />

                  {errors.title?.message && (
                    <span className="text-red-600">{errors.title.message}</span>
                  )}
                </div>
                <div className="mb-6 h-20">
                  <label className="mb-2 block text-sm font-bold text-gray-100">
                    Title
                  </label>
                  <input
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    type="text"
                    defaultValue="Team title eoeoeoeoeo"
                    {...register("title")}
                  />

                  {errors.title?.message && (
                    <span className="text-red-600">{errors.title.message}</span>
                  )}
                </div>

                <div className="mb-4 h-20">
                  <label className="mb-2 block text-sm font-bold text-gray-100">
                    Description
                  </label>

                  <textarea
                    className="text-md focus:shadow-outline h-56 w-full resize-none rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
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
                  <div className="mb-4 h-20">
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
                    <div className="mb-4 h-20">
                      <label className="mb-4 block text-sm font-bold text-gray-100">
                        Rank:
                      </label>
                      <select
                        className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                        {...register("rank")}
                        value={selectedRank}
                        onChange={(e) => setSelectedRank(e.target.value)}
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
                      {errors.rank?.message && (
                        <span className="text-red-600">
                          {errors.rank.message}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mb-4 h-20">
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

                <div className="mb-4 h-20">
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
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddTeamForm;
