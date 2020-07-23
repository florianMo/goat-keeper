import { Col, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dateFormat } from 'src/components/App';
import { SetTimeChart } from 'src/components/SetTimeChart';
import { TeamTableStats } from 'src/components/TeamTableStats';
import { Topbar } from 'src/components/Topbar';
import { getSetDuration, getTotalDuration } from 'src/models';
import { RootState } from 'src/store/store';
import styled from 'styled-components';

const { Title } = Typography;

export const GameStats = (): JSX.Element => {
  const { id } = useParams();
  const game = useSelector((state: RootState) => state.games.entities[id]);

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
            <Col xs={24} lg={6}>
              {game.sets.map((set, index) => (
                <React.Fragment key={index}>
                  <Title level={4}>
                    Set {index + 1} ({getSetDuration(set) + ' minutes'})
                  </Title>
                  <SetTimeChart game={game} set={set} />
                </React.Fragment>
              ))}
            </Col>

            <Col xs={24} lg={18} xxl={12}>
              <Title level={4}>Stats joueurs</Title>
              <TeamTableStats game={game} />
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
`;
