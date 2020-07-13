import { lime, red } from '@ant-design/colors';
import React, { useState } from 'react';
import { ActionButton } from 'src/components/ActionButton';
import { PlayerButton } from 'src/components/PlayerButton';
import { GameEvent, GameEventType, Player } from 'src/models';
import styled from 'styled-components';

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
            <span>Que s&apos;est-il passé ?</span>
          </div>
          <div className="side success">
            <ActionButton
              event={{ type: GameEventType.SERVICE, positive: true }}
              onClick={(event): void => handleActionClicked(event)}
            />
            <ActionButton
              event={{ type: GameEventType.RECEPTION, positive: true }}
              onClick={(event): void => handleActionClicked(event)}
            />
            <ActionButton
              event={{ type: GameEventType.PASS, positive: true }}
              onClick={(event): void => handleActionClicked(event)}
            />
            <ActionButton
              event={{ type: GameEventType.ATTACK, positive: true }}
              onClick={(event): void => handleActionClicked(event)}
            />
            <ActionButton
              event={{ type: GameEventType.BLOCK, positive: true }}
              onClick={(event): void => handleActionClicked(event)}
            />
            <ActionButton
              event={{ type: GameEventType.DIG, positive: true }}
              onClick={(event): void => handleActionClicked(event)}
            />
            <ActionButton
              event={{ type: GameEventType.ACE, positive: true }}
              onClick={(event): void => handleActionClicked(event)}
            />
          </div>
          <div className="side failure">
            <ActionButton
              event={{ type: GameEventType.SERVICE, positive: false }}
              onClick={(event): void => handleActionClicked(event)}
            />

            <ActionButton
              event={{ type: GameEventType.RECEPTION, positive: false }}
              onClick={(event): void => handleActionClicked(event)}
            />

            <ActionButton
              event={{ type: GameEventType.PASS, positive: false }}
              onClick={(event): void => handleActionClicked(event)}
            />

            <ActionButton
              event={{ type: GameEventType.ATTACK, positive: false }}
              onClick={(event): void => handleActionClicked(event)}
            />

            <ActionButton
              event={{ type: GameEventType.BLOCK, positive: false }}
              onClick={(event): void => handleActionClicked(event)}
            />

            <ActionButton
              event={{ type: GameEventType.DIG, positive: false }}
              onClick={(event): void => handleActionClicked(event)}
            />
          </div>
        </>
      )}

      {eventClicked && (
        <>
          <div className="topline">
            <span>
              Qui a {eventClicked.positive ? 'brillamment réussi' : '(encore) totalement foiré'} son geste (
              <button className="link" onClick={(): void => setEventClicked(undefined)}>
                annuler
              </button>
              ) ?
            </span>
          </div>
          <div className="players">
            {props.team.map((player) => (
              <PlayerButton
                key={player.name + ':' + player.number}
                player={player}
                onClick={(player): void => handlePlayerClicked(player)}
              />
            ))}
          </div>
        </>
      )}
    </StyledActionGrid>
  );
};

const StyledActionGrid = styled.div`
  margin-top: 24px;

  .topline {
    width: 100%;
    display: flex;
    font-weight: bold;
    justify-content: center;

    span {
      font-size: 20px;
    }

    button.link {
      font-weight: 700;
    }
  }

  .side {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;

    &.success {
      background-color: ${lime[1]};
      border: 2px solid ${lime[3]};
    }

    &.failure {
      background-color: ${red[1]};
      border: 2px solid ${red[3]};
    }
  }

  .players {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
  }
`;
