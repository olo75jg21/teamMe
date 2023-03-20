import axios from '../../plugins/axios';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  game: string;
  rank: string;
  description: string;
};

interface AddOfferFormProps {
  userId: string;
};

export const AddOfferForm = ({ userId }: AddOfferFormProps): JSX.Element => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = data => {
    // TODO change this promised based request for async/await
    axios.post('/offer/addNewOffer', {
      _user: userId,
      ...data
    })
      .then(res => {
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className='bg-slate-200 flex h-screen'>
      <div className='m-auto'>
        <div className='w-80 max-w-xs'>
          <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>

            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Game</label>

              <select defaultValue={"Select"} {...register('game')}>
                <option value="lol">lol</option>
                <option value="cs">cs</option>
              </select>
              {/* {errors.email?.message && <span className='text-red-600'>{errors.email?.message}</span>} */}
            </div>

            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Game</label>
              <select {...register('rank')}>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              {/* {errors.email?.message && <span className='text-red-600'>{errors.email?.message}</span>} */}
            </div>

            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                {...register('description')}
              />
              {/* {errors.password?.message && <span className='text-red-600'>{errors.password?.message}</span>} */}
            </div>

            <input type="submit" value='Add offer' className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button' />
          </form>
        </div>
      </div>
    </div>
  )
};