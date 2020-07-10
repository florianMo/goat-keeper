import { Button, Col, Row } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Urls } from 'src/routes';
import styled from 'styled-components';

import Topbar from './Topbar';

const Home = (): JSX.Element => {
  const history = useHistory();

  return (
    <>
      <Topbar />
      <StyledHome>
        <Row gutter={16}>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 10, offset: 7 }}>
            <Button block size="large" type="primary" onClick={(): void => history.push(Urls.NEW_GAME)}>
              Nouveau match
            </Button>
            <Button block size="large" type="primary" onClick={(): void => history.push(Urls.GAME_HISTORY)}>
              Historique
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
    margin-top: 24px;
    font-weight: bold;
  }
`;

export default Home;
