let currentUser = null;
const API_BASE_URL = 'http://localhost:3000/api'; // バックエンドAPIのURL

// ログインフォームのイベントリスナー
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            currentUser = data.user;
            document.getElementById('logged-in-user').textContent = `ログイン中: ${currentUser.username}`;
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('store-management').style.display = 'block';
            loadStoreData();
            loadMetatags();
        } else {
            alert('ログインに失敗しました。');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('ログイン中にエラーが発生しました。');
    }
});

// ログアウトボタンのイベントリスナー
document.getElementById('logout-btn').addEventListener('click', () => {
    currentUser = null;
    document.getElementById('logged-in-user').textContent = '';
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('store-management').style.display = 'none';
    document.getElementById('login-form').reset();
});

// 店舗情報のロード
async function loadStoreData() {
    try {
        const response = await fetch(`${API_BASE_URL}/stores/${currentUser.storeId}`);
        const storeData = await response.json();
        document.getElementById('store-name').value = storeData.name;
        document.getElementById('store-description').value = storeData.description;
        document.getElementById('store-image').value = storeData.imageUrl;
        document.getElementById('store-crowdedness').value = storeData.crowdedness;
        document.getElementById('store-wait-time').value = storeData.waitTime;
        document.getElementById('store-distance').value = storeData.distance;
        // メタタグのチェックボックスを更新
        storeData.metatags.forEach(tag => {
            const checkbox = document.getElementById(`metatag-${tag}`);
            if (checkbox) checkbox.checked = true;
        });
    } catch (error) {
        console.error('Error loading store data:', error);
        alert('店舗情報の読み込み中にエラーが発生しました。');
    }
}

// メタタグの読み込みと表示
async function loadMetatags() {
    try {
        const response = await fetch(`${API_BASE_URL}/metatags`);
        const metatags = await response.json();
        const container = document.getElementById('metatags-container');
        metatags.forEach(tag => {
            const div = document.createElement('div');
            div.className = 'metatag-checkbox';
            div.innerHTML = `
                <input type="checkbox" id="metatag-${tag}" name="metatags" value="${tag}">
                <label for="metatag-${tag}">${tag}</label>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading metatags:', error);
        alert('メタタグの読み込み中にエラーが発生しました。');
    }
}

// 店舗情報フォームの送信
document.getElementById('store-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const storeData = Object.fromEntries(formData.entries());
    storeData.metatags = Array.from(formData.getAll('metatags'));
    try {
        const response = await fetch(`${API_BASE_URL}/stores/${currentUser.storeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(storeData)
        });
        if (response.ok) {
            alert('店舗情報が更新されました。');
        } else {
            alert('店舗情報の更新に失敗しました。');
        }
    } catch (error) {
        console.error('Error updating store data:', error);
        alert('店舗情報の更新中にエラーが発生しました。');
    }
});