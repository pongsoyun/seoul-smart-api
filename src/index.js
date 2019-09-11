import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';

const app = express();

const mongoURI = 'mongodb://seoulapi:seoulapi1@ds127802.mlab.com:27802/heroku_f5g0fz8g';

// 몽고디비 연결
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
  console.log('connnected to mongodb');
}).catch((e) => {
  console.error(e);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: '실패!!!!' });
});

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => 'hello',
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log('listening 3000 port...');
});
