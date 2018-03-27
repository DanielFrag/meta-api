# META API

API construida em Node.js como parte do desafio técnico da recrutadora Meta.

## Requisitos

Os requisitos da API estão descritos no arquivo "Contato.yaml".

### Instruções

#### Instalar dependencias

Digite no terminal o comando:
```
$ npm i
```

#### Rodar testes

Apenas os testes de caixa preta estão presentes na pasta "tests". O número reduzido de testes foi uma tentativa de cobrir minimamente as funcionalidades da API com o menor esforço. Esta mentalidade considerou principalmente o tempo para entrega do desafio (24 horas).   
Para os testes de caixa preta é necessário que o banco de dados MongoDB esteja rodando na máquina.   
Caso ele ainda não tenha sido iniciado, basta digitar no terminal o comando:

```
$ mongod
```
Logo após iniciar o banco a API pode ser iniciada. Digite no terminal o comando:
```
$ npm test ./tests/black-box-test/server_black-box-test.js
```

#### Levantar a API

Para levantar a API passando o nome e a chave de usuário (usadas para autenticação de quem solicita os recursos) defina as variáveis USER_ID e USER_KEY, digitando por exemplo:
```
$ USER_ID=userId USER_KEY=userPass node server
```
Assim as requisições passam a exigir a presença da string em base64 contendo o dado "userId:userPass" ("dXNlcklkOnVzZXJQYXNz").   

Para levantar a API sem qualquer uso de autenticação basta rodar o comando:
```
node server
```

##### OBS

O possível retorno do status http 401 depende de uma aplicação que tenha políticas de autenticação.