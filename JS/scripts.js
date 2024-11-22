(function () {
    function anadir() {
        if (typeof numAnadidos !== 'undefined') {
            numAnadidos++;
            const anadidosEl = document.getElementById('anadidos');
            if (anadidosEl) {
                anadidosEl.textContent = numAnadidos;
            }
        }
    }
    window.anadir = anadir;

    let tallaSeleccionada = null;

    document.addEventListener("DOMContentLoaded", function () {
        // Con este script se vuelve al principal al hacer click en la cabeza 
        document.querySelector('.cabeza').addEventListener('click', function (event) {
            if (!event.target.closest('a')) {
                window.location.href = 'principal.html';
            }
        });

        // Carrusel
        function moverCarrusel(direccion, carruselId) {
            const carrusel = document.getElementById(carruselId);
            if (!carrusel) {
                console.error(`No se encontró el carrusel con id: ${carruselId}`);
                return;
            }

            const imagenes = carrusel.querySelectorAll('.imagen');
            const totalImagenes = imagenes.length;
            let index = parseInt(carrusel.getAttribute('data-index')) || 0;

            index += direccion;
            if (index < 0) {
                index = totalImagenes - 1;
            } else if (index >= totalImagenes) {
                index = 0;
            }

            carrusel.setAttribute('data-index', index);
            const contenedor = carrusel.querySelector('.carrusel-contenedor');
            if (contenedor) {
                contenedor.style.transform = `translateX(-${index * 100}%)`;
            } else {
                console.error(`No se encontró el contenedor en el carrusel con id: ${carruselId}`);
            }
        }
        window.moverCarrusel = moverCarrusel;

        // guia tallas
        const buttonEl = document.getElementById("guia_tabla");
        const tallasEl = document.getElementById("guia_tabla_interactiva");
        const closeEl = document.getElementById("close");
        if (buttonEl && tallasEl && closeEl) {
            buttonEl.addEventListener("click", () => {
                tallasEl.style.display = "flex";
            });
            closeEl.addEventListener("click", () => {
                tallasEl.style.display = "none";
            });
        }

        // Existing code
        const bloque = document.querySelectorAll('.bloque');
        const pregunta = document.querySelectorAll('.pregunta');
        if (bloque.length && pregunta.length) {
            pregunta.forEach((cadapregunta, i) => {
                pregunta[i].addEventListener('click', () => {
                    bloque.forEach((cadabloque, i) => {
                        bloque[i].classList.remove('activo');
                    });
                    bloque[i].classList.add('activo');
                });
            });
        }


        function seleccionarTalla(talla, event) {
            event.preventDefault();  // Prevenir que el botón cause una acción predeterminada

            // Limpiar la selección de otros botones y radios
            var botones_a_borrar = document.querySelectorAll('button[class="talla_seleccionada"]');
            // var radios_a_borrar = document.querySelectorAll('input[type="radio"]:checked');
            for (var i = 0; i < botones_a_borrar.length; i++) {
                botones_a_borrar[i].classList.remove('talla_seleccionada');
                botones_a_borrar[i].classList.add('talla');
            }

            // Desmarcar todos los radios de talla
            const radios = document.querySelectorAll('input[name="talla"]');
            radios.forEach(radio => {
                radio.checked = false;
            });

            // Marcar el radio correspondiente
            const radioButton = document.getElementById(talla);
            radioButton.checked = true;

            // Agregar la clase "talla_seleccionada" al botón de talla
            const buttonElement = document.getElementById("bt_" + talla);
            if (buttonElement) {
                buttonElement.classList.remove('talla');
                buttonElement.classList.add('talla_seleccionada');
            }
        }

        window.seleccionarTalla = seleccionarTalla;

        // Botones de añadir y quitar cantidad de productos
        function increment() {
            var cantidad = document.getElementById('cantidad');
            cantidad.value = parseInt(cantidad.value) + 1;
        }
        window.increment = increment;

        function decrement() {
            var cantidad = document.getElementById('cantidad');
            if (cantidad.value > 1) {
                cantidad.value = parseInt(cantidad.value) - 1;
            }
        }
        window.decrement = decrement;

        // Carrito de compras

        // Función para agregar productos al carrito
        function addToCart(id, name, price, quantity, talla) {
            // Recuperar el carrito existente del localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Verificar si el producto ya está en el carrito
            let productIndex = cart.findIndex(item => item.id === id);

            if (productIndex !== -1) {
                // Si ya está, incrementar la cantidad
                cart[productIndex].quantity += quantity;
            } else {
                // Si no está, añadir el producto con cantidad 1
                cart.push({ id, name, price, quantity, talla });
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${cart.length}, ${name} ha sido añadido al carrito.`);
        }
        window.addToCart = addToCart;

        function getSelectedTalla() {
            const radios = document.getElementsByName('talla');
            for (const radio of radios) {
                if (radio.checked) {
                    return radio.value;
                }
            }
            return 0; // un valor por defecto si ninguna talla está seleccionada
        }
        window.getSelectedTalla = getSelectedTalla;

        // Mostrar el carrito al cargar la página
        // Función para mostrar el carrito (en cart.html)


        // Función para mostrar el carrito
        function displayCart() {
            // Obtener el carrito desde localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let cartTableBody = document.getElementById('cart-items');
            let totalPriceElement = document.getElementById('total-price');
            let total = 0;

            // Si el carrito está vacío
            if (cart.length === 0) {
                cartTableBody.innerHTML = '<tr><td colspan="4">No hay productos en el carrito.</td></tr>';
                totalPriceElement.innerHTML = '';
                return;
            }

            // Limpiar el contenido actual de la tabla
            cartTableBody.innerHTML = '';

            // Iterar sobre los productos en el carrito y agregar filas a la tabla
            cart.forEach(item => {
                // Calcular el total por producto
                let productTotal = item.price * item.quantity;
                total += productTotal;

                // Crear una fila de tabla por cada producto
                let row = document.createElement('tr');
                row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${productTotal}</td>
      `;
                cartTableBody.appendChild(row);
            });

            // Mostrar el total final
            totalPriceElement.innerHTML = `Total: $${total}`;
        }
        window.displayCart = displayCart;

        function displayResumenPedido() {
            const urlParams = new URLSearchParams(window.location.search);
            displayCart();
            document.getElementById('resumen-nombre').textContent = urlParams.get('nombre') || '';
            document.getElementById('resumen-correo').textContent = urlParams.get('correo_electronico') || '';
            document.getElementById('resumen-direccion').textContent = urlParams.get('direccion') || '';
            document.getElementById('resumen-ciudad').textContent = urlParams.get('ciudad') || '';
            document.getElementById('resumen-codigo-postal').textContent = urlParams.get('codigo_postal') || '';
            document.getElementById('resumen-telefono').textContent = urlParams.get('telefono') || '';
        }
        window.displayResumenPedido = displayResumenPedido;

        function clearCart() {
            localStorage.removeItem('cart');
            alert('El carrito ha sido vaciado.');
            location.reload();
        }
        window.clearCart = clearCart;
    });
})();