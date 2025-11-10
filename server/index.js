import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import productRouter from './routes/admin/product.route.js'

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'cache-control',
        'expires',
        'Pragma'
    ],
    credentials: true
}))


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRouter);
app.use('/api/admin', productRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});