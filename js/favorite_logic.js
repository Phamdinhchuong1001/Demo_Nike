(function ($) {
    "use strict";
    // Chức năng nút "Back to top" (Giữ nguyên)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // --- HÀM HELPERS ---

    // Lấy ID người dùng hiện tại (là Email) từ sessionStorage.
    function getCurrentUserId() {
        return sessionStorage.getItem('loggedInUserEmail');
    }

    // Lấy danh sách sản phẩm yêu thích của người dùng dựa trên ID (Email) từ localStorage.
    function getFavoritesByUserId(userId) {
        const favoritesKey = `favorites_${userId}`;
        const favoritesJson = localStorage.getItem(favoritesKey);
        try {
            return favoritesJson ? JSON.parse(favoritesJson) : [];
        } catch (e) {
            console.error("Lỗi phân tích JSON cho mục yêu thích:", e);
            return [];
        }
    }

    // Lưu danh sách sản phẩm yêu thích vào localStorage cho người dùng cụ thể.
    function saveFavoritesByUserId(userId, favorites) {
        const favoritesKey = `favorites_${userId}`;
        localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }

    // Xóa một sản phẩm cụ thể khỏi danh sách yêu thích của người dùng.
    function removeFavoriteProduct(userId, productId) {
        let favorites = getFavoritesByUserId(userId);
        favorites = favorites.filter(item => item.id !== productId);
        saveFavoritesByUserId(userId, favorites);
    }

    // Định dạng giá tiền thành định dạng tiền tệ (VND).
    function formatCurrency(price) {
        if (typeof price === 'number') {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }
        return price;
    }

    // --- LOGIC GIỎ HÀNG MỚI THÊM VÀO ---

    // Lấy danh sách giỏ hàng của người dùng.
    function getCartByUserId(userId) {
        const cartKey = `cart_${userId}`;
        const cartJson = localStorage.getItem(cartKey);
        try {
            return cartJson ? JSON.parse(cartJson) : [];
        } catch (e) {
            console.error("Lỗi phân tích JSON cho giỏ hàng:", e);
            return [];
        }
    }

    // Lưu danh sách giỏ hàng vào localStorage.
    function saveCartByUserId(userId, cart) {
        const cartKey = `cart_${userId}`;
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    // Hàm thêm sản phẩm vào giỏ hàng.
    function addToCart(userId, product) {
        let cart = getCartByUserId(userId);

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa (dựa trên id, vì ở đây không có size/số lượng).
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            // Nếu đã có, tăng số lượng lên 1. (Giả định số lượng ban đầu là 1)
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        } else {
            // Nếu chưa có, thêm mới với số lượng là 1.
            cart.push({
                ...product,
                quantity: 1,
                // Giả định thêm size/color mặc định nếu cần
                size: 'Mặc định',
                color: 'Mặc định'
            });
        }

        saveCartByUserId(userId, cart);
        updateCartBadge(cart.length); // Cập nhật số lượng trên biểu tượng giỏ hàng
        alert(`Đã thêm sản phẩm "${product.name}" vào giỏ hàng!`);
    }

    // Cập nhật biểu tượng giỏ hàng trên header.
    function updateCartBadge(count) {
        const $badge = $('#cart-count-badge');
        if (count > 0) {
            $badge.text(count).show();
        } else {
            $badge.hide();
        }
    }

    // Hàm lấy thông tin sản phẩm từ Favorites để thêm vào giỏ hàng.
    function getProductFromFavorites(userId, productId) {
        const favorites = getFavoritesByUserId(userId);
        return favorites.find(product => product.id === productId);
    }

    // --- LOGIC HIỂN THỊ DANH SÁCH YÊU THÍCH (CÓ THAY ĐỔI) ---

    // Xử lý logic và hiển thị danh sách sản phẩm yêu thích lên giao diện.
    function displayFavorites() {
        const userId = getCurrentUserId();
        const $container = $('#favorite-products');
        const $emptyMessage = $('#empty-favorite-message');

        $container.empty();
        $emptyMessage.removeClass('d-none').hide();

        // 1. Xử lý trường hợp chưa đăng nhập (Giữ nguyên)
        if (!userId) {
            $emptyMessage.show();
            $emptyMessage.html(`
                <div class="text-center p-5">
                    <i class="fa fa-user-lock fa-5x text-secondary mb-3"></i>
                    <h3 class="text-white mt-3">Bạn chưa đăng nhập!</h3>
                    <p class="text-muted">Vui lòng đăng nhập để xem hoặc lưu Mục Yêu Thích cá nhân của bạn.</p>
                    <a href="../html/login.html" class="btn btn-primary mt-3 py-2 px-4">Đăng nhập ngay</a>
                </div>
            `);
            updateCartBadge(0); // Đảm bảo biểu tượng giỏ hàng được reset nếu chưa đăng nhập
            return;
        }

        const favorites = getFavoritesByUserId(userId);

        // Cập nhật số lượng giỏ hàng ban đầu khi tải trang
        const cart = getCartByUserId(userId);
        updateCartBadge(cart.length);

        // 2. Xử lý trường hợp danh sách yêu thích trống (Có thay đổi)
        if (favorites.length === 0) {
            $emptyMessage.show();
            $emptyMessage.html(`
                <div class="text-center p-5">
                    <i class="fa fa-heart-broken fa-5x text-secondary mb-3"></i>
                    <h3 class="text-white mt-3">Mục Yêu Thích trống!</h3>
                    <p class="text-muted">Hãy lướt qua các sản phẩm và thêm những món bạn thích vào đây nhé.</p>
                    <a href="../html/index.html" class="btn btn-primary mt-3 py-2 px-4">Khám phá ngay</a>
                </div>
            `);
            return;
        }

        $emptyMessage.hide();

        // 3. Lặp qua danh sách và tạo HTML cho từng sản phẩm (Giữ nguyên)
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
                        <button class="btn btn-dark w-100 mt-2 add-to-bag-favorite-btn" data-product-id="${product.id}">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            `;
            $container.append(productHtml);
        });

        // 4. Gán sự kiện click cho nút xóa sản phẩm khỏi mục yêu thích (Giữ nguyên)
        $container.off('click', '.btn-remove').on('click', '.btn-remove', function () {
            const productId = $(this).data('product-id');
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi mục yêu thích?')) {
                removeFavoriteProduct(userId, productId);
                displayFavorites(); // Tải lại danh sách để cập nhật giao diện
            }
        });

        // 5. Gán sự kiện cho nút "Thêm vào giỏ hàng" (MỚI)
        $container.off('click', '.add-to-bag-favorite-btn').on('click', '.add-to-bag-favorite-btn', function () {
            const productId = $(this).data('product-id');
            const productToAdd = getProductFromFavorites(userId, productId);

            if (productToAdd) {
                addToCart(userId, productToAdd);
            } else {
                alert('Không tìm thấy thông tin sản phẩm để thêm vào giỏ hàng.');
            }
        });
    }

    // Khởi chạy logic hiển thị danh sách yêu thích khi DOM đã tải xong.
    $(document).ready(function () {
        displayFavorites();

        // Thêm hàm này để cập nhật badge số lượng yêu thích khi tải trang (giả định)
        // Đây là code cần có trong main.js hoặc index_logic.js, nhưng thêm tạm ở đây:
        const userId = getCurrentUserId();
        if (userId) {
            const favorites = getFavoritesByUserId(userId);
            const $wishlistBadge = $('#wishlist-count-badge');
            if (favorites.length > 0) {
                $wishlistBadge.text(favorites.length).show();
            } else {
                $wishlistBadge.hide();
            }
        }
    });

})(jQuery);