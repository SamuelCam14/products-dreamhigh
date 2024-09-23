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

// Función para renumerar los IDs de los productos
function renumberProductIds(products) {
    return products.map((product, index) => ({
        ...product,
        id: index + 1  // Los nuevos IDs comienzan desde 1
    }));
}

// Ruta al archivo JSON de productos reordenados
const reorderedProductsFilePath = path.join(__dirname, 'products.json');

// Leer los productos reordenados
const reorderedProducts = readJSONFile(reorderedProductsFilePath);

if (reorderedProducts) {
    // Renumerar los IDs de los productos
    const renumberedProducts = renumberProductIds(reorderedProducts);

    // Guardar los productos con IDs renumerados en un nuevo archivo
    const outputFilePath = path.join(__dirname, 'renumbered_products.json');
    writeJSONFile(outputFilePath, renumberedProducts);
}