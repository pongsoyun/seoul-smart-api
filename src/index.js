import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './graphql/schema';
import rootValue from './graphql/resolver';


const mongoURI = 'mongodb://seoulapi:seoulapi1@ds127802.mlab.com:27802/heroku_f5g0fz8g';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
  console.log('connnected to mongodb');
}).catch((e) => {
  console.error(e);
});

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.json({ success: '실패!!!!' });
});

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log('listening 3000 port...');

});
