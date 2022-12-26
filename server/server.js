import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX',
    })
});

app.post('/', async (req, res) => {

    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.7,
            max_tokens: 3000,//long response
            top_p: 1,
            frequency_penalty: 0.5,// repeat same answer
            presence_penalty: 0,
   
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        });
    } catch (error) { 
        console.log(error);

        res.status(500).send({ error });
     }
});

//define post for express
app.listen(5000, () => console.log('Server is running on hhtp://localhost:5000'));