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
  MenuItem,
} from '@material-ui/core';
import { Form } from 'antd';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import ConfigProvider from 'antd/lib/config-provider';
import axios from 'axios';
import Papa from 'papaparse';

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
    padding: theme.spacing(4),
    backgroundColor: 'white',
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
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

const AdminDashboard = () => {
  const classes = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [advisorModalVisible, setAdvisorModalVisible] = useState(false);
  const [bulkModalVisible, setBulkModalVisible] = useState(false);
  const [editingEquipe, setEditingEquipe] = useState(null);
  const [equipes, setEquipes] = useState([]);
  const [advisorForm, setAdvisorForm] = useState({
    name: '', cpf: '', registration: '', email: '', password: '', confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingEquipe(null);
  };

  const handleOpenAdvisorModal = () => setAdvisorModalVisible(true);
  const handleCloseAdvisorModal = () => setAdvisorModalVisible(false);

  const handleOpenBulkModal = () => setBulkModalVisible(true);
  const handleCloseBulkModal = () => setBulkModalVisible(false);

  const handleCadastroEquipe = async (values) => {
    const token = localStorage.getItem('token');
    const newEquipe = { ...values };

    try {
      const response = await axios.post('post v1/projetos', newEquipe, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setEquipes([...equipes, newEquipe]);
        handleCloseModal();
      }
    } catch (error) {
      setError('Erro ao cadastrar equipe. Tente novamente mais tarde.');
    }
  };

  const handleUpdateEquipe = async (values) => {
    const token = localStorage.getItem('token');
    const updatedEquipe = { ...values };

    try {
      const response = await axios.put(`URL_DO_ENDPOINT_PARA_ATUALIZAR_EQUIPE/${editingEquipe}`, updatedEquipe, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const updatedEquipes = [...equipes];
        updatedEquipes[editingEquipe] = updatedEquipe;
        setEquipes(updatedEquipes);
        handleCloseModal();
      }
    } catch (error) {
      setError('Erro ao atualizar equipe. Tente novamente mais tarde.');
    }
  };

  const handleDeleteEquipe = async (index) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`URL_DO_ENDPOINT_PARA_EXCLUIR_EQUIPE/${index}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const updatedEquipes = [...equipes];
        updatedEquipes.splice(index, 1);
        setEquipes(updatedEquipes);
      }
    } catch (error) {
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
  
    if (advisorForm.password !== advisorForm.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
  
    const newAdvisor = {
      nome: advisorForm.name,
      cpf: advisorForm.cpf,
      matricula: advisorForm.registration,
      email: advisorForm.email,
      senha: advisorForm.password,
      curso: '', // Passando curso como vazio
      periodo: '', // Passando período como vazio
    };
  
    try {
      const response = await axios.post('v1/user/coordenador', newAdvisor, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setAdvisorForm({ name: '', cpf: '', registration: '', email: '', password: '', confirmPassword: '' });
        setMessage('Orientador cadastrado com sucesso!');
        setError('');
        handleCloseAdvisorModal();
      }
    } catch (error) {
      if (error.response) {
        setError(`Erro ao cadastrar orientador: ${error.response.data.message}`);
      } else {
        setError('Erro ao cadastrar orientador. Tente novamente mais tarde.');
      }
    }
  };
  

  const handleBulkUpload = async (file) => {
    const token = localStorage.getItem('token');
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target.result;
      const parsedData = Papa.parse(csvData, { header: true }).data;

      try {
        const response = await axios.post('URL_DO_ENDPOINT_PARA_CADASTRO_DE_EQUIPE_EM_LOTE', parsedData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setEquipes([...equipes, ...parsedData]);
          handleCloseBulkModal();
        }
      } catch (error) {
        setError('Erro ao cadastrar equipes em lote. Tente novamente mais tarde.');
      }
    };
    reader.readAsText(file);
  };

  const equipeToStore = (equipeIndex) => {
    if (equipeIndex !== null) {
      return { ...equipes[equipeIndex] };
    }
    return {
      teamNumber: '', projectName: '', member1Name: '', member1Email: '', member2Name: '',
      member2Email: '', member3Name: '', member3Email: '', member4Name: '', member4Email: '',
      advisorName: '', advisorEmail: '', teamStatus: '', parallels: ''
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <div className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6">Admin Dashboard</Typography>
            </Toolbar>
          </AppBar>
          <Card className={classes.card}>
            <CardContent>
              <Button variant="contained" color="primary" className={classes.button} onClick={handleOpenModal}>
                Registrar Equipe
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleOpenAdvisorModal}>
                Registrar Orientador
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleOpenBulkModal}>
                Registrar Equipes em Lote
              </Button>
            </CardContent>
          </Card>
          <Modal open={modalVisible} onClose={handleCloseModal} className={classes.modal}>
            <Box className={classes.modalContent}>
              <Typography variant="h6">
                {editingEquipe !== null ? 'Editar Equipe' : 'Registrar Equipe'}
              </Typography>
              <Form layout="vertical" onFinish={editingEquipe !== null ? handleUpdateEquipe : handleCadastroEquipe}
                initialValues={equipeToStore(editingEquipe)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Número da Equipe" name="teamNumber" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <TextField fullWidth placeholder="Número da Equipe" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Nome do Projeto" name="projectName" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <TextField fullWidth placeholder="Nome do Projeto" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Nome do Integrante 1" name="member1Name" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <TextField fullWidth placeholder="Nome do Integrante 1" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Email do Integrante 1" name="member1Email" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <TextField fullWidth placeholder="Email do Integrante 1" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Nome do Integrante 2" name="member2Name" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <TextField fullWidth placeholder="Nome do Integrante 2" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Email do Integrante 2" name="member2Email" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <TextField fullWidth placeholder="Email do Integrante 2" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Nome do Integrante 3" name="member3Name">
                      <TextField fullWidth placeholder="Nome do Integrante 3" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Email do Integrante 3" name="member3Email">
                      <TextField fullWidth placeholder="Email do Integrante 3" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Nome do Integrante 4" name="member4Name">
                      <TextField fullWidth placeholder="Nome do Integrante 4" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Email do Integrante 4" name="member4Email">
                      <TextField fullWidth placeholder="Email do Integrante 4" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Nome do Orientador" name="advisorName" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <TextField fullWidth placeholder="Nome do Orientador" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Email do Orientador" name="advisorEmail" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <TextField fullWidth placeholder="Email do Orientador" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Status da Equipe" name="teamStatus" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                      <TextField fullWidth placeholder="Status da Equipe" />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Paralelos" name="parallels">
                      <TextField fullWidth placeholder="Paralelos" />
                    </Form.Item>
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  {editingEquipe !== null ? 'Atualizar' : 'Registrar'}
                </Button>
              </Form>
            </Box>
          </Modal>
          <Modal open={advisorModalVisible} onClose={handleCloseAdvisorModal} className={classes.modal}>
            <Box className={classes.modalContent}>
              <Typography variant="h6">Registrar Orientador</Typography>
              <form onSubmit={handleAdvisorSignup}>
                <TextField label="Nome" fullWidth margin="normal" value={advisorForm.name} onChange={(e) => setAdvisorForm({ ...advisorForm, name: e.target.value })} required />
                <TextField label="CPF" fullWidth margin="normal" value={advisorForm.cpf} onChange={(e) => setAdvisorForm({ ...advisorForm, cpf: e.target.value })} required />
                <TextField label="Matrícula" fullWidth margin="normal" value={advisorForm.registration} onChange={(e) => setAdvisorForm({ ...advisorForm, registration: e.target.value })} required />
                <TextField label="Email" fullWidth margin="normal" type="email" value={advisorForm.email} onChange={(e) => setAdvisorForm({ ...advisorForm, email: e.target.value })} required />
                <TextField label="Senha" fullWidth margin="normal" type="password" value={advisorForm.password} onChange={(e) => setAdvisorForm({ ...advisorForm, password: e.target.value })} required />
                <TextField label="Confirmar Senha" fullWidth margin="normal" type="password" value={advisorForm.confirmPassword} onChange={(e) => setAdvisorForm({ ...advisorForm, confirmPassword: e.target.value })} required />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Registrar
                </Button>
              </form>
              {message && <Typography color="primary">{message}</Typography>}
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          </Modal>
          <Modal open={bulkModalVisible} onClose={handleCloseBulkModal} className={classes.modal}>
            <Box className={classes.modalContent}>
              <Typography variant="h6">Registrar Equipes em Lote</Typography>
              <input type="file" accept=".csv" onChange={(e) => handleBulkUpload(e.target.files[0])} />
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          </Modal>
        </div>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default AdminDashboard;
