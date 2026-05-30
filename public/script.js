async function enviar() {
    const inputPregunta = document.getElementById("pregunta");
    const preguntaText = inputPregunta.value.trim();

    // Validación: Si el usuario no escribe nada, se acaba la función
    if (preguntaText === "") return; 

    const chatContainer = document.getElementById("chat");

    // Mostrar la pregunta del usuario en la pantalla
    chatContainer.innerHTML += `
        <div class="message user">${preguntaText}</div>
    `;
    
    inputPregunta.value = "";
    
    // Scroll automático hacia abajo para ver el mensaje que acaba de salir
    chatContainer.scrollTop = chatContainer.scrollHeight;

    agregarAlHistorial(preguntaText);

    try {
        // Enviar los datos al backend 
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pregunta: preguntaText })
        });

        const data = await response.json();

        chatContainer.innerHTML += `
            <div class="message bot">${data.respuesta}</div>
        `;

    } catch (error) {
        console.error("Error en la petición:", error);
        chatContainer.innerHTML += `
            <div class="message bot" style="color: #dc2626;">
                No se pudo conectar con el servidor.
            </div>
        `;
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// El evento de los botones de Preguntas sugeridas
function preguntaRapida(btn) {
    document.getElementById("pregunta").value = btn.innerText;
    enviar(); 
}

// Actualiza de forma dinámica la barra lateral izquierda
function agregarAlHistorial(texto) {
    const historial = document.getElementById("historial");
    
    // Corta el texto si pasa de 25 caracteres
    const tituloCorto = texto.length > 25 ? texto.substring(0, 22) + "..." : texto;
    
    historial.innerHTML = `
        <div class="history-item" onclick="reutilizarPregunta('${texto.replace(/'/g, "\\'")}')">
            ${tituloCorto}
        </div>
    ` + historial.innerHTML;
}

function nuevoChat() {
    document.getElementById("chat").innerHTML = `
        <div class="message bot">¡Chat reiniciado! ¿En qué otra cosa del Estatuto puedo ayudarte?</div>
    `;
}

function detectarEnter(event) {
    if (event.key === "Enter") {
        enviar();
    }
}

// Si se hace clic en un elemento del historial, se vuelve a escribir en el input
function reutilizarPregunta(textoOriginal) {
    document.getElementById("pregunta").value = textoOriginal;
}