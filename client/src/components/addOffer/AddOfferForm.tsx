import axios from '../../plugins/axios';
import { gamesRanks } from './data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
  title: string;
  description: string;
  game: string;
  rank: string;
  offerType: string;
};

interface AddOfferFormProps {
  userId: string;
};

export const AddOfferForm = ({ userId }: AddOfferFormProps): JSX.Element => {
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [offerType, setOfferType] = useState<string>('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // await axios.post('/offer/addNewoffer', {
    //   _user: userId,
    //   ...data
    // });

    console.log(data);
  };

  return (
    <div className='bg-slate-200 flex h-screen'>
      <div className='m-auto'>
        <div className='w-80 max-w-xs'>
          <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>

            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Title</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                {...register('title')}
              />

              {errors.title && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>

              {errors.game && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Game</label>

              <select
                className="border border-gray-400 p-2 rounded w-full mt-2"
                {...register("game", { required: true })}
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
              >
                <option value="">Select a game</option>
                <option value="lol">League of Legends</option>
                <option value="valorant">Valorant</option>
                <option value="csgo">CS:GO</option>
              </select>
              {errors.game && (
                <span className="text-red-500">This field is required</span>
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
                  {errors.rank && (
                    <span className="text-red-500">This field is required</span>
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
                    {...register("rank", { required: true })}
                  >
                    <option value="" disabled>Select a rank</option>
                    {gamesRanks.lolRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                  {errors.rank && (
                    <span className="text-red-500">This field is required</span>
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
                    {...register("rank", { required: true })}
                  >
                    <option value="" disabled>Select a rank</option>
                    {gamesRanks.valoRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                  {errors.rank && (
                    <span className="text-red-500">This field is required</span>
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
                    {...register("rank", { required: true })}
                  >
                    <option value="" disabled>Select a rank</option>
                    {gamesRanks.csgoRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                  {errors.rank && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </label>
              )}
            </div>

            <div className='mb-4 h-20'>

              <label className="block mb-2" htmlFor="playerType">
                Offer type
              </label>
              <select
                {...register("offerType", { required: true })}
                className="w-full p-2 rounded-lg border border-gray-400"
                onChange={(e) => setOfferType(e.target.value)}
              >
                <option value="">Select offer type</option>
                <option value="solo">I'm a solo player looking for team</option>
                <option value="team">I have a team and I am looking for players</option>
              </select>
              {errors.offerType && (
                <p className="text-red-500 mt-2">Player type is required</p>
              )}
            </div>

            {offerType === 'team' && (
              <h1>XD</h1>
            )}

            <input type="submit" value='Add offer' className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button' />
          </form>
        </div>
      </div>
    </div >
  )
};