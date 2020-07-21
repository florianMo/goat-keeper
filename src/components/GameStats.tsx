import { Col, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { colLayout, dateFormat } from 'src/components/App';
import { SetTimeChart } from 'src/components/SetTimeChart';
import { Topbar } from 'src/components/Topbar';
import { duration } from 'src/models';
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
            <Col {...colLayout}>
              <Title level={2}>
                {game.team1.name} vs {game.team2.name}, le {dayjs(game.at).format(dateFormat)}
              </Title>
            </Col>

            <Col {...colLayout}>
              {game.sets.map((set, index) => (
                <React.Fragment key={index}>
                  <Title level={4}>
                    Set {index + 1} ({duration(set) + ' minutes'})
                  </Title>
                  <SetTimeChart game={game} set={set} />
                </React.Fragment>
              ))}
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
`;
