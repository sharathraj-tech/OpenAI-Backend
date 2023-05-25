const express = require('express')
const { Configuration, OpenAIApi }=require('openai')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()

var app = express()
//app.use(bodyParser())

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//app.use(cors())

let corsOptions = {
  origin: [ 'http://localhost:4200', 'http://localhost:3000','http://192.168.10.47:5555','http://localhost:5555' ]
};

app.use(express.json())

app.post('/api/chat',cors(corsOptions), async (req, res) => {
  var message = req.query.message

  //console.log(message)
  try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message },{ role: "assistant", content: '' }]
      });
      //console.log(completion.data);
      res.status(200).json({state:'success',message:completion.data.choices})
  } catch (error) {
    //console.error(error)
    res.status(500).json({ error: 'An error occurred while calling the API'+error})
  }
})

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
})
