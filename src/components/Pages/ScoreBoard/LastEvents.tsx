import { grey, lime, red } from '@ant-design/colors';
import { faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { timeFormat } from 'src/components/App';
import { GameEvent, gameEvents, readable } from 'src/models';
import styled from 'styled-components';

const { Title } = Typography;

interface LastEventsProps {
  events: GameEvent[];
  onDeleteEvent: (event: GameEvent) => void;
}

export const LastEvents: React.FC<LastEventsProps> = (props: LastEventsProps): JSX.Element => {
  const events = props.events.filter((e) => gameEvents.includes(e.type));
  const eventsToDisplay = events.slice(Math.max(events.length - 10, 1)).reverse();

  return (
    <StyledLastEvents>
      <Title level={4}>10 derniers évènements</Title>
      <div className="eventBag">
        {eventsToDisplay.map((e, index) => (
          <div className={e.positive ? 'event positive' : 'event negative'} key={index}>
            <div className="text">
              <span className="player">
                {e.player.name} ({dayjs(e.at).format(timeFormat)})
              </span>
              &nbsp;
              <FontAwesomeIcon icon={faAngleRight} />
              &nbsp;
              <span className="type">{readable(e.type)}</span>
            </div>
            <FontAwesomeIcon icon={faTimes} onClick={(): void => props.onDeleteEvent(e)} />
          </div>
        ))}
      </div>
    </StyledLastEvents>
  );
};

const StyledLastEvents = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    color: ${grey[5]};
  }

  .eventBag {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;

    .event {
      padding: 6px;
      margin-bottom: 4px;
      width: fit-content;
      border-radius: 4px;
      background-color: ${lime[7]};
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.negative {
        background-color: ${red[6]};
      }

      svg[data-icon='times'] {
        margin-left: 12px;
        cursor: pointer;
      }
    }
  }
`;
