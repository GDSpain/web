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
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud Fetch:', error);
                elemento.innerHTML = "<p>Error al cargar el contenido.</p>";
            });
    }

    if (contenedor) {
        cargarContenido('Contenido.html', contenedor);
    } else {
        console.error('No se encontró el contenedor con el ID "contenido".');
    }

    // Guardar la posición de desplazamiento antes de abandonar la página
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('scrollPosition', window.scrollY);
    });

    // Recuperar y aplicar la posición de desplazamiento al cargar la página
    window.addEventListener('load', function() {
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
        }
    });
});
