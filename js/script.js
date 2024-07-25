// サンプルデータ（実際のアプリケーションではサーバーからデータを取得します）
let shops = [
    { id: 1, name: "米久本店", description: "創業1872年の老舗すき焼き店。", image: "https://example.com/image1.jpg", crowdedness: "中", waitTime: 30, distance: 0.5 },
    { id: 2, name: "浅草今半 国際通り本店", description: "明治28年創業の老舗すき焼き店。", image: "https://example.com/image2.jpg", crowdedness: "高", waitTime: 45, distance: 0.7 },
];

// DOM要素
const shopList = document.getElementById('shop-list');
const shopForm = document.getElementById('shop-form');

// 店舗リストの表示
function renderShopList() {
    shopList.innerHTML = '';
    shops.forEach(shop => {
        const shopElement = document.createElement('div');
        shopElement.innerHTML = `
            <h3>${shop.name}</h3>
            <p>${shop.description}</p>
            <button onclick="editShop(${shop.id})">編集</button>
        `;
        shopList.appendChild(shopElement);
    });
}

// 店舗情報の編集
function editShop(id) {
    const shop = shops.find(s => s.id === id);
    if (shop) {
        document.getElementById('shop-name').value = shop.name;
        document.getElementById('shop-description').value = shop.description;
        document.getElementById('shop-image').value = shop.image;
        document.getElementById('shop-crowdedness').value = shop.crowdedness;
        document.getElementById('shop-wait-time').value = shop.waitTime;
        document.getElementById('shop-distance').value = shop.distance;
        shopForm.dataset.editId = id;
    }
}

// フォームの送信処理
shopForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = parseInt(shopForm.dataset.editId);
    const shopData = {
        name: document.getElementById('shop-name').value,
        description: document.getElementById('shop-description').value,
        image: document.getElementById('shop-image').value,
        crowdedness: document.getElementById('shop-crowdedness').value,
        waitTime: parseInt(document.getElementById('shop-wait-time').value),
        distance: parseFloat(document.getElementById('shop-distance').value)
    };

    if (id) {
        // 既存の店舗を更新
        const index = shops.findIndex(s => s.id === id);
        if (index !== -1) {
            shops[index] = { ...shops[index], ...shopData };
        }
    } else {
        // 新しい店舗を追加
        shopData.id = shops.length + 1;
        shops.push(shopData);
    }

    renderShopList();
    shopForm.reset();
    delete shopForm.dataset.editId;
});

// 初期表示
renderShopList();