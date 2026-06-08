import express from 'express';
import cors from 'cors';
import router from './config/routes.js';
const app = express();
app.use(cors());
app.use(express.json());
// অ্যাপ্লিকেশন রাউটস (Modulo Pattern)
app.use('/api/v1', router);
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to ShelfLock API' });
});
export default app;
//# sourceMappingURL=app.js.map