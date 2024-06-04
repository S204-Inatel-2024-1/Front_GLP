import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#1976d2',
    color: '#ffffff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  search: {
    position: 'absolute',
    right: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    '& input': {
      padding: theme.spacing(1),
    },
  },
  iconButton: {
    padding: 8,
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(2),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token não encontrado.');
          return;
        }

        const decodedToken = jwtDecode(token);
        setUserData(decodedToken);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleLogoClick = () => {
    // Adicione a ação desejada quando o logotipo for clicado
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.titleContainer} onClick={handleLogoClick}>
            <Typography variant="h6" className={classes.title}>
              FETIN INATEL
            </Typography>
          </div>
          <div className={classes.search}>
            <TextField
              className={classes.input}
              placeholder="Pesquisar..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
            <IconButton component={RouterLink} to="/dashboardOrientador" className={classes.iconButton} color="inherit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.cardContainer}>
        {userData && (
          <>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Dados do Usuário
                </Typography>
                <Typography variant="body2" component="p">
                  Nome: {userData.nome}
                </Typography>
                <Typography variant="body2" component="p">
                  Curso: {userData.curso}
                </Typography>
                <Typography variant="body2" component="p">
                  Período: {userData.periodo}
                </Typography>
                <Typography variant="body2" component="p">
                  CPF: {userData.cpf}
                </Typography>
                <Typography variant="body2" component="p">
                  Matrícula: {userData.matricula}
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Fase Atual da FETIN
                </Typography>
                <Typography variant="body2" component="p">
                  Prazo de Inscrição: DD/MM/AAAA
                </Typography>
                <Typography variant="body2" component="p">
                  Prazo de Entrega: DD/MM/AAAA
                </Typography>
                <Typography variant="body2" component="p">
                  Data da FETIN: DD/MM/AAAA
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
