import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/health", (req, res) => {
    return res.send("working")
})

export { app };