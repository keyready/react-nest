const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const PORT = 9999;
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
// server.use(async (req, res, next) => {
//     await new Promise((res) => {
//         setTimeout(res, 200);
//     });
//     next();
// });

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const { db } = router;
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

server.post('/create_product', (req, res) => {
    console.log(req.body);
    const { name, description, price } = req.body;
    const { db } = router;
    const id = db.get('products').size().value() + 1;

    const newProduct = {
        id, name, description, price,
    };

    db.get('products')
        .push(newProduct)
        .write((err) => {
            console.log('создали');
            if (err) {
                console.error(err);
                res.json({ error: err });
            } else {
                console.log('New user added to the database');
                res.json({ message: 'New user added to the database' });
            }
        });
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    // if (!req.headers.authorization) {
    //     return res.status(403).json({ message: 'AUTH ERROR' });
    // }

    next();
});

server.use(router);

// запуск сервера
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
});
