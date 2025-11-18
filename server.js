import express from "express";
import morgan from "morgan";
import pdfrouter from './routers/routers.js'
const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use('/pdfservices', pdfrouter)

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
