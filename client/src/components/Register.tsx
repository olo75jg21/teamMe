import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';

type FormValues = {
  email: string;
  username: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data)
    axios.post('/users/register', data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register("email")} />
      <input {...register("username")} />
      <input type="password" {...register("password")} />

      <input type="submit" />
    </form>
  );
}