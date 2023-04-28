import { FormEvent, useState } from 'react';
import { gamesRanks } from '../addOffer/data';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
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

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const addGame = (event: any) => {
    event.preventDefault();
    handleAddEmptyGame(selectedGame, selectedRank);
  }

  return (
    <div>
      <button
        className="px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>
          <form onSubmit={addGame}>
            <div className='mb-4 h-20'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Game</label>

              <select
                className="border border-gray-400 p-2 rounded w-full mt-2"
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
              >
                <option value="">Select a game</option>
                <option value="lol">League of Legends</option>
                <option value="valorant">Valorant</option>
                <option value="csgo">CS:GO</option>
              </select>
            </div>

            <div className='mb-4 h-20'>
              {selectedGame === "" && (
                <label
                  className="block text-gray-700 mb-2"
                >
                  Rank:
                  <select
                    defaultValue=""
                    className="border border-gray-400 p-2 rounded w-full mt-2"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option disabled value="">Select a game first</option>
                  </select>
                </label>
              )}

              {selectedGame === "lol" && (
                <label
                  className="block text-gray-700 mb-2"
                >
                  Rank:
                  <select
                    defaultValue=""
                    className="border border-gray-400 p-2 rounded w-full mt-2"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="" disabled>Select a rank</option>
                    {gamesRanks.lolRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {selectedGame === "valorant" && (
                <label
                  className="block text-gray-700 mb-2"
                >
                  Rank:
                  <select
                    defaultValue=""
                    className="border border-gray-400 p-2 rounded w-full mt-2"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="" disabled>Select a rank</option>
                    {gamesRanks.valoRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {selectedGame === "csgo" && (
                <label
                  className="block text-gray-700 mb-2"
                >
                  Rank:
                  <select
                    defaultValue=""
                    className="border border-gray-400 p-2 rounded w-full mt-2"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="" disabled>Select a rank</option>
                    {gamesRanks.csgoRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            <button type='submit'>Add new game</button>
          </form>
        </div>
      </Modal>
    </div >
  );
};

export default AddGameModal;