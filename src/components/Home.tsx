import { Button, Col, Row } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Topbar } from 'src/components/Topbar';
import { Urls } from 'src/routes';
import styled from 'styled-components';

const Home = (): JSX.Element => {
  const history = useHistory();

  return (
    <>
      <Topbar />
      <StyledHome>
        <Row>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
            <Button block size="large" type="primary" onClick={(): void => history.push(Urls.NEW_GAME)}>
              Nouveau match
            </Button>
            <Button block size="large" type="primary" onClick={(): void => history.push(Urls.GAME_LIST)}>
              Matchs enregistrés sur cette machine
            </Button>
          </Col>
        </Row>
      </StyledHome>
    </>
  );
};

const StyledHome = styled.div`
  height: calc(100vh - 80px);

  button {
    font-size: 24px;
    margin-top: 24px;
    font-weight: bold;
    height: 100px;
  }
`;

export default Home;
