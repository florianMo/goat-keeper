/* eslint-disable react/display-name */
import { cyan, red } from '@ant-design/colors';
import { faChartLine, faFileExport, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { colLayout, dateFormat } from 'src/components/App';
import { Topbar } from 'src/components/Layout/Topbar';
import { SetResults } from 'src/components/Pages/GameList/SetResults';
import { countEvents, displayName, Game, sortGames } from 'src/models/game';
import { buildUrl, Urls } from 'src/routing';
import { deleteGame } from 'src/store/slices/gameSlice';
import { RootState } from 'src/store/store';
import styled from 'styled-components';

const { Title } = Typography;

export const GameList = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.games.entities);

  const columns = [
    {
      title: 'Date',
      render: (game: Game): string => dayjs(game.at).format(dateFormat),
      className: 'fit-content',
      sorter: (game1: Game, game2: Game): number => (dayjs(game1.at).isBefore(game2.at) ? -1 : 1),
    },
    { title: 'Match', render: displayName, sorter: sortGames },
    { title: 'Résultat', render: (game: Game): JSX.Element => <SetResults game={game} /> },
    {
      title: 'Evts',
      sorter: (game1: Game, game2: Game): number => (countEvents(game1) > countEvents(game2) ? -1 : 1),
      render: countEvents,
    },
    {
      key: 'actions',
      className: 'actions fit-content',
      render: (game: Game): JSX.Element => (
        <>
          <Tooltip title="editer le score et les stats">
            <FontAwesomeIcon
              icon={faSearch}
              size="lg"
              onClick={(): void => history.push(buildUrl(Urls.GAME, [{ parameter: 'id', value: game.id }]))}
            />
          </Tooltip>
          <Tooltip title="visualiser les données du match">
            <FontAwesomeIcon
              icon={faChartLine}
              size="lg"
              onClick={(): void => history.push(buildUrl(Urls.GAME_STATS, [{ parameter: 'id', value: game.id }]))}
            />
          </Tooltip>
          <Tooltip title="exporter les données du match">
            <FontAwesomeIcon className="disabled" icon={faFileExport} size="lg" />
          </Tooltip>
          <Tooltip title="supprimer le match">
            <Popconfirm
              title={'sûr ?'}
              onConfirm={(): any => dispatch(deleteGame(game.id))}
              okText="Oui"
              cancelText="Non en fait"
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Topbar />

      <StyledGameList>
        <Row>
          <Col {...colLayout}>
            <Title level={2}>Matchs enregistrés sur ce navigateur</Title>
            <Table
              size="small"
              bordered={true}
              dataSource={Object.values(games).map((game) => {
                return { ...game, key: game.id };
              })}
              columns={columns}
              pagination={false}
            ></Table>
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
  padding: 16px;

  .actions {
    svg {
      cursor: pointer;
      margin-right: 8px;
      transition: 0.3s all;

      &:hover {
        color: ${cyan[8]};
      }

      &[data-icon='trash']:hover {
        color: ${red[5]};
      }
    }
  }

  .fit-content {
    width: 1%;
    white-space: nowrap;
  }

  button {
    margin-top: 16px;
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`;
