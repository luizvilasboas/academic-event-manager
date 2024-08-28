### backend

1. Navegue para o diretório do backend:

   ```
   cd backend
   ```

2. Configure o banco de dados:

   - Crie o banco de dados e tabelas usando o script SQL fornecido no projeto (`scripts/generate.sql`).
   - Suba o banco de dados com o (`docker-compose.yaml`).
   - Rode os comandos dentro do (`scripts/fake.sql`) para gerar dados falsos.

3. Instale as dependências do PHP:

   ```
   composer install
   ```

4. Rode o servidor do PHP:

   ```
   php -S localhost:8000 -t public
   ```

## Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Fork o repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`).
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`).
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](https://gitlab.com/olooeez/academic-event-manager/-/blob/main/LICENSE) para mais detalhes.
