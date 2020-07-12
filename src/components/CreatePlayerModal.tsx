import { Form, Input, InputNumber, Modal } from 'antd';
import React from 'react';

interface CreatePlayerModalProps {
  visible: boolean;
  onConfirm: (values: any) => void;
  onCancel: () => void;
}

export const CreatePlayerModal: React.FC<CreatePlayerModalProps> = (
  props: CreatePlayerModalProps
): React.ReactElement => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={props.visible}
      title="Nouveau joueur"
      okText="En piste"
      cancelText="Annuler"
      onCancel={props.onCancel}
      onOk={(): void => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            props.onConfirm(values);
          })
          .catch((info) => {
            // eslint-disable-next-line no-console
            console.warn('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="name" label="Nom du joueur" rules={[{ required: true, message: 'requis' }]}>
          <Input placeholder="on avait dit 20h30 non ?" />
        </Form.Item>

        <Form.Item name="number" label="Numéro" rules={[{ required: true, message: 'requis' }]}>
          <InputNumber value={0} min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
