const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const route = express.Router()
const axios = require('axios');

app.use(cors())

//SET UP BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


//SET UP DOTENV 
require('dotenv').config()

//SET UP STATIC FILE
app.use(express.static('public'))

app.get('/vi/:text',  async (req, res) =>{
    console.log(req.params.text)
    let apiKey = "trnsl.1.1.20230108T150139Z.cec370dd73128496.a231806437d35b08c38b60259242477f6627adbd"
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=${req.params.text}`
    await axios.get(url).then((response)=>{
        const translated = response.data[0][0][0]
        console.log(response.data[0][0][0])
        return res.json(translated)
    })
    .catch(err => {
        return res.json("error")
    })
    
})

app.get('/en/:text',  async (req, res) =>{
    console.log(req.params.text)
    let apiKey = "trnsl.1.1.20230108T150139Z.cec370dd73128496.a231806437d35b08c38b60259242477f6627adbd"
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${req.params.text}`
    await axios.get(url).then((response)=>{
        const translated = response.data[0][0][0]
        console.log(response.data[0][0][0])
        return res.json(translated)
    })
    .catch(err => {
        return res.json("error")
    })
    
})

//HOST CONNECTION
app.listen(5010, () => {
    console.log("CONNECTED")
})