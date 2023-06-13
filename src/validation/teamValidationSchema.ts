import * as yup from "yup";

export const yupTeamCreationSchema = yup.object({
  name: yup.string().min(4).max(20).required(),
  title: yup.string().min(14).max(64).required(),
  description: yup.string().min(30).max(256).required(),
  game: yup.string().required(),
  minRank: yup.string().required(),
  maxRank: yup.string().required(),
  teamType: yup.string().required(),
});
