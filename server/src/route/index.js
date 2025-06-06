import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import topicRouter from './topicRouter.js';
import englishRouter from './englishRouter.js';
import vocabularyRouter from './vocabularyRouter.js';
import vocaSetsRouter from './vocabularySetsRouter.js';

const route = (app) => {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/topics', topicRouter);
    app.use('/vocabularies', vocabularyRouter);
    app.use('/vocabulary-sets', vocaSetsRouter);
    app.use('/english', englishRouter);
}

export default route;