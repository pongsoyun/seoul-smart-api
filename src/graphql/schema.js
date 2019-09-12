import { buildSchema } from 'graphql';

export default buildSchema(`
    type Query {
        Users: [User]
        User(token: String): User
        signIn(token: String!): User
    }

    type Mutation {
        createUser(name: String!, token: String!): User
    }

    type User { 
        name: String!
        token: String!
        achievement: Int
        activityLog: [String]
    }
    
    type Room {
        name: String!
        facility: String!
        visit: Int
        equipments: [String]
    }

    type Location {
        address: String
        gu: String
    }

    type Place {
        name: String!
        rooms: [Room]
        location: Location!
        businessHour: String!
        bookLink: String
        thumbnail: String
        contact: String
    }

    type Day {
        date: String
        startTime: String
        progressTime: String
    }

    type Participant {
        user: User
        comment: String
    }

    type DayInfo {
        day: Day
        place: Place
        room: String
    }

    type Activity {
        name: String!
        leader: User
        participants: [Participant]
        total: Int
        days: [DayInfo]
        content: String
        type: String
        status: String
    }
`);
