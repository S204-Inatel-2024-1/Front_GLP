import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Modal,
  TextField,
} from '@material-ui/core';
import { Form } from 'antd';

import ConfigProvider from 'antd/lib/config-provider';

const AdminDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [advisorModalVisible, setAdvisorModalVisible] = useState(false);
  const [editingEquipe, setEditingEquipe] = useState(null);
  const [equipes, setEquipes] = useState([]);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [registration, setRegistration] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingEquipe(null);
  };

  const handleOpenAdvisorModal = () => {
    setAdvisorModalVisible(true);
  };

  const handleCloseAdvisorModal = () => {
    setAdvisorModalVisible(false);
  };

  const handleCadastroEquipe = (values) => {
    const newEquipe = {
      teamNumber: values.teamNumber,
      projectName: values.projectName,
      member1Name: values.member1Name,
      member1Email: values.member1Email,
      member2Name: values.member2Name || '',
      member2Email: values.member2Email || '',
      member3Name: values.member3Name || '',
      member3Email: values.member3Email || '',
      member4Name: values.member4Name || '',
      member4Email: values.member4Email || '',
      advisorName: values.advisorName,
      advisorEmail: values.advisorEmail,
      teamStatus: values.teamStatus,
      parallels: values.parallels,
    };

    setEquipes([...equipes, newEquipe]);
    handleCloseModal();
  };

  const handleUpdateEquipe = (values) => {
    const updatedEquipe = {
      teamNumber: values.teamNumber,
      projectName: values.projectName,
      member1Name: values.member1Name,
      member1Email: values.member1Email,
      member2Name: values.member2Name || '',
      member2Email: values.member2Email || '',
      member3Name: values.member3Name || '',
      member3Email: values.member3Email || '',
      member4Name: values.member4Name || '',
      member4Email: values.member4Email || '',
      advisorName: values.advisorName,
      advisorEmail: values.advisorEmail,
      teamStatus: values.teamStatus,
      parallels: values.parallels,
    };

    const updatedEquipes = [...equipes];
    updatedEquipes[editingEquipe] = updatedEquipe;

    setEquipes(updatedEquipes);
    handleCloseModal();
  };

  const handleDeleteEquipe = (index) => {
    const updatedEquipes = [...equipes];
    updatedEquipes.splice(index, 1);
    setEquipes(updatedEquipes);
  };

  const handleEditEquipe = (index) => {
    setEditingEquipe(index);
    setModalVisible(true);
  };

  const handleAdvisorSignup = (e) => {
    e.preventDefault();
    // Simulate advisor signup logic
    setName('');
    setCpf('');
    setRegistration('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('Orientador cadastrado com sucesso!');
    setError('');
  };

  const equipeToStore = (equipeIndex) => {
    if (equipeIndex !== null) {
      return {
        teamNumber: equipes[equipeIndex].teamNumber,
        projectName: equipes[equipeIndex].projectName,
        member1Name: equipes[equipeIndex].member1Name,
        member1Email: equipes[equipeIndex].member1Email,
        member2Name: equipes[equipeIndex].member2Name,
        member2Email: equipes[equipeIndex].member2Email,
        member3Name: equipes[equipeIndex].member3Name,
        member3Email: equipes[equipeIndex].member3Email,
        member4Name: equipes[equipeIndex].member4Name,
        member4Email: equipes[equipeIndex].member4Email,
        advisorName: equipes[equipeIndex].advisorName,
        advisorEmail: equipes[equipeIndex].advisorEmail,
        teamStatus: equipes[equipeIndex].teamStatus,
        parallels: equipes[equipeIndex].parallels,
      };
    }
    return {};
  };

  return (
    <ConfigProvider>
      <div>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Cadastro de Equipe
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={handleOpenModal}
              style={{ marginBottom: '16px' }}
            >
              Adicionar Equipe
            </Button>
            {equipes.map((equipe, index) => (
              <div key={index}>
                <Card style={{ margin: '10px' }}>
                  <CardContent>
                    <Typography>
                      Inscrição: {equipe.teamNumber}
                    </Typography>
                    <Typography>
                      Nome do Projeto: {equipe.projectName}
                    </Typography>
                    <Typography>
                      Integrante 1: {equipe.member1Name} - Email:{' '}
                      {equipe.member1Email}
                    </Typography>
                    <Typography>
                      Integrante 2: {equipe.member2Name} - Email:{' '}
                      {equipe.member2Email}
                    </Typography>
                    <Typography>
                      Integrante 3: {equipe.member3Name} - Email:{' '}
                      {equipe.member3Email}
                    </Typography>
                    <Typography>
                      Integrante 4: {equipe.member4Name} - Email:{' '}
                      {equipe.member4Email}
                    </Typography>
                    <Typography>
                      Orientador: {equipe.advisorName} - Email:{' '}
                      {equipe.advisorEmail}
                    </Typography>
                    <Typography>
                      Status da Equipe: {equipe.teamStatus}
                    </Typography>
                    <Typography>Paralelos: {equipe.parallels}</Typography>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleDeleteEquipe(index)}
                      style={{ marginTop: '8px', marginRight: '8px' }}
                    >
                      Excluir
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleEditEquipe(index)}
                      style={{ marginTop: '8px' }}
                    >
                      Editar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Cadastro de Orientador
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={handleOpenAdvisorModal}
              style={{ marginBottom: '16px' }}
            >
              Adicionar Orientador
            </Button>
          </CardContent>
        </Card>
        <Modal
          open={modalVisible}
          onClose={handleCloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card style={{ maxWidth: 600, overflowY: 'auto', backgroundColor: 'white', padding: '16px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                {editingEquipe === null ? 'Adicionar Equipe' : 'Editar Equipe'}
              </Typography>
              <Form
                name="cadastroEquipe"
                onFinish={editingEquipe === null ? handleCadastroEquipe : handleUpdateEquipe}
                initialValues={equipeToStore(editingEquipe)}
              >
                <Form.Item
                  name="teamNumber"
                  label="Número da Equipe"
                  rules={[{ required: true, message: 'Informe o número da equipe' }]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="projectName"
                  label="Nome do Projeto"
                  rules={[{ required: true, message: 'Informe o nome do projeto' }]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="member1Name"
                  label="Nome do Integrante 1"
                  rules={[{ required: true, message: 'Informe o nome do integrante 1' }]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="member1Email"
                  label="E-mail do Integrante 1"
                  rules={[
                    { required: true, message: 'Informe o e-mail do integrante 1' },
                    { type: 'email', message: 'E-mail inválido' },
                  ]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item name="member2Name" label="Nome do Integrante 2">
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="member2Email"
                  label="E-mail do Integrante 2"
                  rules={[{ type: 'email', message: 'E-mail inválido' }]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item name="member3Name" label="Nome do Integrante 3">
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="member3Email"
                  label="E-mail do Integrante 3"
                  rules={[{ type: 'email', message: 'E-mail inválido' }]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item name="member4Name" label="Nome do Integrante 4">
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="member4Email"
                  label="E-mail do Integrante 4"
                  rules={[{ type: 'email', message: 'E-mail inválido' }]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="advisorName"
                  label="Nome do Orientador"
                  rules={[{ required: true, message: 'Informe o nome do orientador' }]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="advisorEmail"
                  label="E-mail do Orientador"
                  rules={[
                    { required: true, message: 'Informe o e-mail do orientador' },
                    { type: 'email', message: 'E-mail inválido' },
                  ]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="teamStatus"
                  label="Status da Equipe"
                  rules={[{ required: true, message: 'Informe o status da equipe' }]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Form.Item
                  name="parallels"
                  label="Paralelos"
                  rules={[{ required: true, message: 'Informe os paralelos' }]}
                >
                  <TextField fullWidth />
                </Form.Item>
                <Button type="submit" variant="contained" color="primary">
                  {editingEquipe === null ? 'Cadastrar' : 'Atualizar'}
                </Button>
              </Form>
            </CardContent>
          </Card>
        </Modal>
        <Modal
          open={advisorModalVisible}
          onClose={handleCloseAdvisorModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card style={{ maxWidth: 600, overflowY: 'auto', backgroundColor: 'white', padding: '16px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Cadastro de Orientador
              </Typography>
              <Form name="cadastroOrientador" onFinish={handleAdvisorSignup}>
                <Form.Item
                  name="name"
                  label="Nome"
                  rules={[{ required: true, message: 'Informe o nome' }]}
                >
                  <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item
                  name="cpf"
                  label="CPF"
                  rules={[{ required: true, message: 'Informe o CPF' }]}
                >
                  <TextField fullWidth value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </Form.Item>
                <Form.Item
                  name="registration"
                  label="Matrícula"
                  rules={[{ required: true, message: 'Informe a matrícula' }]}
                >
                  <TextField
                    fullWidth
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    { required: true, message: 'Informe o e-mail' },
                    { type: 'email', message: 'E-mail inválido' },
                  ]}
                >
                  <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Senha"
                  rules={[{ required: true, message: 'Informe a senha' }]}
                >
                  <TextField
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirme a Senha"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Confirme a senha' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('As senhas não coincidem'));
                      },
                    }),
                  ]}
                >
                  <TextField
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Item>
                <Button type="submit" variant="contained" color="primary">
                  Cadastrar
                </Button>
                <Typography variant="body1" style={{ marginTop: '8px' }} color="error">
                  {error}
                </Typography>
                <Typography variant="body1" style={{ marginTop: '8px' }} color="primary">
                  {message}
                </Typography>
              </Form>
            </CardContent>
          </Card>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default AdminDashboard;
