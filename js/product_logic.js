// =======================================================
// 1. BIẾN TRẠNG THÁI LỌC VÀ SẮP XẾP
// =======================================================

// Khởi tạo trạng thái lọc và sắp xếp
let currentFilters = {
    // Loại sản phẩm chính: 'Giày' hoặc 'Quần Áo'
    productType: 'Giày', 
    gender: 'Nam', // 'Nam', 'Nữ'
    category: '', 
    price: 'all', 
    status: [], // Ví dụ: ['sale', 'new']
    size: null, 
};

let currentSort = 'newest'; 


// =======================================================
// 2. HÀM TẠO VÀ HIỂN THỊ SẢN PHẨM (RENDER)
// =======================================================

/**
 * Tạo HTML cho một sản phẩm.
 * @param {Object} product - Đối tượng sản phẩm.
 * @returns {string} HTML của sản phẩm.
 */
function createProductHtml(product) {
    // Xử lý tag trạng thái (Sale, New, Exclusive)
    let statusTag = '';
    if (product.status && product.status.length > 0) {
        // Ưu tiên hiển thị Sale > New > Exclusive
        if (product.status.includes('sale')) {
            statusTag = `<p class="text-danger fw-bold m-0">Sale</p>`;
        } else if (product.status.includes('new')) {
            statusTag = `<p class="text-danger fw-bold m-0">Hàng Mới Về</p>`;
        } else if (product.status.includes('memberExclusive')) {
            statusTag = `<p class="text-warning fw-bold m-0">Độc Quyền Thành Viên</p>`;
        }
    }

    // Xử lý giá (sử dụng formatCurrency từ product_data.js)
    let priceHtml = '';
    // Hiển thị giá sale nếu có
    if (product.originalPrice && product.status?.includes('sale') && product.price < product.originalPrice) {
        priceHtml = `
            <p class="fw-bold m-0 text-danger">${formatCurrency(product.price)}</p>
            <span class="text-muted text-decoration-line-through">${formatCurrency(product.originalPrice)}</span>
        `;
    } else {
        priceHtml = `<p class="fw-bold m-0">${formatCurrency(product.price)}</p>`;
    }

    // Lấy ảnh đầu tiên hoặc ảnh mặc định
    const imageUrl = product.images?.[0] || product.imageUrl; 
    
    // Tạo HTML tổng thể cho sản phẩm
    return `
        <div class="col-md-6 col-xl-4 wow fadeInUp" data-wow-delay="0.3s" data-product-id="${product.id}">
            <div class="product-item">
                <a href="product_detail.html?id=${product.id}">
                    <img class="img-fluid w-100" src="${imageUrl}" alt="${product.name}">
                </a>
                <div class="p-3 text-start">
                    ${statusTag}
                    <h5 class="fw-bold mb-1">${product.name}</h5>
                    <p class="mb-1 text-muted">${product.gender}</p>
                    ${priceHtml}
                </div>
            </div>
        </div>
    `;
}

/**
 * Hiển thị các sản phẩm lên lưới (grid).
 * @param {Array<Object>} products - Mảng sản phẩm đã được lọc/sắp xếp.
 */
function renderProducts(products) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = ''; // Xóa nội dung cũ

    if (products.length === 0) {
        productGrid.innerHTML = `<div class="col-12"><p class="text-center text-light">Không tìm thấy sản phẩm phù hợp.</p></div>`;
        return;
    }

    products.forEach(product => {
        productGrid.innerHTML += createProductHtml(product);
    });

    // Kích hoạt lại animation WOW cho các phần tử mới
    new WOW().init();
}


// =======================================================
// 3. HÀM LỌC VÀ SẮP XẾP CHÍNH
// =======================================================

/**
 * Thực hiện lọc sản phẩm dựa trên trạng thái `currentFilters`.
 * @param {Array<Object>} data - Dữ liệu sản phẩm gốc (productsData từ file riêng).
 * @returns {Array<Object>} Mảng sản phẩm đã được lọc.
 */
function applyFilters(data) {
    return data.filter(product => {
        let isMatch = true;
        
        // LỌC 0: LỌC THEO LOẠI SẢN PHẨM (Giày/Quần Áo) - ĐIỀU KIỆN CHÍNH
        if (currentFilters.productType && product.productType !== currentFilters.productType) {
            return false; 
        }
        // LỌC 0.5: LỌC THEO GIỚI TÍNH (Nam/Nữ) - ĐIỀU KIỆN PHỤ
        if (currentFilters.gender && product.gender !== currentFilters.gender) {
            return false; 
        }

        // LỌC 1: Lọc theo Danh mục (Category/product.type)
        if (currentFilters.category && product.type !== currentFilters.category) {
            isMatch = false;
        }

        // LỌC 2: Lọc theo Giá (Price Range)
        if (isMatch && currentFilters.price !== 'all') {
            const [min, max] = currentFilters.price.split('-').map(Number);
            if (product.price < min || product.price > max) { 
                isMatch = false;
            }
        }

        // LỌC 3: Lọc theo Trạng thái (Status/Sale)
        if (isMatch && currentFilters.status.length > 0) {
            const hasRequiredStatus = currentFilters.status.some(status => product.status?.includes(status));
            if (!hasRequiredStatus) {
                isMatch = false;
            }
        }

        // LỌC 4: Lọc theo Kích thước (Size) và trạng thái có sẵn
        if (isMatch && currentFilters.size !== null) {
            let hasSize = false;
            const targetSize = currentFilters.size; 

            if (Array.isArray(product.sizes)) {
                 // Kiểm tra trong mảng sizes của sản phẩm
                 hasSize = product.sizes.some(sizeItem => {
                    const itemSize = String(sizeItem.size).toUpperCase(); 
                    const filterSize = String(targetSize).toUpperCase();
                    
                    // Lọc theo kích thước VÀ trạng thái có sẵn (available: true)
                    return itemSize === filterSize && sizeItem.available;
                 });
            }
            
            if (!hasSize) {
                isMatch = false;
            }
        }
        
        return isMatch;
    });
}

/**
 * Thực hiện sắp xếp sản phẩm dựa trên trạng thái `currentSort` (Giá tăng/giảm, Mới nhất).
 * @param {Array<Object>} products - Mảng sản phẩm đã được lọc.
 * @returns {Array<Object>} Mảng sản phẩm đã được sắp xếp.
 */
function applySorting(products) {
    const sortedProducts = [...products]; // Tạo bản sao

    switch (currentSort) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
        default:
            // Giữ nguyên thứ tự ban đầu
            break;
    }
    return sortedProducts;
}

/**
 * Hàm tổng hợp: Lọc, sắp xếp và render lại.
 */
function updateProductDisplay() {
    if (typeof productsData === 'undefined') {
        console.error("Lỗi: productsData chưa được tải.");
        return;
    }
    
    let filteredProducts = applyFilters(productsData);
    let finalProducts = applySorting(filteredProducts);
    renderProducts(finalProducts);
}

// =======================================================
// 4. HÀM TIỆN ÍCH CHUYỂN ĐỔI LOẠI SẢN PHẨM
// =======================================================

/**
 * Xác định loại sản phẩm ('Giày' hoặc 'Quần Áo') dựa trên URL hiện tại.
 * @returns {string} 'Giày' hoặc 'Quần Áo'.
 */
function getInitialProductType() {
    const pathname = window.location.pathname.toLowerCase(); 
    
    if (pathname.includes('phukien')) { // <-- THÊM ĐOẠN NÀY
        return 'Phụ Kiện'; 
    } else if (pathname.includes('ao')) {
        return 'Quần Áo'; 
    } else if (pathname.includes('giay')) {
        return 'Giày';
    }else if(pathname.includes('giay nu')) { 
        return 'Giày Nữ'; 
    }
    
    return 'Giày'; 
}
function getInitialGender() {
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes('nu')) {
        return 'Nữ';
    }
    return 'Nam';
}
/**
 * Thiết lập loại sản phẩm chính và reset các bộ lọc khác.
 * @param {string} type - 'Giày' hoặc 'Quần Áo'.
 */
function setProductType(type) {
    if (currentFilters.productType === type) return; // Không làm gì nếu loại sản phẩm không đổi

    currentFilters.productType = type;
    
    // Reset các bộ lọc khác khi chuyển đổi loại sản phẩm
    currentFilters.category = '';
    currentFilters.price = 'all';
    currentFilters.status = [];
    currentFilters.size = null; 
    currentSort = 'newest';
    
    // Cập nhật giao diện bộ lọc và hiển thị sản phẩm
    resetFilterUI();
    updateProductDisplay();
}

/**
 * Hàm reset giao diện bộ lọc về trạng thái mặc định.
 */
function resetFilterUI() {
    // Reset Category, Price, Status, Size, Sort By Dropdown
    document.querySelectorAll('#categoryFilter a').forEach(a => a.classList.remove('active-filter'));
    document.querySelectorAll('#priceFilter input[type="radio"]').forEach(radio => radio.checked = radio.value === 'all');
    document.querySelectorAll('#saleFilter input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.querySelectorAll('#sizeFilter .size-btn').forEach(btn => {
        btn.classList.remove('active', 'btn-light');
        btn.classList.add('btn-outline-light');
    });

    const sortByDropdown = document.getElementById('sortByDropdown');
    if (sortByDropdown) {
        sortByDropdown.textContent = 'Sắp Xếp Theo'; 
    }
}

// =======================================================
// 5. LOGIC GẮN SỰ KIỆN (EVENT LISTENERS)
// =======================================================

document.addEventListener('DOMContentLoaded', function () {
    // KHỞI TẠO: Thiết lập loại sản phẩm ban đầu và hiển thị.
    currentFilters.productType = getInitialProductType(); 
    currentFilters.gender = getInitialGender();
    updateProductDisplay();
    
    // Logic Gắn sự kiện cho nút chuyển đổi loại sản phẩm (Giày/Quần Áo)
    document.getElementById('shoesTab')?.addEventListener('click', function(e) {
        e.preventDefault();
        setProductType('Giày');
    });

    document.getElementById('apparelTab')?.addEventListener('click', function(e) {
        e.preventDefault();
        setProductType('Quần Áo');
    });

    // Logic Ẩn/Hiện Bộ Lọc (Sidebar) và điều chỉnh kích thước lưới sản phẩm.
    const toggleButton = document.getElementById('hideFiltersToggle');
    const filterSidebar = document.getElementById('filterSidebar')?.parentElement;
    const productGridContainer = document.getElementById('productGridContainer');
    
    if (toggleButton && filterSidebar && productGridContainer) {
        toggleButton.addEventListener('click', function() {
            filterSidebar.classList.toggle('d-none'); 

            if (filterSidebar.classList.contains('d-none')) {
                productGridContainer.classList.remove('col-lg-9');
                productGridContainer.classList.add('col-lg-12');
                toggleButton.textContent = 'Hiện Bộ Lọc'; 
            } else {
                productGridContainer.classList.remove('col-lg-12');
                productGridContainer.classList.add('col-lg-9');
                toggleButton.textContent = 'Ẩn Bộ Lọc'; 
            }
        });
    }

    // Tùy chọn: Thêm xoay biểu tượng chevron khi mở/đóng bộ lọc (Collapse).
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(toggler => {
        toggler.addEventListener('click', function() {
            const icon = this.querySelector('.fa-chevron-down');
            if (icon) {
                icon.classList.toggle('fa-rotate-180');
            }
        });
    });

    // Logic Lọc theo Danh mục (Category)
    document.querySelectorAll('#categoryFilter a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-filter-value');
            
            document.querySelectorAll('#categoryFilter a').forEach(a => a.classList.remove('active-filter'));
            this.classList.add('active-filter');

            currentFilters.category = category;
            updateProductDisplay();
        });
    });

    // Logic Lọc theo Giá (Price)
    document.querySelectorAll('#priceFilter input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            currentFilters.price = this.value;
            updateProductDisplay();
        });
    });

    // Logic Lọc theo Trạng thái (Status)
    document.querySelectorAll('#saleFilter input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const statusValue = this.value;
            if (this.checked) {
                if (!currentFilters.status.includes(statusValue)) {
                    currentFilters.status.push(statusValue);
                }
            } else {
                currentFilters.status = currentFilters.status.filter(s => s !== statusValue);
            }
            updateProductDisplay();
        });
    });
    
    // Logic Lọc theo Kích thước (Size)
    document.querySelectorAll('#sizeFilter .size-btn').forEach(button => {
        button.addEventListener('click', function() {
            const size = this.getAttribute('data-size'); 
            const isActive = this.classList.contains('active');
            
            // Xóa active của tất cả các nút
            document.querySelectorAll('#sizeFilter .size-btn').forEach(btn => btn.classList.remove('active', 'btn-light'));
            document.querySelectorAll('#sizeFilter .size-btn').forEach(btn => btn.classList.add('btn-outline-light'));


            if (isActive) {
                // Hủy chọn
                currentFilters.size = null;
            } else {
                // Chọn size mới
                this.classList.remove('btn-outline-light');
                this.classList.add('active', 'btn-light');
                currentFilters.size = size;
            }
            updateProductDisplay();
        });
    });

    // Logic Sắp xếp (Sort By)
    document.querySelectorAll('#sortByDropdown + .dropdown-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            currentSort = this.getAttribute('data-sort-by');
            
            const dropdownToggle = document.getElementById('sortByDropdown');
            dropdownToggle.textContent = 'Sắp Xếp Theo: ' + this.textContent;

            updateProductDisplay();
        });
    });
});