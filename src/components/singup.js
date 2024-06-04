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
            periodo: parseInt(periodo, 10), // Certifique-se de que é um número
            cpf: cpf,
            matricula: parseInt(registration, 10), // Certifique-se de que é um número
            senha: password,
        };

        console.log('Sending user data:', userData); // Log para ver os dados sendo enviados

        try {
            const response = await fetch('https://back-core-glp-efcff2d4ee37.herokuapp.com/v1/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response data:', errorData); // Log para ver os dados de erro do servidor
                throw new Error(errorData.message || 'Erro ao criar a conta');
            }

            const data = await response.json().catch(() => ({})); // Adicionando catch para lidar com JSON vazio
            console.log('Success response data:', data); // Log para ver os dados de sucesso do servidor

            setName('');
            setCourse('');
            setRegistration('');
            setCpf('');
            setPeriodo(''); // Resetar o campo periodo
            setPassword('');
            setConfirmPassword('');
            
            setMessage(data.message || 'Conta criada com sucesso!');
            // Redirecionar para a tela de login após o sucesso
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000); // Redirecionar após 3 segundos (opcional)
        } catch (error) {
            console.error('Error message:', error.message); // Log para ver a mensagem de erro
            setError(error.message || 'Erro ao criar a conta');
        }
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
                    <Link component={RouterLink} to="/login" href="#">
                        Já possui uma conta? Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Signup;
