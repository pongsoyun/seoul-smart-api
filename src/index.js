// require('dotenv').config();
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './graphql/schema';
import rootValue from './graphql/resolver';

const mongoUri = "mongodb://seoulapi:seoulapi1@ds127802.mlab.com:27802/heroku_f5g0fz8g";
const port = 4000;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(() => {
  console.log('connnected to mongodb');
}).catch((e) => {
  console.error(e);
});

const app = express();

app.use(express.json());

app.use('/', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(port, () => {
  console.log('listening 4000 port...');
});
