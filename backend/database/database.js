import mongoose from 'mongoose';
import {createClient } from "redis";

const connectMongoDB = () => {
    mongoose.connect(process.env.MONGO_URI)

    mongoose.connection.on('connected', () => {
        console.log("MongoDB connected");
    })
}

const connectRedisDB = () => {
    const client = createClient({
        password: 'MGvLZIcdUurBS3wdb3U0tMxFxh4X1HZe',
        socket: {
            host: 'redis-18905.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
            port: 18905
        }
    });
    client.connect();

    client.on('connect', () => {
        console.log('Connected to Redis cache');
    });
    
    client.on('error', (err) => {
        console.log('Redis error:', err);
        return;
    });
    return client;
}

export { connectMongoDB, connectRedisDB };

