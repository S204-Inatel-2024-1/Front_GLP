import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import backgroundImage from './Campus-Inatel-1.jpg';
import { Link as RouterLink } from 'react-router-dom'; // Importando Link corretamente

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch('https://back-core-glp-efcff2d4ee37.herokuapp.com/v1/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar o email de recuperação.');
            }

            const data = await response.json();
            setMessage(data.message || 'Email de recuperação enviado com sucesso!');
        } catch (error) {
            setError(error.message || 'Erro ao enviar o email de recuperação.');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={gridStyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Recuperação de Senha</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Email'
                        placeholder='Entre com seu email Inatel'
                        type='email'
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Enviar Email
                    </Button>
                </form>
                {message && <Typography color="primary">{message}</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                <Typography>
                    <Link component={RouterLink} to="/" href="#">Voltar para o Login</Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default PasswordRecovery;
