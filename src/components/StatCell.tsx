import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { GameEvent, GameEventType } from 'src/models';
import styled from 'styled-components';

interface StatCellProps {
  events: any;
  type: GameEventType;
  percentage: number;
}

export const StatCell: React.FC<StatCellProps> = (props: StatCellProps): JSX.Element => {
  return (
    <StyledStatCell>
      <div>
        {props.type !== GameEventType.ACE
          ? props.percentage +
            '% (' +
            props.events.filter((s: GameEvent) => s.positive).length +
            '/' +
            props.events.length +
            ')'
          : props.events.length}
      </div>
      {props.percentage > 90 && props.type !== GameEventType.ACE && <FontAwesomeIcon icon={faStar} />}
    </StyledStatCell>
  );
};

const StyledStatCell = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: white;
  }
`;
