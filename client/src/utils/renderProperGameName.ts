export const renderProperGameName = (gameName: string) => {
  switch (gameName) {
    case "lol":
      return "LOL";
    case "valorant":
      return "Valorant";
    case "csgo":
      return "CS:GO";
    default:
      return "Unranked";
  }
};
