import { IUser } from "../../../types/user";

interface UsersListItemProps {
  user: IUser;
}

const UsersListItem: React.FC<UsersListItemProps> = ({ user }) => {
  return (
    <div className="border-1 mb-6 rounded-lg border-gray-900 bg-gray-700 shadow-md duration-200">
      <div className="flex w-full justify-between rounded-t rounded-t bg-violet-700 px-4 pt-2">
        <div className="mb-3 mr-12 flex">
          {/* <RiTeamFill className="mr-2 mt-2 text-xl text-gray-300" /> */}
          <p className="truncate text-2xl font-bold text-gray-300">
            {user.username}
          </p>
        </div>

        <div className="mb-3 flex items-center">
          {/* <FaGamepad className="mr-2 text-2xl text-gray-300" /> */}
          <p className=" truncate text-2xl font-bold text-gray-300">
            {/* {renderProperGameName(game)} */}
            {user.email}
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <img
              className="mr-4 h-16 w-16 rounded-full border-2 border-violet-500 object-cover"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            {/* {renderCreatorData()} */}
          </div>
          <div className="flex flex-row">
            {/* {isApplicationStatusVisible() && renderApplicationStatus()}
            {renderAvilableSlots()} */}
          </div>
        </div>

        <div className="mt-3 flex items-center">
          <p className="truncate text-2xl text-gray-300">{user.username}</p>
        </div>
        <div className="mt-3 flex items-center">
          <p className="line-clamp-2 text-lg text-gray-300">
            {user.description}
          </p>
        </div>
        <div className="mb-3 mt-6 flex justify-end">
          {/* {renderActionButtons()} */}
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
