import axios from 'axios';
import { useEffect } from 'react';

import { AddOffertForm } from './AddOffertForm';

const AddOffertPage = (): JSX.Element => {
  useEffect(() => {
    (() => {
      axios.get('/offert/getAll')
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
    })();
  });

  return (
    <div>
      <AddOffertForm />
    </div>    
  )
};

export default AddOffertPage;