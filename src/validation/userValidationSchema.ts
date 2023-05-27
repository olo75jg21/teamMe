import * as yup from "yup";

export const yupUserRegistrationSchema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().min(5).max(14).required(),
  password: yup.string().min(8).max(64).required(),
  age: yup.number().min(16).max(130).required(),
  gender: yup.string().required(),
});

export const yupUserLoginSchema = yup.object({
  email: yup.string().email(),
  password: yup.string().required(),
});
