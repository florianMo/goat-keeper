import { cyan, lime, red } from '@ant-design/colors';
import {
  faChartLine,
  faCheckCircle,
  faFileExport,
  faSearch,
  faTimesCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, List, Popconfirm, Row, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SetResults } from 'src/components/SetResults';
import { Topbar } from 'src/components/Topbar';
import { isWon } from 'src/models/game';
import { buildUrl, Urls } from 'src/routing';
import { deleteGame } from 'src/store/slices/gameSlice';
import { RootState } from 'src/store/store';
import styled from 'styled-components';

import { colLayout, dateFormat } from './App';

const { Title } = Typography;

export const GameList = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.games.entities);

  return (
    <>
      <Topbar />

      <StyledGameList>
        <Row>
          <Col {...colLayout}>
            <Title level={2}>Matchs enregistrés sur ce navigateur</Title>
            <List
              bordered
              itemLayout="horizontal"
              size="large"
              dataSource={Object.values(games).map((game) => game)}
              renderItem={(game): JSX.Element => (
                <List.Item
                  actions={[
                    <Tooltip key="view" title="editer le score et les stats">
                      <FontAwesomeIcon
                        icon={faSearch}
                        size="lg"
                        onClick={(): void => history.push(buildUrl(Urls.GAME, [{ parameter: 'id', value: game.id }]))}
                      />
                    </Tooltip>,
                    <Tooltip key="stats" title="visualiser les données du match">
                      <FontAwesomeIcon
                        icon={faChartLine}
                        size="lg"
                        onClick={(): void =>
                          history.push(buildUrl(Urls.GAME_STATS, [{ parameter: 'id', value: game.id }]))
                        }
                      />
                    </Tooltip>,
                    <Tooltip key="export" title="exporter les données du match">
                      <FontAwesomeIcon
                        icon={faFileExport}
                        size="lg"
                        onClick={(): void => history.push(buildUrl(Urls.GAME, [{ parameter: 'id', value: game.id }]))}
                      />
                    </Tooltip>,
                    <Tooltip key="delete" title="supprimer le match">
                      <Popconfirm
                        title={'sûr ?'}
                        onConfirm={(): any => dispatch(deleteGame(game.id))}
                        okText="Oui"
                        cancelText="Non en fait"
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </Popconfirm>
                    </Tooltip>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<FontAwesomeIcon size="3x" icon={isWon(game) ? faCheckCircle : faTimesCircle} />}
                    title={game.team1.name + ' vs ' + game.team2.name + ', le ' + dayjs(game.at).format(dateFormat)}
                    description={<SetResults game={game} />}
                  />
                </List.Item>
              )}
            />
          </Col>

          <Col className="button" {...colLayout}>
            <Button size="large" type="primary" block onClick={(): void => history.push(Urls.NEW_GAME)}>
              Nouveau match
            </Button>
          </Col>
        </Row>
      </StyledGameList>
    </>
  );
};

const StyledGameList = styled.div`
  height: calc(100vh - 80px);
  padding: 8px;

  .ant-list-item-meta-title {
    font-size: 18px;
    font-weight: 700;
  }

  .ant-list-item-meta-description {
    font-size: 16px;
  }

  svg[data-icon='check-circle'] {
    color: ${lime[7]};
  }

  svg[data-icon='times-circle'] {
    color: ${red[6]};
  }

  .button {
    margin-top: 16px;

    button {
      height: 56px;
    }

    span {
      font-weight: bold;
      font-size: 24px;
    }
  }

  .ant-list-item-action {
    svg {
      transition: 0.3s all;

      &:hover {
        color: ${cyan[8]};
      }

      &[data-icon='trash']:hover {
      color: ${red[5]};
    }
  }
`;
