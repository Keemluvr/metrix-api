## Sobre o projeto

Este projeto é uma aplicação construída com NestJS.
O front-end da aplicação fica no repositório [metrix-webapp](https://github.com/Keemluvr/metrix-webapp)

## 📝 Tabela de conteúdos

- [Tecnologias Utilizadas](#%EF%B8%8F-tecnologias-utilizadas)
- [Como executar o projeto](#point_right-como-executar-o-projeto)
- [Estrutura do Projeto](#mag_right-estrutura-do-projeto)
- [Ajustes e/ou novas funcionalidades para o sistema](#-ajustes-eou-novas-funcionalidades-para-o-sistema)

## ⛏️ Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicativos back-end em Node.js.
- **TypeScript**: Linguagem de programação para tipagem estática de dados.
- **Sequelize**: ORM (Object-Relational Mapping) para Node.js, utilizado para interagir com o banco de dados SQLite.
- **class-validator**: Biblioteca para validação de dados em classes e objetos.
- **bcrypt**: Biblioteca para hashing de senhas.
- **JWT (JSON Web Tokens)**: Método para autenticação.
- **SQLite**: Banco de dados SQL embutido.

### Testes:

- **Jest**: Framework de testes em JavaScript.

### Ferramentas de Desenvolvimento:

- **Prettier**: Ferramenta para formatação de código.
- **ESLint**: Ferramenta para análise estática de código em JavaScript e TypeScript.

## :point_right: Como executar o projeto

1. Crie um arquivo com o nome `.env` na raiz do projeto com a seguinte configuração:

   ```sh
    NODE_ENV=development
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASS=postgres
    DB_NAME=metrix
    DB_DIALECT=postgres
    PRIVATE_KEY=random_secret_key
    TOKEN_EXPIRATION=48h
   ```
   
2. Instale as dependências do projeto:

   ```sh
   npm install
   ```

3. Crie o banco localmente:
   ```sh
   npm run migrate
   ```

4. Execute as seeds para popular o banco:
   ```sh
   npm run seed
   ```

5. Execute a aplicação:
   ```sh
   npm run start
   ```

## :mag_right: Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```sh
|-- src/
    |-- common/
        |-- constants/
        |-- guards/
        |-- helpers/
    |-- core/
        |-- constants/
        |-- database/
    |-- modules/
        |-- auth/
        |-- user/
            |-- dto/
            |-- entities/
            |-- enums/
```

### `common`
- Contém módulos comuns utilizados em toda a aplicação, como constantes, guards e helpers.

### `core`
- Responsável por configurar aspectos centrais da aplicação, como conexão com o banco de dados.

### `modules`
- Contém os módulos da aplicação, cada um representando uma área ou recurso, como autenticação e usuário. Cada módulo pode conter Data Transfer Objects (DTOs), entidades e enums relacionados.

## 🔨 Ajustes e/ou novas funcionalidades para o sistema:

- [ ] (Melhoria) Separar o Address e o Physical para um novo módulo para poder ter rotas para editar somente eles
- [ ] (Ajuste) Configurar o CORS
- [ ] (Melhoria) Adiciona o Swagger para uma melhor documentação
- [ ] (Melhoria) Melhorar o tratamento e retorno dos erros
