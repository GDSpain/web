document.addEventListener("DOMContentLoaded", function() {
    const contenedor = document.getElementById('Contenido');

    function cargarContenido(url, elemento) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la carga del contenido: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                elemento.innerHTML = data;
                // Recuperar y aplicar la posición de desplazamiento después de cargar el nuevo contenido
                const scrollPosition = localStorage.getItem('scrollPosition');
                if (scrollPosition) {
                    window.scrollTo(0, parseInt(scrollPosition, 10));
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud Fetch:', error);
                elemento.innerHTML = "<p>Error al cargar el contenido.</p>";
            });
    }

    if (contenedor) {
        cargarContenido('Contenido.html', contenedor);
    } else {
        console.error('No se encontró el contenedor con el ID "Contenido".');
    }

    // Guardar la posición de desplazamiento antes de abandonar la página
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('scrollPosition', window.scrollY);
    });

    // Añadir manejadores de eventos a los enlaces para cargar contenido dinámicamente
    document.querySelectorAll('a').forEach(enlace => {
        enlace.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.getAttribute('href');
            if (contenedor) {
                // Guardar la posición de desplazamiento antes de cargar el nuevo contenido
                localStorage.setItem('scrollPosition', window.scrollY);
                cargarContenido(url, contenedor);
                // Actualizar la URL sin recargar la página
                window.history.pushState({ path: url }, '', url);
            }
        });
    });

    // Manejar el evento popstate para la navegación del historial
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.path) {
            cargarContenido(event.state.path, contenedor);
        }
    });

    // Recuperar y aplicar la posición de desplazamiento al cargar la página
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
    }
});
