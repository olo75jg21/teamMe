import { SubmitHandler, useForm } from 'react-hook-form';

type formData = {
  game: string;
  rank: string;
  description: string;
};

const AddOffertPage = (): JSX.Element => {
  const { register, handleSubmit, watch, formState: { errors }} = useForm<formData>();

  const onSubmit: SubmitHandler<formData> = data => {
    console.log('eo')
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

export default AddOffertPage;