import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

// Assign a default database (Make sure the DB exists in MongoDB)
export const database = clientPromise.then(client => client.db("portfolio"));

export default clientPromise;
