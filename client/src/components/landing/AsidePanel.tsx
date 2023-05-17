import { useState } from 'react';

interface Props {
  onFilterChange: (filters: any) => void;
}

export const AsidePanel = ({ onFilterChange }: Props): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [ageMin, setAgeMin] = useState<number>(16);
  const [ageMax, setAgeMax] = useState<number>(100);
  const [game, setGame] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  type TimerId = ReturnType<typeof setTimeout>;

  const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
    let timerId: TimerId;

    return (...args: T) => {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    debounce(onFilterChange, 500)({ title: event.target.value, ageMin: ageMin, ageMax: ageMax, game });
  };

  const handleAgeMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeMin(parseInt(event.target.value));
    debounce(onFilterChange, 300)({ ageMin: parseInt(event.target.value), ageMax, game, gender });
  };

  const handleAgeMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeMax(parseInt(event.target.value));
    debounce(onFilterChange, 300)({ ageMin, ageMax: parseInt(event.target.value), game, gender });
  };

  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGame(event.target.value);
    debounce(onFilterChange, 300)({ ageMin, ageMax, game: event.target.value, gender });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
    debounce(onFilterChange, 300)({ ageMin, ageMax, game, gender: event.target.value });
  };

  return (
    <div className="bg-gray-700 rounded-md p-4 m-5">
      <div className='border-b mb-4'>
        <p className='text-3xl text-bold text-gray-100 mb-4'>Filters:</p>
      </div>

      <div className="flex flex-col mb-2">
        <label className="block text-sm text-gray-100 font-bold mb-2">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder='Enter title'
          className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className=''>
        <div className="flex flex-col mb-2 mt-6">
          <label htmlFor="age_min" className="block text-sm text-gray-100 font-bold mb-2">Age Min:</label>
          <input
            type="number"
            id="age_min"
            name="age_min"
            value={ageMin}
            onChange={handleAgeMinChange}
            className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col mb-2 mt-6">
          <label htmlFor="age_min" className="block text-sm text-gray-100 font-bold mb-2">Age Max:</label>
          <input
            type="number"
            id="age_min"
            name="age_min"
            value={ageMax}
            onChange={handleAgeMaxChange}
            className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-100 font-bold mb-2 mt-6" htmlFor="username">
          Gender
        </label>
        <select
          value={gender}
          onChange={handleGenderChange}
          className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col mb-2 mt-6">
        <label htmlFor="game" className="block text-sm text-gray-100 font-bold mb-2">Game:</label>
        <select
          id="game"
          name="game"
          value={game}
          onChange={handleGameChange}
          className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Game</option>
          <option value="lol">League of Legends</option>
          <option value="csgo">Counter-Strike: Global Offensive</option>
          <option value="valorant">Valorant</option>
        </select>
      </div>
    </div>
  );
}