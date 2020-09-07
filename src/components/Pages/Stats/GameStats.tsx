import { faArrowLeft, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { dateFormat } from 'src/components/App';
import { Topbar } from 'src/components/Layout/Topbar';
import { PlayerRadar } from 'src/components/Pages/Stats/PlayerRadar';
import { SetMultipleSelector } from 'src/components/Pages/Stats/SetMultipleSelector';
import { SetTimeChart } from 'src/components/Pages/Stats/SetTimeChart';
import { TeamStats } from 'src/components/Pages/Stats/TeamStats';
import { TeamTableStats } from 'src/components/Pages/Stats/TeamTableStats';
import { GameEvent, gameEvents, getKey, getSetDuration, getTotalDuration, Player } from 'src/models';
import { buildUrl, Urls } from 'src/routing';
import { RootState } from 'src/store/store';
import styled from 'styled-components';

const { Title } = Typography;

export const GameStats = (): JSX.Element => {
  const { id } = useParams();
  const history = useHistory();
  const [selectedSets, setSelectedSets]: [string[], any] = useState([]);
  const game = useSelector((state: RootState) => state.games.entities[id]);

  useEffect(() => {
    setSelectedSets(Object.keys(game.sets).map((s) => 'Set ' + (parseInt(s, 10) + 1)));
  }, [game]);

  const getAllEvents = (): GameEvent[] => {
    return [
      ...game.sets
        .filter((s, i) => selectedSets.includes('Set ' + (i + 1)))
        .map((set) => set.events.filter((event) => gameEvents.includes(event.type))),
    ].flat();
  };

  const getPlayerStats = (): any => {
    return game.team1.players.map((player: Player) => {
      const s: any = { key: getKey(player) };

      gameEvents.forEach((eventType) => {
        s[eventType] = getAllEvents().filter(
          (event) =>
            event.player.name === player.name && event.player.number === player.number && event.type === eventType
        );
      });

      return s;
    });
  };

  const handleSelectedSetsChanged = (values: string[]): void => {
    const newSelectedSets =
      values.length === 0 ? Object.keys(game.sets).map((s) => 'Set ' + (parseInt(s, 10) + 1)) : values;
    setSelectedSets(newSelectedSets);
  };

  const setsInfo = (): string => {
    return selectedSets.length === 5 ? '(match complet)' : '(sets ' + selectedSets.map((s) => s[4]).join(',') + ')';
  };

  return (
    <>
      <Topbar />

      {game && (
        <StyledGameStats>
          <Row>
            <Col>
              <Title level={2}>
                {game.team1.name} vs {game.team2.name}, le {dayjs(game.at).format(dateFormat)} (
                {getTotalDuration(game) + ' minutes'})
              </Title>

              <div className="buttons">
                <Button
                  type="primary"
                  icon={<FontAwesomeIcon icon={faArrowLeft} />}
                  onClick={(): void => history.push(buildUrl(Urls.GAME, [{ parameter: 'id', value: game.id }]))}
                >
                  Retour au match
                </Button>
                <Button
                  type="primary"
                  icon={<FontAwesomeIcon icon={faUsers} />}
                  onClick={(): void =>
                    history.push(buildUrl(Urls.TEAM_MANAGEMENT, [{ parameter: 'id', value: game.id }]))
                  }
                >
                  Équipe
                </Button>
              </div>

              <SetMultipleSelector game={game} selectedSets={selectedSets} onSetsChanged={handleSelectedSetsChanged} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} lg={8}>
              {game.sets.map((set, index) => (
                <React.Fragment key={index}>
                  <Title level={4}>
                    Set {index + 1} : {set.team1Score}•{set.team2Score} ({getSetDuration(set) + ' minutes'})
                  </Title>
                  <SetTimeChart game={game} set={set} isFifthSet={index === 4} />
                </React.Fragment>
              ))}
            </Col>

            <Col xs={24} lg={16}>
              <Title level={4}>Stats équipe {setsInfo()}</Title>
              <TeamStats events={getAllEvents()} sets={game.sets} />

              <Title level={4}>Stats joueurs {setsInfo()}</Title>
              <div className="radarWrapper">
                {game.team1.players.map((player) => (
                  <PlayerRadar
                    key={getKey(player)}
                    playerStats={getPlayerStats().find((stats) => stats.key === getKey(player))}
                  />
                ))}
              </div>
              <div className="table-wrapper">
                <TeamTableStats playerStats={getPlayerStats()} />
              </div>
            </Col>
          </Row>
        </StyledGameStats>
      )}
    </>
  );
};

const StyledGameStats = styled.div`
  height: calc(100vh - 80px);
  padding: 16px;

  .chartCol {
    padding: 16px;
  }

  .radarWrapper {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
  }

  h4 {
    margin: 8px 0px;
  }

  .buttons {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    > * {
      margin-right: 8px;
    }
  }

  .table-wrapper {
    overflow-x: scroll;
  }
`;
