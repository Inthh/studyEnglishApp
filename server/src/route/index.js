import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import topicRouter from './topicRouter.js';

const route = (app) => {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/topic', topicRouter);
}

export default route;