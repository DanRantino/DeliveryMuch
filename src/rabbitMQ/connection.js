import amqp from 'amqplib';
import Mongo from '../DB/connection.js'
import {} from 'dotenv/config'

export default class RabbitMQ {
  constructor (connection = '', channel = '', uri = '',queue = 'stock')
  {
    this.uri = process.env.RABBIT;
    this.connection = connection;
    this.channel = channel;
    this.queue = queue;
  }
  async connectQueueStock()
  {
    const db = new Mongo();
    await db.conectar();  
    try
    {
      this.connection = await amqp.connect(this.uri);
      this.channel = await this.connection.createChannel();
      this.channel.assertQueue(this.queue,{durable: false});
      const Produtos = await db.CriarSchemaProdutos();
      this.channel.consume('stock',async (msg) =>{
        if (msg!=null)
        {
          await this.atualizaEstoque(Produtos,msg.fields.routingKey,msg.content.toString());
        };
      });
    }
    catch (e)
    {
      if (e.errno == 'ECONNREFUSED')
      {
        return false
      }
      else
      {
        return false
      }
    }
    return false
  }
  async atualizaEstoque(Produtos,action,product)
  {
    try
    {
      const name = product.replace(/['"]+/g, '');
      console.log(name)
      const prod = await Produtos.findOne({name:name})
      if (!prod){console.log( `${product} não encontrado!`)}
      if(prod)
      {
        if (action === 'incremented')
        {
          const quantidade = parseInt(prod.quantity)+1
          const P = await Produtos.findOneAndUpdate({name:name},{quantity:quantidade},{new:true})
        }
        else if ((action === 'decremented')&&(prod.quantity<=0))
        {
          console.log(`Impossível estoque negativo para o produto ${product}`);
        }
        else if((action === 'decremented'))
        {
          const quantidade = parseInt(prod.quantity)-1
          const P = await Produtos.findOneAndUpdate({name:name},{quantity:quantidade},{new:true})
        }
      }
    }
    catch (e)
    {
      console.error(e)
    }
    return
  }
}
