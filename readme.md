<p align="center">
  <img  src="https://i.ibb.co/tBC6CgV/2525754.png"
    width="200px" height="200px" >
</p>
<h1 align="center">
  DrivenPass
</h1>

<br/>

## Descrição 📎

Drivenpass é uma aplicação que armazena de maneira segura e criptografada as informações sesíveis de um usuário. A aplicação armazena dados de cartão, contas de sites, wifi e documentos. A aplicação também permite a criação de notas seguras.

<h3 align="center">
<a href="https://driven-pass-app.herokuapp.com/" target="_blank">
        
«Deploy: https://driven-pass-app.herokuapp.com/»

</a>
</h3>

## Features 🚀

-   Create an account
-   Save credentials
-   Save private notes
-   Save card data
-   Save data from a WiFi network

</br>

## API Reference 📔

#### SignUp

```http
POST /signup
```

#### Request:

| Body       | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `email`    | `string` | **Required**. valid email |
| `password` | `string` | **Required**. password    |

`Password min length: "10"`

#

#### SignIn

```http
POST /signin
```

#### Request:

| Body       | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `email`    | `string` | **Required**. valid email |
| `password` | `string` | **Required**. password    |

</br>

#### Response:

```json
{
    "token": "jsonwebtoken"
}
```

<br/>

## Authorization headers

| Headers         | Type     | Description               |
| :-------------- | :------- | :------------------------ |
| `Authorization` | `string` | **Required**. valid token |

`Authorization format: Bearer jsonwebtoken`

**Todas as rotas a seguir precisam do authorization header**

<br/>

## → Credentials

#### Criar um novo registro de Credencial

```http
POST /credential
```

#### Request:

| Body       | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `url`      | `string` | **Required**. valid url                 |
| `username` | `string` | **Required**. user name                 |
| `label`    | `string` | **Required**. identifier for credential |
| `password` | `string` | **Required**. password                  |

</br>

### Pegar todos os ítens relacionados a um usuário

```http
GET /credential
```

#### Response:

```json
[
    {
        "id": 4,
        "label": "bumpy-hexagon.net",
        "url": "https://alienated-pregnancy.name",
        "username": "MissWilbertWilliamson83",
        "password": "8B0fdl1YHxyBWda",
        "createdAt": "2022-07-18T07:18:05.209Z"
    },
    {
        "id": 3,
        "label": "outrageous-counterterrorism.net",
        "url": "http://bad-recollection.br",
        "username": "EdSchultz.Martins",
        "password": "n16LwCO1vjhB_3A",
        "createdAt": "2022-07-17T16:42:17.806Z"
    }
]
```

#

### Pegar um item por id

```http
GET /credential/${id}
```

#### Request:

| Params | Type      | Description            |
| :----- | :-------- | :--------------------- |
| `id`   | `integer` | **Required**. valid id |

<br/>

#### Response:

```json
{
    "id": 4,
    "title": "bumpy-hexagon.net",
    "url": "https://alienated-pregnancy.name",
    "username": "MissWilbertWilliamson83",
    "password": "8B0fdl1YHxyBWda",
    "createdAt": "2022-07-18T07:18:05.209Z"
}
```

#

### Deletar item por id

```http
DELETE /credential/${id}
```

#### Request:

| Params | Type      | Description            |
| :----- | :-------- | :--------------------- |
| `id`   | `integer` | **Required**. valid id |

<br/>

## → Notes

### Criar um novo registro de Nota

```http
POST /note
```

#### Request:

| Body    | Type     | Description                       |
| :------ | :------- | :-------------------------------- |
| `title` | `string` | **Required**. Identifier for note |
| `note`  | `string` | **Required**. Note content        |

`Title max length: 50`

`Note max length: 1000`

</br>

#### Response:

```json
{
    "id": 4,
    "title": "dolores officia perspiciatis",
    "note": "Neque dicta ut nulla. Rem reiciendis expedita dolores doloremque molestiae eos. Et molestias et repellendus expedita vel occaecati qui quia. Animi et qui ullam alias id. Quas voluptatem ut. Quisquam est in aliquam atque possimus enim voluptates culpa.",
    "createdAt": "2022-07-18T07:18:16.322Z"
}
```

#

#### Pegar todos os ítens relacionados a um usuário

```http
GET /note
```

#### Response:

```json
[
    {
        "id": 3,
        "title": "labore et ea",
        "note": "Dignissimos architecto eos. Rerum quos consequatur vel doloremque consequatur. Velit voluptates qui voluptatum eum officiis illo dolorum consequatur. Cupiditate aut illo nobis. Explicabo officiis fuga.",
        "createdAt": "2022-07-17T18:27:40.732Z"
    },
    {
        "id": 4,
        "title": "inventore dolorem id",
        "note": "Rerum aut aut accusantium qui quis non. Dolores culpa voluptate iure exercitationem hic. Voluptatem et amet ipsum et ut qui id aliquid.",
        "createdAt": "2022-07-17T18:28:08.076Z"
    }
]
```

#

### Pegar um item por id

```http
GET /note/${id}
```

#### Request:

| Params | Type      | Description            |
| :----- | :-------- | :--------------------- |
| `id`   | `integer` | **Required**. valid id |

<br/>

#### Response:

```json
{
    "id": 4,
    "title": "inventore dolorem id",
    "note": "Rerum aut aut accusantium qui quis non. Dolores culpa voluptate iure exercitationem hic. Voluptatem et amet ipsum et ut qui id aliquid.",
    "createdAt": "2022-07-17T18:28:08.076Z"
}
```

#

### Deletar item por id

```http
DELETE /note/${id}
```

#### Request:

| Params | Type      | Description            |
| :----- | :-------- | :--------------------- |
| `id`   | `integer` | **Required**. valid id |

<br/>

## → Cards

### Criar um novo registro de Cartão

```http
POST /card
```

#### Request:

| Body         | Type      | Description                        |
| :----------- | :-------- | :--------------------------------- |
| `label`      | `string`  | **Required**. identifier for card  |
| `number`     | `string`  | **Required**. card number          |
| `holderName` | `string`  | **Required**. card holder name     |
| `pass`       | `string`  | **Required**. card password        |
| `cvv`        | `string`  | **Required**. card cvv             |
| `expiryDate` | `string`  | **Required**. card expiration date |
| `isVirtual`  | `boolean` | **Required**. card number          |
| `type`       | `string`  | **Required**. card type            |

`Date format: MM/YY`

`Valid types: ["credit", "debit", "credit_debit"]`

</br>

#### Response:

```json
{
    "id": 4,
    "label": "quod possimus earum",
    "number": "5020-9349-7552-0573",
    "holderName": "Eddie Wintheiser",
    "cvv": "155",
    "expiryDate": "08/27",
    "password": "LkGCjBIxUW7khpz",
    "isVirtual": false,
    "type": "credit",
    "createdAt": "2022-07-18T07:18:29.704Z"
}
```

#

### Pegar todos os ítens relacionados a um usuário

```http
GET /card
```

#### Response:

```json
[
    {
        "id": 2,
        "label": "unde in sit",
        "number": "6377-5066-7282-1608",
        "holderName": "Rudy McKenzie",
        "cvv": "098",
        "expiryDate": "11/24",
        "password": "dYOvimvMKm_A_D9",
        "isVirtual": true,
        "type": "credit",
        "createdAt": "2022-07-17T19:52:55.216Z"
    },
    {
        "id": 3,
        "label": "aut non aliquam",
        "number": "6767-1605-9187-2170-94",
        "holderName": "Beulah Grimes",
        "cvv": "450",
        "expiryDate": "10/24",
        "password": "7gi3_q6oUGOvGcd",
        "isVirtual": true,
        "type": "credit",
        "createdAt": "2022-07-17T19:53:34.436Z"
    }
]
```

#

### Pegar um item por id

```http
GET /card/${id}
```

#### Request:

| Params | Type      | Description            |
| :----- | :-------- | :--------------------- |
| `id`   | `integer` | **Required**. valid id |

<br/>

#### Response:

```json
{
    "id": 2,
    "label": "unde in sit",
    "number": "6377-5066-7282-1608",
    "holderName": "Rudy McKenzie",
    "cvv": "098",
    "expiryDate": "11/24",
    "password": "dYOvimvMKm_A_D9",
    "isVirtual": true,
    "type": "credit",
    "createdAt": "2022-07-17T19:52:55.216Z"
}
```

#

### Deletar item por id

```http
DELETE /card/${id}
```

#### Request:

| Params | Type      | Description            |
| :----- | :-------- | :--------------------- |
| `id`   | `integer` | **Required**. valid id |

<br/>

## → Wifi

### Criar um novo registro de Wifi

```http
POST /note
```

#### Request:

| Params     | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `label`    | `string` | **Required**. identifier for network |
| `name`     | `string` | **Required**. network name           |
| `password` | `string` | **Required**. network password       |

</br>

#### Response:

```json
{
    "id": 5,
    "label": "quo maxime voluptas",
    "name": "wifi16",
    "password": "2sMyieEERuKVeVD",
    "createdAt": "2022-07-18T07:18:41.556Z"
}
```

#

### Pegar todos os ítens relacionados a um usuário

```http
GET /wifi
```

#### Response:

```json
[
    {
        "id": 2,
        "label": "autem odit consequatur",
        "name": "wifi.Carvalho16",
        "password": "23gv1TeAPQsBmS1",
        "createdAt": "2022-07-17T20:26:13.599Z"
    },
    {
        "id": 3,
        "label": "et adipisci eum",
        "name": "wifi.Moreira",
        "password": "_srN8tU7DVxEsxT",
        "createdAt": "2022-07-17T20:26:54.440Z"
    }
]
```

#

### Pegar um item por id

```http
GET /wifi/${id}
```

#### Request:

| Params | Type      | Description            |
| :----- | :-------- | :--------------------- |
| `id`   | `integer` | **Required**. valid id |

<br/>

#### Response:

```json
{
    "id": 2,
    "label": "autem odit consequatur",
    "name": "wifi.Carvalho16",
    "password": "23gv1TeAPQsBmS1",
    "createdAt": "2022-07-17T20:26:13.599Z"
}
```

#

### Deletar item por id

```http
DELETE /wifi/${id}
```

#### Request:

| Params | Type      | Description            |
| :----- | :-------- | :--------------------- |
| `id`   | `integer` | **Required**. valid id |

<br/>

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`CRYPT_KEY = any string`

`JWT_KEY = "any string`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/LucasAlvsz/projeto19-drivenpass-back
```

Go to the project directory

```bash
  cd projeto19-drivenpass-back/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  npx prisma migrate reset
```

Start the server

```bash
  npm run start
```

</br>

_→ Esse ReadMe foi criado com o [template do Lucas Alvez](https://github.com/LucasAlvsz/projeto19-drivenpass-back/blob/main/README.md) como base!_

<div align="center">

  <h2>Ferramentas Utilizadas 🛠️</h2>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br>

<div align="center">
<h2> Entre em contato 📞 </h2>
<a href="https://www.linkedin.com/in/luis-felipe-vanin-martins-5a5b38215">
<img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue">
</a>
<a href="mailto:luisfvanin2@gmail.com">
<img src="https://img.shields.io/badge/Gmail:%20luisfvanin2@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white">
</a>
</div>
