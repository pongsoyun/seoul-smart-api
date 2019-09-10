const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.json({success:"실패!!!!"});
});

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = {
    hello: () => 'hello'
}

app.get('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql:true
}));

app.listen(3000, () => {
    console.log('listening 3000 port...');
});
