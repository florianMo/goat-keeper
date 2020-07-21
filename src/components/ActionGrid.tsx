import { blue, lime, red } from '@ant-design/colors';
import dayjs from 'dayjs';
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
    setEventClicked({ ...event, at: dayjs().format() });
  };

  const handlePlayerClicked = (player: Player): void => {
    props.onAddAction({ ...(eventClicked as any), player });
    setEventClicked(undefined);
  };

  const positiveEvents = Object.values(GameEventType).filter(
    (type) =>
      ![
        GameEventType.T1_SCORE_DECREMENT,
        GameEventType.T1_SCORE_INCREMENT,
        GameEventType.T1_SCORE_UPDATE,
        GameEventType.T2_SCORE_DECREMENT,
        GameEventType.T2_SCORE_INCREMENT,
        GameEventType.T2_SCORE_UPDATE,
      ].includes(type)
  );

  const negativeEvents = Object.values(GameEventType).filter(
    (type) =>
      ![
        GameEventType.T1_SCORE_DECREMENT,
        GameEventType.T1_SCORE_INCREMENT,
        GameEventType.T1_SCORE_UPDATE,
        GameEventType.T2_SCORE_DECREMENT,
        GameEventType.T2_SCORE_INCREMENT,
        GameEventType.T2_SCORE_UPDATE,
        GameEventType.ACE,
      ].includes(type)
  );

  return (
    <StyledActionGrid>
      {!eventClicked && (
        <>
          <div className="topline">
            <span>Que s&apos;est-il passé ?</span>
          </div>
          <div className="side success">
            {positiveEvents.map((type) => (
              <ActionButton key={type} event={{ type: type, positive: true }} onClick={handleActionClicked} />
            ))}
          </div>
          <div className="side failure">
            {negativeEvents.map((type) => (
              <ActionButton key={type} event={{ type: type, positive: false }} onClick={handleActionClicked} />
            ))}
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

  .side,
  .players {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 16px;
  }

  .side {
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
    background-color: ${blue[1]};
    border: 2px solid ${blue[3]};
  }
`;
