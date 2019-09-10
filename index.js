const express = require('express');
const graphqlHTTP = require('express-graphql');
const {GraphQLSchema, GraphQLObjectType} = require('graphql');

const app = express();

app.get('/', (req, res) => {
    res.json({success:"실패!!!!"});
});

app.get('/graphql', graphqlHTTP({
    schema: new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'RootQueryType',
        })
    }),
    graphiql:true
}))

app.listen(3000, () => {
    console.log('listening 3000 port...');
});
