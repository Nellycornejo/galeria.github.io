const apiUrl = 'http://localhost:3000/products';

async function fetchProducts() {
    const response = await fetch(apiUrl);
    return response.json();
}

async function addProduct(product) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return response.json();
}

async function deleteProduct(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
}
