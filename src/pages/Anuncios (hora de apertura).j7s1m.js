import wixWindow from 'wix-window';

$w.onReady(function () {
    // Cuando el usuario termina de poner sus datos y da clic
    $w('#btnFinalizarTarjeta').onClick(() => {
        // Cerramos la ventana y mandamos la señal de "PAGO_OK" a la página principal
        wixWindow.lightbox.close("PAGO_OK");
    });
});
