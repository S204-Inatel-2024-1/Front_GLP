import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import backgroundImage from './Campus-Inatel-1.jpg';
import { Link as RouterLink } from 'react-router-dom'; // Importando Link corretamente

const PasswordRecovery = () => {

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
                    <h2>Recuperação de Senha</h2>
                </Grid>
                <TextField label='Email' placeholder='Entre com seu email Inatel' type='email' fullWidth required />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Enviar Email</Button>
                <Typography>
                    <Link component={RouterLink} to="/" href="#">Voltar para o Login</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default PasswordRecovery;
