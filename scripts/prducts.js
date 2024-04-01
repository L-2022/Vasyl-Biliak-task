const PRODUCTS_CONTAINER_ELEMENT = document.querySelector('.product-cards');
const loadingOverlay = document.querySelector('.loading-overlay__spinner');
let products = [];

function showLoadingOverlay() {
    loadingOverlay.style.display = 'block';
}

function hideLoadingOverlay() {
    loadingOverlay.style.display = 'none';
}

function createProductCardElement(product) {
    const { title, price, description, images } = product;

    const productTemplateStr = `
        <div class="product-card">
            <div class="product-card__image-container">
            <img class="product-card__img" src="https://placehold.co/600x400">
            </div>
            <div class="product-card__info">
                <h2 class="product-card__title">${title}</h2>
                <p class="product-card__price">$${price}</p>
                <p class="product-card__description">${description}</p>
            </div>
        </div>
    `;

    return productTemplateStr;
}

function clearProductsContainer(container) {
    if (!container) return;
    container.innerHTML = '';
}

function renderProductCards(container, products) {
    clearProductsContainer(container);
    if (products.length) {
        products.forEach((product) => {
            const productCard = createProductCardElement(product);
            container.appendChild(document.createRange().createContextualFragment(productCard));
        });
    } else {
        const nothingFoundMessage = '<div style="font-weight: bold; margin-top: 25px; font-size: 25px;">No products found</div>';
        container.appendChild(document.createRange().createContextualFragment(nothingFoundMessage));
    }
}

async function fetchProducts() {
    try {
        showLoadingOverlay();
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        products = Array.isArray(data) ? data.slice(0, 50) : [];
        renderProductCards(PRODUCTS_CONTAINER_ELEMENT, products);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        hideLoadingOverlay();
    }
}

async function initProducts() {
    await fetchProducts();
}

document.addEventListener('DOMContentLoaded', initProducts);
