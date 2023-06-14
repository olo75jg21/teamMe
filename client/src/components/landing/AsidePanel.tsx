import { useState } from "react";

interface Props {
  onFilterChange: (filters: any) => void;
}

export const AsidePanel = ({ onFilterChange }: Props): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [ageMin, setAgeMin] = useState<number>(16);
  const [ageMax, setAgeMax] = useState<number>(100);
  const [game, setGame] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  type TimerId = ReturnType<typeof setTimeout>;

  const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
  ) => {
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
    debounce(
      onFilterChange,
      500
    )({ title: event.target.value, ageMin: ageMin, ageMax: ageMax, game });
  };

  const handleAgeMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeMin(parseInt(event.target.value));
    debounce(
      onFilterChange,
      300
    )({ ageMin: parseInt(event.target.value), ageMax, game, gender });
  };

  const handleAgeMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeMax(parseInt(event.target.value));
    debounce(
      onFilterChange,
      300
    )({ ageMin, ageMax: parseInt(event.target.value), game, gender });
  };

  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGame(event.target.value);
    debounce(
      onFilterChange,
      300
    )({ ageMin, ageMax, game: event.target.value, gender });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
    debounce(
      onFilterChange,
      300
    )({ ageMin, ageMax, game, gender: event.target.value });
  };

  return (
    <div className="m-5 rounded-lg bg-gray-700 p-4">
      <div className="mb-4 border-b">
        <p className="text-bold mb-4 text-3xl text-gray-100">Filters:</p>
      </div>

      <div className="mb-2 flex flex-col">
        <label className="mb-2 block text-sm font-bold text-gray-100">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
          className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
        />
      </div>

      <div className="">
        <div className="mb-2 mt-6 flex flex-col">
          <label
            htmlFor="age_min"
            className="mb-2 block text-sm font-bold text-gray-100"
          >
            Age Min:
          </label>
          <input
            type="number"
            id="age_min"
            name="age_min"
            value={ageMin}
            onChange={handleAgeMinChange}
            className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
          />
        </div>
        <div className="mb-2 mt-6 flex flex-col">
          <label
            htmlFor="age_min"
            className="mb-2 block text-sm font-bold text-gray-100"
          >
            Age Max:
          </label>
          <input
            type="number"
            id="age_min"
            name="age_min"
            value={ageMax}
            onChange={handleAgeMaxChange}
            className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          className="mb-2 mt-6 block text-sm font-bold text-gray-100"
          htmlFor="username"
        >
          Gender
        </label>
        <select
          value={gender}
          onChange={handleGenderChange}
          className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-2 mt-6 flex flex-col">
        <label
          htmlFor="game"
          className="mb-2 block text-sm font-bold text-gray-100"
        >
          Game:
        </label>
        <select
          id="game"
          name="game"
          value={game}
          onChange={handleGameChange}
          className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
        >
          <option value="">Select Game</option>
          <option value="lol">League of Legends</option>
          <option value="csgo">Counter-Strike: Global Offensive</option>
          <option value="valorant">Valorant</option>
        </select>
      </div>
    </div>
  );
};
