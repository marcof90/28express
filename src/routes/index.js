const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');
const Product = require('../models/product');
const User = require('../models/user');


//routes
router.get('/', async (req, res)=>{
    const products = await Product.find();
    res.send(products);
});

router.post('/', async (req, res)=>{    
    // res.send(new Product(req.body));
    const product = new Product(req.body);
    await product.save();
    res.send(product);
});

router.get('/:id', async (req, res)=>{
    const product = await Product.findById(req.params.id);
    res.send(product);
});

//------------------------ Auth routes
router.post('/register', async (req, res)=>{
    try {
        const user = new User(req.body);
        const userData = await authService.register(user);
        res.send(userData);
    } catch (error) {
        res.send(error)
    }
});

router.post('/lgin', async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json('Email and password required');
        }
        let token = await authService.login(req.body);
        if (token.code == 200) {
            res.status(token.code).json(token);
        }else{
            res.send(token);
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;