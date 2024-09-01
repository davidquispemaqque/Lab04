const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Datos de ejemplo
const clientes = [
    { id: 1, nombre: 'Cliente 1', edad: 30 },
    { id: 2, nombre: 'Cliente 2', edad: 25 },
    { id: 3, nombre: 'Cliente 3', edad: 40 }
];

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 }
];

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a mi aplicación Express');
});

// Ruta para /clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Ruta para /productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Agregar un nuevo cliente (POST)
app.post('/clientes', (req, res) => {
    const nuevoCliente = { id: clientes.length + 1, ...req.body };
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

// Configuración del puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
