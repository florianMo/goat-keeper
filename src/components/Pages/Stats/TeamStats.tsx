import { cyan, lime, orange, red, yellow } from '@ant-design/colors';
import React from 'react';
import { GameEvent, gameEvents, GameEventType, GameSet, readable } from 'src/models';
import styled from 'styled-components';

interface TeamStatsProps {
  events: GameEvent[];
  sets: GameSet[];
}

export const TeamStats: React.FC<TeamStatsProps> = (props: TeamStatsProps): JSX.Element => {
  const getStatPercentage = (eventType: GameEventType): number => {
    const events = props.events.filter((e) => e.type === eventType);

    return +((events.filter((s: GameEvent) => s.positive).length * 100) / events.length).toFixed(0) || 0;
  };

  const percentages = {};
  gameEvents
    .filter((e) => e !== GameEventType.ACE)
    .forEach((e) => {
      percentages[e] = getStatPercentage(e);
    });

  const scored = props.sets.reduce((total, set) => total + set.team1Score, 0);
  const lost = props.sets.reduce((total, set) => total + set.team2Score, 0);

  return (
    <StyledTeamStats>
      <div className="points">
        <span className="eventType">Points</span>
        <span className="value">
          {scored}/{lost}
        </span>
      </div>
      {gameEvents.map((e) => (
        <div
          key={e}
          className={
            percentages[e] < 25 ? 'xlow' : percentages[e] < 50 ? 'low' : percentages[e] < 75 ? 'high' : 'xhigh'
          }
        >
          <span className="eventType">{readable(e)}</span>
          <span className="value">
            {e !== GameEventType.ACE
              ? getStatPercentage(e) + '%'
              : props.events.filter((e) => e.type === GameEventType.ACE).length}
          </span>
          {e !== GameEventType.ACE && (
            <span className="numbers">
              {props.events.filter((t) => t.type === e && t.positive).length}/
              {props.events.filter((t) => t.type === e).length}
            </span>
          )}
        </div>
      ))}
    </StyledTeamStats>
  );
};

const StyledTeamStats = styled.div`
  display: flex;
  flex-wrap: wrap;

  div {
    width: 140px;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 24px;
    margin: 4px;

    .eventType {
      font-size: 24px;
    }

    .value {
      font-size: 48px;
    }

    .numbers {
      opacity: 0.8;
    }

    &.xlow {
      background-color: ${red[4]};
    }
    &.low {
      background-color: ${orange[4]};
    }
    &.high {
      background-color: ${yellow[4]};
    }
    &.xhigh {
      background-color: ${lime[4]};
    }

    &.points {
      background-color: ${cyan[6]};

      .value {
        font-size: 36px;
      }
    }
  }
`;
