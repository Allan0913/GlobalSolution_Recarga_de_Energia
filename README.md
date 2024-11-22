# GlobalSolution_Recarga_de_Energia - Projeto de Monitoramento de Recarga de Veículos Elétricos

## Integrantes do grupo:

- Allan Huang RM: 93400
- Rafael Taborda Rodrigues RM: 94588
- João Ortega Cabral Olim RM: 94163 

Este projeto foi desenvolvido como parte de um sistema de **monitoramento e gerenciamento de recarga de veículos elétricos**, com ênfase no uso de **fontes renováveis** e **otimização de consumo** em horários de menor demanda. O aplicativo permite aos usuários marcar, gerenciar e visualizar status de recarga para veículos elétricos, além de permitir um login seguro e gerenciamento administrativo.

## Tecnologias Utilizadas

- **Frontend**: React Native
- **Backend**: Node.js com Express
- **Banco de Dados**: SQLite
- **Autenticação**: JWT (JSON Web Token)
- **API**: RESTful API
- **Roteamento**: React Navigation
- **Autenticação no Frontend**: Login com e-mail e senha

## Funcionalidades

- **Login de Usuário**: Os usuários podem se autenticar no sistema usando e-mail e senha.
- **Visualização de Status**: Usuários podem visualizar as status de recarga registradas.
- **Atualização de Status**: Administradores podem Atualizar em tempo real os status de recarga.
- **Exclusão de Status**: Administradores podem excluir status de recarga.
- **Atualização de Status**: Administradores podem excluir status de recarga.
- **Dashboard Administrativo**: Permite visualizar, adicionar e remover status de recarga.
  
## Como Rodar o Projeto

### 1. Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** instalados em sua máquina.

### 2. Rodando o APP

Esse APP tem 2 pastas (Backend e Frontend), vou mostrar como rodar no pc.

1° Passo

Na pasta do Backend:

vai no terminal do backend e dá "pip install" para instalar todas as biliotecas que vão ser utilizadas

se tudo funcionar, pode dar o comando "node server.js", assim ele irá ligar o servidor no backend

2° Passo

Na pasta do Frontend:

vai no terminal do frontend e dá "pip install" para instalar todas as biliotecas que vão ser utilizadas

em seguida, tenta dar "npm start", assim ele funcionará.

OBS: caso der algum erro na tsconfig.json ou em outros códigos, recomendo dar CRTL + SHIFT + P e em seguida achar "TypeScript: Restart TS Server" e em seguida reniciar o VScode! :)

## As Telas Do Projeto


Tela de Login:

> ![image](https://private-user-images.githubusercontent.com/50491287/389055168-8213f9d3-69be-4ff4-a055-aa655724bf7b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzIzMDA0MDEsIm5iZiI6MTczMjMwMDEwMSwicGF0aCI6Ii81MDQ5MTI4Ny8zODkwNTUxNjgtODIxM2Y5ZDMtNjliZS00ZmY0LWEwNTUtYWE2NTU3MjRiZjdiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTIyVDE4MjgyMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg1MjYyMzkyNDY2NDU3NzRkMjI3MzE1YjkxNjlkYjNjNDBhYjFjNjE4MDhkNmNkZTJlZTRmYTAzM2IzZWZjMjgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.mBG_0R81AofSY-BtUTQ5EK593NVs-f5eAd6pWo0FJUw)

Tela de Cadastro:

> ![image](https://private-user-images.githubusercontent.com/50491287/389054600-baff0a9f-f18f-4ef4-8d51-84503f7f408b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzIzMDA1MTksIm5iZiI6MTczMjMwMDIxOSwicGF0aCI6Ii81MDQ5MTI4Ny8zODkwNTQ2MDAtYmFmZjBhOWYtZjE4Zi00ZWY0LThkNTEtODQ1MDNmN2Y0MDhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTIyVDE4MzAxOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTkzNzQwYjRhYWU4NTRmMDgzZGQ3NzQ5MDNiODRjMzkxZDY5N2Y1MTRlNDFhMzZkYzMyNmE0ZDE4ZDczM2EyOTMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Dpl6E4BM5UxhZaTnHnliRT0THfzDzsihoQrnbNQ_DdA)

Tela de Demostração de Status:

> ![image](https://private-user-images.githubusercontent.com/50491287/389054766-f2a48f81-2c3a-4fc3-8a49-9237cf0162db.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzIzMDA1NzUsIm5iZiI6MTczMjMwMDI3NSwicGF0aCI6Ii81MDQ5MTI4Ny8zODkwNTQ3NjYtZjJhNDhmODEtMmMzYS00ZmMzLThhNDktOTIzN2NmMDE2MmRiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTIyVDE4MzExNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThlMWNiZWMzMmRmYjNmOTFiYTY5ZjlmY2Q0NjI5NTYxOGRkYzA0OTdkYTY5MTJkZjUxZTY4NWZiYjYwMTRmZjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.0LVPLdzNWMDN53EtZWN-EU_Rh4i6PvM6oO9NWMLYaVA)

Tela de Agendar Status

> ![image](https://private-user-images.githubusercontent.com/50491287/389054923-c3f777af-e4b8-41c6-a865-b501b8d8a99d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzIzMDA1ODksIm5iZiI6MTczMjMwMDI4OSwicGF0aCI6Ii81MDQ5MTI4Ny8zODkwNTQ5MjMtYzNmNzc3YWYtZTRiOC00MWM2LWE4NjUtYjUwMWI4ZDhhOTlkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTIyVDE4MzEyOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWYwMTE1OTIyODY5MTA1YzdjZmM0OWRjN2U0MzcxODQ3Y2IzYmFiZjUxNmRmZmMwYTk1ZWQ2Y2Y1MWI0ZTJhY2EmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.MG0dMNYdLgecWAkIK3DKVp1Gp1GxEP35RSK8chmHzNs)

Tela de Confimação

> ![image](https://private-user-images.githubusercontent.com/50491287/389055168-8213f9d3-69be-4ff4-a055-aa655724bf7b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzIzMDA2MjIsIm5iZiI6MTczMjMwMDMyMiwicGF0aCI6Ii81MDQ5MTI4Ny8zODkwNTUxNjgtODIxM2Y5ZDMtNjliZS00ZmY0LWEwNTUtYWE2NTU3MjRiZjdiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTIyVDE4MzIwMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWNlNWEwMDYxMGQwZDdkZmY1MjMxZWE1ZDMwMjNkNGUxNjc5NzE0MjBkYWIzOTZjZWIxZWZjMmE3OWExOTJkYWMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.kDjl2XbZbJs_FRqeaNfA7iRp06ALV0AxiKsz8cZWoxs)



