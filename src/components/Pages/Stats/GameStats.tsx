import { Col, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dateFormat } from 'src/components/App';
import { Topbar } from 'src/components/Layout/Topbar';
import { PlayerRadar } from 'src/components/Pages/Stats/PlayerRadar';
import { SetTimeChart } from 'src/components/Pages/Stats/SetTimeChart';
import { TeamStats } from 'src/components/Pages/Stats/TeamStats';
import { TeamTableStats } from 'src/components/Pages/Stats/TeamTableStats';
import { gameEvents, getKey, getSetDuration, getTotalDuration, Player } from 'src/models';
import { RootState } from 'src/store/store';
import styled from 'styled-components';

const { Title } = Typography;

export const GameStats = (): JSX.Element => {
  const { id } = useParams();
  const game = useSelector((state: RootState) => state.games.entities[id]);

  const allEvents = [...game.sets.map((set) => set.events.filter((event) => gameEvents.includes(event.type)))].flat();
  const playerStats = game.team1.players.map((player: Player) => {
    const s: any = { key: getKey(player) };

    gameEvents.forEach((eventType) => {
      s[eventType] = allEvents.filter(
        (event) =>
          event.player.name === player.name && event.player.number === player.number && event.type === eventType
      );
    });

    return s;
  });

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
              <Title level={4}>Stats équipe</Title>
              <TeamStats events={allEvents} sets={game.sets} />

              <Title level={4}>Stats joueurs</Title>
              <TeamTableStats playerStats={playerStats} />

              <div className="radarWrapper">
                {game.team1.players.map((player) => (
                  <PlayerRadar
                    key={getKey(player)}
                    playerStats={playerStats.find((stats) => stats.key === getKey(player))}
                  />
                ))}
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
  padding: 8px;

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
`;
