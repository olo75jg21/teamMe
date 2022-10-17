import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  game: string;
  rank: string;
  description: string;
};

export const AddOffertForm = (): JSX.Element => {
  const { register, handleSubmit, watch, formState: { errors }} = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = data => {
    axios.post('/offert/addNewOffert', { 
        _user: '633c66f82d67a00741fdb829',
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Game</label>
        <input {...register('game')}></input>

        <label>Rank</label>
        <input {...register('rank')}></input>

        <label>Description</label>
        <input {...register('description')}></input>
        <input 
          type='submit' 
          value='Add'
          className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button'
        />
      </form>
    </div>
  )
};