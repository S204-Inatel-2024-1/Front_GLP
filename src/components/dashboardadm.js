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

const phases = ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4']; // Lista de fases da FETIN

const AdminDashboard = () => {
  const classes = useStyles();
  const [selectedPhase, setSelectedPhase] = useState('');

  const handlePhaseChange = (event) => {
    setSelectedPhase(event.target.value);
  };

  const handleFileUpload = (file) => {
    console.log('Arquivo enviado:', file);

  };

  return (
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
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Importar Planilha
          </Typography>
          <FileUpload onFileUpload={handleFileUpload} />
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Inserção Manual de Dados
          </Typography>
          {/* Componente para inserção manual de dados */}
          {/* componente para inserção manual de dados */}
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Projetos Cadastrados
          </Typography>
          {/* Componente para visualização de todos os projetos cadastrados */}
          {/* componente para visualização de todos os projetos cadastrados */}
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Atualizar Dados do Projeto
          </Typography>
          {/* Componente para atualização dos dados do projeto selecionado */}
          {/* componente para atualização dos dados do projeto selecionado */}
        </CardContent>
      </Card>
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
  );
};

export default AdminDashboard;
