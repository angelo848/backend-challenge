# Graphql backend challenge

## API desenvolvida utilizando docker, typescript e graphql para o desafio backend

### Pré-requisitos

Para rodar a api, basta ter o docker instalado e executar o comando `docker-compose up` que o serviço
docker será executado. Foram criados 2 serviços no docker-compose, um para a api e outro para o banco
de dados mongoDB. 
> Todos os dados do banco são armazenados na pasta mongodb-data

***

### Estrutura de pastas e arquivos

- `.docker:` Arquivos relacionados ao build da API
- `mongodb-data:` Arquivos que armazenam os dados do banco de dados
- `src/controllers:` Onde a regra de negócio é implementada
- `src/graphql:` Todos arquivos relativos ao graphql
- `src/graphql/datasources:` Todos RESTDataSources são implementados aqui
- `src/graphql/modules:` Os schemas e resolvers são modularizados em pastas e depois mergeados nos seus repsctivos arquivos
- `src/graphql/resolvers.js:` Os merges dos resolvers são feitos aqui utilizando os métodos 
`mergeResolvers` e `loadFilesSync` da lib [graphql-tools](https://www.graphql-tools.com)
- `src/graphql/typeDefs.js:` Da mesma forma que os resolvers, os schemas são mergeados nesse arquivo
com o `mergeTypeDefs`
- `src/models/`: Models do ORM para operações no banco de dados
- `src/index.ts:` Entrypoint da aplicação, organiza as dependências do startServer`(resolvers e typedefs)` e as injeta
- `src/startServer.js:` Onde é feita a conexão com o banco de dados e é executado o Apollo GraphQL Server
- `src/types.ts:` Todos os tipos genéricos estão aqui
- `src/tests/:` Todos os testes e mocks estão aqui

***

## Queries

- `suitablePlanets`:  Query que faz conexão a API da Nasa via RESTDataSource utilizando a classe `nasaSource`. 

> A classe `nasaSource` herda as propriedades da classe `RESTDataSource` disponível pela 
lib `apollo-datasource-rest`. Essa classe faz conexão à rota **https://exoplanetarchive.ipac.caltech.edu/TAP** segundo própria documentação da nasa disponibilizada. O endpoint para obter os exoplanetas é
`/sync?query=select+pl_name+from+ps+where+pl_bmassj+>+1&format=json` onde são possíveis passar queries SQL diretamente na URL. O método `nasaSource.getExoplanets` recebe 2 parâmetros opcionais: `select` e `where`, implementados de forma que seja fácil implementar queries SQL na obtenção dos exoplanetas.

> **O parâmetro `select` recebe uma string com os nomes das colunas separados por vírgulas como mostrado no exemplo abaixo. Por padrão o parâmetro select é `*` **

Exemplo: `select: "pl_name, pl_bmassj"`

> **O parãmetro `where` recebe uma string similar a uma query SQL, exceto por cada palavra da query ser necessariamente separada por `+` ao invés de espaços. Por padrão o parâmetro where é uma string nula**

Exemplo: `where: "pl_name+=+'HD 110014 b'"`

Esses 2 parâmetros são possíveis de ser passados para a query suitablePlanets de modo a otimizar a consulta

A query `suitablePlanets` retorna o type Exoplanet onde são listadas todas propriedades possíveis.
*Note que caso sejam selecionados campoos não listados no select SQL, esses valores retornarão `null`*

- `users:` Query que retorna um array de usuários cadastrados no banco, não recebe parâmetros

- `user:` Query recebe um parâmetro *id* obrigatório e retorna o usuário referente no banco ou *null* caso não encontre

- `stations:` Query que retorna um array de estações cadastradas no banco, não recebe parâmetros

- `recharges:` Query que retorna um array de todas recargas realizadas, trazendo usuário e estação referente

***

## Mutations

- `createUser:` Mutation para cadastrar um usuário no banco, recebe o parâmetro *userData*
 ```javascript
userData: {
  name: 'John Doe',
  email: 'john_doe@gmail.com',
  password: '123456'
}
```
A mutation retorna os dados do usuário cadastrado

- `installStation:` Mutation para cadastrar uma estação, recebe o paraâmetro *stationData*
```javascript
stationData: {
  planetName: 'Kepler-48 c',
  fuel: 200
}
```
Caso o nome do planeta não seja encontrado na api retorna um erro, se não, retorna os dados da estação criada

- `recharge:` Mutation para efetuar uma recarga de um usuário em uma estação. Recebe o parâmetro *rechargeData*. 
  - Um usuário pode ter apenas uma recarga em andamento
  - Apenas uma recarga pode ser feita por estação
> Note que a datetime de tempo de recarga deve ser feita no formato **YYYY-MM-DD**
```javascript
rechargeData: {
  rechargeValue: 20,
  rechargeEndTime: '2021-05-14',
  stationId: '609c94b54f82cd04a0b5200a',
  userId: '609c93fea4ca440492a17e4a'
}
```
Primeiro é feita a verificação se a estação existe e se ela tem combustível suficiente para o valor da recarga dado; depois é verificado se o usuário com o userId existe; logo depois é feita a verificação se a estação e o usuário possuem alguma recarga em andamento
```javascript
const userIsRecharging = await Recharge.findOne({
    userId: rechargeData.userId,
    rechargeEndTime: { $gte: new Date() }
  })

const stationIsRecharging = await Recharge.findOne({
  stationId: rechargeData.stationId,
  rechargeEndTime: { $gte: new Date() }
})
```
Se todas essas verificações passarem, a recarga é feita, vinculada à estação e ao usuário e o combustível usado na recarga diminuído da estação
