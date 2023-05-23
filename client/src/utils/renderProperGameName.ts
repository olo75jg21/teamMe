export const renderProperGameName = (gameName: string) => {
  switch (gameName) {
    case 'lol':
      return 'League Of Legends'
    case 'valorant':
      return 'Valorant'
    case 'csgo':
      return 'Counter-Strike Global Offensive'
  }
};