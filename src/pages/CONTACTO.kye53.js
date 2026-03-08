import wixData from 'wix-data';

$w.onReady(function () {
    // 1. Ocultamos el texto de éxito al principio (Asegúrate de que su ID sea text1)
    $w('#text1').hide();

    // 2. Evento del botón de enviar (Asegúrate de que su ID sea button1)
    $w('#button1').onClick(() => {
        
        // Verificamos que Email (input2) y Mensaje (textbox) no estén vacíos
        // OJO: Revisa si tu caja de mensaje se llama "textbox" o "textBox1" (con B mayúscula), Wix es estricto con eso.
        if($w('#input2').value === "" || $w('#textbox').value === "") {
            console.log("Faltan datos obligatorios");
            return; 
        }

        // 3. Recogemos los datos usando TUS IDs
        let nuevoMensaje = {
            "title": $w('#input3').value,      // Nombre
            "email": $w('#input2').value,      // Email
            "telefono": $w('#input1').value,   // Teléfono
            "mensaje": $w('#textbox').value    // Mensaje
        };

        // 4. Guardamos en la base de datos "Mensajes"
        wixData.insert("Mensajes", nuevoMensaje)
            .then((resultado) => {
                // 5. Mostramos el mensaje de éxito
                $w('#text1').text = "¡Su mensaje fue enviado con éxito!";
                $w('#text1').show();

                // 6. Limpiamos las cajas para que queden en blanco
                $w('#input3').value = "";
                $w('#input2').value = "";
                $w('#input1').value = "";
                $w('#textbox').value = "";

                // Ocultamos el mensaje de éxito después de 5 segundos
                setTimeout(() => {
                    $w('#text1').hide();
                }, 5000);
            })
            .catch((error) => {
                console.error("Hubo un error al guardar el mensaje:", error);
                $w('#text1').text = "Hubo un error, intente de nuevo.";
                $w('#text1').show();
            });
    });
});
