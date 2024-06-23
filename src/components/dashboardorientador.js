import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { TextField, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'; 
import IconButton from '@material-ui/core/IconButton';
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
  logo: {
    width: 50,
    height: 'auto',
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

const DashboardOrientador = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [projetosOrientador, setProjetosOrientador] = useState([]);
  const [projetoOrientado, setProjetoOrientado] = useState(null);
  const [orientador, setOrientador] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca dados do projeto do orientado
        const projetoResponse = await axios.get('https://back-core-glp-efcff2d4ee37.herokuapp.com/v1/projetos/email@email.com/true');
        setProjetoOrientado(projetoResponse.data);

        // Autenticação e busca dos dados do orientador
        const authResponse = await axios.post('https://back-core-glp-efcff2d4ee37.herokuapp.com/v1/auth', {
          // Dados para autenticação, se necessário
        });

        const orientadorResponse = await axios.get('URL_DO_ENDPOINT_PARA_DADOS_DO_ORIENTADOR', {
          headers: {
            Authorization: `Bearer ${authResponse.data.token}`
          }
        });
        setOrientador(orientadorResponse.data);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Tratar erro de carregamento, se necessário
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleLogoClick = () => {
    // Ação ao clicar no logo (se necessário)
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
        </Toolbar>
      </AppBar>
      <div className={classes.cardContainer}>
        {projetoOrientado && (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                {projetoOrientado.titulo}
              </Typography>
              <Typography variant="body2" component="p">
                Número: {projetoOrientado.numero}
              </Typography>
              <Typography variant="body2" component="p">
                Membros da Equipe: {projetoOrientado.membros.join(', ')}
              </Typography>
              <Typography variant="body2" component="p">
                Orientador: {projetoOrientado.orientador}
              </Typography>
              <Typography variant="body2" component="p">
                Status: {projetoOrientado.status}
              </Typography>
            </CardContent>
          </Card>
        )}
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

export default DashboardOrientador;
