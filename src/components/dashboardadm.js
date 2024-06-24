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
} from '@material-ui/core';
import { Form } from 'antd';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import ConfigProvider from 'antd/lib/config-provider';

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
                      color="primary"
                      variant="contained"
                      onClick={handleOpenModal}
                      className={classes.button}
                    >
                      Adicionar Equipe
                    </Button>
                    {equipes.map((equipe, index) => (
                      <Card key={index} className={classes.card}>
                        <CardContent>
                          <Typography>Inscrição: {equipe.teamNumber}</Typography>
                          <Typography>Nome do Projeto: {equipe.projectName}</Typography>
                          <Typography>
                            Integrante 1: {equipe.member1Name} - Email: {equipe.member1Email}
                          </Typography>
                          <Typography>
                            Integrante 2: {equipe.member2Name} - Email: {equipe.member2Email}
                          </Typography>
                          <Typography>
                            Integrante 3: {equipe.member3Name} - Email: {equipe.member3Email}
                          </Typography>
                          <Typography>
                            Integrante 4: {equipe.member4Name} - Email: {equipe.member4Email}
                          </Typography>
                          <Typography>Orientador: {equipe.advisorName} - Email: {equipe.advisorEmail}</Typography>
                          <Typography>Status da Equipe: {equipe.teamStatus}</Typography>
                          <Typography>Paralelos: {equipe.parallels}</Typography>
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => handleDeleteEquipe(index)}
                            className={classes.button}
                          >
                            Excluir
                          </Button>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleEditEquipe(index)}
                            className={classes.button}
                          >
                            Editar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Cadastro de Orientador
                    </Typography>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleOpenAdvisorModal}
                      className={classes.button}
                    >
                      Adicionar Orientador
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Modal
              open={modalVisible}
              onClose={handleCloseModal}
              className={classes.modal}
            >
              <Card className={classes.modalContent}>
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
                      label="Email do Integrante 1"
                      rules={[{ required: true, message: 'Informe o email do integrante 1' }]}
                    >
                      <TextField fullWidth />
                    </Form.Item>
                    <Form.Item
                      name="member2Name"
                      label="Nome do Integrante 2"
                    >
                      <TextField fullWidth />
                    </Form.Item>
                    <Form.Item
                      name="member2Email"
                      label="Email do Integrante 2"
                    >
                      <TextField fullWidth />
                    </Form.Item>
                    <Form.Item
                      name="member3Name"
                      label="Nome do Integrante 3"
                    >
                      <TextField fullWidth />
                    </Form.Item>
                    <Form.Item
                      name="member3Email"
                      label="Email do Integrante 3"
                    >
                      <TextField fullWidth />
                    </Form.Item>
                    <Form.Item
                      name="member4Name"
                      label="Nome do Integrante 4"
                    >
                      <TextField fullWidth />
                    </Form.Item>
                    <Form.Item
                      name="member4Email"
                      label="Email do Integrante 4"
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
                      label="Email do Orientador"
                      rules={[{ required: true, message: 'Informe o email do orientador' }]}
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
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      className={classes.button}
                    >
                      {editingEquipe === null ? 'Adicionar' : 'Atualizar'}
                    </Button>
                  </Form>
                </CardContent>
              </Card>
            </Modal>
            <Modal
              open={advisorModalVisible}
              onClose={handleCloseAdvisorModal}
              className={classes.modal}
            >
              <Card className={classes.modalContent}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Cadastro de Orientador
                  </Typography>
                  <form onSubmit={handleAdvisorSignup}>
                    <TextField
                      label="Nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="CPF"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Matrícula"
                      value={registration}
                      onChange={(e) => setRegistration(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Senha"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Confirmar Senha"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      className={classes.button}
                    >
                      Cadastrar
                    </Button>
                  </form>
                  {message && (
                    <Typography color="primary">
                      {message}
                    </Typography>
                  )}
                  {error && (
                    <Typography color="error">
                      {error}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Modal>
          </Box>
        </Box>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default AdminDashboard;
