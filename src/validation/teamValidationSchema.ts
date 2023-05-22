import * as yup from 'yup';

export const yupTeamCreationSchema = yup.object({
  title: yup
    .string()
    .min(14)
    .max(64)
    .required(),
  description: yup
    .string()
    .min(30)
    .max(256)
    .required(),
  game: yup
    .string()
    .required(),
  rank: yup
    .string()
    .required(),
  teamType: yup
    .string()
    .required(),
});