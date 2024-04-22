import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import backgroundImage from './Campus-Inatel-1.jpg';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const [cpf, setCPF] = useState('');
    const [password, setPassword] = useState('');

    const paperStyle = {
        padding: 70,
        height: '100vh',
        width: '27%',
        marginRight: "auto",
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '5px solid rgba(0, 0, 0, 0.2)',
    };


    const avatarStyle = { 
        backgroundColor: '#3874CB', 
        color: 'black' // Defina a cor desejada para o ícone aqui
    };

    const btnstyle = { marginBottom: '15px', backgroundColor: '#3874CB' };

    const gridStyle = {
        backgroundImage: `url(${backgroundImage})`, // Define a imagem de fundo aqui
        backgroundSize: 'cover', // Garante que a imagem cubra toda a tela
        backgroundPosition: 'center', // Centraliza a imagem
        height: '100vh', // Define a altura para cobrir toda a tela
    };

    const spaceStyle = {
        marginBottom: '15px', 
    };
    const baseUrl = process.env.BASE_URL
    const handleLogin = () => {
    fetch('https://back-core-glp-efcff2d4ee37.herokuapp.com/v1/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }
        return response.json();
    })
    .then(data => {
        const token = data.token;
        console.log('Token de acesso:', token);
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
    });
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center" style={gridStyle}>
            <Grid  component={Paper} elevation={10} style={paperStyle} alignItems='center'>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Login</h2>
                </Grid>
                <TextField
                    label='CPF'
                    placeholder='Entre com o CPF'
                    fullWidth
                    required
                    style={spaceStyle}
                    value={cpf}
                    onChange={e => setCPF(e.target.value)}
                />
                <TextField
                    label='Senha'
                    placeholder='Enter com a senha'
                    type='password'
                    fullWidth
                    required
                    style={spaceStyle}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" style={spaceStyle} />}
                    label="Lembre-se"
                />
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={handleLogin}
                >
                    Entrar
                </Button>
                <Typography>
                    <Link component={RouterLink} to="forgotPassword" href="#">
                        Esqueceu a senha?
                    </Link>
                </Typography>
                <Typography style={spaceStyle}>
                    Você ainda não tem uma conta?
                    <Link component={RouterLink} to="/singup">Cadastre-se</Link>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Login;