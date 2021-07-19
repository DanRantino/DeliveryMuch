import express from 'express';
import * as Fun from './DB/querys.js'
import RabbitMQ from './rabbitMQ/connection.js'
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next){
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
 res.setHeader("Access-Control-Allow-Headers", "content-type");
 res.setHeader("Content-Type", "application/json");
 res.setHeader("Access-Control-Allow-Credentials", "true");
 next();
});

export const server = app.listen(5000,function() {
  console.log(`Executando na porta 5000`);
});

app.get('/products/:name', function(req, res)
{
  Fun.BuscaProdutos(req.params.name)
      .then((e)=>{
          res.send(e);
      })
});

app.post('/orders',function(req, res)
{
  Fun.CadastraPedido(req.body)
  .then((e)=>{res.send(e)});
});

app.get('/orders',function(req, res)
{
  Fun.retPedidos()
  .then((e)=>{res.send(e)});
});

app.get('/orders/:id',function(req, res){
  Fun.retPedidoById(parseInt(req.params.id))
  .then((e)=>{res.send(e)});
});
connectRabbit();
function connectRabbit()
{
  const Rabbit = new RabbitMQ();
  const succes = Rabbit.connectQueueStock();
}