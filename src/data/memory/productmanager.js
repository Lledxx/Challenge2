class ProductManager {
    static products = [];

    create(data) {
        const product = {
            id: ProductManager.products.length === 0
                ? 1
                : ProductManager.products[ProductManager.products.length - 1].id + 1,
            title: data.title,
            photo: data.photo,
            price: parseFloat(data.price),
            stock: parseFloat(data.stock),
        };
        ProductManager.products.push(product);
        return product;
    }

    read() {
        return ProductManager.products;
    }

    readOne(productId) {
        const product = ProductManager.products.find(p => p.id === productId);
        return product || null;
    }
}


const products = new ProductManager();

products.create({
    title: "el producto estrella 1",
    photo: "otra foto",
    price: "10",
    stock: "100",
});

products.create({
    title: "el producto estrella 2",
    photo: "otra foto2",
    price: "10",
    stock: "100",
});
//console log de products
console.log(ProductManager.products)

//console log de read products
const allProducts = products.read();
console.log("Todos los productos:", allProducts);

//console log de productIdtoRead
const productIdToRead = 1; 
const specificProduct = products.readOne(productIdToRead);
console.log("Producto específico:", specificProduct);