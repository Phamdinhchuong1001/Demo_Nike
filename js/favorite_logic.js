(function ($) {
    "use strict";
    // Chức năng nút "Back to top"
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

    // --- LOGIC HIỂN THỊ DANH SÁCH YÊU THÍCH ---

    // Xử lý logic và hiển thị danh sách sản phẩm yêu thích lên giao diện.
    // Bao gồm kiểm tra trạng thái đăng nhập và danh sách rỗng.
    function displayFavorites() {
        const userId = getCurrentUserId();
        const $container = $('#favorite-products');
        const $emptyMessage = $('#empty-favorite-message');

        $container.empty();
        $emptyMessage.removeClass('d-none').hide(); 

        // Hiển thị thông báo nếu chưa đăng nhập.
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
            return; 
        }

        const favorites = getFavoritesByUserId(userId);

        // Hiển thị thông báo nếu danh sách yêu thích trống.
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

        // Lặp qua danh sách và tạo HTML cho từng sản phẩm.
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

        // Gán sự kiện click cho nút xóa sản phẩm khỏi mục yêu thích.
        $container.off('click', '.btn-remove').on('click', '.btn-remove', function() {
            const productId = $(this).data('product-id');
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi mục yêu thích?')) {
                removeFavoriteProduct(userId, productId);
                displayFavorites(); // Tải lại danh sách để cập nhật giao diện
            }
        });
        
        // TODO: Cần gán sự kiện cho nút Thêm vào giỏ hàng tại đây.
    }
    
    // Khởi chạy logic hiển thị danh sách yêu thích khi DOM đã tải xong.
    $(document).ready(function() {
        displayFavorites(); 
    });

})(jQuery);