import neatCSV from 'neat-csv';
import fs from 'fs';
import Mongo from '../DB/connection.js'

// Lê o arquivo geradno um array de objetos
fs.readFile('products.csv', async(err,data)=>{
  console.log('Lendo o arquivo de produtos!')
  if (err) 
  {
    console.log(err);
    return;
  }
  console.log('\n Sucesso!')
  const dados = await neatCSV(data);
  console.log('\n Conectando ao banco de dados!')
  const db = new Mongo();
  await db.conectar();
  console.log('\n Conexão estabelecida!')
  // Define o Schema
  const Prod = await db.CriarSchemaProdutos();
  // Limpa os dados da collection
  console.log('\n Limpando os dados antigos!')
  await Prod.deleteMany();
  // Salva os novos dados, e, encerra a conexão com o banco de dados
  await Prod.create(dados);
  console.log('\n Salvo o arquivo de estoque!')
  await db.Disconnet();
  console.log('\n Conexão ao banco de dados encerrada!')
})