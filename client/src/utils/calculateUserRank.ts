import { IGame } from '../types/game';
import { ITeam } from '../types/team';

// @TODO checks if this works after handling editing user profile
export const calculateUserRank = (team: ITeam): { game: string, rank: string } => {
  if (team) {
    const gameMatch = team._user.games.find((game: IGame) => game.name === team.game);
    if (gameMatch) {
      return {
        game: gameMatch.name,
        rank: gameMatch.rank
      };
    }
  }

  return {
    game: 'Unranked',
    rank: ''
  };
}