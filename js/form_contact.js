
console.log('Hola desde JS');


function sumar (a, b) {
    return a + b;
}

console.log('La suma de 2 y 3 es:', sumar(2, 3));

const sumarArrow = (a,b) => a + b;

console.log('La suma de 5 y 7 es:', sumarArrow(5, 7));

function saludar (nombre){
    return `Hola, ${nombre}! Bienvenido a ROBIOTEC.`;
}

console.log(saludar('Pedro'));

const saludarArrow = nombre => `Hola, ${nombre}! Bienvenido a ROBIOTEC.`;

console.log(saludarArrow('Ana'));

function obtenrObjeto (){
    return {
        nombre: 'ROBIOTEC',
        ubicacion: 'Madrid',
        empleados: 50
    }
}
console.log(obtenrObjeto());

const obtenrObjetoArrow = () => ({
    nombre: 'ROBIOTEC',
    ubicacion: 'Madrid',
    empleados: 50
});

console.log(obtenrObjetoArrow());


[1,2].map(function (x) {
    return x * 2;
});

console.log([1,2].map(x => x * 2));

console.log([12, 42].map(x => x * 2));

setTimeout(() => {
    console.log('Esto se muestra después de 2 segundos');
}, 2000);


const user = {
    name: 'Pedro',
    puesto: 'Desarrollador',
    lenguajes: ['JavaScript', 'Python', 'C++'],
}

const { name, puesto, lenguajes } = user;

console.log('Nombre:', name);
console.log('Puesto:', puesto);
console.log('Lenguajes:', lenguajes);
console.log(`Hola ${name}, tu puesto es ${puesto} y conoces los siguientes lenguajes: ${lenguajes.join(', ')}.`);


const colores = ["Rojo", "Verde", "Azul", "Amarillo"];

// --- TU TURNO: Extrae el primero y el tercero ---
const [primero, , tercero] = colores;
console.log(`Mis favoritos son el ${primero} y el ${tercero}.`);


const getReport = ({ title, stats: [views, clicks] }) => {
    return `Reporte: ${title.toUpperCase()}
    - Vistas: ${views}
    - Clicks: ${clicks}
    - Ratio: ${((clicks / views) * 100).toFixed(1)}%`;
};

const data = {
    title: "Ventas Q2",
    stats: [1200, 350]
};

console.log(getReport(data));

const usuarios = {
    1: { name: 'Pedro', age: 30 },
    2: { name: 'Ana', age: 25 },
    3: { name: 'Luis', age: 28 }
};

const copiaUsuarios = { ...usuarios };

console.log('Usuarios originales:', usuarios);
console.log('Copia de usuarios:', copiaUsuarios);

const nuevoUsuario = { name: 'Maria', age: 22 };
const usuariosActualizados = { ...usuarios, 4: nuevoUsuario };

console.log('Usuarios actualizados:', usuariosActualizados);


const config = {
    host: 'localhost',
    port: 8080,
    protocol: 'http'
}

const configActualizada = { ...config, host: '192.168.1.1', port: 3000 , ssl: true };

console.log('Config original:', config);
console.log('Config actualizada:', configActualizada);

/**
 * Estado global de la aplicación.
 * @typedef {Object} Presupuesto
 * @property {Array<{nombre: string, monto: number}>} gastos
 * @property {number} total
 */

const presupuesto = {
    gastos: [],
    total: 0,
}

const actividad = document.getElementById('name');
const costo = document.getElementById('amount');
const agregarBtn = document.getElementById('addExpense');
const totalMostrar = document.getElementById('totalAmount');

let listaGastos = document.getElementById('expenseList');

const render = () => {
    listaGastos.innerHTML = '';
    presupuesto.gastos.forEach(gasto => {
        const li = document.createElement('li');
        li.textContent = `${gasto.actividad}: $${gasto.costo}`;
        listaGastos.appendChild(li);
    });
}

agregarBtn.addEventListener('click', () => {
    const nuevaActividad = actividad.value;
    const nuevoCosto = parseFloat(costo.value);

    if (nuevaActividad && !isNaN(nuevoCosto)) {
        const nuevoGasto = { actividad: nuevaActividad, costo: nuevoCosto };
        presupuesto.gastos = [...presupuesto.gastos, nuevoGasto];
        presupuesto.total += nuevoCosto;
        render();
        actividad.value = '';
        costo.value = '';
    } else {
        alert('Por favor, ingresa una actividad y un costo válido.');
    }
    console.log('Presupuesto actualizado:', presupuesto.total);
    totalMostrar.textContent = `$${presupuesto.total}`;
});

console.log(config);

console.log(Object.keys(config));
console.log(Object.values(config));
console.log(Object.entries(config));


const configu = { api: "url", keys: { public: "123", secret: "abc" } };

const configCopiada = { ...configu, keys: { ...configu.keys } };

console.log('Config original:', configu);
console.log('Config copiada:', configCopiada);

configu.keys.public = "456";

let inventario = [
    { id: 1, nombre: "Laptop", stock: 5, precio: 800 },
    { id: 2, nombre: "Mouse", stock: 20, precio: 20 }
];

const agregarProducto = (producto) => inventario = [...inventario, { ...producto, id: Date.now()}];

const obtenerProductos = () => inventario;

const actualizaStock = (id, nuevoStock) => inventario = inventario.map(producto => producto.id === id ? { ...producto, stock: nuevoStock } : producto);

const eliminarProducto = (id) => inventario = inventario.filter(producto => producto.id !== id);

console.log('Inventario inicial:', obtenerProductos());

agregarProducto({ nombre: "Teclado", stock: 15, precio: 50 });
console.log('Inventario después de agregar:', obtenerProductos());

actualizaStock(inventario[0].id, 3);
console.log('Inventario después de actualizar stock:', obtenerProductos());

eliminarProducto(inventario[1].id);
console.log('Inventario después de eliminar:', obtenerProductos());

const miPromesa = new Promise((resolve, reject) => {
    const exito = true;
    setTimeout(() => {
    exito ? resolve("¡Datos recibidos!") : reject("Error de conexión");
    }, 5000);
});

miPromesa.then(resultado => console.log(resultado)) // Se ejecuta si se resolvió
    .catch(error => console.error(error))      // Se ejecuta si hubo error
    .finally(() => console.log("Operación finalizada")); // Siempre se ejecuta


const probarAPI = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const endpoint = await response.json();
        
        console.log(response.status);
    } catch (error) {
        console.error(error);
    }
};
probarAPI();