import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const DashboardOrientador = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [orientador, setOrientador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token não encontrado');
        }

        const decodedToken = parseJwt(token);
        const { nome, cpf, email } = decodedToken; // Extrair dados do orientador do token

        setOrientador({ nome, cpf, email });
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError(`Erro ao carregar dados: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleLogoClick = () => {
    // Ação ao clicar no logo, se necessário
  };

  if (loading) {
    return <Typography variant="body1">Carregando...</Typography>;
  }

  if (error) {
    return <Typography variant="body1" className={classes.error}>{error}</Typography>;
  }

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
              variant="outlined"
              placeholder="Buscar projetos..."
              value={search}
              onChange={handleSearchChange}
              className={classes.input}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.cardContainer}>
        {orientador && (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Orientador
              </Typography>
              <Typography variant="body2" component="p">
                Nome: {orientador.nome}
              </Typography>
              <Typography variant="body2" component="p">
                CPF: {orientador.cpf}
              </Typography>
              <Typography variant="body2" component="p">
                Email: {orientador.email}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Função para decodificar o payload do token JWT
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return {};
  }
};

export default DashboardOrientador;
