import { useState } from 'react';
import Modal from 'react-modal';
import { IUser } from '../../../../../types/user';
import axiosInstance from '../../../../../plugins/axios';
import { AxiosError } from 'axios';
import CirclesLoader from '../../../../utils/CirclesLoader';
import { IGame } from '../../../../../types/game';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { GiHumanTarget } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { FaUserAlt, FaGamepad } from 'react-icons/fa';
import { renderProperGameName } from '../../../../../utils/renderProperGameName';

const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: '60%',
    bottom: '20%',
    marginRight: '-50%',
    transform: 'translate(-50%, -20%)',
    backgroundColor: 'rgb(55 65 81)',
    borderRadius: '4%'
  },
};

Modal.setAppElement('#root');

interface IAddGameModalProps {
  handleAddEmptyGame?: (game: string, rank: string) => void;
  username: string;
  applicantId: string;
}

const ApplicantDetailsModal = ({ applicantId, username }: IAddGameModalProps): JSX.Element => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<string>('');
  const [user, setUser] = useState<IUser>();

  let subtitle: any;

  const openModal = async () => {
    setIsOpen(true);
    try {
      setIsLoading(true);

      const { data, status } = await axiosInstance.get(`/users/${applicantId}`);
      if (status === 200) {
        setUser(data)
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      const axiosError = e as AxiosError;
      if (axiosError.response?.status !== 200) {
        setResponseError('Error occured while fetching data');
      }
    }
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
    setUser(undefined);
  };

  const renderGames = () => {
    return user?.games.map((game: IGame, index) => {
      return (
        <li
          key={index}
          className="text-md text-gray-100 font-bold px-4 py-2"
        >
          <div className='flex justify-between'>
            {renderProperGameName(game.name) + ' | ' + game.rank}
          </div>
        </li>
      );
    });
  };

  const renderNoGames = () => {
    return (
      <div className='mb-4'>
        <p className="text-gray-200 font-semibold text-xl">There are no games added...</p>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <p
        className="cursor-pointer text-sm font-medium truncate dark:text-white mr-1 hover:text-gray-300 hover:underline duration-200"
        onClick={openModal}
      >
        {username}
      </p>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {
          isLoading ?
            <div className='ml-40 mt-16'>
              <CirclesLoader />
            </div> :

            user &&
            <div>
              <div className='flex justify-between'>
                <div className='mb-3 bg-gray-900 rounded px-3 py-1'>
                  <p className="text-2xl font-bold text-gray-100" ref={(_subtitle) => (subtitle = _subtitle)}>User profile</p>
                </div>

                <div onClick={closeModal} className='cursor-pointer mb-3 bg-violet-600 hover:bg-violet-800 rounded px-3 py-1'>
                  <button className='text-2xl text-gray-100'>&#10005;</button>
                </div>
              </div>

              <div className="w-full h-96 bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <div className="py-4 px-6">
                  <div className='flex items-center text-2xl mt-4 text-gray-300' >
                    <FaUserAlt />
                    <h1 className="font-semibold text-gray-200 ml-2">
                      {user.username}
                    </h1>
                  </div>

                  <p className="py-2 text-lg text-gray-300">
                    {user.description}
                  </p>

                  <div className="flex items-center text-md mt-4 text-gray-300">
                    <BsFillCalendarDateFill />
                    <h1 className="px-2">
                      {user.age + '.yo'}
                    </h1>
                  </div>

                  <div className="flex items-center mt-4 text-md text-gray-300">
                    <GiHumanTarget />
                    <h1 className="px-2">
                      {user.gender}
                    </h1>
                  </div>

                  <div className="flex items-center mt-4 text-md text-gray-300">
                    <MdEmail />
                    <h1 className="px-2">
                      {user.email}
                    </h1>
                  </div>

                  <div className='flex items-center mt-4 text-md text-gray-300'>
                    <FaGamepad />
                    <h1 className='px-2'>
                      Games:
                    </h1>
                  </div>
                  <ul>
                    {user.games.length !== 0 ? renderGames() : renderNoGames()}
                  </ul>

                </div>
              </div>
            </div>
        }
      </Modal >
    </div >
  );
};

export default ApplicantDetailsModal;