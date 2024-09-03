const fs = require('fs');
const path = require('path');

// Función para leer el archivo JSON
function readJSONFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error al leer el archivo: ${error.message}`);
        return null;
    }
}

// Función para escribir el archivo JSON
function writeJSONFile(filePath, data) {
    try {
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonString, 'utf8');
        console.log('Archivo guardado exitosamente.');
    } catch (error) {
        console.error(`Error al escribir el archivo: ${error.message}`);
    }
}

// Función para reordenar los productos
function reorderProducts(products, order) {
    const productMap = new Map(products.map(product => [product.id, product]));
    return order.map(id => productMap.get(id)).filter(Boolean);
}

// Ruta al archivo JSON de productos
const productsFilePath = path.join(__dirname, 'products.json');

// Leer los productos
const products = readJSONFile(productsFilePath);

if (products) {
    // Definir el nuevo orden (ajusta esto según tus necesidades)
    const newOrder = [26, 23, 22, 28, 30, 31, 20, 19, 21, 27, 29, 2, 18, 17, 16, 24, 1, 25, 8, 15, 9, 4, 7, 5, 3, 10, 11, 13, 12, 14]; // Añade más IDs según sea necesario

    // Reordenar los productos
    const reorderedProducts = reorderProducts(products, newOrder);

    // Guardar los productos reordenados en un nuevo archivo
    const outputFilePath = path.join(__dirname, 'reordered_products.json');
    writeJSONFile(outputFilePath, reorderedProducts);
}