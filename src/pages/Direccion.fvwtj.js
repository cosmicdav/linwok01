import { cart } from 'wix-stores';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Al darle al botón rojo de ACEPTAR
    $w('#buttonAceptar').onClick(async () => {
        try {
            // 1. Obtenemos el contenido actual del carrito
            const currentCart = await cart.getCurrentCart();
            
            // 2. Si hay productos, los eliminamos uno por uno para vaciarlo
            if (currentCart.lineItems.length > 0) {
                const removePromises = currentCart.lineItems.map(item => cart.removeProduct(item.id));
                await Promise.all(removePromises);
                console.log("Carrito vaciado con éxito");
            }

            // 3. Cerramos la ventana y avisamos a la página principal que todo salió bien
            wixWindow.lightbox.close("PEDIDO_FINALIZADO");
            
        } catch (error) {
            console.error("Error al limpiar el carrito:", error);
            wixWindow.lightbox.close();
        }
    });
});
