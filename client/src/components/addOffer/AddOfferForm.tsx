import axios from '../../plugins/axios';
import * as yup from 'yup';
import { gamesRanks } from './data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import CirclesLoader from '../utils/CirclesLoader';
import ResponseError from '../utils/ResponseError';

type FormData = {
  title: string;
  description: string;
  game: string;
  rank: string;
  teamType: string;
  slots: number;
};

interface AddOfferFormProps {
  userId: string;
};

const addOffferSchema = yup.object({
  title: yup.string().min(16, 'At least 16 characters long').max(64, 'Max length is 64').required('Title is required'),
  description: yup.string().min(30, 'At least 30 characters long').max(256, 'Max length is 256').required('Description is required'),
  game: yup.string().required('Game is required'),
  rank: yup.string().required('Rank is required'),
  teamType: yup.string().required('Offer type is required')
});

export const AddOfferForm = ({ userId }: AddOfferFormProps): JSX.Element => {
  const [responseError, setResponseError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedGame, setSelectedGame] = useState<string>('');
  const [teamType, setTeamType] = useState<string>('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(addOffferSchema)
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      setIsLoading(true);
      setResponseError('');
      const { status } = await axios.post('/offers/new', {
        _user: userId,
        ...formData
      });

      if (status === 201) {

        // @TODO navigate to profile
        setIsLoading(false);
      }

    } catch (e) {
      const axiosError = e as AxiosError;
      if (axiosError.response?.status === 500) {
        setResponseError('Something went wrong, try again...');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gray-800 flex h-screen'>
      <div className='mx-auto mt-20'>
        {
          isLoading
            ? <CirclesLoader />
            : <form className='bg-gray-700 shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>

              <ResponseError message={responseError} />

              <div className='grid grid-cols-2 gap-8'>
                <div>
                  <div className='mb-6 h-20'>
                    <label className='block text-sm text-gray-100 font-bold mb-2'>Title</label>
                    <input
                      className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                      type='text'
                      defaultValue="Offer title eoeoeoeoeo"
                      {...register('title')}
                    />

                    {errors.title?.message && (
                      <span className="text-red-600">{errors.title.message}</span>
                    )}
                  </div>

                  <div className='mb-4 h-20'>
                    <label className='block text-sm text-gray-100 font-bold mb-2'>Description</label>

                    <textarea
                      className="resize-none h-56 bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                      defaultValue="Lorem Ibook. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in"
                      {...register('description')}
                    />

                    {errors.description?.message && (
                      <span className="text-red-600">{errors.description.message}</span>
                    )}

                  </div>
                </div>

                <div>
                  <div className='mb-4 h-20'>
                    <label className='block text-sm text-gray-100 font-bold mb-2'>Game</label>

                    <select
                      className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                      // className="border border-gray-400 p-2 rounded w-full"
                      {...register("game")}
                      value={selectedGame}
                      onChange={(e) => setSelectedGame(e.target.value)}
                    >
                      <option value="">Select a game</option>
                      <option value="lol">League of Legends</option>
                      <option value="valorant">Valorant</option>
                      <option value="csgo">CS:GO</option>
                    </select>
                    {errors.game?.message && (
                      <span className="text-red-600">{errors.game.message}</span>
                    )}
                  </div>

                  <div className='mb-4 h-20'>
                    {selectedGame === "" && (
                      <label
                        className="block text-sm text-gray-100 font-bold mb-2"
                      >
                        Rank:
                        <select
                          defaultValue=""
                          className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option disabled value="">Select a game first</option>
                        </select>
                        {errors.game?.message && (
                          <span className="text-red-600">{errors.game.message}</span>
                        )}
                      </label>
                    )}

                    {selectedGame === "lol" && (
                      <label
                        className="block text-sm text-gray-100 font-bold mb-2"
                      >
                        Rank:
                        <select
                          className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          {...register("rank")}
                        >
                          <option value="" disabled>Select a rank</option>
                          {gamesRanks.lolRanks.map((rank: string) => (
                            <option key={rank} value={rank}>
                              {rank}
                            </option>
                          ))}
                        </select>
                        {errors.rank?.message && (
                          <span className="text-red-600">{errors.rank.message}</span>
                        )}
                      </label>
                    )}

                    {selectedGame === "valorant" && (
                      <label
                        className="block text-gray-700 mb-2"
                      >
                        Rank:
                        <select
                          className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          {...register("rank")}
                        >
                          <option value="" disabled>Select a rank</option>
                          {gamesRanks.valoRanks.map((rank: string) => (
                            <option key={rank} value={rank}>
                              {rank}
                            </option>
                          ))}
                        </select>
                        {errors.game?.message && (
                          <span className="text-red-600">{errors.game.message}</span>
                        )}
                      </label>
                    )}

                    {selectedGame === "csgo" && (
                      <label
                        className="block text-sm text-gray-100 font-bold mb-2"
                      >
                        Rank:
                        <select
                          className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          {...register("rank")}
                        >
                          <option value="" disabled>Select a rank</option>
                          {gamesRanks.csgoRanks.map((rank: string) => (
                            <option key={rank} value={rank}>
                              {rank}
                            </option>
                          ))}
                        </select>
                        {errors.game?.message && (
                          <span className="text-red-600">{errors.game.message}</span>
                        )}
                      </label>
                    )}
                  </div>

                  <div className='mb-4 h-20'>

                    <label className="block text-sm text-gray-100 font-bold mb-2">
                      Offer type
                    </label>
                    <select
                      {...register("teamType")}
                      className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => setTeamType(e.target.value)}
                    >
                      <option value="">Select team type</option>
                      <option value="solo">I'm a solo player looking for team</option>
                      <option value="team">I have a team and I am looking for players</option>
                    </select>
                    {errors.teamType?.message && (
                      <span className="text-red-600">{errors.teamType.message}</span>
                    )}
                  </div>

                  <div className='mb-4 h-20'>

                    <label className="block text-sm text-gray-100 font-bold mb-2">
                      Amount of players
                    </label>
                    <input
                      className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                      type='number'
                      defaultValue={1}
                      min={1}
                      max={10}
                      {...register("slots")}
                    />
                    {errors.slots?.message && <span className='text-red-600'>{errors.slots?.message}</span>}
                  </div>
                </div>
              </div>

              <input type="submit" value='Add offer' className='bg-violet-700 cursor-pointer hover:bg-violet-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button' />
            </form>
        }
      </div>
    </div>
  );
};