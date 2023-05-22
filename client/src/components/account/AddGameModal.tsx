import { useState } from 'react';
import { gamesRanks } from '../team/addTeam/data';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '70%',
    bottom: '20%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(55 65 81)',
    borderRadius: '4%'
  },
};

Modal.setAppElement('#root');

interface IAddGameModalProps {
  handleAddEmptyGame: (game: string, rank: string) => void;
}

const AddGameModal = ({ handleAddEmptyGame }: IAddGameModalProps): JSX.Element => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [selectedRank, setSelectedRank] = useState<string>('');

  let subtitle: any;

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addGame = (event: any) => {
    event.preventDefault();
    handleAddEmptyGame(selectedGame, selectedRank);
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <button
        className='bg-violet-600 hover:bg-violet-800 text-white w-48 font-bold py-2 px-4 rounded'
        type="button"
        onClick={openModal}
      >
        Add Game
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='flex justify-between '>
          <div className='mb-3 bg-violet-600 rounded px-3 py-1'>
            <p className="text-2xl font-bold text-gray-100" ref={(_subtitle) => (subtitle = _subtitle)}>Add Game</p>
          </div>

          <div onClick={closeModal} className='mb-3 bg-violet-600 rounded px-3 py-1'>
            <button className='text-2xl text-gray-100'>&#10005;</button>
          </div>
        </div>
        <div>
          <form onSubmit={addGame}>
            <div className='flex justify-between'>
              <div className='mb-6 h-20 w-1/2'>
                <label className="block text-gray-100 font-bold mb-2">Game</label>
                <select
                  className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                >
                  <option disabled value="">Select a game</option>
                  <option value="lol">League of Legends</option>
                  <option value="valorant">Valorant</option>
                  <option value="csgo">CS:GO</option>
                </select>
              </div>

              <div className='mb-4 w-2/5'>
                <label className="block text-gray-100 font-bold mb-2">Rank</label>
                {selectedGame === "" && (
                  <select
                    defaultValue=""
                    className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option disabled value="">Select a game first</option>
                  </select>
                )}

                {selectedGame === "lol" && (
                  <select
                    defaultValue=""
                    className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="" disabled>Select a rank</option>
                    {gamesRanks.lolRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                )}

                {selectedGame === "valorant" && (
                  <select
                    defaultValue=""
                    className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="" disabled>Select a rank</option>
                    {gamesRanks.valoRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                )}

                {selectedGame === "csgo" && (
                  <select
                    defaultValue=""
                    className="bg-gray-600 w-full py-2 px-3 border-2 border-gray-400 duration-200 text-md font-semibold selection:bg-gray-700 focus:border-violet-500 rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="" disabled>Select a rank</option>
                    {gamesRanks.csgoRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                className='bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded disabled:bg-violet-900'
                type="submit"
                onClick={openModal}
                disabled={!(selectedGame && selectedRank)}
              >
                Add New Game
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div >
  );
};

export default AddGameModal;