export interface Player {
  name: string;
  number: number;
}

export const getKey = (player: Player): string => player.name + ':' + player.number;
