/* eslint-disable camelcase */
const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const { generateAccessToken, generateRefreshToken } = require('./tokens');

const server = jsonServer.create();
const PORT = 9999;
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { login, password } = req.body;
        const { db } = router;

        const userFromBd = db.get('users').find(
            { username: login, password },
        ).value();

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
    const { db } = router;

    const token = db
        .get('users')
        .find({ access_token: req.headers.authorization.split(' ')[1] })
        .value();

    if (!token) {
        return res.status(401).json({ message: 'Not auth' });
    }

    if (req.headers.authorization !== `Bearer ${token.access_token}`) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.post('/delete_product', (req, res) => {
    const { db } = router;
    const { _id } = req.body;

    const products = db.get('products');
    const product = products.find({ _id }).value();

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products.remove({ _id }).write();

    return res.status(200).json(products);
});

server.post('/update_product/:id', (req, res) => {
    const { db } = router;
    const { name, description, price } = req.body;
    const { id } = req.params;

    const product = db.get('products').find({ id: Number(id) }).value();

    const updatedProduct = {
        ...product,
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
    };
    db.get('products').find({ id: Number(id) }).assign(updatedProduct).write();

    const products = db.get('products').value();
    return res.json(products);
});

server.post('/register', (req, res) => {
    const {
        firstname, lastname, login, password,
    } = req.body;

    const { db } = router;
    const id = db.get('products').size().value() + 1;

    if (!firstname || !lastname || !login || !password) {
        return res.status(418).json({ message: 'Нет данных' });
    }

    const newUser = {
        id, firstname, lastname, login, password,
    };

    db.get('users')
        .push(newUser)
        .write();

    const users = db.get('users').value();
    console.log(users);

    return res.json({ message: 'Зарегистрировался' });
});

server.post('/refresh', (req, res) => {
    try {
        const { refresh_token } = req.body;
        console.log(refresh_token);
        const { db } = router;

        const user = db
            .get('users')
            .find({ refresh_token })
            .value();

        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken();
        const newRefreshToken = generateRefreshToken();

        user.access_token = newAccessToken;
        user.refresh_token = newRefreshToken;

        db.get('users')
            .find({ id: user._id })
            .assign({
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            })
            .write();

        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.post('/create_product', (req, res) => {
    const { db } = router;
    const { name, description, price } = req.body;
    const id = db.get('products').size().value() + 1;

    if (!name || !description || !price) {
        return res.status(404).json({ message: 'Нет данных' });
    }

    const newProduct = {
        id, name, description, price,
    };

    db.get('products')
        .push(newProduct)
        .write();

    const products = db.get('products').value();
    return res.json(products);
});

server.use(router);

// запуск сервера
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
});
