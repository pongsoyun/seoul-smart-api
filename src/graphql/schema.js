import { buildSchema } from 'graphql';

export default buildSchema(`
    type Query {
        Users: [User]
        User(token: String): User
        }

    type User { 
        name: String!
        token: String!
        achievement: Int
        activityLog: [String]
        }

    type Mutation {
        createUser(name: String!, token: String!): User
    }
`);
