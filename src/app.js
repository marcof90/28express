const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const indexRoutes = require('./routes/index');

//configuraciones
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb+srv://root:toor@cluster0.al2bt.mongodb.net/Cluster0?retryWrites=true&w=majority')
.then(db => console.log('connected'))
.catch(err => console.log(err));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//rutas
app.use('/products/', indexRoutes);

//inicio servidor
app.listen(app.get('port'), () => {
  console.log(`listening at http://localhost:${port}`);
});