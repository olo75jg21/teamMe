import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../../../../plugins/axios';
import useGetLoggedUserData from '../../../../hooks/useGetLoggedUserData';
import { AxiosError } from 'axios';
import { useState } from 'react';
import axiosInstance from '../../../../plugins/axios';

interface TeamDetailsCardFooterProps {
  applyButtonText: string;
  isApplyButtonDisabled: boolean;
  isRemoveTeamBtnVisible: boolean;
  _id: string;
}

const TeamDetailsCardFooter = ({ _id, isApplyButtonDisabled, applyButtonText, isRemoveTeamBtnVisible }: TeamDetailsCardFooterProps): JSX.Element => {
  const navigate = useNavigate()

  const { userData } = useGetLoggedUserData();

  // @TODO handle this
  const [responseError, setResponseError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = userData.user._id;

  const handleApplyToTeam = async () => {
    try {
      if (userId) {
        // Get current logged user data
        const { status } = await axios.post(`/team/apply`, { userId, teamId: _id });

        if (status === 200) {
          navigate('/account');
        }
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status !== 200)
        console.log(e);
    }
  };

  const handleRemoveTeam = async () => {
    try {
      const { status } = await axiosInstance.delete(`/team/${_id}`);
      if (status === 200) {
        navigate('/');
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="mt-6 flex justify-between">
      <div>
        <NavLink
          className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded"
          to={`/`}
        >
          Go Back
        </NavLink>
      </div>
      <div className='flex flex-row'>
        {
          isRemoveTeamBtnVisible &&
          <div
            className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded disabled:bg-violet-900 ml-4"
          >
            <button
              onClick={handleRemoveTeam}
            >
              Remove team
            </button>
          </div>
        }
        <div>
          <button
            className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded disabled:bg-violet-900 ml-4"
            onClick={handleApplyToTeam}
            disabled={isApplyButtonDisabled}
          >
            {applyButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsCardFooter;