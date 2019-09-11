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
    users: [User]
    user(token: String): User
    }

  type User {
    id: String
    name: String
    token: String
    achievement: Int
    activityLog: [String]
    }

  type Mutation {
    createUser(name: String!, token: String!): User!
  }

`);

const root = {
  hello: () => 'okay',
};



const resolver = {
    users: async (_, args) => {
        return await dao.cm.getAllUsers();
    },
    user: async (_, args) => {
        const {name} = args;
    
        return await dao.cm.getUser(name);
    },
    createUser: async (_, args) => {
        const {id, name, token, achievement=0, activityLog=""} = args;
    
        return await dao.cm.joinUser(name, token);
    },
};


app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log('listening 3000 port...');
});