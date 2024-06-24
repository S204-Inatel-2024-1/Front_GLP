# Fetin App GLP

## Introdução

Para a disciplina Engenharia de Produto de Software, desenvolveu-se um aplicativo inovador baseado na FETIN - Feira Tecnológica do Inatel. O objetivo deste app é aprimorar a organização e oferecer praticidades tanto para os alunos participantes da feira quanto para os orientadores dos projetos e os coordenadores do evento.

### Objetivos do Aplicativo
- *Melhoria na Organização:* Facilitar a comunicação e o acompanhamento de projetos, centralizando todas as informações relevantes em um único local.
- *Praticidade:* Oferecer funcionalidades que atendam às necessidades específicas de cada grupo de usuários: alunos, orientadores e administradores.

### Funcionalidades
- *Perfis de Login:*
  - *Orientador:* Pode visualizar dados detalhados das equipes que está orientando, monitorando o progresso e as entregas realizadas.
  - *Equipe:* Pode acompanhar as etapas do projeto, registrar entregas e manter um registro atualizado do progresso.
  - *Administrador:* Tem a capacidade de cadastrar novos usuários e gerenciar as informações das equipes, garantindo que todos os dados estejam acessíveis e atualizados.

### Benefícios
- *Para os Alunos:* Facilita o acompanhamento de prazos e entregas, promovendo uma gestão mais eficiente do tempo e das tarefas.
- *Para os Orientadores:* Proporciona uma visão clara e detalhada do progresso das equipes, permitindo um acompanhamento mais eficaz e suporte direcionado.
- *Para os Coordenadores:* Simplifica a gestão dos participantes e projetos, assegurando que todas as informações relevantes estejam organizadas e acessíveis.

O aplicativo foi concebido para ser uma ferramenta abrangente e intuitiva, contribuindo significativamente para o sucesso da FETIN e proporcionando uma experiência mais fluida e produtiva para todos os envolvidos.

## Versão
1.0.0

## Autores
- Gabriel Filhagosa Guimarães 
- Luis Fillype Vilela Cunha 
- Pedro Guilherme Fernandes Oliveira 

## Deploy no Vercel
O aplicativo está implantado em: https://front-glp-s204.vercel.app

## Instalação como Desenvolvedor

### Pré-requisitos
- Node.js 
- npm ou yarn 

### Passos para Instalação
1. Clone o repositório:
   bash
   git clone https://github.com/S204-Inatel-2024-1/Front_GLP
2. Navegue até o diretório do projeto:
   bash
   cd [Front_GLP]   
3. Instale as dependências:
  bash
  npm install
  
  ou, se estiver usando yarn:
   bash
  yarn install

# Scripts Disponiveis

No diretório do projeto, você pode executar os seguintes comandos:

npm start ou yarn start
Executa o aplicativo em modo de desenvolvimento.
Abra http://localhost:3000 para visualizá-lo no navegador.

npm run build ou yarn build
Cria o aplicativo para produção na pasta build.
Ele agrupa corretamente o React no modo de produção e otimiza a construção para o melhor desempenho.

npm test ou yarn test
Inicia o executor de testes no modo de observação interativo.

npm run eject
Nota: esta é uma operação sem retorno.
Se você não estiver satisfeito com a ferramenta de construção e as escolhas de configuração, você pode ejetar a qualquer momento. Este comando removerá a dependência única de construção de seu projeto.

## Estrutura de Pastas
my-app/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── App.js
│   │   └── dashboard.js
│   │   └── dashboardadm.js
│   │   └── dashboardorientador.js
│   │   └── forgotPassword.js
│   │   └── login.js
│   │   └── singup.js
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── App.css
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
└── README.md

## Componentes Principais
App.js
Descrição: Componente principal do aplicativo.

dashboard.js
Descrição: Tela do dashboard do aluno

dashboardadm.js
Descrição: Tela do dashboard do adiministrador

dashboardorientador.js
Descrição: Tela do dashboard do orientador

forgotPassword.js
Descrição: Tela para recuperação de senha

login.js
Descrição: Tela para realização do login

singup.js
Descrição: Tela para realização de cadastro 

## Estilos e temas: 
Material UI 
Antd
## Testes

Framework de Teste Utilizado: Cypress
Execução dos testes:
Após clonar o repositório, pelo terminal, abra a pasta "Testes" e execute o comando a seguir:

./node_modules/.bin/cypress open

Após abrir o cypress com o comando acima, execute os teste com o comando abaixo:

./node_modules/.bin/cypress run --spec 'cypress/e2e/TesteUI.cy.js/'
Após a execucao dos testes, o relatório ficará salvo na pasta:

cypress/reports
Basta arrastar o arquivo html no navegador para visualiza-lo

## Visao geral app: 

![Tela Login](/Users/pedrooliveira/Front_GLP/tela1.png)
![Tela Aluno](/Users/pedrooliveira/Front_GLP/tela2.png)
![Tela Administrador](/Users/pedrooliveira/Front_GLP/tela3.png)
![Tela Orientador](/Users/pedrooliveira/Front_GLP/tela4.png)