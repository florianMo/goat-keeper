import { Player } from './player';

export interface GameEvent {
  type: GameEventType;
  positive?: boolean;
  player?: Player;
  value?: number;
  at?: string;
}

export enum GameEventType {
  SERVICE = 'SERVICE',
  RECEPTION = 'RECEPTION',
  PASS = 'PASS',
  ATTACK = 'ATTACK',
  BLOCK = 'BLOCK',
  DIG = 'DIG',
  ACE = 'ACE',
  T1_SCORE_UPDATE = 'T1_SCORE_UPDATE',
  T2_SCORE_UPDATE = 'T2_SCORE_UPDATE',
}

export const t = (type: GameEventType): string => {
  switch (type) {
    case GameEventType.ACE:
      return 'Ace';
    case GameEventType.ATTACK:
      return 'Attaque';
    case GameEventType.BLOCK:
      return 'Block';
    case GameEventType.DIG:
      return 'Défense';
    case GameEventType.PASS:
      return 'Passe';
    case GameEventType.RECEPTION:
      return 'Réception';
    case GameEventType.SERVICE:
      return 'Service';
  }

  return type;
};
