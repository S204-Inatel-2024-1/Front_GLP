import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'; // Importe o componente Link como RouterLink
import * as Papa from 'papaparse';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
  
      if (parsedData.errors.length > 0) {
        console.error('Erro ao processar CSV:', parsedData.errors);
        return;
      }
  
      const projects = parsedData.data;
      // Chamar a função onFileUpload e passar os projetos extraídos
      onFileUpload(projects);
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
    
        <RouterLink to="/projects" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" onClick={handleUpload} disabled={!selectedFile}>
            Processar e Redirecionar
          </Button>
        </RouterLink>
      </div>
    </div>
  );
};

export default FileUpload;
