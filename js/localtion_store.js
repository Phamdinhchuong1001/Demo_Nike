
const NIKE_STORES = [
    { name: "Nike SC VivoCity", lat: 10.7303, lng: 106.7029, address: "Tầng trệt, SC VivoCity, Quận 7" },
    { name: "Nike Vincom Center (Quận 1)", lat: 10.7788, lng: 106.7005, address: "Tầng 3, Vincom Center, Quận 1" },
    { name: "Nike Crescent Mall", lat: 10.7317, lng: 106.7126, address: "Tầng 2, Crescent Mall, Quận 7" },
    { name: "Nike Takashimaya", lat: 10.7758, lng: 106.6993, address: "Tầng 3, Saigon Centre - Takashimaya, Quận 1" },
    { name: "Nike Bitexco Financial Tower", lat: 10.7719, lng: 106.7032, address: "Tầng trệt, Bitexco, Quận 1" },
    { name: "Nike Giga Mall", lat: 10.8267, lng: 106.7118, address: "Tầng trệt, Giga Mall, Thủ Đức" },
    { name: "Nike Vincom Mega Mall Thảo Điền", lat: 10.8031, lng: 106.7472, address: "Tầng trệt, Vincom Mega Mall, Quận 2" },
    { name: "Nike Aeon Mall Tân Phú", lat: 10.8039, lng: 106.6261, address: "Tầng trệt, Aeon Mall Tân Phú, Quận Tân Phú" },
    { name: "Nike Vincom Plaza Lê Văn Việt", lat: 10.8232, lng: 106.7715, address: "Tầng trệt, Vincom Plaza Lê Văn Việt, Quận 9" },
    { name: "Nike Parkson Flemington", lat: 10.7720, lng: 106.6467, address: "Tầng trệt, Parkson Flemington, Quận 11" },
];

let map;
let storesLayer = L.layerGroup();
let infoWindow;
let userMarker;

// Hàm khởi tạo bản đồ
function initMap() {
    // Vị trí mặc định (TP.HCM)
    const defaultLocation = [10.762622, 106.660172];
    const defaultZoom = 12;

    // Khởi tạo bản đồ Leaflet
    map = L.map('map').setView(defaultLocation, defaultZoom);

    // Thêm lớp bản đồ OSM (Tile Layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    storesLayer.addTo(map);

    // 1. Tìm vị trí người dùng
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userCoords = [position.coords.latitude, position.coords.longitude];
                map.setView(userCoords, 13);
                displayStores(userCoords);
            },
            () => {
                // Lỗi không cho phép vị trí, vẫn hiển thị tại vị trí mặc định
                document.getElementById('storesCount').textContent = 'Không lấy được vị trí. Hiển thị cửa hàng tại TP.HCM.';
                displayStores(defaultLocation);
            }
        );
    } else {
        document.getElementById('storesCount').textContent = 'Trình duyệt không hỗ trợ định vị. Hiển thị cửa hàng tại TP.HCM.';
        displayStores(defaultLocation);
    }
}

// Hàm hiển thị các cửa hàng (đặt cố định)
function displayStores(centerCoords) {
    storesLayer.clearLayers(); // Xóa marker cũ
    const storesListElement = document.getElementById('storesList');
    storesListElement.innerHTML = '';

    // HIỂN THỊ SỐ LƯỢNG CỬA HÀNG
    document.getElementById('storesCount').textContent = `${NIKE_STORES.length} Cửa hàng tại TP.HCM`;

    NIKE_STORES.forEach((store, index) => {
        const storeCoords = [store.lat, store.lng];

        // Giả lập trạng thái mở cửa
        const isOpen = Math.random() < 0.7;

        // VIỆT HÓA TRẠNG THÁI MỞ CỬA
        const statusText = isOpen
            ? 'Đang mở · Đóng cửa lúc 22:00'
            : 'Đã đóng · Mở cửa ngày mai lúc 10:00';

        const statusClass = isOpen ? 'status-open' : 'status-closed';

        // Tạo Marker (điểm đánh dấu) Leaflet
        const marker = L.marker(storeCoords).addTo(storesLayer);

        // Tạo nội dung Popup (VIỆT HÓA)
        const popupContent = `
            <div style="font-family: Arial;">
                <strong>${store.name}</strong><br>
                ${store.address}<br>
                <span class="${statusClass}">${statusText}</span>
            </div>
        `;
        marker.bindPopup(popupContent);

        // Tạo Store Card ở Sidebar
        const storeCard = document.createElement('div');
        storeCard.className = 'store-card';
        storeCard.id = `store-${index}`;
        storeCard.innerHTML = `
            <div class="store-name">${store.name}</div>
            <div class="store-address">${store.address}</div>
            <div class="store-status ${statusClass}">${statusText}</div>
        `;

        // Xử lý click Store Card
        storeCard.addEventListener('click', () => {
            map.setView(storeCoords, 15); // Di chuyển đến vị trí cửa hàng
            marker.openPopup(); // Mở popup
            storeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        storesListElement.appendChild(storeCard);
    });
}

// Hàm tìm kiếm địa điểm bằng Nominatim (dịch vụ tìm kiếm của OSM)
function searchLocation(query) {
    // SỬ DỤNG LIMIT LỚN HƠN VÀ NOMINATIM API
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const result = data[0]; // Lấy kết quả tốt nhất
                const newCoords = [parseFloat(result.lat), parseFloat(result.lon)];
                map.setView(newCoords, 13);
                displayStores(newCoords);
            } else {
                // CẢNH BÁO NGƯỜI DÙNG CÁCH TÌM KIẾM HIỆU QUẢ VỚI NOMINATIM
                alert('Không tìm thấy địa điểm này. Vui lòng thử tìm kiếm theo tên đường, quận, hoặc thành phố (Ví dụ: "Lê Lợi Quận 1" hoặc "Quận 7").');
            }
        })
        .catch(error => {
            console.error('Lỗi tìm kiếm địa điểm:', error);
            alert('Có lỗi xảy ra trong quá trình tìm kiếm.');
        });
}


// Khởi tạo bản đồ khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    initMap();

    const searchInput = document.getElementById('locationSearch');
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchLocation(searchInput.value);
        }
    });
});