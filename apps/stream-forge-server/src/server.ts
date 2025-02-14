import { app } from './index';

const PORT = process.env.HTTP_PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
});