/* eslint-disable react/display-name */
import { cyan, red } from '@ant-design/colors';
import { faChartLine, faFileExport, faFileImport, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, message, Popconfirm, Row, Table, Tooltip, Typography, Upload } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { colLayout, dateFormat } from 'src/components/App';
import { Topbar } from 'src/components/Layout/Topbar';
import { SetResults } from 'src/components/Pages/GameList/SetResults';
import { countEvents, displayName, Game, generateDemoGame, getFileName, isValidGame, sortGames } from 'src/models/game';
import { buildUrl, Urls } from 'src/routing';
import { addGame, deleteGame } from 'src/store/slices/gameSlice';
import { RootState } from 'src/store/store';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const { Title } = Typography;

export const GameList = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.games.entities);

  // always generate new UUID, don't try to handle already existing games, always import
  const importGame = (file: any): boolean => {
    const reader = new FileReader();
    let newGame: Game = null;

    reader.onload = (e): void => {
      try {
        newGame = JSON.parse(e.target.result as string);
        newGame.id = uuidv4();

        if (isValidGame(newGame)) {
          dispatch(addGame(newGame));
          message.success('Match correctement importé');
        } else {
          message.error('Contenu du fichier incorrect :(');
        }
      } catch (e) {
        message.error('Contenu du fichier incorrect :(');
      }
    };
    reader.readAsText(file);

    return false;
  };

  const handleGenerateDemoGame = (): void => {
    const game = generateDemoGame();
    dispatch(addGame(game));
    message.success('Match démo correctement généré');
  };

  const columns = [
    {
      title: 'Match',
      sorter: sortGames,
      render: (game: Game): JSX.Element => (
        <div className="game-title">
          <div className="teams">{displayName(game)}</div>
          <div className="uuid">{game.id}</div>
        </div>
      ),
    },
    {
      title: 'Date',
      className: 'fit-content',
      sorter: (game1: Game, game2: Game): number => (dayjs(game1.at).isBefore(game2.at) ? -1 : 1),
      render: (game: Game): string => dayjs(game.at).format(dateFormat),
    },
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
            <a
              className="download"
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(game))}`}
              download={getFileName(game)}
            >
              <FontAwesomeIcon icon={faFileExport} size="lg" />
            </a>
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
            <div className="buttons">
              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={(): void => history.push(Urls.NEW_GAME)}
              >
                Nouveau match
              </Button>
              <Upload showUploadList={false} beforeUpload={(file: any, fileList: any): boolean => importGame(file)}>
                <Button type="primary" icon={<FontAwesomeIcon icon={faFileImport} />}>
                  Importer un match
                </Button>
              </Upload>
              <Button onClick={handleGenerateDemoGame}>Générer un match démo</Button>
            </div>

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
        </Row>
      </StyledGameList>
    </>
  );
};

const StyledGameList = styled.div`
  height: calc(100vh - 80px);
  padding: 16px;

  .game-title {
    .teams {
      font-weight: 700;
      font-size: 16px;
    }

    .uuid {
      font-size: 10px;
    }
  }

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

  .buttons {
    margin-bottom: 8px;

    > * {
      margin-right: 8px;
    }
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  a.download {
    color: rgba(0, 0, 0, 0.65);
  }
`;
