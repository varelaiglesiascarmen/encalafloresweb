function visita(sitio) {
    window.location.href = sitio;
}

function anadir() {
    numAnadidos++;
    document.getElementById('anadidos').textContent = numAnadidos;
}

// Carrusel

document.addEventListener("DOMContentLoaded", function () {
    // Función para mover el carrusel
    function moverCarrusel(direccion, carruselId) {
        // Asegurarse de que el carrusel exista en el DOM
        const carrusel = document.getElementById(carruselId);
        if (!carrusel) {
            console.error(`No se encontró el carrusel con id: ${carruselId}`);
            return;
        }

        const imagenes = carrusel.querySelectorAll('.imagen');
        const totalImagenes = imagenes.length;
        let index = parseInt(carrusel.getAttribute('data-index')) || 0; // Obtener el índice actual desde el atributo data

        // Actualizar el índice basado en la dirección (prev o next)
        index += direccion;

        // Si el índice es menor que 0, lo ajustamos a la última imagen
        if (index < 0) {
            index = totalImagenes - 1;
        }
        // Si el índice es mayor o igual al número total de imágenes, lo ajustamos a la primera imagen
        else if (index >= totalImagenes) {
            index = 0;
        }

        // Guardar el nuevo índice
        carrusel.setAttribute('data-index', index);

        // Mover el carrusel con el nuevo índice
        const contenedor = carrusel.querySelector('.carrusel-contenedor');
        if (contenedor) {
            contenedor.style.transform = `translateX(-${index * 100}%)`;
        } else {
            console.error(`No se encontró el contenedor en el carrusel con id: ${carruselId}`);
        }
    }

    // Asigna la función a los botones después de que el DOM haya cargado
    window.moverCarrusel = moverCarrusel;
});


document.addEventListener("DOMContentLoaded", function () {
    // guia tallas
    const buttonEl = document.getElementById("guia_tabla")
    const tallasEl = document.getElementById("guia_tabla_interactiva")
    const closeEl = document.getElementById("close")
    buttonEl.addEventListener("click", (e) => {
        tallasEl.style.display = "flex";
    })

    closeEl.addEventListener("click", (e) => {
        tallasEl.style.display = "none";
    })

    //contador productos
    const decrementButton = document.getElementById('resta');
    const incrementButton = document.getElementById('suma');
    const quantityInput = document.getElementById('cantidad');
    decrementButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) { quantityInput.value = currentValue - 1; }
    });
    incrementButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    function seleccionarTalla(button, talla) {
        // Desmarcar el botón previamente seleccionado
        const botones = document.querySelectorAll('button.talla_seleccion');
        botones.forEach(boton => {
            boton.classList.remove('talla_seleccion');
            boton.classList.add('talla');
        });

        // Marcar el botón seleccionado
        button.classList.remove('talla');
        button.classList.add('talla_seleccion');

        // Seleccionar el radio button correspondiente
        const radioButton = document.getElementById('talla_' + talla);
        radioButton.checked = true;
    }

    window.seleccionarTalla = seleccionarTalla;
});

//acordeon de preguntas frecuentes
const bloque = document.querySelectorAll('.bloque')
const pregunta = document.querySelectorAll('.pregunta')
// cuando haga click en pregunta, quita la clase en todos los bloques y añade la clase.activo al bloque con la posicion de pregunta

pregunta.forEach(cadapregunta, i) => {
    pregunta[i].addEventListener('click', () => {

        bloque.forEach((cadabloque, i) => {
            bloque[i].classList.remove('activo')
        })
        bloque[i].classList.add('activo')
    })
}
