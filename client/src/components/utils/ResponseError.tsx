interface ResponseErrorProps {
  message: string;
};

const ResponseError = ({ message }: ResponseErrorProps): JSX.Element => {
  return message !== '' ? (
    <div className='block text-red-700 text-sm font-bold mb-4'>
      {message}
    </div>
  ) : <></>;
};

export default ResponseError;