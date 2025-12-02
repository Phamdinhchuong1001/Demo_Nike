// ===================================================================================
// Code Logic Giỏ Hàng - cart_logic.js (Đơn giản hóa)
// ===================================================================================

const SHIPPING_FEE = 0;

function getCurrentUserId() {
    return sessionStorage.getItem('loggedInUserEmail');
}

function formatCurrency(amount) {
    const numberAmount = Number(amount) || 0;
    return numberAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function getCartItems() {
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

function saveCartItems(cart) {
    const userId = getCurrentUserId();
    const cartKey = userId ? `cart_${userId}` : 'cart_guest';
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateIconCounts() {
    const cart = getCartItems();
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += Number(item.quantity) || 1;
    });

    const cartBadge = document.getElementById('cart-count-badge');
    if (cartBadge) {
        cartBadge.textContent = totalQuantity;
        cartBadge.style.display = totalQuantity > 0 ? 'block' : 'none';
    }
}

// -----------------------------------------------------------------------
// --- LOGIC CẬP NHẬT/XÓA SẢN PHẨM TRONG GIỎ HÀNG ---
// -----------------------------------------------------------------------


window.removeItem = function (index) {
    let cart = getCartItems();
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        saveCartItems(cart);
        renderCart();
    }
}

window.updateQuantity = function (index, newQuantity) {
    let cart = getCartItems();
    const quantity = parseInt(newQuantity);

    if (quantity > 0 && index >= 0 && index < cart.length) {
        cart[index].quantity = quantity;
        saveCartItems(cart);
        renderCart();
    } else if (quantity <= 0) {
        removeItem(index);
    }
}

window.increaseQuantity = function (index) {
    let cart = getCartItems();
    if (index >= 0 && index < cart.length) {
        cart[index].quantity = (cart[index].quantity || 1) + 1;
        saveCartItems(cart);
        renderCart();
    }
}

window.decreaseQuantity = function (index) {
    let cart = getCartItems();
    if (index >= 0 && index < cart.length) {
        const currentQuantity = cart[index].quantity || 1;
        if (currentQuantity > 1) {
            cart[index].quantity = currentQuantity - 1;
            saveCartItems(cart);
            renderCart();
        } else {
            removeItem(index);
        }
    }
}
// --- THÊM HÀM LƯU LỊCH SỬ MUA HÀNG ---
window.saveOrderToHistory = function (orderData) {
    const userId = getCurrentUserId();
    const historyKey = userId ? `history_${userId}` : 'history_guest';
    
    // 1. Lấy lịch sử cũ
    let history;
    const historyJson = localStorage.getItem(historyKey);
    try {
        history = historyJson ? JSON.parse(historyJson) : [];
    } catch (e) {
        console.error("Lỗi phân tích JSON lịch sử đơn hàng cũ:", e);
        history = [];
    }
    
    // 2. Thêm đơn hàng mới vào đầu mảng
    history.unshift(orderData);
    
    // 3. Lưu lại vào Local Storage
    localStorage.setItem(historyKey, JSON.stringify(history));
    console.log(`Đã lưu đơn hàng ${orderData.orderId} vào lịch sử.`);
}

function renderCart() {
    const cart = getCartItems();
    const container = document.getElementById('cart-items-container');
    const checkoutButton = document.querySelector('.checkout-btn');

    let subtotal = 0;

    container.innerHTML = '';

    // Cấu trúc cho giỏ hàng trống
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <p class="text-white fs-4 mb-4">Giỏ hàng của bạn đang trống.</p>
                <a href="../html/index.html" class="btn btn-primary btn-lg fw-bold rounded-pill">
                    Tiếp tục mua sắm ngay <i class="fa fa-arrow-right ms-2"></i>
                </a>
            </div>
        `;
        // Vô hiệu hóa nút Thanh Toán
        if (checkoutButton) {
            checkoutButton.disabled = true;
        }

    } else {
        // Kích hoạt nút Thanh Toán
        if (checkoutButton) {
            checkoutButton.disabled = false;
        }

        cart.forEach((item, index) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;

            // Tính tổng tiền hàng (giá gốc * số lượng)
            subtotal += price * quantity;

            const imageSrc = item.image || '../assets/images/placeholder.png';

            const itemHTML = `
                <div class="cart-item d-flex border-bottom border-secondary py-3 mb-3 align-items-center" data-index="${index}">
                    <img src="${imageSrc}" alt="${item.name}" 
                          class="cart-item-image me-4 rounded" 
                          style="width: 120px; height: 120px; object-fit: cover;">
                    <div class="flex-grow-1 text-white">
                        <h5 class="mb-1">${item.name}</h5>
                        <p class="mb-1 text-muted small">Mã SP: ${item.id}</p>
                        <p class="mb-2 small">Kích cỡ <span class="fw-bold">${item.size}</span></p>
                        
                        <div class="d-flex align-items-center mt-2">
                            <span class="text-white fw-bold me-4">${formatCurrency(price)}</span>
                            
                            <div class="input-group input-group-sm quantity-control" style="width: 120px;">
                                <button class="btn btn-outline-light" type="button" onclick="decreaseQuantity(${index})">
                                    <i class="fa fa-minus"></i>
                                </button>
                                <input type="text" 
                                        value="${quantity}" 
                                        min="1" 
                                        class="form-control text-center bg-dark text-white border-light" 
                                        onchange="updateQuantity(${index}, this.value)"
                                        style="padding: 0; border-radius: 0;">
                                <button class="btn btn-outline-light" type="button" onclick="increaseQuantity(${index})">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>

                            <button class="btn btn-outline-light btn-sm ms-4" onclick="removeItem(${index})" title="Xóa sản phẩm">
                                <i class="fa fa-trash-alt"></i>
                            </button>
                            
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', itemHTML);
        });

    }

    // --- Cập nhật Summary ---
    const finalTotal = subtotal + SHIPPING_FEE;

    if (document.getElementById('subtotal-amount')) {
        document.getElementById('subtotal-amount').textContent = formatCurrency(subtotal);
        document.getElementById('shipping-fee').textContent = "Miễn Phí";
        document.getElementById('cart-total').textContent = formatCurrency(finalTotal);
    }

    // Ẩn thanh tiến trình vận chuyển miễn phí
    const progressContainer = document.querySelector('.my-4.text-center');
    if (progressContainer) progressContainer.style.display = 'none';

    updateIconCounts();
}

// -----------------------------------------------------------------------
// --- LOGIC XỬ LÝ SỰ KIỆN KHỞI TẠO VÀ NÚT THANH TOÁN (CHECKOUT) ---
// -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo và hiển thị giỏ hàng khi trang tải xong
    renderCart();

    // 2. Xử lý sự kiện cho nút Thanh Toán
    const checkoutButton = document.querySelector('.checkout-btn');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function (e) {
            const cart = getCartItems();

            if (cart && cart.length > 0) {
                // Nếu giỏ hàng có sản phẩm, chuyển hướng đến trang thanh toán
                window.location.href = 'checkout.html';
            } else {
                // Ngăn chặn chuyển hướng và thông báo nếu giỏ hàng trống
                e.preventDefault();
                alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm để thanh toán.");
                renderCart();
            }
        });
    }
});