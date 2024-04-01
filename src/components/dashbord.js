import React, { useState } from 'react';
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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  menuButton: {
    marginRight: '16px',
  },
  search: {
    flexGrow: 1,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  card: {
    minWidth: 275,
    margin: '16px',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <div className={classes.search}>
            <div className={classes.iconButton}>
              <SearchIcon />
            </div>
            <TextField
              className={classes.input}
              placeholder="Pesquisar..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Título do Card 1
            </Typography>
            <Typography variant="body2" component="p">
              Descrição do Card 1
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Título do Card 2
            </Typography>
            <Typography variant="body2" component="p">
              Descrição do Card 2
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Título do Card 3
            </Typography>
            <Typography variant="body2" component="p">
              Descrição do Card 3
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
