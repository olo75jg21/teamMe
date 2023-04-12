import { useState } from 'react';

interface Props {
  onFilterChange: (filters: any) => void;
}

export const AsidePanel = ({ onFilterChange }: Props): JSX.Element => {
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(100);
  const [game, setGame] = useState('');

  const handleAgeMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeMin(parseInt(event.target.value));
    onFilterChange({ age_min: parseInt(event.target.value), age_max: ageMax, game });
  };

  const handleAgeMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeMax(parseInt(event.target.value));
    onFilterChange({ age_min: ageMin, age_max: parseInt(event.target.value), game });
  };

  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGame(event.target.value);
    onFilterChange({ age_min: ageMin, age_max: ageMax, game: event.target.value });
  };


  return (
    <div className="bg-gray-100 rounded-md p-4 mb-4">
      <div className="flex flex-col mb-2">
        <label htmlFor="age_min" className="text-sm font-medium mb-1">Age Min:</label>
        <input type="number" id="age_min" name="age_min" value={ageMin} onChange={handleAgeMinChange} className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="age_max" className="text-sm font-medium mb-1">Age Max:</label>
        <input type="number" id="age_max" name="age_max" value={ageMax} onChange={handleAgeMaxChange} className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="game" className="text-sm font-medium mb-1">Game:</label>
        <select id="game" name="game" value={game} onChange={handleGameChange} className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-400">
          <option value="">Select Game</option>
          <option value="lol">League of Legends</option>
          <option value="cs">Counter-Strike: Global Offensive</option>
          <option value="valorant">Valorant</option>
        </select>
      </div>
    </div>
  );
}