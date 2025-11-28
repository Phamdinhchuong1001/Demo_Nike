// favorite_logic.js

(function ($) {
    "use strict";

    // ... (Giữ nguyên các code khởi tạo WOW và các lib khác nếu có) ...

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // --- HÀM HELPERS (Vanilla JS để đồng bộ với logic Yêu thích) ---

    // Hàm Helper để lấy tên người dùng hiện tại
    function getCurrentUsername() {
        const loggedInUser = localStorage.getItem('loggedInUser'); 
        return loggedInUser ? JSON.parse(loggedInUser).username : null; 
    }

    // Hàm lấy danh sách yêu thích của người dùng
    function getFavoritesByUsername(username) {
        const favoritesKey = `favorites_${username}`;
        const favoritesJson = localStorage.getItem(favoritesKey);
        return favoritesJson ? JSON.parse(favoritesJson) : [];
    }

    // Hàm lưu danh sách yêu thích
    function saveFavoritesByUsername(username, favorites) {
        const favoritesKey = `favorites_${username}`;
        localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }

    // Hàm xóa sản phẩm khỏi danh sách yêu thích
    function removeFavoriteProduct(username, productId) {
        let favorites = getFavoritesByUsername(username);
        favorites = favorites.filter(item => item.id !== productId);
        saveFavoritesByUsername(username, favorites);
    }

    // Hàm helper để định dạng giá (Giả định formatCurrency đã tồn tại hoặc dùng toLocaleString)
    function formatCurrency(price) {
        if (typeof price === 'number') {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }
        return price; 
    }

    // --- LOGIC HIỂN THỊ DANH SÁCH YÊU THÍCH (MỚI) ---

    function displayFavorites() {
        const username = getCurrentUsername();
        const $container = $('#favorite-products');
        const $emptyMessage = $('#empty-favorite-message');

        $container.empty(); // Xóa nội dung cũ

        // Trường hợp 1: Chưa đăng nhập
        if (!username) {
            $emptyMessage.show();
            $emptyMessage.html(`
                <i class="fa fa-user-lock fa-5x text-secondary mb-3"></i>
                <h3 class="text-white">Bạn chưa đăng nhập!</h3>
                <p class="text-muted">Vui lòng đăng nhập để xem hoặc lưu Mục Yêu Thích.</p>
                <a href="../html/login.html" class="btn btn-primary mt-3 py-2 px-4">Đăng nhập ngay</a>
            `);
            return;
        }

        const favorites = getFavoritesByUsername(username);

        // Trường hợp 2: Danh sách trống
        if (favorites.length === 0) {
            $emptyMessage.show();
            // Đảm bảo nội dung thông báo trống mặc định (nếu đã có trong HTML) được giữ lại
            return; 
        }

        $emptyMessage.hide();

        // Trường hợp 3: Hiển thị sản phẩm
        favorites.forEach(product => {
            const productHtml = `
                <div class="col-lg-4 col-md-6 wow fadeInUp product-item" data-product-id="${product.id}">
                    <div class="product-card bg-light p-3 rounded shadow-sm text-center position-relative">
                        <button class="btn-remove position-absolute top-0 end-0 mt-2 me-2" aria-label="Xóa sản phẩm" data-product-id="${product.id}">
                            <i class="fa fa-times-circle text-dark"></i>
                        </button>
                        <a href="product_detail.html?id=${product.id}" class="d-block text-dark text-decoration-none">
                            <img class="img-fluid mb-3 rounded" src="${product.image}" alt="${product.name}" style="height: 200px; object-fit: cover; width: 100%;">
                            <h5 class="fw-bold">${product.name}</h5>
                            <p class="text-muted">${product.gender || ''} - ${product.category || 'Sản phẩm'}</p>
                            <p class="text-primary fw-bold fs-5">${formatCurrency(product.price)}</p>
                        </a>
                        <button class="btn btn-dark w-100 mt-2 add-to-bag-favorite-btn" data-product-id="${product.id}">Thêm vào giỏ</button>
                    </div>
                </div>
            `;
            $container.append(productHtml);
        });

        // Gán sự kiện cho nút xóa sau khi đã chèn HTML
        $container.off('click', '.btn-remove').on('click', '.btn-remove', function() {
            const productId = $(this).data('product-id');
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi mục yêu thích?')) {
                removeFavoriteProduct(username, productId);
                displayFavorites(); // Tải lại danh sách để cập nhật giao diện
            }
        });
        
        // TODO: Gán sự kiện cho nút Thêm vào giỏ hàng (nếu cần)
    }
    
    // Khởi chạy khi DOM đã sẵn sàng
    $(document).ready(function() {
        // Tải và hiển thị danh sách yêu thích
        displayFavorites(); 
    });

})(jQuery);