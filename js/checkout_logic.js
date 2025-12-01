// ===================================================================================
// Code Logic Thanh Toán - checkout_logic.js (Cập nhật hoàn chỉnh)
// ===================================================================================

const SHIPPING_FEE_STANDARD = 0;
const SHIPPING_FEE_EXPRESS = 45000;
const CHECKOUT_PROVINCE_DEFAULT = "TP. Hồ Chí Minh";
const CHECKOUT_DISTRICT_DEFAULT = "Quận 1";

// Hàm để hiển thị/ẩn ô mở rộng thông tin thanh toán
function togglePaymentDetails() {
    const paymentExpansion = document.getElementById('payment-details-expansion');
    // Lấy giá trị của radio button đang được chọn
    const selectedRadio = document.querySelector('input[name="paymentMethod"]:checked');
    const selectedMethod = selectedRadio ? selectedRadio.value : 'cod';

    let content = '';

    if (selectedMethod === 'visa') {
        content = `
            <p class="text-info fw-bold">Vui lòng điền thông tin Thẻ tín dụng:</p>
            <div class="mb-2">
                <label for="cardNumber" class="form-label text-light small">Số Thẻ</label>
                <input type="text" class="form-control bg-secondary border-0 text-white" id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" required>
            </div>
            <div class="row g-2">
                <div class="col-md-6">
                    <label for="expiryDate" class="form-label text-light small">Ngày Hết Hạn (MM/YY)</label>
                    <input type="text" class="form-control bg-secondary border-0 text-white" id="expiryDate" placeholder="01/25" required>
                </div>
                <div class="col-md-6">
                    <label for="cvv" class="form-label text-light small">CVV</label>
                    <input type="text" class="form-control bg-secondary border-0 text-white" id="cvv" placeholder="123" required>
                </div>
            </div>
        `;
        paymentExpansion.style.display = 'block';
    } else if (selectedMethod === 'transfer') {
        content = `
            <p class="text-info fw-bold">Thông tin Chuyển khoản Ngân hàng:</p>
            <p class="mb-1"><strong>Ngân hàng:</strong> Vietcombank</p>
            <p class="mb-1"><strong>Chủ tài khoản:</strong> CÔNG TY TNHH NIKE VIỆT NAM</p>
            <p class="mb-1"><strong>Số tài khoản:</strong> 0071000888888</p>
            <p class="text-warning small mt-2">Nội dung chuyển khoản: **TÊN_CỦA_BẠN - SĐT - ĐƠN_HÀNG_NIKE**</p>
        `;
        paymentExpansion.style.display = 'block';
    } else {
        paymentExpansion.style.display = 'none';
    }

    paymentExpansion.innerHTML = content;
}

// Hàm tính toán và cập nhật tóm tắt đơn hàng
function updateOrderSummary() {
    // Đảm bảo các hàm này được import từ cart_logic.js
    const cart = typeof getCartItems === 'function' ? getCartItems() : [];
    const format = typeof formatCurrency === 'function' ? formatCurrency : (a) => `${a} VNĐ`;

    let subtotal = 0;

    // 1. Tính Tổng tiền hàng
    cart.forEach(item => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        subtotal += price * quantity;
    });

    // 2. Tính Phí vận chuyển
    const shippingSelect = document.getElementById('shippingMethod');
    const shippingMethod = shippingSelect ? shippingSelect.value : 'standard';

    let shippingFee = SHIPPING_FEE_STANDARD;
    let shippingFeeText = 'Miễn Phí';

    if (shippingMethod === 'express') {
        shippingFee = SHIPPING_FEE_EXPRESS;
        shippingFeeText = format(shippingFee);
    }

    // 3. Tính Tổng thanh toán
    const total = subtotal + shippingFee;

    // 4. Cập nhật giao diện
    if (document.getElementById('summary-subtotal')) document.getElementById('summary-subtotal').textContent = format(subtotal);
    if (document.getElementById('summary-shipping-fee')) document.getElementById('summary-shipping-fee').textContent = shippingFeeText;
    if (document.getElementById('summary-total')) document.getElementById('summary-total').textContent = format(total);
}

// Hàm render danh sách sản phẩm (Có hình ảnh)
function renderCheckoutItems() {
    const cart = typeof getCartItems === 'function' ? getCartItems() : [];
    const format = typeof formatCurrency === 'function' ? formatCurrency : (a) => `${a} VNĐ`;

    const container = document.getElementById('checkout-items-summary');
    const placeOrderButton = document.getElementById('place-order-btn');

    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-warning small">Giỏ hàng trống. Vui lòng quay lại <a href="cart.html" class="text-primary">Giỏ hàng</a>.</p>`;
        if (placeOrderButton) placeOrderButton.disabled = true;
        return;
    }

    if (placeOrderButton) placeOrderButton.disabled = false;

    cart.forEach(item => {
        const imageSrc = item.image || '../assets/images/placeholder.png';

        const itemHTML = `
            <div class="d-flex border-bottom border-secondary pb-3 mb-3 pt-2">
                
                <img src="${imageSrc}" alt="${item.name}" 
                     class="img-fluid rounded me-3" 
                     style="width: 60px; height: 60px; object-fit: cover; border: 1px solid #333;">
                
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <p class="mb-0 text-light fw-bold">${item.name}</p>
                        <span class="text-light fw-bold ms-2">${format(item.price * item.quantity)}</span>
                    </div>
                    <p class="mb-0 text-muted small">Mã SP: ${item.id} | Size: ${item.size}</p>
                    <p class="mb-0 text-muted small">${Number(item.quantity) || 1} x ${format(item.price)}</p>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', itemHTML);
    });
}

// Hàm khởi tạo sự kiện
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render sản phẩm và Tóm tắt đơn hàng
    renderCheckoutItems();
    updateOrderSummary();

    // 2. Thiết lập giá trị mặc định cho form
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    if (fullNameInput) fullNameInput.value = "Phạm Đình Chương"; // Giả định thông tin đã có
    if (emailInput) emailInput.value = "chuong.pd@example.com";
    if (phoneInput) phoneInput.value = "0901234567";

    const provinceSelect = document.getElementById('province');
    const districtSelect = document.getElementById('district');

    if (provinceSelect) provinceSelect.value = CHECKOUT_PROVINCE_DEFAULT;
    if (districtSelect) districtSelect.innerHTML = `<option selected>${CHECKOUT_DISTRICT_DEFAULT}</option>`;

    // 3. Lắng nghe sự kiện thay đổi phương thức thanh toán
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', togglePaymentDetails);
    });
    togglePaymentDetails();

    // 4. Lắng nghe sự kiện thay đổi phương thức vận chuyển để cập nhật tổng tiền
    const shippingSelect = document.getElementById('shippingMethod');
    if (shippingSelect) shippingSelect.addEventListener('change', updateOrderSummary);

    // 5. Xử lý khi người dùng nhấn nút Đặt Hàng Ngay (ĐÃ CẬP NHẬT LOGIC LƯU LỊCH SỬ)
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const cartItems = typeof getCartItems === 'function' ? getCartItems() : [];
            if (cartItems.length === 0) {
                alert("Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
                return;
            }

            // Lấy dữ liệu form
            const formData = new FormData(this);
            const orderData = {};
            formData.forEach((value, key) => orderData[key] = value);

            // Lấy thông tin giỏ hàng và tổng tiền cuối cùng
            orderData.orderId = 'NIKE-' + Date.now(); // Tạo Order ID duy nhất
            orderData.orderDate = new Date().toLocaleString('vi-VN');
            orderData.status = 'Chờ xác nhận';
            orderData.items = cartItems;

            orderData.totalSummary = {
                subtotal: document.getElementById('summary-subtotal').textContent,
                shippingFee: document.getElementById('summary-shipping-fee').textContent,
                totalAmount: document.getElementById('summary-total').textContent,
            };

            // GỌI HÀM LƯU ĐƠN HÀNG MỚI (Cần có trong history_logic.js)
            if (typeof saveOrderToHistory === 'function') {
                saveOrderToHistory(orderData);
            }

            console.log("Đơn hàng mới đã được lưu:", orderData);
            alert(`Đơn hàng ${orderData.orderId} đã được tạo thành công! Tổng tiền: ${orderData.totalSummary.totalAmount}.`);

            // Xóa giỏ hàng sau khi đặt hàng thành công (Cần có trong cart_logic.js)
            if (typeof saveCartItems === 'function') saveCartItems([]);

            // Cập nhật lại số lượng icon (nếu cần)
            if (typeof updateIconCounts === 'function') updateIconCounts();

            // Chuyển hướng đến trang lịch sử
            window.location.href = 'payment_successful.html';
        });
    }
});