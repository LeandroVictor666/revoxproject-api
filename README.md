# RevoxProject-API

Esse é o respositorio da aplicação Back-End do projeto "RevoX", RevoX é meu projeto de Rede Social
Minha pretenção com esse projeto é que ele seja trabalhado como SPA, inicialmente eu iria utilizar o NextJs, porém, como é uma social media, uma aplicação SPA faz mais sentido, já que o nextjs utiliza SSR, e esse website irá conter muitas interações do usuario
Na maioria se não todos os projetos que estão no meu repositorio representa um codigo do mundo real, e não algo didatico

Nesse projeto estou seguindo a arquitetura TDD e aplicando conceitos de Clean-Code.

**Você pode obter o projeto front-end no seguinte link**

### https://github.com/LeandroVictor666/revoxproject-app

---

# Tecnologias

## Front-End

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

---

## Back-End

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

---

# Como instalar o projeto

#### **_(Tenha o Docker instalado na sua maquina)_**

### ***https://www.docker.com***

---

**_!Importante, antes de executas os passos abaixos, crie uma pasta chamada "db" na pasta "app", o container do postgresql busca por essa pasta (e eu não tenho certeza se o docker cria esta pasta automaticamente)_**

- 1. Primeiro faça o git clone ou apenas faça o download do projeto
- 2. Abra seu terminal ou cmd e acesse a pasta base do projeto
- 3. Rode o comando `docker-compose up`
- 4. O docker irá baixar todas as images necessarias para o projeto, então é necessario aguardar um pouco
- 5. Agora, abra outro terminal (ou em vez de utilizar o comando `docker-compose up -d` para rodar os containers em modo detached, agora você pode utilizar o mesmo terminal)
- 6. Utilize o comando `docker inspect revox-api` esse comando irá apresentar diversas informações sobre o container, mas oque realmente interessa é o ""IPAddress": "xxx.xxx.xx.x"", pois é nesse ip que vai ficar rodando a nossa api, as requests precisam ir para esse ip.
- 7. Agora abra seu navegador, e acesse a seguinte url: `http://IpDoConteinerAqui:3000` (troque o IpDoConteinerAqui pelo IP que você obteve ao executar o docker inspect)
- 8. Se você receber a seguinte mensagem: "Hello World!" significa que tudo ocorreu perfeitamente!

---

**É recomendavel que tenha um pouco de experiencia com o docker, e principalmente com comandos bash, para poder navegar ou inspecionar dentro do container, em breve farei o passo a passo de como verificar se esta tudo ok com o container do postgresql, também irei trazer algumas alterações que irão facilitar o processo de build do projeto com o docker**
