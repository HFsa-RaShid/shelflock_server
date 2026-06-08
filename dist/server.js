import dotenv from 'dotenv';
dotenv.config();
import './jobs/expiryCheck.job.js';
import app from './app.js';
dotenv.config();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 ShelfLock Backend is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map