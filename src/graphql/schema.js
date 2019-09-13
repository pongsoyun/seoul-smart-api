import { buildSchema } from 'graphql';

export default buildSchema(`
    type Query {
        Users: [User]
        findUser(_id: String!): User
        signIn(token: String!): User
        getPrograms: [Program]!
        getProgram(_id: String!): Program!
        getPlaces: [Place]!
    }

    type Mutation {
        createUser(name: String!, token: String!): User
        createActivity(name: String!, userId: String!, total: Int!, date: String, startTime: String, progressTime: String, placeId: String, room: String, content: String, type: String): Activity
        modifyActivity(activityId: String!, name: String!, userId: String!, total: Int!, date: String, startTime: String, progressTime: String, placeId: String, room: String, content: String, type: String): Activity
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

    type Program {
        title: String!
        image: String!
        link: String!
    }
`);
