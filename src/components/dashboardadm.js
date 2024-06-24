import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  TextField,
  Box,
  Grid,
  Select,
  Input,
} from '@material-ui/core';
import { Form } from 'antd';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import ConfigProvider from 'antd/lib/config-provider';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    maxWidth: 600,
    overflowY: 'auto',
    backgroundColor: 'white',
    padding: theme.spacing(4),
  },
  appBar: {
    marginBottom: theme.spacing(4),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const AdminDashboard = () => {
  const classes = useStyles();
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

  const handleCadastroEquipe = async (values) => {
    const token = localStorage.getItem('token');

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
      parallels: values.parallels || '',
    };

    try {
      const response = await axios.post('URL_DO_ENDPOINT_PARA_CADASTRO_DE_EQUIPE', newEquipe, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setEquipes([...equipes, newEquipe]);
        handleCloseModal();
      }
    } catch (error) {
      console.error('Erro ao cadastrar equipe:', error);
      setError('Erro ao cadastrar equipe. Tente novamente mais tarde.');
    }
  };

  const handleUpdateEquipe = async (values) => {
    const token = localStorage.getItem('token');

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
      parallels: values.parallels || '',
    };

    try {
      const response = await axios.put(`URL_DO_ENDPOINT_PARA_ATUALIZAR_EQUIPE/${editingEquipe}`, updatedEquipe, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedEquipes = [...equipes];
        updatedEquipes[editingEquipe] = updatedEquipe;
        setEquipes(updatedEquipes);
        handleCloseModal();
      }
    } catch (error) {
      console.error('Erro ao atualizar equipe:', error);
      setError('Erro ao atualizar equipe. Tente novamente mais tarde.');
    }
  };

  const handleDeleteEquipe = async (index) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`URL_DO_ENDPOINT_PARA_EXCLUIR_EQUIPE/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedEquipes = [...equipes];
        updatedEquipes.splice(index, 1);
        setEquipes(updatedEquipes);
      }
    } catch (error) {
      console.error('Erro ao excluir equipe:', error);
      setError('Erro ao excluir equipe. Tente novamente mais tarde.');
    }
  };

  const handleEditEquipe = (index) => {
    setEditingEquipe(index);
    setModalVisible(true);
  };

  const handleAdvisorSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const token = localStorage.getItem('token');
  
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
  
    const newAdvisor = {
      name,
      cpf,
      registration,
      email,
      password,
      course: '0', // Valor padrão para curso
      period: '0', // Valor padrão para período
    };
  
    try {
      const response = await axios.post('v1/user/coordenador', newAdvisor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        setName('');
        setCpf('');
        setRegistration('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('Orientador cadastrado com sucesso!');
        setError('');
        handleCloseAdvisorModal();
      }
    } catch (error) {
      console.error('Erro ao cadastrar orientador:', error);
      setError('Erro ao cadastrar orientador. Tente novamente mais tarde.');
    }
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
        parallels: equipes[equipeIndex].parallels || '',
      };
    }
    return {};
  };

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <Box>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6">Admin Dashboard</Typography>
              <Typography variant="h6">Fetin Inatel</Typography>
            </Toolbar>
          </AppBar>
          <Box className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Cadastro de Equipe
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenModal}
                      className={classes.button}
                    >
                      Cadastrar nova equipe
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenAdvisorModal}
                      className={classes.button}
                    >
                      Cadastrar orientador
                    </Button>
                  </CardContent>
                </Card>
                {equipes.map((equipe, index) => (
                  <Card key={index} className={classes.card}>
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        Equipe {equipe.teamNumber}
                      </Typography>
                      <Typography color="textSecondary">Projeto: {equipe.projectName}</Typography>
                      <Typography color="textSecondary">Status: {equipe.teamStatus}</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditEquipe(index)}
                        className={classes.button}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteEquipe(index)}
                        className={classes.button}
                      >
                        Excluir
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Modal
            open={modalVisible}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={classes.modal}
          >
            <Box className={classes.modalContent}>
              <Typography variant="h6" id="modal-title">
                {editingEquipe === null ? 'Cadastro de Equipe' : 'Editar Equipe'}
              </Typography>
              <Form
                name="equipe-form"
                initialValues={equipeToStore(editingEquipe)}
                onFinish={editingEquipe === null ? handleCadastroEquipe : handleUpdateEquipe}
              >
                <Form.Item
                  label="Número da Equipe"
                  name="teamNumber"
                  rules={[{ required: true, message: 'Por favor, insira o número da equipe!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Nome do Projeto"
                  name="projectName"
                  rules={[{ required: true, message: 'Por favor, insira o nome do projeto!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Nome do Membro 1"
                  name="member1Name"
                  rules={[{ required: true, message: 'Por favor, insira o nome do membro 1!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="E-mail do Membro 1"
                  name="member1Email"
                  rules={[
                    { required: true, message: 'Por favor, insira o e-mail do membro 1!' },
                    { type: 'email', message: 'Por favor, insira um e-mail válido!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Nome do Membro 2" name="member2Name">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="E-mail do Membro 2"
                  name="member2Email"
                  rules={[{ type: 'email', message: 'Por favor, insira um e-mail válido!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Nome do Membro 3" name="member3Name">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="E-mail do Membro 3"
                  name="member3Email"
                  rules={[{ type: 'email', message: 'Por favor, insira um e-mail válido!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Nome do Membro 4" name="member4Name">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="E-mail do Membro 4"
                  name="member4Email"
                  rules={[{ type: 'email', message: 'Por favor, insira um e-mail válido!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Nome do Orientador"
                  name="advisorName"
                  rules={[{ required: true, message: 'Por favor, insira o nome do orientador!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="E-mail do Orientador"
                  name="advisorEmail"
                  rules={[
                    { required: true, message: 'Por favor, insira o e-mail do orientador!' },
                    { type: 'email', message: 'Por favor, insira um e-mail válido!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Status da Equipe"
                  name="teamStatus"
                  rules={[{ required: true, message: 'Por favor, selecione o status da equipe!' }]}
                >
                  <Select>
                    <Select.Option value="ativo">Ativo</Select.Option>
                    <Select.Option value="inativo">Inativo</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Paralelos"
                  name="parallels"
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {editingEquipe === null ? 'Cadastrar' : 'Atualizar'}
                  </Button>
                  <Button htmlType="button" onClick={handleCloseModal} style={{ marginLeft: '8px' }}>
                    Cancelar
                  </Button>
                </Form.Item>
              </Form>
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          </Modal>
          <Modal
            open={advisorModalVisible}
            onClose={handleCloseAdvisorModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={classes.modal}
          >
            <Box className={classes.modalContent}>
              <Typography variant="h6" id="modal-title">
                Cadastro de Orientador
              </Typography>
              <form onSubmit={handleAdvisorSignup}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  autoComplete="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="registration"
                  label="Matrícula"
                  name="registration"
                  autoComplete="registration"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Senha"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Cadastrar
                </Button>
                {message && <Typography color="primary">{message}</Typography>}
                {error && <Typography color="error">{error}</Typography>}
              </form>
            </Box>
          </Modal>
        </Box>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default AdminDashboard;
