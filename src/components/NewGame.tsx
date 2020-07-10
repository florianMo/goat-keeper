import { Button, Col, Form, Input, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Team } from 'src/models/team';
import { addGame } from 'src/store/slices/mainSlice';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Topbar from './Topbar';

const { Title } = Typography;

const NewGame = (): JSX.Element => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = (): void => {
    const team1: Team = {
      name: form.getFieldValue('team1'),
      players: [],
    };

    const team2: Team = {
      name: form.getFieldValue('team2'),
      players: [],
    };

    dispatch(addGame({ id: uuidv4(), team1: team1, team2: team2, created: dayjs().format() }));
  };

  return (
    <>
      <Topbar />
      <StyledNewGame>
        <Row gutter={16}>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 10, offset: 7 }}>
            <Title level={2}>Nouveau match</Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="team1" label="Ton équipe" rules={[{ required: true, message: 'requis' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                name="team2"
                label="L'équipe des salauds d'en face"
                rules={[{ required: true, message: 'requis' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
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
`;

export default NewGame;
