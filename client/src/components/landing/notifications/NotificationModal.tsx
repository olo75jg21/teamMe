import { useState } from "react";
import Modal from "react-modal";
import { renderProperGameName } from "../../../utils/renderProperGameName";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "40%",
    bottom: "-20%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(55 65 81)",
    borderRadius: "4%",
  },
};

Modal.setAppElement("#root");

interface IAddGameModalProps {
  // handleAddEmptyGame: (game: string, rank: string) => void;
  // isAddGameButtonDisabled: boolean;
  // userGames: any;
}

const NotificationModal: React.FC<IAddGameModalProps> = (): JSX.Element => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [game, setGame] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(16);
  const [maxAge, setMaxAge] = useState<number>(100);
  const [slots, setSlots] = useState<number>(1);

  const { userData } = useGetLoggedUserData();

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

  const submitForm = async (e: any) => {
    e.preventDefault();

    try {
      const { data, status } = await axios.post(
        `/users/${userData.user._id}/interest`,
        {
          game,
          minAge,
          maxAge,
          slots,
        }
      );
      console.log(status, data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mb-4 mt-4 flex items-center justify-center">
      <button
        className="mx-5 flex h-12 cursor-pointer items-center justify-center rounded-lg bg-indigo-800 px-24 text-xl font-bold text-gray-100 duration-200 hover:bg-indigo-500"
        type="button"
        onClick={openModal}
      >
        Notifications
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
              Add Notification
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
          <form onSubmit={submitForm}>
            <div className="my-4 flex flex-col">
              <label className="mb-2 block text-sm font-bold text-gray-100">
                Game:
              </label>
              <select
                id="game"
                name="game"
                value={game}
                onChange={(e) => setGame(e.target.value)}
                className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
              >
                <option value="">Select Game</option>
                <option value="lol">League of Legends</option>
                <option value="csgo">Counter-Strike: Global Offensive</option>
                <option value="valorant">Valorant</option>
              </select>
            </div>

            <div className="my-4 flex flex-col">
              <label className="mb-2 block text-sm font-bold text-gray-100">
                Minimum Age:{" "}
              </label>
              <input
                type="number"
                value={minAge}
                onChange={(e) => setMinAge(Number(e.target.value))}
                className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div className="my-4 flex flex-col">
              <label className="mb-2 block text-sm font-bold text-gray-100">
                Maximum Age:{" "}
              </label>
              <input
                type="number"
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div className="my-4 flex flex-col">
              <label className="mb-2 block text-sm font-bold text-gray-100">
                Slots:{" "}
              </label>
              <input
                type="number"
                value={slots}
                onChange={(e) => setSlots(Number(e.target.value))}
                className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <button
                className="focus:shadow-outline cursor-pointer rounded bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 focus:outline-none"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationModal;
