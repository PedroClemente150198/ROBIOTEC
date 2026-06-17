
// Manejo del Formulario de Contacto

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            empresa: document.getElementById('empresa').value,
            asunto: document.getElementById('asunto').value,
            mensaje: document.getElementById('mensaje').value,
            fecha: new Date().toLocaleString('es-ES')
        };

        try {
            // Validar datos
            if (!formData.nombre || !formData.email || !formData.mensaje) {
                showMessage('Por favor completa todos los campos requeridos', 'error');
                return;
            }

            // En producción, aquí irías a un backend
            // Por ahora simularemos el envío
            console.log('Datos del formulario:', formData);

            // Simular envío exitoso
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mostrar mensaje de éxito
            showMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.', 'success');

            // Limpiar formulario
            contactForm.reset();

            // Opcionalmente, redirigir después de 2 segundos
            setTimeout(() => {
                // window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            showMessage('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
        }
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

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