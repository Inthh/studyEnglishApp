import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import flashCardRouter from './flashCardRouter.js';

const route = (app) => {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/flashCard', flashCardRouter);
}

export default route;