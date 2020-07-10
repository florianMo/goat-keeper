import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Input, InputNumber, Row, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Team } from 'src/models/team';
import { buildUrl, Urls } from 'src/routes';
import { addGame } from 'src/store/slices/mainSlice';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Topbar from './Topbar';

const { Title } = Typography;

const NewGame = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = (): void => {
    const uuid = uuidv4();
    const team1: Team = {
      name: form.getFieldValue('team1'),
      players: form.getFieldValue('players'),
    };

    const team2: Team = {
      name: form.getFieldValue('team2'),
      players: [],
    };

    dispatch(addGame({ id: uuid, team1: team1, team2: team2, created: dayjs().format() }));
    history.push(buildUrl(Urls.GAME, [{ parameter: 'id', value: uuid }]));
  };

  return (
    <>
      <Topbar />
      <StyledNewGame>
        <Row gutter={16}>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 10, offset: 7 }}>
            <Title level={2}>Nouveau match</Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="team1"
                label="Ton équipe"
                rules={[{ required: true, message: 'requis' }]}
                validateTrigger={['onChange', 'onBlur']}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="team2"
                label="L'autre équipe"
                rules={[{ required: true, message: 'requis' }]}
                validateTrigger={['onChange', 'onBlur']}
              >
                <Input />
              </Form.Item>

              <Form.List name="players">
                {(fields, { add, remove }): JSX.Element => {
                  return (
                    <div>
                      {fields.map((field) => (
                        <Space key={field.key} align="start">
                          <Form.Item
                            {...field}
                            name={[field.name, 'name']}
                            fieldKey={[field.fieldKey, 'name']}
                            rules={[{ required: true, message: 'requis' }]}
                          >
                            <Input placeholder="nom du joueur" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, 'number']}
                            fieldKey={[field.fieldKey, 'number']}
                            rules={[{ required: true, message: 'requis' }]}
                          >
                            <InputNumber min={0} step="1" />
                          </Form.Item>

                          {fields.length > 1 ? (
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="dynamic-delete-button"
                              onClick={(): void => remove(field.name)}
                            />
                          ) : null}
                        </Space>
                      ))}

                      <Form.Item className="add-player">
                        <Button
                          block
                          type="dashed"
                          onClick={(): void => {
                            add();
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} /> Ajouter un joueur
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  OK
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </StyledNewGame>
    </>
  );
};

const StyledNewGame = styled.div`
  height: calc(100vh - 80px);
  margin-top: 24px;

  .ant-space {
    display: flex;
    width: 100%;

    .ant-space-item:nth-child(1) {
      width: 50%;
    }

    svg.fa-trash {
      margin-top: 8px;
    }
  }

  .add-player svg.fa-plus {
    margin-right: 8px;
  }
`;

export default NewGame;
