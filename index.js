const express = require('express')
const { Configuration, OpenAIApi }=require('openai')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()

var app = express()
//app.use(bodyParser())

const configuration = new Configuration({
  apiKey: "sk-YuzOmprocess.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//app.use(cors())

let corsOptions = {
  origin: [ 'http://localhost:4200', 'http://localhost:3000','http://192.168.10.47:5555','http://localhost:5555','https://open-ai-frontend-tau.vercel.app' ]
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://open-ai-frontend-tau.vercel.app');
  // If you want to allow any domain, use the wildcard '*':
  // res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json())

app.post('/api/chat', async (req, res) => {
  var message = req.query.message

  //console.log(message)
  try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message },{ role: "assistant", content: '' }]
      });
      //console.log(completion.data);
      res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
      res.status(200).json({state:'success',message:completion.data.choices})
  } catch (error) {
    //console.error(error)
    res.status(500).json({ error: 'An error occurred while calling the API'+error})
  }
})

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
})
