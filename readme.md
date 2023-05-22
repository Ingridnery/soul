# Soul API

Este projeto é uma API REST simulada para gerenciar almas usando JSON Server e Node.js. É possível adicionar, editar, remover e listar as almas através de requisições HTTP.

## Pré-requisitos

- Node.js instalado em seu computador. Você pode baixá-lo em https://nodejs.org/.

## Instalação

1. Clone este repositório para o seu ambiente local: git clone https://github.com/Ingridnery/soul.git
2. Navegue até o diretório do projeto: cd soul
3. Instale as dependências do projeto: npm install

## Utilização

1. Navegue até o diretório server do projeto: cd soul/server
2. Inicie o servidor JSON Server: npm run json-server
    O servidor será iniciado e estará disponível em http://localhost:3000/souls . A API REST simulada será baseada no conteúdo do arquivo `db.json`.
3. Faça requisições para a API utilizando ferramentas como Postman ou um navegador.

### Listar Almas

- Método: GET
- Endpoint: `/souls`
- Descrição: Retorna uma lista de todas as almas registradas.

### Obter uma Alma

- Método: GET
- Endpoint: `/souls/{id}`
- Descrição: Retorna os detalhes de uma alma específica com base no seu ID.

### Adicionar uma Alma

- Método: POST
- Endpoint: `/souls`
- Descrição: Adiciona uma nova alma à lista.
- Corpo da requisição (exemplo):
{
 "owner": "Nome do Proprietário",
 "name": "Nome da Alma",
 "location": "Localização da Alma (sky, hell ou purgatory)"
}

### Atualizar uma Alma

- Método: PUT
- Endpoint: /souls/{id}
- Descrição: Atualiza os detalhes de uma alma existente com base no seu ID.
- Corpo da requisição (exemplo):
{
  "owner": "Novo Nome do Proprietário",
  "name": "Novo Nome da Alma",
  "location": "Nova Localização da Alma (sky, hell ou purgatory)"
}

### Remover uma alma

- Método: DELETE
- Endpoint: /souls/{id}
- Descrição: Remove uma alma específica com base no seu ID.





