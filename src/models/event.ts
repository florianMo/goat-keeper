import { Player } from './player';

export interface GameEvent {
  type: GameEventType;
  positive?: boolean;
  player?: Player;
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
  T1_SCORE_INCREMENT = 'T1_SCORE_INCREMENT',
  T1_SCORE_DECREMENT = 'T1_SCORE_DECREMENT',
  T2_SCORE_INCREMENT = 'T2_SCORE_INCREMENT',
  T2_SCORE_DECREMENT = 'T2_SCORE_DECREMENT',
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