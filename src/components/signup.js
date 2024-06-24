import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import backgroundImage from './Campus-Inatel-1.jpg';
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [registration, setRegistration] = useState('');
    const [cpf, setCpf] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const paperStyle = {
        padding: 20,
        width: 280,
        margin: "20px auto",
    };

    const avatarStyle = { 
        backgroundColor: '#3874CB', 
        color: 'black' 
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

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        const userData = {
            nome: name,
            curso: course,
            periodo: parseInt(periodo, 10) || 0, // Certifique-se de que é um número
            cpf: cpf,
            matricula: parseInt(registration, 10) || 0, // Certifique-se de que é um número
            email: email,
            senha: password,
        };

        try {
            const response = await fetch('https://back-core-glp-efcff2d4ee37.herokuapp.com/v1/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao criar a conta');
            }

            const data = await response.json();
            setMessage(data.message || 'Conta criada com sucesso!');
            resetForm();
            setTimeout(() => {
                window.location.href = '/login'; // Redirecionar após 3 segundos (opcional)
            }, 3000);
        } catch (error) {
            console.error('Erro ao criar conta:', error.message);
            setError(error.message || 'Erro ao criar a conta');
        }
    };

    const resetForm = () => {
        setName('');
        setCourse('');
        setRegistration('');
        setCpf('');
        setPeriodo('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={gridStyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Criar uma conta</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Nome completo'
                        placeholder='Entre com seu nome completo'
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label='Curso'
                        placeholder='Entre com seu curso'
                        fullWidth
                        required
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    />
                    <TextField
                        label='Período'
                        placeholder='Entre com seu período'
                        fullWidth
                        required
                        value={periodo}
                        onChange={(e) => setPeriodo(e.target.value)}
                    />
                    <TextField
                        label='CPF'
                        placeholder='Entre com seu CPF'
                        fullWidth
                        required
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <TextField
                        label='Matrícula'
                        placeholder='Entre com sua matrícula'
                        fullWidth
                        required
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value)}
                    />
                    <TextField
                        label='Email'
                        placeholder='Entre com seu email'
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label='Senha'
                        placeholder='Defina uma senha'
                        type='password'
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label='Confirmar senha'
                        placeholder='Confirme sua senha'
                        type='password'
                        fullWidth
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Criar conta
                    </Button>
                </form>
                {message && <Typography color="primary">{message}</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                <Typography>
                    <Link component={RouterLink} to="/" >
                        Já possui uma conta? Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Signup;
