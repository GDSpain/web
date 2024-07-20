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
}); 
