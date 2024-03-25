import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import backgroundImage from './Campus-Inatel-1.jpg';

const Login = () => {

    const paperStyle = {
        padding: 70,
        height: '100vh',
        width: '27%',
        marginRight: "auto",
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '5px solid rgba(0, 0, 0, 0.2)',
    };


    const avatarStyle = { 
        backgroundColor: '#4169E1', 
        color: 'black' // Defina a cor desejada para o ícone aqui
    };

    const btnstyle = { marginBottom: '15px' };

    const gridStyle = {
        backgroundImage: `url(${backgroundImage})`, // Define a imagem de fundo aqui
        backgroundSize: 'cover', // Garante que a imagem cubra toda a tela
        backgroundPosition: 'center', // Centraliza a imagem
        height: '100vh', // Define a altura para cobrir toda a tela
    };

    const spaceStyle = {
        marginBottom: '15px', 
    };
    

    return (
        <Grid container justifyContent="flex-start" alignItems="center" style={gridStyle}>
            <Grid  component={Paper} elevation={10} style={paperStyle} alignItems='center'>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Login</h2>
                </Grid>
                <TextField label='Usuário' placeholder='Entre com o usuário' fullWidth required style={spaceStyle} />
                <TextField label='Senha' placeholder='Enter com a senha' type='password' fullWidth required style={spaceStyle}/>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                            style={spaceStyle}
                        />
                    }
                    label="Lembre-se"
                />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth >Entrar</Button>
                <Typography  >
                    <Link href="#" >
                       Esqueceu a senha?
                    </Link>
                </Typography>
                <Typography style={spaceStyle} >
                    Você já tem uma conta?
                    <Link href="#" >
                        Cadastre-se
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Login;
