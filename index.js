const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Datos de ejemplo para clientes y productos
let clientes = [
    { id: 1, nombre: 'Cliente 1', edad: 30 },
    { id: 2, nombre: 'Cliente 2', edad: 25 },
    { id: 3, nombre: 'Cliente 3', edad: 40 }
];

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 }
];

// Rutas para /clientes

// Obtener todos los clientes (GET)
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Agregar un nuevo cliente (POST)
app.post('/clientes', (req, res) => {
    const nuevoCliente = {
        id: clientes.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad
    };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Actualizar un cliente existente (PUT)
app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);

    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

    cliente.nombre = req.body.nombre || cliente.nombre;
    cliente.edad = req.body.edad || cliente.edad;

    res.json(cliente);
});

// Eliminar un cliente (DELETE)
app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) return res.status(404).json({ message: 'Cliente no encontrado' });

    clientes.splice(index, 1);
    res.status(204).send();
});

// Rutas para /productos

// Obtener todos los productos (GET)
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Agregar un nuevo producto (POST)
app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Actualizar un producto existente (PUT)
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;

    res.json(producto);
});

// Eliminar un producto (DELETE)
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' });

    productos.splice(index, 1);
    res.status(204).send();
});

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a mi aplicación Express');
});

// Configuración del puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
