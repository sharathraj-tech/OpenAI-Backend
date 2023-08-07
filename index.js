const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();

const configuration = new Configuration({
  apiKey: sk-YuzOmprocess.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());

app.use(cors({
  origin: 'https://open-ai-frontend-tau.vercel.app'
}));

app.post('/api/chat', async (req, res) => {
  const message = req.query.message;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }, { role: "assistant", content: '' }]
    });

    res.status(200).json({ state: 'success', message: completion.data.choices });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while calling the API: ' + error.message });
  }
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
