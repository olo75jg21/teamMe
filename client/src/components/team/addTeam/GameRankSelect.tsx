import { useState, ChangeEvent } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { gamesRanks } from "./data";

type GameRankSelectProps = {
  selectedGame: string;
  setSelectedGame: (game: string) => void;
  register: UseFormRegister<any>;
  errors: any;
};

const GameRankSelect = ({
  selectedGame,
  setSelectedGame,
  register,
  errors,
}: GameRankSelectProps): JSX.Element => {
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

  const [selectedRank, setSelectedRank] = useState("");

  const handleGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(e.target.value);
    setSelectedRank("");
  };

  return (
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
          <span className="text-red-600">{errors.game.message}</span>
        )}
      </div>

      {selectedGame && (
        <div className="mb-4 h-20">
          <label className="mb-2 block text-sm font-bold text-gray-100">
            Rank:
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
            {errors.rank && (
              <span className="text-red-600">{errors.rank.message}</span>
            )}
          </label>
        </div>
      )}
    </div>
  );
};

export default GameRankSelect;
