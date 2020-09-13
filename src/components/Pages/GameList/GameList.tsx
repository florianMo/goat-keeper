/* eslint-disable react/display-name */
import {
  faChartLine,
  faFileExport,
  faFileImport,
  faPlus,
  faRandom,
  faSearch,
  faTrash,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, message, Popconfirm, Row, Table, Tooltip, Typography, Upload } from 'antd';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import dayjs from 'dayjs';
import React from 'react';
import ReactGa from 'react-ga';
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

const { Title, Paragraph } = Typography;

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

    ReactGa.event({
      category: 'All',
      action: 'Random game generated',
    });
  };

  const handleDeleteGame = (id: string): void => {
    dispatch(deleteGame(id));
    message.success('Match supprimé');

    ReactGa.event({
      category: 'All',
      action: 'Game deleted',
    });
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
    {
      title: 'Résultat',
      responsive: ['md'] as Breakpoint[],
      render: (game: Game): JSX.Element => <SetResults game={game} />,
    },
    {
      title: 'Evts',
      sorter: (game1: Game, game2: Game): number => (countEvents(game1) > countEvents(game2) ? -1 : 1),
      responsive: ['md'] as Breakpoint[],
      render: countEvents,
    },
    {
      key: 'actions',
      className: 'actions fit-content',
      render: (game: Game): JSX.Element => (
        <div>
          <Tooltip title="éditer le score et les stats">
            <Button
              type="primary"
              shape="circle"
              onClick={(): void => history.push(buildUrl(Urls.GAME, [{ parameter: 'id', value: game.id }]))}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Tooltip>
          <Tooltip title="gérer l'équipe">
            <Button
              type="primary"
              shape="circle"
              onClick={(): void => history.push(buildUrl(Urls.TEAM_MANAGEMENT, [{ parameter: 'id', value: game.id }]))}
            >
              <FontAwesomeIcon icon={faUsers} />
            </Button>
          </Tooltip>
          <Tooltip title="visualiser les données du match">
            <Button
              type="primary"
              shape="circle"
              onClick={(): void => history.push(buildUrl(Urls.GAME_STATS, [{ parameter: 'id', value: game.id }]))}
            >
              <FontAwesomeIcon icon={faChartLine} />
            </Button>
          </Tooltip>
          <Tooltip title="exporter les données du match">
            <div className="download">
              <a
                href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(game))}`}
                download={getFileName(game)}
              >
                <FontAwesomeIcon icon={faFileExport} />
              </a>
            </div>
          </Tooltip>
          <Tooltip title="supprimer le match">
            <Popconfirm
              title={'sûr ?'}
              onConfirm={(): any => handleDeleteGame(game.id)}
              okText="Oui"
              cancelText="Non en fait"
            >
              <Button type="primary" shape="circle" danger>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Topbar />

      <StyledGameList>
        <Row>
          <Col {...colLayout}>
            <Paragraph>
              Goat keeper vous permet de noter le score est les évenements de jeu d'un match de volleyball, puis de
              visualiser graphiquement les statistiques de ce match, set par set et joueur par joueur. Les données sont
              enregistrées dans la mémoire du navigateur, et peuvent être exportées sous la forme d'un fichier puis
              importées sur une autre machine.
            </Paragraph>

            <Paragraph>
              Les événements de jeu sont le service, la récéption, la passe, l'attaque, le block, la défense et l'ace.
              Ils peuvent être réussis (boutons verts) ou ratés (boutons rouges), et sont liés à un joueur.
            </Paragraph>

            <Paragraph>
              Les données sont enregistrées dans la mémoire du navigateur. Elles peuvent être exportées sous la forme
              d'un fichier puis importées et visualisées sur une autre machine.
            </Paragraph>

            <Paragraph>
              Pour avoir un aperçu rapide de l'interface et des visualisations, vous pouvez
              <a onClick={handleGenerateDemoGame}> générer un match démo </a>
              aléatoire puis aller sur sa table de marque (<FontAwesomeIcon icon={faSearch} />
              ), visualiser ses statistiques (<FontAwesomeIcon icon={faChartLine} />
              ), voir et éditer la liste des joueurs de l'équipe (<FontAwesomeIcon icon={faUsers} />
              ), exporter les données pour les communiquer à quelqu'un d'autre (<FontAwesomeIcon icon={faFileExport} />
              ), importer un match ayant été suivi sur un autre ordinateur (<FontAwesomeIcon icon={faFileImport} />) ou
              supprimer ce match (<FontAwesomeIcon icon={faTrash} />
              ). Vous pouvez également <a onClick={(): void => history.push(Urls.NEW_GAME)}>créer un nouveau match</a>,
              entrer les noms des équipes et des joueurs de votre équipe, et commencer à noter le score et les
              événements de jeu.
            </Paragraph>

            <Title level={2} className="page-title">
              Matchs enregistrés sur ce navigateur
            </Title>
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
              <Button icon={<FontAwesomeIcon icon={faRandom} />} onClick={handleGenerateDemoGame}>
                Générer un match démo
              </Button>
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

  .actions div {
    display: flex;

    button {
      margin-right: 8px;

      svg {
        margin-right: 0 !important;
      }
    }

    .download {
      display: inline-block;
      width: 32px;
      height: 32px;
      border-radius: 16px;
      margin-right: 8px;
      color: white;
      background-color: #00474f;
      cursor: pointer;

      &:hover {
        background-color: #006d75;
      }

      a {
        color: white;
      }

      svg {
        margin: 8px 0px 0px 10px;
      }
    }
  }

  .fit-content {
    width: 1%;
    white-space: nowrap;
  }

  .buttons {
    margin-bottom: 8px;

    .ant-btn {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`;
