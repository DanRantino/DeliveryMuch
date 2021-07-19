test('api produtos', async () => {
  const axios = require('axios');
  const product = 'Angelica'
  const resp = await axios.get(`http://localhost:5000/products/${product}`)
  expect(resp.status).toEqual(200);
  expect(resp.data.name).toEqual(product);
});

test('api pedidos', async () => {
  const axios = require('axios');
  const resp = await axios.get('http://localhost:5000/orders')
  expect(resp.status).toEqual(200);
  expect(resp.data.orders.length).toBeGreaterThanOrEqual(4);
});

test('Cadastra pedido',async () => {
  const axios = require('axios');
  const body = 
  {
    "products": [
    {
        "name": "Kiwi",
        "quantity": 1
    },
    {
        "name":"Angelica",
        "quantity":2
    }
]
}
  const resp = await axios.post('http://localhost:5000/orders',{
    ...body
  })
  expect(resp.status).toEqual(200);
  expect(resp.data.products.length).toBeGreaterThanOrEqual(1);
})