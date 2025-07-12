# academic-event-manager

Este é um sistema de gerenciamento de eventos acadêmicos desenvolvido em PHP e React, com banco de dados MySQL. O sistema permite que usuários se registrem, participem de cursos e eventos, e acumulem pontos com base na sua participação.

## Tabela de Conteúdos

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Uso](#uso)
- [Endpoints da API](#endpoints-da-api)
- [Trigger e Views](#trigger-e-views)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Visão Geral

O sistema foi criado para gerenciar eventos acadêmicos, permitindo a administração de usuários, cursos, e eventos. Usuários podem se registrar em cursos, ganhar pontos, e visualizar relatórios detalhados sobre suas participações.

## Funcionalidades

- **Gerenciamento de Usuários:** Criação, edição e exclusão de usuários com privilégios administrativos.
- **Gerenciamento de Eventos e Cursos:** Adição, atualização e remoção de eventos e cursos associados.
- **Registro e Desregistro de Cursos:** Usuários podem se registrar e desregistrar de cursos, com validações para evitar conflitos de horário.
- **Sistema de Pontuação:** Usuários acumulam pontos ao se registrar em cursos e perdem pontos ao se desregistrar.
- **Relatórios e Ranking:** Relatórios detalhados de usuários, eventos, cursos, e participações, com um ranking baseado em pontos acumulados.

## Tecnologias Utilizadas

- **Backend:** PHP com MySQL para gerenciamento de dados e lógica de negócios.
- **Frontend:** React para interface de usuário com estilização CSS.
- **Bibliotecas:** Axios para requisições HTTP, React Router para navegação, React Icons para ícones visuais.

## Configuração do Ambiente

Certifique-se de ter as seguintes ferramentas instaladas:

- **PHP**: Versão 7.4 ou superior
- **MySQL**: Versão 5.7 ou superior
- **Node.js**: Versão 14 ou superior
- **Composer**: Para gerenciar dependências PHP
- **npm**: Para gerenciar pacotes do Node.js

## Instalação

- Olhe os README.md, tanto para o [backend](https://github.com/luizvilasboas/academic-event-manager/tree/main/backend), tanto para o [frontend](https://github.com/luizvilasboas/academic-event-manager/tree/main/frontend) para rodar o projeto.

## Uso

1. Acesse o backend pela URL configurada (ex: `http://localhost:8000`).
2. Acesse o frontend pela URL padrão do React (ex: `http://localhost:3000`).

Aqui está a seção revisada de "Endpoints da API" do `README.md`, baseada nas rotas definidas no seu código PHP:

## Endpoints da API

### Autenticação

- `POST /auth/login`: Realiza o login de um usuário.
- `POST /auth/register`: Registra um novo usuário.

### Eventos

- `GET /event/list`: Lista todos os eventos.
- `GET /event/{id}`: Retorna os detalhes de um evento específico (apenas administradores).
- `POST /event/create`: Cria um novo evento (apenas administradores).
- `PATCH /event/update/{id}`: Atualiza os detalhes de um evento (apenas administradores).
- `DELETE /event/delete/{id}`: Exclui um evento (apenas administradores).

### Cursos

- `GET /course/list`: Lista todos os cursos.
- `GET /course/{id}`: Retorna os detalhes de um curso específico.
- `POST /course/create`: Cria um novo curso (apenas administradores).
- `PATCH /course/update/{id}`: Atualiza os detalhes de um curso (apenas administradores).
- `DELETE /course/delete/{id}`: Exclui um curso (apenas administradores).
- `POST /course/{courseId}/register`: Registra o usuário autenticado em um curso específico.
- `DELETE /course/{courseId}/unregister`: Desregistra o usuário autenticado de um curso específico.

### Usuários

- `GET /user/list`: Lista todos os usuários.
- `GET /user/me`: Retorna os detalhes do usuário autenticado.
- `PATCH /user/{id}`: Atualiza os detalhes de um usuário específico.
- `DELETE /user/{id}`: Exclui um usuário específico.
- `GET /user/courses`: Lista os cursos associados ao usuário autenticado.
- `GET /user/events`: Lista os eventos associados ao usuário autenticado.

### Pontuações

- `GET /scores`: Lista as pontuações de todos os usuários.

### Inscrições

- `GET /registration`: Lista todos os usuários com seus cursos associados.

## Notas

- **Autorização**: A maioria dos endpoints requer um token JWT válido no cabeçalho de autorização (`Authorization: Bearer <token>`).
- **Administração**: Alguns endpoints são restritos a administradores e verificarão o nível de acesso do usuário autenticado.

## Trigger e Views

### Triggers

- **Adicionar Pontos Após Registro:** Adiciona 10 pontos para o usuário ao registrar em um curso.
- **Subtrair Pontos Após Desregistro:** Subtrai 10 pontos quando o usuário desregistra de um curso.
- **Inicializar Pontuação do Usuário:** Define a pontuação inicial como 0 ao criar um novo usuário.

### Views

- **Ranking de Participação:** Mostra o ranking de usuários baseado na pontuação.

## Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Fork o repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`).
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`).
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](https://github.com/luizvilasboas/academic-event-manager/blob/main/LICENSE) para mais detalhes.
