import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: '실패!!!!' });
});

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'hello',
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log('listening 3000 port...');
});
