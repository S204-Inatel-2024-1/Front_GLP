import React from 'react';

const ProjectCardsPage = ({ projects }) => {
  return (
    <div>
      <h1>Projetos Cadastrados</h1>
      <div>
        {projects ? (
          projects.map((project, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <h2>Nome do Projeto: {project.projectName}</h2>
              <h3> Inscricao: {project.inscricao}</h3>
            </div>
          ))
        ) : (
          <p>Nenhum projeto cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectCardsPage;
