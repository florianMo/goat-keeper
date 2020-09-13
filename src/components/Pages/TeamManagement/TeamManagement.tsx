/* eslint-disable react/display-name */
import { cyan, red } from '@ant-design/colors';
import { faArrowLeft, faChartLine, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Input, InputNumber, message, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import React from 'react';
import ReactGa from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { colLayout } from 'src/components/App';
import { Topbar } from 'src/components/Layout/Topbar';
import { GameUrlParams } from 'src/components/Pages/ScoreBoard/Game';
import { Game } from 'src/models/game';
import { Player } from 'src/models/player';
import { buildUrl, Urls } from 'src/routing';
import { addPlayer, deletePlayer } from 'src/store/slices/gameSlice';
import { RootState } from 'src/store/store';
import styled from 'styled-components';

const { Title } = Typography;

interface TeamManagementProps {
  game: Game;
}

export const TeamManagement: React.FC<TeamManagementProps> = (): JSX.Element => {
  const { id } = useParams<GameUrlParams>();
  const dispatch = useDispatch();
  const history = useHistory();
  const game = useSelector((state: RootState) => state.games.entities[id]);
  const [form] = Form.useForm();

  const handleAddPlayer = (player: Player): void => {
    if (game.team1.players.some((p) => p.name === player.name && p.number === player.number)) {
      message.error('Cette personne existe déjà');
    } else {
      dispatch(addPlayer({ game: game, player: player }));
      form.resetFields();

      ReactGa.event({
        category: 'All',
        action: 'Player added',
      });
    }
  };

  const handleDeletePlayer = (game: Game, playerKey: string): void => {
    dispatch(deletePlayer({ game: game, playerKey: playerKey }));

    ReactGa.event({
      category: 'All',
      action: 'Player deleted',
    });
  };

  const columns = [
    { title: 'Nom', dataIndex: 'name', sorter: (a: Player, b: Player): number => a.name.localeCompare(b.name) },
    { title: 'Numéro', dataIndex: 'number', sorter: (a: Player, b: Player): number => a.number - b.number },
    {
      key: 'actions',
      className: 'actions fit-content',
      render: (record: any): JSX.Element => (
        <Tooltip key="delete" title="supprimer cette personne">
          <Popconfirm
            title={'sûr ?'}
            onConfirm={(): any => handleDeletePlayer(game, record.key)}
            okText="Oui"
            cancelText="Non en fait"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Topbar />

      <div style={{ padding: 16 }}>
        {game && (
          <StyledTeamTable>
            <Row gutter={16}>
              <Col {...colLayout}>
                <Title level={2}>Gérer mon équipe</Title>

                <div className="buttons">
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faArrowLeft} />}
                    onClick={(): void => history.push(buildUrl(Urls.GAME, [{ parameter: 'id', value: game.id }]))}
                  >
                    Retour au match
                  </Button>
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faChartLine} />}
                    onClick={(): void => history.push(buildUrl(Urls.GAME_STATS, [{ parameter: 'id', value: game.id }]))}
                  >
                    Statistiques
                  </Button>
                </div>

                <Table
                  size="small"
                  bordered={true}
                  dataSource={game.team1.players.map((player) => {
                    return { ...player, key: player.name + ':' + player.number };
                  })}
                  columns={columns}
                  pagination={false}
                ></Table>

                <Form form={form} layout="horizontal" onFinish={handleAddPlayer}>
                  <Form.Item
                    name="name"
                    label="Nom"
                    rules={[{ required: true, message: 'requis' }]}
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <Input placeholder="nouveau joueur" />
                  </Form.Item>

                  <Form.Item
                    name="number"
                    label="Numéro"
                    rules={[{ required: true, message: 'requis' }]}
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <InputNumber />
                  </Form.Item>

                  <Form.Item className="button">
                    <Button type="primary" htmlType="submit">
                      OK
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </StyledTeamTable>
        )}
      </div>
    </>
  );
};

const StyledTeamTable = styled.div`
  button.link {
    margin-bottom: 16px;
  }

  form {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .fit-content {
    width: 1%;
    white-space: nowrap;
  }

  .actions {
    svg {
      transition: 0.3s all;
      cursor: pointer;

      &:hover {
        color: ${cyan[8]};
      }

      &[data-icon='trash']:hover {
        color: ${red[5]};
      }
    }
  }

  .button .ant-form-item-control-input-content {
    text-align: right;
  }

  .buttons {
    margin-bottom: 8px;

    > * {
      margin-right: 8px;
    }
  }
`;
