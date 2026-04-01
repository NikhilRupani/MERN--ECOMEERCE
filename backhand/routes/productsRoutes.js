import express from 'express';
import { createProduct,  getProduct, updateproduct, deleteproduct } from '../controllers/productcontrollers.js';

const router  = express.Router();


// Route to creat a new product 

router.post ('/add', createProduct);

//Route to get all product 

router.get('/',getProduct);

//Route to update product by id

router.put('/update/:id', updateproduct);

// Route to delete  a product by id 

router.delete('/delete/:id', deleteproduct);


export default router;
 