import axios from '../../plugins/axios';
import * as yup from 'yup';
import { gamesRanks } from './data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  title: string;
  description: string;
  game: string;
  rank: string;
  offerType: string;
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
  offerType: yup.string().required('Offer type is required')
});

export const AddOfferForm = ({ userId }: AddOfferFormProps): JSX.Element => {
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [offerType, setOfferType] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(addOffferSchema)
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // TODO add a error handling if error occur on backend
    const response = await axios.post('/offers/new', {
      _user: userId,
      ...data
    });

    console.log(response);
  };

  return (
    <div className='bg-slate-200 flex h-screen'>
      <div className='m-auto'>
        <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>

          <div className='grid grid-cols-2 gap-8'>
            <div>
              <div className='mb-6 h-20'>
                <label className='block text-gray-700 text-sm font-bold mb-4'>Title</label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  defaultValue="Offer title eoeoeoeoeo"
                  {...register('title')}
                />

                {errors.title?.message && (
                  <span className="text-red-600">{errors.title.message}</span>
                )}
              </div>

              <div className='mb-4 h-20'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>

                <textarea
                  className="resize-none h-56 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <label className='block text-gray-700 text-sm font-bold mb-2'>Game</label>

                <select
                  className="border border-gray-400 p-2 rounded w-full mt-2"
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
                    className="block text-gray-700 mb-2"
                  >
                    Rank:
                    <select
                      defaultValue=""
                      className="border border-gray-400 p-2 rounded w-full mt-2"
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
                    className="block text-gray-700 mb-2"
                  >
                    Rank:
                    <select
                      className="border border-gray-400 p-2 rounded w-full mt-2"
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
                      className="border border-gray-400 p-2 rounded w-full mt-2"
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
                    className="block text-gray-700 mb-2"
                  >
                    Rank:
                    <select
                      className="border border-gray-400 p-2 rounded w-full mt-2"
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

                <label className="block mb-2" htmlFor="playerType">
                  Offer type
                </label>
                <select
                  {...register("offerType")}
                  className="w-full p-2 rounded-lg border border-gray-400"
                  onChange={(e) => setOfferType(e.target.value)}
                >
                  <option value="">Select offer type</option>
                  <option value="solo">I'm a solo player looking for team</option>
                  <option value="team">I have a team and I am looking for players</option>
                </select>
                {errors.offerType?.message && (
                  <span className="text-red-600">{errors.offerType.message}</span>
                )}
              </div>

              <div className='mb-4 h-20'>

                <label className="block mb-2" htmlFor="playerType">
                  Amount of players
                </label>
                <input
                  className='shadow appearance-none border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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



          <input type="submit" value='Add offer' className='bg-blue-500 cursor-pointer hover:bg-violet-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button' />
        </form>
      </div>
    </div>
  )
};