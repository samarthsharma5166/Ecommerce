
import request from 'supertest';
import express from 'express';
import router from '../../../routes/admin/product.route.js';

// Mock controller functions
jest.mock('../../../controller/admin/product.controller.js', () => ({
  createProduct: jest.fn((req, res) => res.status(201).json({ id: 1, name: 'Test Product' })),
  getProducts: jest.fn((req, res) => res.status(200).json([{ id: 1, name: 'Test Product' }])),
  editProduct: jest.fn((req, res) => res.status(200).json({ id: 1, name: 'Updated Product' })),
  deleteProduct: jest.fn((req, res) => res.status(204).send()),
}));

// Mock multer middleware
jest.mock('../../../middleware/multer.middleware.js', () => ({
    array: () => (req, res, next) => {
        req.files = [{ filename: 'test.jpg' }];
        next();
    }
}));


const app = express();
app.use(express.json());
app.use('/admin', router);

describe('Product Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /admin/products', () => {
    it('should return all products', async () => {
      const response = await request(app).get('/admin/products');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, name: 'Test Product' }]);
    });
  });

  describe('POST /admin/products', () => {
    it('should create a new product', async () => {
      const response = await request(app)
        .post('/admin/products')
        .field('name', 'Test Product')
        .attach('images', Buffer.from('test'), 'test.jpg');

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: 1, name: 'Test Product' });
    });
  });

  describe('PUT /admin/products/:id', () => {
    it('should update a product', async () => {
      const response = await request(app)
        .put('/admin/products/1')
        .field('name', 'Updated Product')
        .attach('images', Buffer.from('test'), 'test.jpg');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, name: 'Updated Product' });
    });
  });

  describe('DELETE /admin/products/:id', () => {
    it('should delete a product', async () => {
      const response = await request(app).delete('/admin/products/1');
      expect(response.status).toBe(204);
    });
  });
});
