document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const noProductsMessage = document.getElementById('no-products-message');
    const addProductForm = document.getElementById('add-product-form');

    async function loadProducts() {
        const products = await fetchProducts();
        productsContainer.innerHTML = '';
        if (products.length === 0) {
            noProductsMessage.style.display = 'block';
        } else {
            noProductsMessage.style.display = 'none';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('card');
                productCard.innerHTML = `
                    <div class="image-container">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="delete-button" data-id="${product.id}">🗑️</button>
                `;
                productsContainer.appendChild(productCard);
            });
        }
    }

    productsContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {
            const productId = event.target.getAttribute('data-id');
            await deleteProduct(productId);
            loadProducts();
        }
    });

    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const image = document.getElementById('product-image').value;

        const newProduct = {
            name,
            price,
            image
        };

        await addProduct(newProduct);
        addProductForm.reset();
        loadProducts();
    });

    async function addDefaultProducts() {
        const defaultProducts = [
            { name: 'Mujer con sombrilla', price: 220, image: 'images/mujer_con_sombrilla.jpg' },
            { name: 'Impresión, sol naciente', price: 320, image: 'images/impresion_sol_naciente.jpg' },
            { name: 'Nenúfares', price: 250, image: 'images/nenufares.jpg' }
        ];

        const existingProducts = await fetchProducts();
        if (existingProducts.length === 0) {
            for (const product of defaultProducts) {
                await addProduct(product);
            }
        }
        loadProducts();
    }

    addDefaultProducts();
});
