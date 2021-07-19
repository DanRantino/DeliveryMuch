import Mongo from './connection.js'
import {} from 'dotenv/config'
export async function BuscaProdutos(name) {
  const db = await new Mongo();
  await db.conectar();
  const Prod = await db.CriarSchemaProdutos();
  const dados = await Prod.findOne({ name:name})
  const ret = {
    name: dados.name,
    price: dados.price,
    quantity: dados.quantity  
  }
  db.Disconnet()
  return ret
}

export async function CadastraPedido(Pedido)
{
  const db = new Mongo();
  await db.conectar();
  const Orders = await db.CriarPedido();
  const Prod = await db.CriarSchemaProdutos();
  let array = []
  var total = 0
  for (let i = 0; i < Pedido.products.length;i++)
  {
    const name = Pedido.products[i].name
    const quantity = Pedido.products[i].quantity
    var Produto = await Prod.findOne({name:name})
    if (Produto.quantity-quantity<0) return 'Sem estoque suficiente'
    Produto = await Prod.findOneAndUpdate({name:name},{quantity:Produto.quantity-quantity},{new:true})
    const obj = {
      name:Produto.name,
      quantity:quantity,
      price:Produto.price
    };
    total = total+(quantity*Produto.price);
    array.push(obj);
  }
  const orderId = await Orders.findOne().sort({id:'desc'});
  if (orderId==null) {var id = 0}
  else {var id = parseInt(orderId.id)}
  const dados = await Orders.create({id:id+1,products:[...array],total:total})
  const arrayRet = []
  dados.products.map((e)=>{
    const obj = {
      name: e.name,
      quantity: e.quantity,
      price: e.price,
    }
    arrayRet.push(obj);
  });
  const objRet = {
    id:dados.id,
    products:arrayRet,
    total:dados.total
  };
  return objRet;
}
export async function retPedidos(){
  const db = new Mongo();
  await db.conectar();
  const Orders = await db.CriarPedido();
  const dados = await Orders.find();
  var array = [];
  for (var i = 0; i <dados.length; i++) {
    const arr = []
    for (var i2 = 0; i2 <dados[i].products.length; i2++)
    {
      const objProd = {
        name:dados[i].products[i2].name,
        quantity:dados[i].products[i2].quantity,
        price:dados[i].products[i2].price,
      }
      arr.push(objProd);
    }
    const objret={
      id:dados[i].id,
      products:arr,
      total:dados[i].total,
    }
    array.push(objret);

  }
  const obj = {"orders":array}
  return obj
}
export async function retPedidoById(id){
  const db = new Mongo();
  await db.conectar();
  const Orders = await db.CriarPedido();
  const dados = await Orders.findOne({id:id})
  const array = [] 
  for (let i = 0; i < dados.products.length; i++)
  {
    const obj = {
      name:dados.products[i].name,
      quantity:dados.products[i].quantity,
      price:dados.products[i].price
    };
    array.push(obj);
  }
  const objRet = {
    id:dados.id,
    products: array,
    total:dados.total
  }
  return objRet
}
