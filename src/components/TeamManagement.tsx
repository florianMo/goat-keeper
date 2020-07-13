/* eslint-disable react/display-name */
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Input, InputNumber, Row, Table, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Topbar } from 'src/components/Topbar';
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const game = useSelector((state: RootState) => state.games.entities[id]);
  const [form] = Form.useForm();

  const columns = [
    { title: 'Nom', dataIndex: 'name', sorter: (a: Player, b: Player): number => a.name.localeCompare(b.name) },
    { title: 'Numéro', dataIndex: 'number', sorter: (a: Player, b: Player): number => a.number - b.number },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      className: 'actions',
      render: (record: any): JSX.Element => {
        return (
          <>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={(): any => dispatch(deletePlayer({ game: game, playerKey: record.key }))}
            />
          </>
        );
      },
    },
  ];

  const handleAddPlayer = (player: Player): void => {
    dispatch(addPlayer({ game: game, player: player }));
    form.resetFields();
  };

  return (
    <>
      <Topbar />

      {game && (
        <StyledTeamTable>
          <Row>
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
              <Title level={2}>Gérer mon équipe</Title>
              <button
                className="link"
                onClick={(): void => history.push(buildUrl(Urls.GAME, [{ parameter: 'id', value: game.id }]))}
              >
                Retour au match
              </button>

              <Table
                size="small"
                bordered={true}
                dataSource={game.team1.players.map((player) => {
                  return { ...player, key: player.name + ':' + player.number };
                })}
                columns={columns}
                pagination={false}
              ></Table>

              <Form form={form} layout="inline" onFinish={handleAddPlayer}>
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

                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    OK
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </StyledTeamTable>
      )}
    </>
  );
};

const StyledTeamTable = styled.div`
  button.link {
    margin-bottom: 16px;
  }

  form {
    margin-top: 24px;
  }
`;
