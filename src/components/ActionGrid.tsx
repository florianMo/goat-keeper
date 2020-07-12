import React, { useState } from 'react';
import { Player } from 'src/models/player';
import styled from 'styled-components';

import { GameEvent, GameEventType } from '../models/event';
import { ActionButton } from './ActionButton';
import { PlayerButton } from './PlayerButton';

interface ActionGridProps {
  team: Player[];
  onAddAction: (event: GameEvent) => void;
}

export const ActionGrid: React.FC<ActionGridProps> = (props: ActionGridProps): JSX.Element => {
  const [eventClicked, setEventClicked]: [GameEvent | undefined, any] = useState(undefined);

  const handleActionClicked = (event: GameEvent): void => {
    setEventClicked(event);
  };

  const handlePlayerClicked = (player: Player): void => {
    props.onAddAction({ ...(eventClicked as any), player });
    setEventClicked(undefined);
  };

  return (
    <StyledActionGrid>
      {!eventClicked && (
        <>
          <div className="topline">
            <span>Que s'est-il passé ?</span>
          </div>
          <ActionButton
            event={{ type: GameEventType.SERVICE, positive: true }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.SERVICE, positive: false }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.RECEPTION, positive: true }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.RECEPTION, positive: false }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.PASS, positive: true }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.PASS, positive: false }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.ATTACK, positive: true }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.ATTACK, positive: false }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.BLOCK, positive: true }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.BLOCK, positive: false }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.DIG, positive: true }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.DIG, positive: false }}
            onClick={(event): void => handleActionClicked(event)}
          />
          <ActionButton
            event={{ type: GameEventType.ACE, positive: true }}
            onClick={(event): void => handleActionClicked(event)}
          />
        </>
      )}

      {eventClicked && (
        <>
          <div className="topline">
            <span>
              Qui a {eventClicked.positive ? 'brillamment réussi' : '(encore) totalement foiré'} son geste{' '}
              {eventClicked.positive ? '🎉' : '🐐'} (
              <button className="link" onClick={(): void => setEventClicked(undefined)}>
                annuler
              </button>
              ) ?
            </span>
          </div>
          {props.team.map((player) => (
            <PlayerButton
              key={player.name + ':' + player.number}
              player={player}
              onClick={(player): void => handlePlayerClicked(player)}
            />
          ))}
        </>
      )}
    </StyledActionGrid>
  );
};

const StyledActionGrid = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .topline {
    width: 100%;
    display: flex;
    font-weight: bold;
    justify-content: center;

    span {
      font-size: 20px;
    }
  }
`;
