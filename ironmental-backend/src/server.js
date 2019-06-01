import express from 'express';
import serverless from 'serverless-http';
import router from './router';
import db from './database/db';
import cors from 'cors'

export default class Server {
    constructor() {
        this.app = express();
        this.middleware();
        this.initializeDb();
    }

    initializeDb() {
        db.connect()
    }

    middleware() {
        const { app } = this
        app.use(cors());
        app.use(express.json());
        app.use(async (req, res, next) => {
            try {
                await this.ensureDb();
                return next();
            } catch(e) {
                res.status(500).send(e);
            }
        });
        app.use(router);
    }

    ensureDb() {
        return new Promise((resolve, reject) => {
            let count = 0;
            const tryConnect = async () => {
                try {
                    await db.connect();
                    resolve();
                } catch(e) {
                    count++;
                    console.log(`[!] DB connection failed ${count}`)
                    if (count > 5) {
                        reject(new Error('Failed after 5 retries'))
                        return;
                    }
                    setTimeout(tryConnect, 10);
                }
            };
            tryConnect();
        });
    }

    listen(port) {
        const { app } = this;
        app.listen(port);
        console.log('Listening to port', port);
    }

    serverless() {
        const { app } = this
        return serverless(app);
    }
}