import { blue, green, grey, red } from '@ant-design/colors';
import { faMinusCircle, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Radio, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GameEvent } from 'src/models/event';
import {
  addEvent,
  addSet,
  decrementTeam1,
  decrementTeam2,
  incrementTeam1,
  incrementTeam2,
} from 'src/store/slices/gameSlice';
import { RootState } from 'src/store/store';
import styled from 'styled-components';

import { ActionGrid } from './ActionGrid';
import Topbar from './Topbar';

const { Title } = Typography;

enum LeaderCode {
  EQ = 'EQ',
  T1 = 'T1',
  T2 = 'T2',
}

const Game = (): JSX.Element => {
  const { id } = useParams();
  const game = useSelector((state: RootState) => state.games.entities[id]);
  const dispatch = useDispatch();
  const [set, setSet] = useState(game ? game.sets.length - 1 : 0);
  let leader: LeaderCode = LeaderCode.EQ;

  if (game) {
    leader =
      game.sets[set].team1Score > game.sets[set].team2Score
        ? LeaderCode.T1
        : game.sets[set].team1Score < game.sets[set].team2Score
        ? LeaderCode.T2
        : LeaderCode.EQ;
  }

  const handleAddAction = (event: GameEvent): void => {
    const value = { game, set, event } as any;
    dispatch(addEvent(value));
  };

  return (
    <>
      <Topbar />

      {game && (
        <StyledGame>
          <Row>
            <Col className="date">{dayjs(game.at).format('DD/MM/YYYY')}</Col>
            <Col className="setSelector">
              <Radio.Group onChange={(e): void => setSet(e.target.value)} value={set} buttonStyle="solid" size="large">
                {game.sets.map((set, index) => (
                  <Radio.Button key={index} value={index}>
                    Set {index + 1} ({set.team1Score}-{set.team2Score})
                  </Radio.Button>
                ))}
              </Radio.Group>

              {game.sets.length < 5 && (
                <Button type="primary" onClick={(): any => dispatch(addSet(game))} size="large">
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              )}
            </Col>
            <Col className="header">
              <div className="side left">
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  size="3x"
                  onClick={(): any => dispatch(incrementTeam1({ game, set }))}
                />
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  size="3x"
                  onClick={(): any => dispatch(decrementTeam1({ game, set }))}
                />
                <Title level={2}>{game.team1.name}</Title>
                <span className={`score t1 leader${leader}`}>{game.sets[set].team1Score}</span>
              </div>
              <div className="side">
                <span className={`score t2 leader${leader}`}>{game.sets[set].team2Score}</span>
                <Title level={2}>{game.team2.name}</Title>
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  size="3x"
                  onClick={(): any => dispatch(incrementTeam2({ game, set }))}
                />
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  size="3x"
                  onClick={(): any => dispatch(decrementTeam2({ game, set }))}
                />
              </div>
            </Col>
            <Col className="actions" xs={{ span: 20, offset: 2 }} lg={{ span: 10, offset: 7 }}>
              <ActionGrid team={game.team1.players} onAddAction={handleAddAction} />
            </Col>
          </Row>
        </StyledGame>
      )}
    </>
  );
};

const StyledGame = styled.div`
  height: calc(100vh - 80px);
  padding: 8px;

  .date {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 24px;
  }

  .setSelector {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 12px 0px;

    .ant-radio-button-wrapper {
      width: 120px;
      text-align: center;
    }

    button {
      margin-left: 8px;
    }
  }

  .header {
    display: flex;
    width: 100%;
    justify-content: center;

    .side {
      display: flex;
      align-items: center;
      user-select: none;

      h2 {
        width: 150px;
        margin: 0 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${grey[5]};
      }

      &.left h2 {
        text-align: right;
      }

      .score {
        width: 80px;
        text-align: center;
        font-size: 36px;
        padding: 4px;
        margin: 4px;
        background-color: ${blue[5]};
        color: white;
        border-radius: 4px;

        &.t1.leaderT1,
        &.t2.leaderT2 {
          background-color: ${green[6]};
        }

        &.t1.leaderT2,
        &.t2.leaderT1 {
          background-color: ${red[6]};
        }
      }

      svg {
        margin: 8px;
        cursor: pointer;
      }
    }
  }
`;

export default Game;
