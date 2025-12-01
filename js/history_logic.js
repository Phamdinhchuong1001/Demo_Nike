// ===================================================================================
// Code Logic Lịch Sử Mua Hàng - history_logic.js
// ===================================================================================

// Giả định các hàm sau được định nghĩa trong cart_logic.js
// - getCurrentUserId()
// - formatCurrency(amount)

function getOrderHistory() {
    const userId = getCurrentUserId();
    const historyKey = userId ? `history_${userId}` : 'history_guest';
    const historyJson = localStorage.getItem(historyKey);
    try {
        // Trả về mảng rỗng nếu không có lịch sử
        return historyJson ? JSON.parse(historyJson) : [];
    } catch (e) {
        console.error("Lỗi phân tích JSON cho lịch sử đơn hàng:", e);
        return [];
    }
}

function renderOrderHistory() {
    const history = getOrderHistory();
    const container = document.getElementById('history-container');
    const noHistoryMessage = document.getElementById('no-history-message');

    if (!container) return;

    // Sắp xếp đơn hàng mới nhất lên đầu (Dựa trên Order ID là timestamp)
    history.sort((a, b) => (b.orderId.split('-')[1] || 0) - (a.orderId.split('-')[1] || 0));

    container.innerHTML = '';

    if (history.length === 0) {
        // Hiển thị thông báo không có lịch sử
        container.style.display = 'none';
        if (noHistoryMessage) noHistoryMessage.style.display = 'block';
    } else {
        // Hiển thị danh sách lịch sử
        container.style.display = 'flex'; // Dùng flex để dễ căn chỉnh trong Bootstrap row
        if (noHistoryMessage) noHistoryMessage.style.display = 'none';

        history.forEach(order => {
            // Lấy 3 sản phẩm đầu tiên để hiển thị tóm tắt
            const summaryItems = order.items.slice(0, 3);
            const remainingItemsCount = order.items.length - summaryItems.length;

            const itemsHtml = summaryItems.map(item => `
                <div class="d-flex align-items-center mb-1">
                    <img src="${item.image || '../assets/images/placeholder.png'}" 
                         alt="${item.name}" 
                         class="order-item-image me-2">
                    <span class="small text-truncate" style="max-width: 70%;">${item.name} (x${item.quantity})</span>
                </div>
            `).join('');

            const statusClass = order.status === 'Chờ xác nhận' ? 'bg-warning' : 
                                order.status === 'Đã giao hàng' ? 'bg-success' : 
                                'bg-secondary';
            
            const cardHtml = `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="order-card p-4 rounded shadow-sm h-100">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <h5 class="mb-0 text-primary fw-bold">#${order.orderId}</h5>
                            <span class="badge ${statusClass} text-dark fw-bold">${order.status}</span>
                        </div>
                        
                        <p class="mb-2 small text-muted">Ngày đặt: ${order.orderDate}</p>
                        <p class="mb-2">
                            <i class="fa fa-map-marker-alt me-2 text-info"></i>
                            Địa chỉ: ${order.address}, ${order.district}, ${order.province}
                        </p>

                        <div class="border-top border-secondary pt-2 mt-3">
                            <p class="mb-2 fw-bold text-white">Sản phẩm đã mua:</p>
                            ${itemsHtml}
                            ${remainingItemsCount > 0 ? `<p class="small text-muted mb-0">+ ${remainingItemsCount} sản phẩm khác</p>` : ''}
                        </div>
                        
                        <div class="border-top border-secondary pt-3 mt-3">
                            <p class="mb-1">
                                <span class="fw-bold">Tổng tiền:</span> 
                                <span class="float-end text-danger fs-5">${order.totalSummary.totalAmount}</span>
                            </p>
                            <p class="mb-1 small">
                                Phương thức thanh toán: <span class="fw-bold">${order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : order.paymentMethod === 'visa' ? 'Thẻ Visa/Master' : 'Chuyển khoản'}</span>
                            </p>
                        </div>

                        <button class="btn btn-sm btn-outline-primary mt-3 w-100" type="button" 
                                data-bs-toggle="collapse" data-bs-target="#collapseOrder${order.orderId}" 
                                aria-expanded="false" aria-controls="collapseOrder${order.orderId}">
                            Xem Chi Tiết Đơn Hàng
                        </button>

                        <div class="collapse mt-3" id="collapseOrder${order.orderId}">
                            <div class="card card-body bg-dark text-white p-3 small">
                                <h6>Tóm Tắt Thanh Toán</h6>
                                <p class="mb-1 d-flex justify-content-between">
                                    <span>Tiền hàng:</span> 
                                    <span>${order.totalSummary.subtotal}</span>
                                </p>
                                <p class="mb-1 d-flex justify-content-between">
                                    <span>Phí Vận Chuyển:</span> 
                                    <span>${order.totalSummary.shippingFee}</span>
                                </p>
                                <p class="mb-1 d-flex justify-content-between fw-bold text-warning">
                                    <span>Tổng Thanh Toán:</span> 
                                    <span>${order.totalSummary.totalAmount}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHtml);
        });
    }
}

// Khởi tạo hiển thị lịch sử mua hàng khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Đảm bảo các hàm từ cart_logic.js được tải trước khi chạy
    if (typeof getCurrentUserId === 'function') {
        renderOrderHistory();
    } else {
        // Trường hợp cart_logic.js chưa được tải/định nghĩa
        console.error("Lỗi: Không tìm thấy các hàm từ cart_logic.js. Vui lòng kiểm tra lại thứ tự tải script.");
        document.getElementById('history-container').innerHTML = '<p class="text-danger">Lỗi tải dữ liệu. Vui lòng kiểm tra console.</p>';
    }
});