import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import backgroundImage from './Campus-Inatel-1.jpg';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importar a biblioteca jwt-decode

const Login = () => {
    const navigate = useNavigate();

    const [cpf, setCPF] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState(null); // Estado para armazenar o token

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

        const credentials = btoa(`${cpf}:${password}`);
        const config = {
            method: 'post',
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
                setToken(token); // Armazenar o token no estado
                localStorage.setItem('token', token); // Armazenar o token no localStorage

                const decodedToken = jwtDecode(token); // Decodificar o token

                const isAdmin = decodedToken.isAdmin;
                const isOrientador = decodedToken.isOrientador;

                // Verificações de tipo de usuário com base no token decodificado
                if (isAdmin) {
                    console.log('Usuário é administrador.');
                    navigate("/dashboardadm");
                } else if (isOrientador) {
                    console.log('Usuário é orientador.');
                    navigate("/dashboardOrientador");
                } else {
                    console.log('Usuário é aluno.');
                    navigate("/dashboard");
                }

                setErrorMessage('');
            })
            .catch((error) => {
                if (error.response) {
                    const errorMessage = error.response.data.message;
                    console.log('Erro de login:', errorMessage);
                    if (errorMessage === 'CPF inválido' || errorMessage === 'Usuario sem permissão') {
                        setErrorMessage('Usuário não encontrado. Por favor, verifique o CPF ou a senha e tente novamente.');
                    } else if (errorMessage === 'Senha incorreta') {
                        setErrorMessage('Senha incorreta. Por favor, tente novamente.');
                    } else {
                        setErrorMessage('Erro ao fazer login. Por favor, tente novamente mais tarde.');
                    }
                } else {
                    console.error('Erro ao fazer login:', error);
                    setErrorMessage('Erro ao fazer login. Por favor, tente novamente mais tarde.');
                }
            });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={gridStyle}>
            <Grid item component={Paper} elevation={10} style={paperStyle}>
                <Grid container alignItems="center" direction="column">
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <Typography component="h2" variant="h5">
                        Login
                    </Typography>
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
                {errorMessage && (
                    <Typography color="error" style={{ marginBottom: '15px' }}>
                        {errorMessage}
                    </Typography>
                )}
                <Typography>
                    <Link component={RouterLink} to="/passwordRecovery">
                        Esqueceu a senha?
                    </Link>
                </Typography>
                <Typography style={spaceStyle}>
                    Você ainda não tem uma conta? <Link component={RouterLink} to="/signup">Cadastre-se</Link>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Login;
