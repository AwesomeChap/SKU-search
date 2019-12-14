const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use('/', express.static(path.join(__dirname, '..', 'dist')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

app.listen(PORT, () => console.log(`listening on port - ${PORT}`)) 