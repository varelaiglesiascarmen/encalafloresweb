(function() {
    function visita(sitio) {
        window.location.href = sitio;
    }
    window.visita = visita;

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

        // function seleccionarTalla(talla, event) {
        //     event.preventDefault();  // Prevenir que el botón cause una acción predeterminada
        
        //     // Limpiar selección de otros botones
        //     var botones_a_borrar = document.querySelectorAll('button[class="talla_seleccionada"]');
        //     for (var i = 0; i < botones_a_borrar.length; i++) {
        //         botones_a_borrar[i].classList.remove('talla_seleccionada');
        //         botones_a_borrar[i].classList.add('talla');
        //     }
        
        //     // Agregar la clase "talla_seleccionada" al botón que se ha clickeado
        //     const element = document.getElementById("bt_" + talla);
        //     if (element) {
        //         element.classList.remove('talla');
        //         element.classList.add('talla_seleccionada');
        //     }
        // }

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

            // for (var i = 0; i < radios_a_borrar.length; i++) {
            //     radios_a_borrar[i].checked = false;  // Desmarcar los radios
            // }
        
            // // Marcar el radio correspondiente como seleccionado
            // const radioElement = document.getElementById(talla);
            // if (radioElement) {
            //     radioElement.checked = true;
            // }
        
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

        
    });

    // document.addEventListener("DOMContentLoaded", function () {
    //     const bloque = document.querySelectorAll('.bloque');
    //     const pregunta = document.querySelectorAll('.pregunta');
    //     if (bloque.length && pregunta.length) {
    //         pregunta.forEach((cadapregunta, i) => {
    //             pregunta[i].addEventListener('click', () => {
    //                 bloque.forEach((cadabloque, i) => {
    //                     bloque[i].classList.remove('activo');
    //                 });
    //                 bloque[i].classList.add('activo');
    //             });
    //         });
    //     }
    // });
})();