const express = require('express')
const app = express()
const open = require('open')
const axios = require('axios')


let url;
let payID;

app.get('/payment', (req,res) => {

   
    const payerId = req.query.PayerID
    console.log(payID)
    res.send('Success')

    axios({
      url: payID,
      method: "post",
      headers: { 'Authorization': `Bearer ${url}`},
      data: {"payer_id": payerId}
    })

  

})


app.get('/test', async (req, response) => {
    
    var username = 'Aa_-G1JJaUHqSPY2WYhWEEKUuHjRuaGrPMCDRRAHZijGox6rG4Yqy_kfZNpt94ZVRBvKPqW_tzfncyia';
    var password = 'EKwgqqumtwc1uVhBOjlyDZo3Nc8gDEhLeluwPyXfK7kOTCVp_iHIKUipHjLIaGMn6-5_-wHcEu-YtmTB'

    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    const session_url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials';

    var config = {
      method: 'post',
      url: session_url,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };
    await axios(config)
    .then((response) => {
    
        const data = {

          "intent": "sale",
        
          "payer": {
        
            "payment_method": "paypal"
        
          },
        
          "transactions": [{
        
            "amount": {
              "total": "30.00",
              "currency": "USD",        
              "details": {
                "subtotal": "30.00",
                "tax": "0.00",
                "shipping": "0.00",
                "insurance": "0.00"
              }
        
            },
            "description": "This is the payment transaction description.",
            "custom": "EBAY_EMS_90048630024435",
            "invoice_number": "4878758967234234",
            "payment_options": {
              "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
            },
        
            "soft_descriptor": "ECHI5786786",
            "item_list": {
              "items": [{
                "name": "hat",
                "description": "Brown color hat",
                "quantity": "5",
                "price": "3",
                "tax": "0.01",
                "sku": "1",
                "currency": "USD"
        
              }, {
                "name": "handbag",
                "description": "Black color hand bag",
                "quantity": "1",
                "price": "15",
                "tax": "0.02",
                "sku": "product34",
                "currency": "USD"
              }],
              "shipping_address": {
        
                "recipient_name": "Hello World",
        
                "line1": "4thFloor",
        
                "line2": "unit#34",
        
                "city": "SAn Jose",
        
                "country_code": "US",
        
                "postal_code": "95131",
        
                "phone": "011862212345678",
        
                "state": "CA"
        
              }
        
            }
        
          }],
        
          "note_to_payer": "Contact us for any questions on your order.",
        
          "redirect_urls": {
        
            "return_url": "http://localhost:3002/payment",
        
            "cancel_url": "http://localhost:3002/payment"
        
          }
        
        }
        url = response.data.access_token
        axios({
            method: 'post',
            headers: { 'Authorization': `Bearer ${response.data.access_token}`},
            url: 'https://api-m.sandbox.paypal.com/v1/payments/payment',
            data: data
        }).then((res) => {
  
          
            open(res.data.links[1].href)
            payID = res.data.links[2].href
            

        }) 

    })
})


app.listen(3002, () => {
    console.log('Test')
})