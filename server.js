const express = require('express');
const app = express();
const port = 80;

app.use(express.static('frontend/dist'));

app.listen(port, () => console.log(`Server is has been started on port ${port}`));
