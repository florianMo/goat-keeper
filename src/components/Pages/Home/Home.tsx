import { Button, Col, Row } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Topbar } from 'src/components/Layout/Topbar';
import { generateDemoGame } from 'src/models';
import { buildUrl, Urls } from 'src/routing';
import { addGame } from 'src/store/slices/gameSlice';
import styled from 'styled-components';

export const Home = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleGenerateDemoGame = (): void => {
    const game = generateDemoGame();
    dispatch(addGame(game));
    history.push(buildUrl(Urls.GAME_STATS, [{ parameter: 'id', value: game.id }]));
  };

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
              Matchs précédents
            </Button>
            <Button block size="large" onClick={handleGenerateDemoGame}>
              Générer un match démo
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
