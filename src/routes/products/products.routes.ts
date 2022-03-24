import { Request, Response, Router } from "express";
import { getProducts, searchProducts } from "../../controllers/products/product.controller";
import auth from "../../middleware/auth";
import validateResource from "../../middleware/validateResource";
import {  searchProductSchema } from "../../schemas/product.schema";

export const productsRouter:Router = Router();

productsRouter.post('/search', [validateResource(searchProductSchema), auth], searchProducts);
productsRouter.get('/', auth, getProducts);
