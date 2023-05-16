import { NavLink } from 'react-router-dom';

const AddNewOfferButton = (): JSX.Element => {
  return (
    <NavLink
      className='cursor-pointer text-gray-100 text-xl font-bold rounded rounded-md bg-violet-700 hover:bg-violet-800 mx-5 mt-6 mb-7 h-12 flex justify-center items-center'
      to={'/newoffer'}>Add new offer</NavLink>
  );
};

export default AddNewOfferButton;