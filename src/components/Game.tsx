import { grey } from '@ant-design/colors';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ActionGrid } from 'src/components/ActionGrid';
import { colLayout } from 'src/components/App';
import { ScoreEditor } from 'src/components/ScoreEditor';
import { SetSelector } from 'src/components/SetSelector';
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

export const Game = (): JSX.Element => {
  const { id } = useParams();
  const history = useHistory();
  const game = useSelector((state: RootState) => state.games.entities[id]);
  const dispatch = useDispatch();
  const [set, setSet] = useState(game ? game.sets.length - 1 : 0);

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
              <SetSelector
                game={game}
                selectedSet={set}
                onSetChanged={(set: number): any => setSet(set)}
                onAddSet={(): any => dispatch(addSet(game))}
              />
            </Col>
            <Col className="team-names">
              <span>{game.team1.name}</span>
              <span>{game.team2.name}</span>
            </Col>
            <Col className="header">
              <ScoreEditor
                t1Score={game.sets[set].team1Score}
                t2Score={game.sets[set].team2Score}
                onIncrementT1={handleIncrementT1}
                onDecrementT1={handleDecrementT1}
                onIncrementT2={handleIncrementT2}
                onDecrementT2={handleDecrementT2}
              />
            </Col>
            <Col className="actions" {...colLayout}>
              <div className="links">
                <button
                  className="link team"
                  onClick={(): void =>
                    history.push(buildUrl(Urls.TEAM_MANAGEMENT, [{ parameter: 'id', value: game.id }]))
                  }
                >
                  Gérer mon équipe
                </button>
                <button
                  className="link stats"
                  onClick={(): void => history.push(buildUrl(Urls.GAME_STATS, [{ parameter: 'id', value: game.id }]))}
                >
                  Statistiques
                </button>
              </div>
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
  }

  .actions .links {
    margin: auto;
    display: flex;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 8px;

    button {
      margin: 4px;
    }
  }
`;
