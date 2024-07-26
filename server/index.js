const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// ミドルウェアの設定
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// EJSをビューエンジンとして設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// ダミーデータ（実際にはデータベースを使用します）
const users = [
    { id: 1, username: 'store1', password: 'password1', storeId: 1 },
    { id: 2, username: 'store2', password: 'password2', storeId: 2 }
];

const stores = [
    { id: 1, name: '米久本店', description: '創業1872年の老舗すき焼き店。', imageUrl: 'https://example.com/yonekyuhonten.jpg', crowdedness: '中', waitTime: 30, distance: 0.5, metatags: ['すき焼き', '老舗'] },
    { id: 2, name: '浅草今半 国際通り本店', description: '明治28年創業の老舗すき焼き店。', imageUrl: 'https://example.com/asakusaimahan.jpg', crowdedness: '高', waitTime: 45, distance: 0.7, metatags: ['すき焼き', '老舗'] }
];

const metatags = ['すき焼き', '老舗', '和食', '観光スポット', '家族向け'];

// ルート設定
app.get('/', (req, res) => {
  res.render('home', { stores: stores });
});

app.get('/store/:id', (req, res) => {
  const store = stores.find(s => s.id === parseInt(req.params.id));
  if (store) {
    res.render('store', { store: store });
  } else {
    res.status(404).send('Store not found');
  }
});

// ログインAPI
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ user: { id: user.id, username: user.username, storeId: user.storeId } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// 店舗情報取得API
app.get('/api/stores/:id', (req, res) => {
    const store = stores.find(s => s.id === parseInt(req.params.id));
    if (store) {
        res.json(store);
    } else {
        res.status(404).json({ message: 'Store not found' });
    }
});

// 店舗情報更新API
app.put('/api/stores/:id', (req, res) => {
    const storeIndex = stores.findIndex(s => s.id === parseInt(req.params.id));
    if (storeIndex !== -1) {
        stores[storeIndex] = { ...stores[storeIndex], ...req.body };
        res.json(stores[storeIndex]);
    } else {
        res.status(404).json({ message: 'Store not found' });
    }
});

// メタタグ取得API
app.get('/api/metatags', (req, res) => {
    res.json(metatags);
});

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));