require('dotenv').config();
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './graphql/schema';
import rootValue from './graphql/resolver';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(() => {
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

app.listen(process.env.PORT, () => {
  console.log('listening 4000 port...');
});
