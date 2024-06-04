import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { ConfigProvider, Form, Input, Modal, Space } from 'antd';
import CSVReader from 'react-csv-reader';
import FileUpload from './fileUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#1976d2',
    color: '#ffffff',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  logo: {
    width: 50,
    height: 'auto',
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 200,
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const phases = ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4'];

const AdminDashboard = () => {
  const classes = useStyles();
  const [selectedPhase, setSelectedPhase] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [equipes, setEquipes] = useState([]);
  const [editingEquipe, setEditingEquipe] = useState(null);
  const [projects, setProjects] = useState([]);

  const handlePhaseChange = (event) => {
    setSelectedPhase(event.target.value);
  };

  const handleFileUpload = (file) => {
    setProjects(file); 
    console.log('Arquivo enviado:', file);
   
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCadastroEquipe = (values) => {
    setEquipes([...equipes, values]);
    handleCloseModal();
  };

  const handleDeleteEquipe = (index) => {
    const updatedEquipes = [...equipes];
    updatedEquipes.splice(index, 1);
    setEquipes(updatedEquipes);
  };

  const handleEditEquipe = (index) => {
    setEditingEquipe(equipes[index]);
    setModalVisible(true);
  };

  const handleForce = (data) => {
    const [teamNumber, projectName, member1Name, member1Email, member2Name, member2Email, member3Name, member3Email, member4Name, member4Email, advisorName, advisorEmail, teamStatus, parallels] = data[0];
    handleCadastroEquipe({ teamNumber, projectName, member1Name, member1Email, member2Name, member2Email, member3Name, member3Email, member4Name, member4Email, advisorName, advisorEmail, teamStatus, parallels });
  };

  const handleUpdateEquipe = (updatedValues) => {
    const updatedEquipes = [...equipes];
    const index = equipes.findIndex(equipe => equipe === editingEquipe);
    if (index !== -1) {
      updatedEquipes[index] = updatedValues;
      setEquipes(updatedEquipes);
    }
    setEditingEquipe(null);
    handleCloseModal();
  };

  const equipeToStore = (equipe) => {
    if (equipe === null) {
      return undefined;
    }

    return {
      teamNumber: equipe.teamNumber,
      projectName: equipe.projectName,
      member1Name: equipe.member1Name,
      member1Email: equipe.member1Email,
      member2Name: equipe.member2Name,
      member2Email: equipe.member2Email,
      member3Name: equipe.member3Name,
      member3Email: equipe.member3Email,
      member4Name: equipe.member4Name,
      member4Email: equipe.member4Email,
      advisorName: equipe.advisorName,
      advisorEmail: equipe.advisorEmail,
      teamStatus: equipe.teamStatus,
      parallels: equipe.parallels,
    };
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: 'white',
        },
        components: {
          Card: {
            headerBg: '#0B2031',
            headerFontSize: 19,
          },
        },
      }}
    >
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div className={classes.titleContainer}>
              <Typography variant="h6" className={classes.title}>
                Dashboard do Administrador
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Card  style={{ width: '100%', height: '10%' }} className={classes.card}>
          <CardContent style={{ width: '50%', height: '20%' }}>
            <Typography variant="h6" component="h2">
              Cadastrar Projetos
            </Typography>
            <FileUpload onFileUpload={handleFileUpload} />
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" component="h2">
              Cadastro de Equipe
            </Typography>
            <Button color="primary" variant='contained' onClick={handleOpenModal} style={{ marginBottom: '16px' }}>
              Adicionar Equipe 
            </Button>
            <CSVReader
              cssClass="csv-reader-input"
              onFileLoaded={handleForce}
              onError={() => { }}
              inputId="ObiWan"
              inputStyle={{ color: 'red' }}
            />

            {equipes.map((equipe, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <Card className={classes.card}>
                  <CardContent>
                  <Typography variant="h6" component="h2">
                  Dados do Projeto:
                  </Typography>
                  <Typography >
                  Inscricao: {equipe.teamNumber}
                </Typography>
                    Projeto: {equipe.projectName}
                    <Typography variant="body2" component="p">
              Membros da Equipe: {equipe.member1Name}, {equipe.member2Name}, {equipe.member3Name}, {equipe.member4Name}
            </Typography>

                  <Space style={{ marginLeft: '10px' }}>
                  <Button onClick={() => handleDeleteEquipe(index)} type="primary">Excluir</Button>
                  <Button onClick={() => handleEditEquipe(index)}>Editar</Button>
                </Space>
                  </CardContent>
                </Card>
              </div>
            ))}
          </CardContent>
        </Card>
        <Modal
          title={editingEquipe ? "Editar Equipe" : "Adicionar Equipe"}
          open={modalVisible}
          onCancel={handleCloseModal}
          footer={null}
        >
          <Form
            initialValues={equipeToStore(editingEquipe)}
            onFinish={editingEquipe ? handleUpdateEquipe : handleCadastroEquipe}
          >
            <Form.Item
              name="teamNumber"
              rules={[{ required: true, message: "Por favor, insira o número da equipe (até 3 caracteres)" }]}
            >
              <Input placeholder="Número da Equipe" maxLength={3} />
            </Form.Item>
            <Form.Item
              name="projectName"
              rules={[{ required: true, message: "Por favor, insira o nome do projeto (até 65 caracteres)" }]}
            >
              <Input placeholder="Nome do Projeto" maxLength={65} />
            </Form.Item>
            <Form.Item
              name="member1Name"
              rules={[{ required: true, message: "Por favor, insira o nome do integrante 01 (até 50 caracteres)" }]}
            >
              <Input placeholder="Nome do Integrante 01" maxLength={50} />
            </Form.Item>
            <Form.Item
              name="member1Email"
              rules={[{ required: true, message: "Por favor, insira o email do integrante 01 (até 30 caracteres)" }]}
            >
              <Input placeholder="Email do Integrante 01" maxLength={30} />
            </Form.Item>
            <Form.Item
              name="member2Name"
            >
              <Input placeholder="Nome do Integrante 02" maxLength={50} />
            </Form.Item>
            <Form.Item
              name="member2Email"
            >
              <Input placeholder="Email do Integrante 02" maxLength={30} />
            </Form.Item>
            <Form.Item
              name="member3Name"
            >
              <Input placeholder="Nome do Integrante 03" maxLength={50} />
            </Form.Item>
            <Form.Item
              name="member3Email"
            >
              <Input placeholder="Email do Integrante 03" maxLength={30} />
            </Form.Item>
            <Form.Item
              name="member4Name"
            >
              <Input placeholder="Nome do Integrante 04" maxLength={50} />
            </Form.Item>
            <Form.Item
              name="member4Email"
            >
              <Input placeholder="Email do Integrante 04" maxLength={30} />
            </Form.Item>
            <Form.Item
              name="advisorName"
              rules={[{ required: true, message: "Por favor, insira o nome do orientador (até 50 caracteres)" }]}
            >
              <Input placeholder="Nome do Orientador" maxLength={50} />
            </Form.Item>
            <Form.Item
              name="advisorEmail"
              rules={[{ required: true, message: "Por favor, insira o email do orientador (até 30 caracteres)" }]}
            >
              <Input placeholder="Email do Orientador" maxLength={30} />
            </Form.Item>
            <Form.Item
              name="teamStatus"
              rules={[{ required: true, message: "Por favor, insira a fase da fetin da equipe (até 30 caracteres)" }]}
            >
              <Input placeholder="Fase da Fetin" maxLength={30} />
            </Form.Item>
            <Form.Item
              name="parallels"
            >
              <Input.TextArea placeholder="Paralelas" maxLength={200} />
            </Form.Item>
            <Form.Item>
              <Button color="primary" variant='contained' type="primary" htmlType="submit">
                Cadastrar/Editar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" component="h2">
              Atualizar Fases da FETIN
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="phase-select-label">Selecionar Fase</InputLabel>
              <Select
                labelId="phase-select-label"
                id="phase-select"
                value={selectedPhase}
                onChange={handlePhaseChange}
              >
                {phases.map((phase, index) => (
                  <MenuItem key={index} value={phase}>
                    {phase}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" className={classes.button}>
              Atualizar Fase
            </Button>
          </CardContent>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default AdminDashboard;
