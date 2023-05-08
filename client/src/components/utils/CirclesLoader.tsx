import { Circles } from 'react-loader-spinner';

const CirclesLoader = (): JSX.Element => {
  return (
    <div className='ml-28'>
      <Circles
        height="80"
        width="80"
        color="#5b21b6"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default CirclesLoader;