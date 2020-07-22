import { Col, Row, Tabs, Typography } from 'antd';
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

const { TabPane } = Tabs;
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

          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Évolution du score" key="1">
                  <Row>
                    {game.sets.map((set, index) => (
                      <Col xs={24} md={12} lg={12} key={index} className="chartCol">
                        <Title level={4}>
                          Set {index + 1} ({getSetDuration(set) + ' minutes'})
                        </Title>
                        <SetTimeChart game={game} set={set} />
                      </Col>
                    ))}
                  </Row>
                </TabPane>
                <TabPane tab="Stats individuelles" key="2">
                  <Row>
                    <Col span={24}>
                      <TeamTableStats game={game} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="Stats d'équipe" key="3">
                  Tab 3
                </TabPane>
              </Tabs>
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
