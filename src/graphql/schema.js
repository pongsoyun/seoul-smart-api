import { buildSchema } from 'graphql';

export default buildSchema(`
    type Query {
        Users: [User]
        findUser(_id: String!): User
        findPlace(_id:String!): Place
        signIn(token: String!): User
        getPrograms: [Program]!
        getProgram(_id: String!): Program!
        getPlaces(facility: String, gu: String): [Place]
    }

    type Mutation {
        createUser(name: String!, token: String!): User
        modifyUser(userId: String!, name: String!): User
        createActivity(name: String!, userId: String!, total: Int!, date: String, startTime: String, endTime: String, placeId: String, room: String, content: String, type: String): Activity
        modifyActivity(activityId: String!, name: String!, userId: String!, total: Int!, date: String, startTime: String, endTime: String, placeId: String, room: String, content: String, type: String): Activity
        deleteActivity(activityId: String!): Activity
        applyActivity(activityId: String!, userId: String!, comment: String!): Activity
        cancelActivity(activityId: String!, userId: String!): Activity
        changeActivity(activityId: String!, status: String!): Activity
        extendActivity(activityId: String!, date: String!, startTime: String!, endTime: String!, placeId: String!, room: String!): Activity
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
        description: String!
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

    type Participant {
        user: User
        comment: String
    }

    type Day {
        date: String
        startTime: String
        endTime: String
        place: Place
        room: String
    }

    type Activity {
        name: String!
        leader: User
        participants: [Participant]
        total: Int
        days: [Day]
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
