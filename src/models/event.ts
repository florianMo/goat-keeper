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

export const t = (type: GameEventType, short = false): string => {
  switch (type) {
    case GameEventType.ACE:
      return 'Ace';
    case GameEventType.ATTACK:
      return short ? 'Att' : 'Attaque';
    case GameEventType.BLOCK:
      return short ? 'Bl' : 'Block';
    case GameEventType.DIG:
      return short ? 'Déf' : 'Défense';
    case GameEventType.PASS:
      return short ? 'Pa' : 'Passe';
    case GameEventType.RECEPTION:
      return short ? 'Réc' : 'Réception';
    case GameEventType.SERVICE:
      return short ? 'Ser' : 'Service';
  }

  return type;
};

export const gameEvents = [
  GameEventType.SERVICE,
  GameEventType.RECEPTION,
  GameEventType.PASS,
  GameEventType.ATTACK,
  GameEventType.BLOCK,
  GameEventType.DIG,
  GameEventType.ACE,
];
