# Backend Challeng

Bem-vindx, espero que o meu projeto esteja de acordo com o necessário.
Será necessario a criação das variáveis de ambientes para conexão do banco de dados (mongoDB),e a conexão da conexão no rabbitMQ.

## Carga do estoque

Executando ``` npm run server:carga``` será lido o arquivo [.csv] (products.csv), e carregado no banco de dados Mongo, existirão mensagens no terminal para um acompanhamento do progresso ``` Salvo o arquivo de estoque!``` confirma que foram migrados os dados.

## API

Após a carga ser concluída, executar o comando ``` npm run server:dev```, que irá iniciar os endpoints e, o consumos das mensagens eviados do RabbitMQ.

## RabbitMQ

Necessário nesse ponto conectar no RabbitMQ (`http://localhost:15672/`), fazer o binding, na aba Queues clicar no stock,na sessão Bindings adicionar dois bindings uma com o From exchange `stock` e a Routing Key `decremented`, no outro o exchange se mantém o mesmo e a Routing Key é `incremented` ,  .
Se for recebida mensagem que iria deixar o estoque negativo foi implementada uma regra para mostrar no console, e não atualizar o estoque.

## Testes

Se todos os passos funcionarem rodando o ``` npm run test``` deve exeecutar todos os testes sem erros.