import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import backgroundImage from './Campus-Inatel-1.jpg';
import { Link as RouterLink, Navigate } from 'react-router-dom'; // Importe o componente Navigate

import axios from 'axios';

const Login = () => {
    const [cpf, setCPF] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

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
        color: 'black'
    };

    const btnstyle = { marginBottom: '15px', backgroundColor: '#3874CB' };

    const gridStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    };

    const spaceStyle = { marginBottom: '15px' };

    const handleLogin = () => {
        console.log('CPF:', cpf, 'Password:', password);

        const credentials = btoa(`${cpf}:${password}`); // Base64 encode the credentials
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://back-core-glp-efcff2d4ee37.herokuapp.com/v1/auth',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const token = response.data.token;
                console.log('Token de acesso:', token);
                // Salvando o token no armazenamento local (localStorage)
                localStorage.setItem('token', token);
                setRedirectToDashboard(true); // Ativar o redirecionamento para o dashboard
            })
            .catch((error) => {
                console.error('Erro ao fazer login:', error);
            });
    };

    // Redirecionamento para a página de dashboard se a variável redirectToDashboard for true
    if (redirectToDashboard) {
        return <Navigate to="/dashboard" />; // Usando o componente Navigate
    }

    return (
        <Grid container justifyContent="flex-start" alignItems="center" style={gridStyle}>
            <Grid item component={Paper} elevation={10} style={paperStyle}>
                <Grid container alignItems="center" direction="column">
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
                    placeholder='Entre com a senha'
                    type='password'
                    fullWidth
                    required
                    style={spaceStyle}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
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
                    <Link component={RouterLink} to="forgotPassword" href="#" >
                       Esqueceu a senha?
                    </Link>
                </Typography>
                <Typography style={spaceStyle}>
                    Você ainda não tem uma conta?
                    <Link component={RouterLink} to="/signup">Cadastre-se</Link>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Login;
