import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'; // Importe o componente Link como RouterLink
import * as Papa from 'papaparse';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    height: '10vh',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2), // Espaçamento entre os botões
  },
}));

const FileUpload = ({ onFileUpload }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [projects, setProjects] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setProjects(null);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvData = e.target.result;
      const parsedData = Papa.parse(csvData, { header: true, delimiter: ','});
      
  
      // if (parsedData.errors.length > 0) {
      //   console.error('Erro ao processar CSV:', parsedData.errors);
      //   return;
      // }
  
      setProjects(parsedData.data);
      //console.log( parsedData.data);
      // Chamar a função onFileUpload e passar os projetos extraídos
      onFileUpload( parsedData.data);
    };
  
    reader.readAsText(selectedFile);
  };
  
  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        {/* Botão para selecionar o arquivo CSV */}
        <input
          accept=".csv"
          id="contained-button-file"
          multiple
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Selecionar Arquivo
          </Button>
        </label>
        <RouterLink to={{
      pathname: '/projects',
      state: { projects: projects }
    }} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" onClick={handleUpload} disabled={!selectedFile}>
            Processar e Redirecionar
          </Button>
        </RouterLink>
      </div>
      <div>
      
      <div>
      </div>
    </div>
    </div>
  );
};

export default FileUpload;