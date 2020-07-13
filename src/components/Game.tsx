import { blue, cyan, grey, lime, red } from '@ant-design/colors';
import { faChevronDown, faChevronUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Radio, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ActionGrid } from 'src/components/ActionGrid';
import { Topbar } from 'src/components/Topbar';
import { GameEvent } from 'src/models/event';
import { DATE_FORMAT, MAX_SCORE, MIN_SCORE } from 'src/models/game';
import { buildUrl, Urls } from 'src/routing';
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

import { colLayout } from './App';

enum LeaderCode {
  EQ = 'EQ',
  T1 = 'T1',
  T2 = 'T2',
}

export const Game = (): JSX.Element => {
  const { id } = useParams();
  const history = useHistory();
  const game = useSelector((state: RootState) => state.games.entities[id]);
  const dispatch = useDispatch();
  const [set, setSet] = useState(game ? game.sets.length - 1 : 0);

  const leader: LeaderCode =
    game.sets[set].team1Score > game.sets[set].team2Score
      ? LeaderCode.T1
      : game.sets[set].team1Score < game.sets[set].team2Score
      ? LeaderCode.T2
      : LeaderCode.EQ;

  const handleIncrementT1 = (): void => {
    if (game.sets[set].team1Score < MAX_SCORE) {
      dispatch(incrementTeam1({ game, set }));
    }
  };

  const handleIncrementT2 = (): void => {
    if (game.sets[set].team2Score < MAX_SCORE) {
      dispatch(incrementTeam2({ game, set }));
    }
  };

  const handleDecrementT1 = (): void => {
    if (game.sets[set].team1Score > MIN_SCORE) {
      dispatch(decrementTeam1({ game, set }));
    }
  };

  const handleDecrementT2 = (): void => {
    if (game.sets[set].team2Score > MIN_SCORE) {
      dispatch(decrementTeam2({ game, set }));
    }
  };

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
            <Col className="date">{dayjs(game.at).format(DATE_FORMAT)}</Col>
            <Col className="setSelector">
              <Radio.Group onChange={(e): void => setSet(e.target.value)} value={set} buttonStyle="solid" size="large">
                {game.sets.map((set, index) => (
                  <Radio.Button key={index} value={index}>
                    {set.team1Score}•{set.team2Score}
                  </Radio.Button>
                ))}
              </Radio.Group>

              {game.sets.length < 5 && (
                <Button type="primary" onClick={(): any => dispatch(addSet(game))} size="large">
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              )}
            </Col>
            <Col className="team-names">
              <span>{game.team1.name}</span>
              <span>{game.team2.name}</span>
            </Col>
            <Col className="header">
              <div className="side left">
                <span className={`score t1 leader${leader}`}>{game.sets[set].team1Score}</span>
                <div className="score-controls">
                  <FontAwesomeIcon icon={faChevronUp} size="lg" onClick={handleIncrementT1} />
                  <FontAwesomeIcon icon={faChevronDown} size="lg" onClick={handleDecrementT1} />
                </div>
              </div>
              <div className="side right">
                <div className="score-controls">
                  <FontAwesomeIcon icon={faChevronUp} size="lg" onClick={handleIncrementT2} />
                  <FontAwesomeIcon icon={faChevronDown} size="lg" onClick={handleDecrementT2} />
                </div>
                <span className={`score t2 leader${leader}`}>{game.sets[set].team2Score}</span>
              </div>
            </Col>
            <Col className="actions" {...colLayout}>
              <button
                className="link team"
                onClick={(): void =>
                  history.push(buildUrl(Urls.TEAM_MANAGEMENT, [{ parameter: 'id', value: game.id }]))
                }
              >
                Gérer mon équipe
              </button>
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
      width: 48px;
      padding: 0px 2px;
      text-align: center;
    }

    button {
      margin-left: 8px;
    }
  }

  .team-names {
    display: flex;
    width: 100%;

    span {
      font-size: 40px;
      flex: 0 0 50%;
      padding: 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${grey[5]};

      &:nth-child(1) {
        text-align: right;
      }
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

      svg {
        transition: 0.3s all;
        color: ${cyan[8]};

        &:hover {
          color: ${cyan[6]};
        }
      }

      .score {
        width: 80px;
        text-align: center;
        font-size: 44px;
        font-weight: 700;
        padding: 4px;
        margin: 4px;
        background-color: ${blue[4]};
        color: white;
        border-radius: 4px;

        &.t1.leaderT1,
        &.t2.leaderT2 {
          background-color: ${lime[7]};
        }

        &.t1.leaderT2,
        &.t2.leaderT1 {
          background-color: ${red[6]};
        }
      }

      .score-controls {
        width: 40px;
        padding: 4px;
        display: flex;
        flex-direction: column;
        background-color: ${cyan[8]};

        svg {
          color: white;
          margin: 8px;
          cursor: pointer;
          transition: 0.3s all;

          &:hover {
            color: ${cyan[7]};
          }
        }
      }

      &.left {
        margin-right: 2px;

        .score {
          margin-right: 0px;
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
        }

        .score-controls {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }

      &.right {
        margin-left: 2px;

        .score {
          margin-left: 0px;
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
        }

        .score-controls {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
      }
    }
  }

  .actions button.team {
    display: block;
    margin: auto;
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;
