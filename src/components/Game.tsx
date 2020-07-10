import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'src/store/store';
import styled from 'styled-components';

import Topbar from './Topbar';

const Game = (): JSX.Element => {
  const { id } = useParams();
  const game = useSelector((state: RootState) => state.main.entities[id]);
  console.log(game);

  return (
    <>
      <Topbar />
      <StyledGame>
        <Row>
          <Col>this is game {id}</Col>
        </Row>
      </StyledGame>
    </>
  );
};

const StyledGame = styled.div`
  height: calc(100vh - 80px);
`;

export default Game;
