import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import { ITeam } from '../../types/team';
import Header from '../header/Header';
import TeamsList from '../team/teamsList/TeamsList';
import { AsidePanel } from './AsidePanel';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import AddNewTeamButton from './AddNewTeamButton';
import NoDataCard from '../utils/NoDataCard';

const LandingPage = (): JSX.Element => {
  const [filters, setFilters] = useState({ title: '', ageMin: 16, ageMax: 100, game: '', gender: '' });
  const [teams, setTeams] = useState<ITeam[]>([]);

  const { userData } = useGetLoggedUserData();

  useEffect(() => {
    (async () => {
      try {
        const { title, ageMin, ageMax, game, gender } = filters;

        const res = await axios.get('/team', {
          params: {
            title,
            ageMin,
            ageMax,
            game,
            gender,
            userId: userData.user._id,
          }
        });
        setTeams(res.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Header />
      <div>
        <div className={`flex flex-row bg-gray-800 ${teams.length <= 4 ? 'h-screen' : 'h-full'}`}>
          <div className='basis-1/4'>
            <AddNewTeamButton />
            <AsidePanel onFilterChange={handleFilterChange} />
          </div>
          {
            teams.length === 0
              ? <NoDataCard />
              :
              <div className='basis-3/4'>
                <div className='p-5 mt-20'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6'>
                    {teams && <TeamsList teams={teams} />}
                  </div>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default LandingPage;