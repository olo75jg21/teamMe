import { useState } from "react";
import { gamesRanks } from "../team/addTeam/data";
import Modal from "react-modal";
import { renderProperGameName } from "../../utils/renderProperGameName";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "60%",
    bottom: "20%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(55 65 81)",
    borderRadius: "4%",
  },
};

Modal.setAppElement("#root");

interface IAddGameModalProps {
  handleAddEmptyGame: (game: string, rank: string) => void;
  isAddGameButtonDisabled: boolean;
  userGames: any;
}

const AddGameModal = ({
  handleAddEmptyGame,
  isAddGameButtonDisabled,
  userGames,
}: IAddGameModalProps): JSX.Element => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [selectedRank, setSelectedRank] = useState<string>("");

  let subtitle: any;

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedGame("");
    setSelectedRank("");
  };

  const addGame = (event: any) => {
    event.preventDefault();
    handleAddEmptyGame(selectedGame, selectedRank);
    closeModal();
  };

  const addGameButtonText = () => {
    return isAddGameButtonDisabled ? "Add game (max 3 games)" : "Add Game";
  };

  const availableGames = () => {
    const allGames = [{ game: "lol" }, { game: "csgo" }, { game: "valorant" }]; // The complete list of games

    // Filter out the games that are already in the user's games array
    const availableGames = allGames.filter((gameObj) => {
      return !userGames.some((userGame: any) => userGame.name === gameObj.game);
    });

    return availableGames.map((gameObj) => (
      <option key={gameObj.game} value={gameObj.game}>
        {renderProperGameName(gameObj.game)}
      </option>
    ));
  };

  return (
    <div className="mb-4 mt-4 flex items-center justify-center">
      <button
        className="w-full rounded bg-violet-600 px-4 py-2 font-bold text-white hover:bg-violet-800 disabled:bg-gray-400"
        type="button"
        onClick={openModal}
        disabled={isAddGameButtonDisabled}
      >
        {addGameButtonText()}
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between ">
          <div className="mb-3 rounded bg-violet-600 px-3 py-1">
            <p
              className="text-2xl font-bold text-gray-100"
              ref={(_subtitle) => (subtitle = _subtitle)}
            >
              Add Game
            </p>
          </div>

          <div
            onClick={closeModal}
            className="mb-3 rounded bg-violet-600 px-3 py-1"
          >
            <button className="text-2xl text-gray-100">&#10005;</button>
          </div>
        </div>
        <div>
          <form onSubmit={addGame}>
            <div className="flex justify-between">
              <div className="mb-6 h-20 w-1/2">
                <label className="mb-2 block font-bold text-gray-100">
                  Game
                </label>
                <select
                  className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  defaultValue={""}
                >
                  <option value="">Select a game</option>
                  {availableGames()}
                </select>
              </div>

              <div className="mb-4 w-2/5">
                <label className="mb-2 block font-bold text-gray-100">
                  Rank
                </label>
                {selectedGame === "" && (
                  <select
                    defaultValue=""
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option disabled value="">
                      Select a game first
                    </option>
                  </select>
                )}

                {selectedGame === "lol" && (
                  <select
                    defaultValue=""
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a rank
                    </option>
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
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a rank
                    </option>
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
                    className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
                    onChange={(e) => setSelectedRank(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a rank
                    </option>
                    {gamesRanks.csgoRanks.map((rank: string) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="mt-4 w-48 rounded bg-violet-600 px-4 py-2 font-bold text-white hover:bg-violet-800 disabled:bg-violet-900"
                type="submit"
                onClick={addGame}
                disabled={!(selectedGame && selectedRank)}
              >
                Add New Game
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddGameModal;
