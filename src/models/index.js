import mongoose from 'mongoose';
const Schema = mongoose.Schema

export const ProductsSchema = new Schema({
  name: {type: 'String',unique:true},
  price:'Number', 
  quantity: 'Number'}) || mongoose.models.ProductSchema

export const ProdutosOrder = new Schema({
  name: {type: 'String',default:0},
  quantity: 'Number'}) || mongoose.models.ProdutosOrder

export const OrdersSchema = new Schema({
  id: {type: 'Number',unique:true},
  products:{type:[ProductsSchema],
  default:undefined},
  total: 'Number'}) || mongoose.models.OrdersSchema
