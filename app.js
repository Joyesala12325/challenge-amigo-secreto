// Array principal donde se guardan los amigos.
// Cada elemento será un objeto con dos propiedades: { nombre: "Juan", sorteado: false }
let amigos = [];

// Cuando la página carga, se agrega un evento para que el usuario
// pueda presionar "Enter" dentro del campo de texto y añadir un amigo.
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("amigo");
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") agregarAmigo();
    });
});

// Función para agregar un nuevo amigo a la lista
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim(); 

    // Validar entrada: si está vacío, mostrar alerta
    if (nombre === "") {
        alert("⚠️ Por favor ingresa un nombre válido.");
        return;
    }

    // Validar duplicados: no permitir que se repita un nombre ya agregado para evitar que se genere confuciones al realizar el sorteo
    const existe = amigos.some(a => a.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
        alert("⚠️ Ese nombre ya fue agregado.");
        input.value = "";
        input.focus();
        return;
    }

    // Agregar el nuevo amigo como objeto dentro del array
    // "sorteado: false" significa que aún no ha sido seleccionado en el sorteo
    amigos.push({ nombre: nombre, sorteado: false });

    // Mostrar la lista actualizada en pantalla
    mostrarLista();

    // Limpiar y enfocar el campo de entrada
    input.value = "";
    input.focus();
}

// Función para mostrar en pantalla la lista de amigos agregados
function mostrarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; 

    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo.nombre;

        // Si el amigo ya fue sorteado, se marca con un estilo especial (tachado) ver el css.
        if (amigo.sorteado) {
            li.classList.add("sorteado");
        }

        // Se agrega cada amigo como un <li> dentro de la lista
        lista.appendChild(li);
    });
}

// Función para sortear un amigo secreto al azar
function sortearAmigo() {
    const resultado = document.getElementById("resultado");

    // Filtrar los amigos que aún no han sido sorteados
    const disponibles = amigos.filter(amigo => !amigo.sorteado);

    // Validar si ya no quedan amigos disponibles
    if (disponibles.length === 0) {
        alert("⚠️ Ya no hay más amigos disponibles para sortear.");
        resultado.innerHTML = "✨ Todos los amigos ya han sido sorteados. 🎉";
        return;
    }

    // Seleccionar un índice aleatorio de la lista de disponibles
    const indice = Math.floor(Math.random() * disponibles.length);
    const elegido = disponibles[indice];

    // Mostrar en pantalla el resultado del sorteo
    resultado.innerHTML = `🎁 Tu amigo secreto es: <strong>${elegido.nombre}</strong>`;

    // Marcar al amigo como sorteado para que no vuelva a salir
    elegido.sorteado = true;

    // Actualizar la lista en pantalla tachando el nombre sorteado
    mostrarLista();

    // Si todos los amigos ya fueron sorteados, mostrar mensaje de cierre
    if (amigos.every(a => a.sorteado)) {
        resultado.innerHTML += "<br><br>✨ ¡Todos los amigos ya han sido sorteados! 🎉";
    }
}

//FIN