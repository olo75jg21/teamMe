import axios from 'axios';

export const fetchSingleUser = async (id: string, token: string) => {
  const res = await axios.get(`/users/getOneUser/${id}`, {
    headers: {
      'Authorization': 'Bearer ' +  token 
    }
  });

  return res.data;
};