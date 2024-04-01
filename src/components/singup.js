import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import backgroundImage from './Campus-Inatel-1.jpg';
import { Link as RouterLink } from 'react-router-dom'; // Importando Link corretamente

const Singup = () => {

    const paperStyle = {
        padding: 20,
        width: 280,
        margin: "20px auto",
    };

    const avatarStyle = { 
        backgroundColor: '#3874CB', 
        color: 'black' // Defina a cor desejada para o ícone aqui
    };
    const btnstyle = { margin: '8px 0', backgroundColor: '#3874CB' };

    const gridStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={gridStyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Criar uma conta</h2>
                </Grid>
                <TextField label='Nome completo' placeholder='Entre com seu nome completo' fullWidth required />
                <TextField label='Usuário' placeholder='Entre com seu usuário' fullWidth required />
                <TextField label='Email' placeholder='Entre com seu email Inatel' type='email' fullWidth required />
                <TextField label='Senha' placeholder='Defina uma senha' type='password' fullWidth required />
                <TextField label='Confirmar senha' placeholder='Confirme sua senha' type='password' fullWidth required />
                <Button type='Enviar' color='primary' variant="contained" style={btnstyle} fullWidth>Criar conta</Button>
                <Typography>
                    <Link component={RouterLink} to="/" href="#">Ja possui uma conta? Sign In</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Singup;