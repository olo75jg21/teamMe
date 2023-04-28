import { useEffect, useState } from 'react';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import axios from '../../plugins/axios';
import { IUser } from '../../types/user';
import { IGame } from '../../types/game';

interface IUserProfileData extends IUser { }

const GamesList = (): JSX.Element => {
  const [user, setUser] = useState<IUserProfileData>();

  const { userData } = useGetLoggedUserData()

  const userId = userData.user._id;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/user/getProfileData', {
        params: {
          id: userId
        }
      });
      setUser(data);
    })();
  }, [userId]);

  console.log(user);

  const handleAddEmptyGame = () => {
    if (!user) return;

    const newGame = { name: "", rank: "" };
    const newUser = { ...user, games: [...user.games, newGame] };
    setUser(newUser);
  };

  return (
    <div>
      {
        user?.games.map((game: IGame) => {
          return <div key={crypto.randomUUID()}>XD</div>
        })
      }
      <button onClick={handleAddEmptyGame}>Add new Game</button>
    </div>
  );
};

export default GamesList;