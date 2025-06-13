const express = require('express')
const cors = require('cors'); // ✅ import cors
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

require('./config/db')

const userRoute = require('./routes/userRoute')
const recipeRoute = require('./routes/recipeRoute')

// ✅ Use CORS before any routes
app.use(cors()); // allows all origins — only for dev

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/api/user', userRoute);
app.use('/api/recipe', recipeRoute)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
