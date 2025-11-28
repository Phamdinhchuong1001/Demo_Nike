// --- HÀM HELPERS CHO LOGIC YÊU THÍCH CÁ NHÂN HÓA ---

/**
 * Lấy ID người dùng hiện tại (Email) từ Session Storage.
 * @returns {string | null} Email người dùng hoặc null nếu chưa đăng nhập.
 */
function getCurrentUserId() {
    return sessionStorage.getItem('loggedInUserEmail'); 
}

/**
 * Lấy danh sách sản phẩm yêu thích của một người dùng cụ thể từ Local Storage.
 * @param {string} userId - Email của người dùng.
 * @returns {Array<Object>} Mảng chứa các đối tượng sản phẩm yêu thích.
 */
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

/**
 * Lưu danh sách sản phẩm yêu thích mới cho người dùng vào Local Storage.
 * @param {string} userId - Email của người dùng.
 * @param {Array<Object>} favorites - Danh sách sản phẩm yêu thích mới.
 */
function saveFavoritesByUserId(userId, favorites) {
    const favoritesKey = `favorites_${userId}`;
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
}

// -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    let selectedSize = null; 
    let currentProduct = null; 

    // Hàm khởi tạo trang: Lấy ID sản phẩm, tải dữ liệu chi tiết và thiết lập các sự kiện.
    function initializeProductPage() {
        if (typeof productsData === 'undefined' || typeof formatCurrency === 'undefined') {
            console.error("Lỗi: Không tìm thấy productsData hoặc formatCurrency.");
            document.getElementById('product-name').textContent = "Lỗi tải dữ liệu.";
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || 'field-general-black'; 

        const product = productsData.find(p => p.id === productId);

        if (product) {
            currentProduct = product; 
            loadProductDetails(product);
            setupAddToCartButton();
            setupFavoriteButton(); // Thiết lập logic nút Yêu thích
        } else {
            document.getElementById('product-name').textContent = "Không tìm thấy sản phẩm.";
        }
        
        // Cập nhật trạng thái Đăng nhập/Đăng xuất trên Header.
        updateHeaderLoginStatus(); 
    }
    
    // Tải và hiển thị thông tin chi tiết của sản phẩm lên giao diện.
    function loadProductDetails(product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-category').textContent = product.category;
        document.getElementById('product-gender').textContent = product.gender || '';
        document.getElementById('product-description').innerHTML = product.description.replace(/\n/g, '<br>');

        let priceHtml = '';
        if (product.originalPrice && product.price < product.originalPrice) {
            priceHtml = `
                <span class="text-danger">${formatCurrency(product.price)}</span>
                <span class="text-white-50 text-decoration-line-through fs-6 ms-2">${formatCurrency(product.originalPrice)}</span>
            `;
        } else {
            priceHtml = formatCurrency(product.price);
        }
        document.getElementById('product-price').innerHTML = priceHtml;
        
        const mainImage = document.getElementById('main-product-image');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;

        loadThumbnails(product.images, mainImage);
        loadSizeOptions(product.sizes);
        loadColorOptions(product.colors);
    }
    
    // Tải và thiết lập sự kiện click cho các ảnh thumbnail.
    function loadThumbnails(images, mainImage) {
        const thumbnailContainer = document.getElementById('thumbnail-gallery');
        thumbnailContainer.innerHTML = '';

        images.forEach((imgSrc, index) => {
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('thumbnail-item');
            if (index === 0) { thumbnailDiv.classList.add('active'); }
            thumbnailDiv.innerHTML = `<img src="${imgSrc}" class="img-fluid" alt="Ảnh ${index + 1}">`; 

            thumbnailDiv.addEventListener('click', () => {
                mainImage.src = imgSrc;
                document.querySelectorAll('#thumbnail-gallery .thumbnail-item').forEach(item => {
                    item.classList.remove('active');
                });
                thumbnailDiv.classList.add('active');
            });

            thumbnailContainer.appendChild(thumbnailDiv);
        });
    }

    // Tải và thiết lập sự kiện chọn size cho sản phẩm.
    function loadSizeOptions(sizes) {
        const sizeContainer = document.getElementById('size-options-container');
        sizeContainer.innerHTML = '';

        sizes.forEach(sizeItem => {
            const sizeDiv = document.createElement('div');
            sizeDiv.classList.add('size-option');
            sizeDiv.textContent = `EU ${sizeItem.size}`;

            if (!sizeItem.available) {
                sizeDiv.classList.add('disabled');
            } else {
                sizeDiv.addEventListener('click', () => {
                    if (sizeDiv.classList.contains('disabled')) return;

                    document.querySelectorAll('#size-options-container .size-option').forEach(item => {
                        item.classList.remove('active');
                    });

                    sizeDiv.classList.add('active');
                    selectedSize = sizeItem.size;
                    document.getElementById('size-error').style.display = 'none';
                });
            }

            sizeContainer.appendChild(sizeDiv);
        });
    }
    
    // Tải và thiết lập sự kiện chọn màu (nếu có).
    function loadColorOptions(colors) {
        const colorContainer = document.getElementById('color-options-container');
        const currentColorSpan = document.getElementById('current-color');
        
        if (colors && colors.length > 0) {
            const productColorsSection = document.getElementById('product-colors');
            if (productColorsSection) productColorsSection.style.display = 'block';
            
            colorContainer.innerHTML = '';
            
            colors.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.classList.add('color-option');
                colorDiv.style.backgroundColor = color.hex; 
                colorDiv.title = color.name;
                
                if (color.isActive) {
                    colorDiv.classList.add('active');
                    currentColorSpan.textContent = color.name;
                }
                
                colorDiv.addEventListener('click', () => {
                    document.querySelectorAll('#color-options-container .color-option').forEach(item => {
                        item.classList.remove('active');
                    });
                    colorDiv.classList.add('active');
                    currentColorSpan.textContent = color.name;
                });
                
                colorContainer.appendChild(colorDiv);
            });
        }
    }

    // Thiết lập sự kiện cho nút "Thêm vào giỏ hàng", bao gồm kiểm tra chọn size.
    function setupAddToCartButton() {
        const addToCartBtn = document.getElementById('add-to-bag-btn');
        if (!addToCartBtn) return;
        
        addToCartBtn.addEventListener('click', () => {
            if (!selectedSize) {
                document.getElementById('size-error').style.display = 'block';
                return;
            }

            const productName = document.getElementById('product-name').textContent;
            alert(`Đã thêm sản phẩm "${productName}" - Size EU ${selectedSize} vào giỏ hàng!`);
            // TODO: Thêm logic lưu vào LocalStorage/SessionStorage cho Giỏ hàng
        });
    }

    // Cập nhật trạng thái hiển thị của liên kết/dropdown người dùng trên Header.
    function updateHeaderLoginStatus() {
        const userId = getCurrentUserId(); 
        const username = sessionStorage.getItem('loggedInUser'); 
        
        const userLink = document.getElementById('userLink');
        const userIcon = document.getElementById('userIcon');
        const userDropdownContainer = document.getElementById('userDropdownContainer');
        const userNameDisplay = document.getElementById('userNameDisplay');
        const logoutButton = document.getElementById('logoutButton');

        if (userId && username) { 
            // Đã đăng nhập: Ẩn link, hiện dropdown user.
            if (userLink) userLink.style.display = 'none';
            if (userIcon) userIcon.classList.replace('fa-user', 'fa-user-circle'); 
            if (userDropdownContainer) userDropdownContainer.style.display = 'block';
            if (userNameDisplay) userNameDisplay.textContent = username;
        } else {
            // Chưa đăng nhập: Hiện link, ẩn dropdown user.
            if (userLink) userLink.style.display = 'block';
            if (userIcon) userIcon.classList.replace('fa-user-circle', 'fa-user');
            if (userDropdownContainer) userDropdownContainer.style.display = 'none';
        }
        
        // Thiết lập logic Đăng xuất: Xóa dữ liệu phiên và tải lại trang.
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('loggedInUser');
                sessionStorage.removeItem('loggedInUserEmail'); // Xóa ID/Email
                alert('Bạn đã đăng xuất thành công.');
                window.location.reload(); 
            });
        }
    }
    
    // Thiết lập logic cho nút "Yêu thích": Thêm/Xóa sản phẩm khỏi danh sách yêu thích cá nhân.
    function setupFavoriteButton() {
        const favoriteBtn = document.getElementById('favorite-btn');
        if (!favoriteBtn || !currentProduct) return;
        
        // Cập nhật trạng thái nút (Đã thích / Chưa thích).
        function updateFavoriteButtonState() {
            const userId = getCurrentUserId();
            
            if (!userId) {
                // Chưa đăng nhập: hiển thị trạng thái mặc định (chưa thích).
                favoriteBtn.innerHTML = `Yêu thích <i class="fa fa-heart ms-2"></i>`;
                favoriteBtn.classList.remove('btn-light');
                favoriteBtn.classList.add('btn-outline-light');
                return;
            }

            const favorites = getFavoritesByUserId(userId);
            const isFavorite = favorites.some(item => item.id === currentProduct.id);

            // Cập nhật giao diện nút dựa trên trạng thái yêu thích.
            favoriteBtn.classList.toggle('btn-light', isFavorite);
            favoriteBtn.classList.toggle('btn-outline-light', !isFavorite);
            
            favoriteBtn.innerHTML = isFavorite ? 
                `Đã thêm vào Yêu thích <i class="fa fa-heart ms-2 text-danger"></i>` : 
                `Yêu thích <i class="fa fa-heart ms-2"></i>`;
        }

        updateFavoriteButtonState(); // Cập nhật trạng thái ban đầu
        
        favoriteBtn.addEventListener('click', () => {
            const userId = getCurrentUserId(); 
            
            // Kiểm tra đăng nhập trước khi thao tác.
            if (!userId) {
                alert('Vui lòng đăng nhập để thêm sản phẩm vào mục yêu thích.');
                return;
            }
            
            let favorites = getFavoritesByUserId(userId);
            const productID = currentProduct.id;
            const existingIndex = favorites.findIndex(item => item.id === productID);

            if (existingIndex > -1) {
                // Xóa sản phẩm khỏi danh sách (Unfavorite).
                favorites.splice(existingIndex, 1);
                alert(`Đã xóa "${currentProduct.name}" khỏi mục yêu thích.`);
            } else {
                // Thêm sản phẩm vào danh sách.
                const favoriteItem = {
                    id: currentProduct.id,
                    name: currentProduct.name,
                    category: currentProduct.category,
                    gender: currentProduct.gender,
                    price: currentProduct.price,
                    image: currentProduct.images?.[0] 
                };
                favorites.push(favoriteItem);
                alert(`Đã thêm "${currentProduct.name}" vào mục yêu thích.`);
            }

            saveFavoritesByUserId(userId, favorites);
            updateFavoriteButtonState(); // Cập nhật lại nút sau khi thao tác
        });
    }

    // Khởi tạo trang khi DOM đã sẵn sàng
    initializeProductPage();
});