import express from 'express';
import itemRoutes from './routes/items';
import categoryRoutes from './routes/categories';

export const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the minnislistakerfi API',
    endpoints: [
      '/items',
      '/categories',
    ],
  });
});

app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
