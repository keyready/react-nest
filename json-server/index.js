/* eslint-disable camelcase */
const fs = require('fs');
const axios = require('axios');
const jsonServer = require('json-server');
const path = require('path');
const { generateAccessToken, generateRefreshToken } = require('./tokens');

const server = jsonServer.create();
const PORT = 9999;
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно
// server.use(async (req, res, next) => {
//     await new Promise((res) => {
//         setTimeout(res, 200);
//     });
//     next();
// });

server.post('/loginToken', async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(401).json({ error: 'No code' });

    const tokens = await axios.post(
        'https://oauth.yandex.ru/token',
        `grant_type=authorization_code&code=${code}&client_id=c1688919452843349161a0207d2ac149&client_secret=1a8671129b2d4886a43517e15ff53d25`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    );

    if (!tokens.data) return res.status(401).json({ error: 'No tokens got' });

    const result = await axios.get('https://login.yandex.ru/info', {
        headers: {
            Authorization: `OAuth ${tokens.data.access_token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!result) return res.status(403).json({ error: 'No auth data in response' });

    // регистрируем, если пользователь новый
    const { db } = router;
    const user = db.get('users').find({ login: result.data.login }).value();
    const newRefreshToken = generateRefreshToken();

    if (!user) {
        const newUser = {
            _id: generateAccessToken(),
            firstname: result.data.real_name.split(' ')[0],
            lastname: result.data.real_name.split(' ')[1],
            username: result.data.login,
            password: newRefreshToken,
            access_token: tokens.data.access_token,
            refresh_token: newRefreshToken,
            image: result.data.default_avatar_id,
        };

        db.get('users')
            .push(newUser)
            .write();
    } else {
        const newUser = {
            ...user,
            access_token: tokens.data.access_token,
            refresh_token: newRefreshToken,
        };

        db.get('users')
            .find({ login: result.data.login })
            .assign(newUser)
            .write();
    }

    const authorizedUser = {
        firstname: result.data.real_name,
        login: result.data.login,
        gender: result.data.sex,
        email: result.data.default_email,
        phone: result.data.default_phone.number,
        avatar: result.data.default_avatar_id,
        id: result.data.id,
        access_token: tokens.data.access_token,
        refresh_token: newRefreshToken,
    };
    return res.status(200).json(authorizedUser);
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { login, password } = req.body;
        const { db } = router;

        const user = db.get('users').find(
            { username: login, password },
        ).value();

        if (!user) {
            return res.status(403).json({ message: 'User not found' });
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
        return res.status(500).json({ message: e.message });
    }
});

server.post('/logout', (req, res) => {
    const { refresh_token } = req.body;
    const { db } = router;

    const user = db.get('users')
        .find({ refresh_token })
        .assign({
            access_token: '',
            refresh_token: '',
        })
        .write();

    if (!user) return res.status(403).json({ message: 'Logout error' });

    return res.status(200).json({ message: 'Successful logout' });
});

server.post('/refresh', (req, res) => {
    try {
        const { refresh_token } = req.body;
        const { db } = router;

        const user = db
            .get('users')
            .find({ refresh_token })
            .value();

        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const newRefreshToken = generateRefreshToken();

        user.refresh_token = newRefreshToken;

        db.get('users')
            .find({ id: user._id })
            .assign({
                refresh_token: newRefreshToken,
            })
            .write();

        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// проверяем, авторизован ли пользователь
server.use((req, res, next) => {
    const { db } = router;
    const cookies = req.headers.cookie.split(' ');

    let access_token = cookies.find((str) => str.includes('access_token')).split('=')[1];

    if (access_token.includes(';')) {
        access_token = access_token.slice(0, -1);
    }

    const user = db
        .get('users')
        .find({ access_token })
        .value();

    if (!user) {
        return res.status(444).json({ message: 'Not auth' });
    }

    if (req.headers.authorization !== `Bearer ${user.access_token}`) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    return next();
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

    const product = db.get('products').find({ _id: id }).value();

    const updatedProduct = {
        ...product,
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
    };
    db.get('products').find({ _id: id }).assign(updatedProduct).write();

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

    const newAccessToken = generateAccessToken();
    const newRefreshToken = generateRefreshToken();

    const access_token = newAccessToken;
    const refresh_token = newRefreshToken;

    const newUser = {
        id, firstname, lastname, login, password, access_token, refresh_token,
    };

    db.get('users')
        .push(newUser)
        .write();

    const users = db.get('users').value();

    return res.json({ message: 'Зарегистрировался' });
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
