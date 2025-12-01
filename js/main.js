// =========================================================================
// CẬP NHẬT FILE ../js/main.js
// =========================================================================

(function ($) {
    "use strict";

    // Hàm điều khiển Spinner tải trang: Ẩn spinner sau 1ms.
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Khởi tạo thư viện WOW.js để kích hoạt các hiệu ứng animation khi cuộn trang.
    new WOW().init();


    // Xử lý thanh Navbar cố định (Sticky Navbar): Thêm class fixed và style khi cuộn xuống.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('position-fixed bg-dark shadow-sm');
        } else {
            $('.navbar').removeClass('position-fixed bg-dark shadow-sm');
        }
    });


    // Xử lý nút "Back to top": Hiển thị/Ẩn nút và xử lý cuộn lên đầu trang.
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


    // Khởi tạo Owl Carousel cho phần Đánh giá (Testimonials).
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // =========================================================================
    // =========== LOGIC CHUNG CHO LOCAL STORAGE, ICON VÀ TIỀN TỆ ===========
    // =========================================================================

    /**
     * Định dạng số thành chuỗi tiền tệ Việt Nam Đồng (VND).
     */
    window.formatCurrency = function (amount) {
        if (typeof amount !== 'number' || isNaN(amount)) return '0₫';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };


    /**
     * Lấy ID người dùng hiện tại (Email) từ Session Storage.
     */
    window.getCurrentUserId = function () {
        return sessionStorage.getItem('loggedInUserEmail');
    }

    // --- LOGIC GIỎ HÀNG ---

    /**
     * Lấy giỏ hàng của người dùng (hoặc giỏ hàng chung nếu chưa đăng nhập).
     */
    window.getCartItems = function () {
        const userId = getCurrentUserId();
        const cartKey = userId ? `cart_${userId}` : 'cart_guest';
        const cartJson = localStorage.getItem(cartKey);
        try {
            return cartJson ? JSON.parse(cartJson) : [];
        } catch (e) {
            console.error("Lỗi phân tích JSON cho giỏ hàng:", e);
            return [];
        }
    }

    /**
     * Lưu danh sách giỏ hàng mới vào Local Storage.
     */
    window.saveCartItems = function (cart) {
        const userId = getCurrentUserId();
        const cartKey = userId ? `cart_${userId}` : 'cart_guest';
        localStorage.setItem(cartKey, JSON.stringify(cart));
        // Đã sửa: Phải gọi updateIconCounts() để logic hoàn chỉnh
        if (typeof updateIconCounts === 'function') {
            updateIconCounts();
        }
    }


    // --- LOGIC YÊU THÍCH ---

    /**
     * Lấy danh sách sản phẩm yêu thích của một người dùng cụ thể từ Local Storage.
     */
    window.getFavoritesByUserId = function (userId) {
        const favoritesKey = `favorites_${userId}`;
        const favoritesJson = localStorage.getItem(favoritesKey);
        try {
            return favoritesJson ? JSON.parse(favoritesJson) : [];
        } catch (e) {
            console.error("Lỗi phân tích JSON cho mục yêu thích:", e);
            return [];
        }
    }

    /**
     * Lưu danh sách sản phẩm yêu thích mới cho người dùng vào Local Storage.
     */
    window.saveFavoritesByUserId = function (userId, favorites) {
        const favoritesKey = `favorites_${userId}`;
        localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }

    // --- LOGIC ĐẾM SỐ LƯỢNG VÀ CẬP NHẬT ICON ---

    /**
     * Tính tổng số lượng sản phẩm trong Giỏ hàng.
     * ĐÃ CẬP NHẬT: Tính tổng quantity thay vì số mục.
     */
    function getCartItemCount() {
        const cart = getCartItems();
        // Dùng reduce để tính tổng quantity
        return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    }

    /**
     * Tính tổng số lượng sản phẩm trong Mục yêu thích.
     */
    function getWishlistItemCount() {
        const userId = getCurrentUserId();
        if (!userId) return 0;
        const favorites = getFavoritesByUserId(userId);
        return favorites.length;
    }

    /**
     * Cập nhật số lượng hiển thị trên các icon Giỏ hàng và Yêu thích trên Header.
     */
    window.updateIconCounts = function () {
        const cartCount = getCartItemCount();
        const wishlistCount = getWishlistItemCount();

        const cartBadge = document.getElementById('cart-count-badge');
        const wishlistBadge = document.getElementById('wishlist-count-badge');

        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
        }

        if (wishlistBadge) {
            wishlistBadge.textContent = wishlistCount;
            wishlistBadge.style.display = wishlistCount > 0 ? 'block' : 'none';
        }
    }

    // =========================================================================
    // =========== KHỞI TẠO CHUNG ===========
    // =========================================================================

    // Chạy các logic chung khi DOM đã sẵn sàng
    $(document).ready(function () {
        // Cập nhật số lượng Giỏ hàng/Yêu thích khi trang tải xong (trên MỌI trang)
        updateIconCounts();
    });


})(jQuery);