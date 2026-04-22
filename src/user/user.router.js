const express = require('express');

const db = require('../db');

const { eq } = require('drizzle-orm');

const { users, products } = require('../db/schema');

const router = express.Router();


// handle get request for path /users

router.post('/users', async (request, response) => {

    const { body } = request;

    await db.insert(users).values(body);

    return response.sendStatus(201);

});

router.get('/users/:id/products', async (request, response) => {
    const { id } = request.params;
    const userProdusts = await db.query.products.findMany({
        where: eq(products.userId, +id)
    });
    return response.json(userProdusts);
});

module.exports = router;