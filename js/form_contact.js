
// Manejo del Formulario de Contacto - Versión Profesional

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const mensajeField = document.getElementById('mensaje');
    const charCount = document.getElementById('charCount');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        contactForm.addEventListener('input', handleFormInput);
    }

    // Contador de caracteres
    if (mensajeField) {
        mensajeField.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = Math.min(count, 500);
            if (count > 500) {
                this.value = this.value.substring(0, 500);
            }
        });
    }

    function handleFormInput(e) {
        const field = e.target;
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA' || field.tagName === 'SELECT') {
            // Limpiar error cuando el usuario comienza a escribir
            if (field.parentElement.classList.contains('error')) {
                field.parentElement.classList.remove('error');
            }
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        // Validar formulario
        if (!validateForm()) {
            showMessage('Por favor completa todos los campos requeridos', 'error');
            return;
        }

        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            empresa: document.getElementById('empresa').value.trim(),
            asunto: document.getElementById('asunto').value,
            mensaje: document.getElementById('mensaje').value.trim(),
            fecha: new Date().toLocaleString('es-ES'),
            privacidad: document.getElementById('privacidad').checked
        };

        try {
            // Validaciones adicionales
            if (!isValidEmail(formData.email)) {
                showMessage('Por favor ingresa un email válido', 'error');
                return;
            }

            if (formData.mensaje.length < 10) {
                showMessage('El mensaje debe tener al menos 10 caracteres', 'error');
                return;
            }

            if (!formData.privacidad) {
                showMessage('Debes aceptar la política de privacidad', 'error');
                return;
            }

            console.log('Datos del formulario:', formData);

            // Deshabilitar botón mientras se envía
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            // Simular envío
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mostrar mensaje de éxito
            showMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto dentro de 24 horas.', 'success');

            // Limpiar formulario
            contactForm.reset();
            charCount.textContent = '0';

            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            showMessage('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
        }
    }

    function validateForm() {
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        const privacidad = document.getElementById('privacidad').checked;

        let isValid = true;

        // Validar nombre
        if (!nombre) {
            markFieldError(document.getElementById('nombre'));
            isValid = false;
        }

        // Validar email
        if (!email) {
            markFieldError(document.getElementById('email'));
            isValid = false;
        }

        // Validar asunto
        if (!asunto) {
            markFieldError(document.getElementById('asunto'));
            isValid = false;
        }

        // Validar mensaje
        if (!mensaje) {
            markFieldError(document.getElementById('mensaje'));
            isValid = false;
        }

        // Validar privacidad
        if (!privacidad) {
            markFieldError(document.getElementById('privacidad'));
            isValid = false;
        }

        return isValid;
    }

    function markFieldError(field) {
        const formGroup = field.parentElement;
        formGroup.classList.add('error');
        
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            if (field.type === 'checkbox') {
                errorMsg.textContent = 'Debes aceptar la política de privacidad';
            } else if (field.id === 'email') {
                errorMsg.textContent = 'Email es requerido';
            } else if (field.id === 'mensaje') {
                errorMsg.textContent = 'El mensaje es requerido';
            } else {
                errorMsg.textContent = `${field.previousElementSibling?.textContent || 'Este campo'} es requerido`;
            }
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Scroll al mensaje
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-ocultar después de 6 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 6000);
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