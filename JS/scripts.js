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
  





        // function displayCart() {
        //     let cart = JSON.parse(localStorage.getItem('cart')) || [];
        //     let cartContainer = document.getElementById('cart-items');
        //     let total = 0;
        //     cartContainer.innerHTML = "<p>" + cart.length + " productos en el carrito.</p>";
        //     // Si el carrito está vacío
        //     if (cart.length === 0) {
        //         cartContainer.innerHTML = "<h2>Carrito vacío</h2>";
        //         return;
        //     }

        //     // Mostrar los productos del carrito
        //     cartContainer.innerHTML += `
        //         <table class='factura'>
        //             <thead>
        //                 <tr>
        //                     <th>Producto</th>
        //                     <th>Talla</th>
        //                     <th>Precio</th>
        //                     <th>Cantidad</th>
        //                     <th>Precio Total</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //     `;

        //     let cartHTML = '';
        //     cart.forEach(item => {
        //         const itemTotal = item.price * item.quantity;
        //         cartHTML += `
        //             <tr>
        //                 <td class='fila'>${item.name}</td>
        //                 <td class='fila'>${item.talla}</td>
        //                 <td class='fila'>${item.price} €</td>
        //                 <td class='fila'>${item.quantity}</td>
        //                 <td class='fila'>${itemTotal} €</td>
        //             </tr>
        //         `;
        //         total += itemTotal;
        //     });
        //     cartContainer.innerHTML += cartHTML;

        //     cartContainer.innerHTML += `
        //             </tbody>
        //         </table>
        //     `;

        //     // Mostrar el total
        //     cartContainer.innerHTML += `<h3>Total: ${total} €</h3>`;
        // }

        window.displayCart = displayCart;

        function clearCart() {
            localStorage.removeItem('cart');
            alert('El carrito ha sido vaciado.');
            location.reload();
        }
        window.clearCart = clearCart;
    });
})();