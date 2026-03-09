// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Al hacer clic, abrimos la simulación de pago
    $w('#btnRealizarPedido').onClick(() => {
        wixWindow.openLightbox("VentanaPago"); 
    });
});
