import { buildSchema } from 'graphql';

export default buildSchema(`
    type Query {
        Users: [User]
        findUser(_id: String!): User!
        findPlace(_id:String!): Place!
        signIn(token: String!): User
        getPrograms: [Program]!
        getProgram(_id: String!): Program!
        getPlaces(page: Int, search: String, facility: String, gu: String): [Place]
        getActivities(page: Int, type: String): [Activity]
        findActivity(_id: String!): Activity!
    }

    type Mutation {
        createUser(name: String!, token: String!): User
        modifyUser(userId: String!, name: String!): User
        createActivity(name: String!, userId: String!, total: Int!, date: String!, startTime: String!, endTime: String!, placeId: String!, room: String!, content: String!, type: String!): Activity
        modifyActivity(activityId: String!, name: String!, userId: String!, total: Int!, date: String!, startTime: String!, endTime: String!, placeId: String!, room: String!, content: String!, type: String!): Activity
        deleteActivity(activityId: String!): Activity
        applyActivity(activityId: String!, userId: String!, comment: String!): Activity
        cancelActivity(activityId: String!, userId: String!): Activity
        changeActivity(activityId: String!, status: String!): Activity
        extendActivity(activityId: String!, date: String!, startTime: String!, endTime: String!, placeId: String!, room: String!): Activity
        addLog(_id: String!, activityId: String!): User
        deleteLog(_id: String!, activityId: String!): User
        achieve(_id: String!, achievement: Int!): User
    }

    type User { 
        id: ID!
        name: String!
        token: String!
        achievement: Int
        activityLog: [String]
    }
    
    type Room {
        name: String!
        facility: String!
        equipments: [String]!
        description: String!
        thumbnail: String
    }

    type Location {
        address: String!
        gu: String!
    }

    type Place {
        id: ID!
        name: String!
        rooms: [Room]!
        location: Location!
        businessHour: String
        bookLink: String
        thumbnail: String
        contact: String
    }

    type Participant {
        userId: String!
        name: String!
        comment: String!
    }

    type Day {
        date: String!
        startTime: String!
        endTime: String!
        place: Place!
        room: String!
    }

    type Leader {
        userId: String!
        name: String!
    }

    type Activity {
        id: ID!
        name: String!
        leader: Leader!
        participants: [Participant]!
        total: Int!
        days: [Day!]!
        content: String!
        type: String!
        status: String!
    }

    type Program {
        title: String!
        image: String!
        link: String!
    }
`);
