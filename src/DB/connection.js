import mongoose from 'mongoose';
import {ProductsSchema} from '../models/index.js';
import {OrdersSchema} from '../models/index.js';
import {} from 'dotenv/config'
export default class ConnectMongo {

  constructor( uri = '',db = '',Produtos='',Orders='') {
    this.uri = process.env.DB_ACCESS;
    this.db = db;
    this.Produtos = Produtos;
    this.Orders = Orders;
  }

  async conectar()
  {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect(this.uri);
    this.db = await mongoose.connection;
    var ret = this.db.on('error',function ()
    {
      console.error.bind(console,'Error');
    })
    ret = this.db.once('open', function(){})
  }

  async CriarSchemaProdutos()
  {
    return this.Produtos = mongoose.model('Produtos',ProductsSchema);
  }
  async SalvarDados(Array)
  {
    await this.Produtos.create(Array);
  }
  async Disconnet()
  {
    await mongoose.disconnect();
  }
  async CriarPedido(){
    return this.Orders = mongoose.model('Pedidos',OrdersSchema);
  }
}