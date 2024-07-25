let stores = [
    { id: 1, name: "米久本店", description: "創業1872年の老舗すき焼き店。", imageUrl: "https://example.com/yonekyuhonten.jpg", crowdedness: "中", waitTime: 30, distance: 0.5 },
    { id: 2, name: "浅草今半 国際通り本店", description: "明治28年創業の老舗すき焼き店。", imageUrl: "https://example.com/asakusaimahan.jpg", crowdedness: "高", waitTime: 45, distance: 0.7 }
];

function renderStores() {
    const storeList = document.getElementById('store-list');
    storeList.innerHTML = '';
    stores.forEach(store => {
        const storeCard = document.createElement('div');
        storeCard.className = 'store-card';
        storeCard.innerHTML = `
            <h2>${store.name}</h2>
            <p>${store.description}</p>
            <p>混雑度: ${store.crowdedness}</p>
            <p>待ち時間: ${store.waitTime}分</p>
            <p>距離: ${store.distance}km</p>
            <button onclick="editStore(${store.id})">編集</button>
        `;
        storeList.appendChild(storeCard);
    });
}

function editStore(id) {
    const store = stores.find(s => s.id === id);
    if (store) {
        document.getElementById('store-name').value = store.name;
        document.getElementById('store-description').value = store.description;
        document.getElementById('store-image').value = store.imageUrl;
        document.getElementById('store-crowdedness').value = store.crowdedness;
        document.getElementById('store-wait-time').value = store.waitTime;
        document.getElementById('store-distance').value = store.distance;
        document.getElementById('modal').style.display = 'block';
    }
}

document.getElementById('add-store').addEventListener('click', () => {
    document.getElementById('store-form').reset();
    document.getElementById('modal').style.display = 'block';
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('store-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newStore = {
        id: stores.length + 1,
        name: document.getElementById('store-name').value,
        description: document.getElementById('store-description').value,
        imageUrl: document.getElementById('store-image').value,
        crowdedness: document.getElementById('store-crowdedness').value,
        waitTime: parseInt(document.getElementById('store-wait-time').value),
        distance: parseFloat(document.getElementById('store-distance').value)
    };
    stores.push(newStore);
    renderStores();
    document.getElementById('modal').style.display = 'none';
});

renderStores();