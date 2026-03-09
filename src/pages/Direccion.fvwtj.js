import { cart } from 'wix-stores';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Al hacer clic en el botón ACEPTAR de la ventana de dirección
    $w('#buttonAceptar').onClick(async () => {
        try {
            // 1. Obtenemos el carrito actual
            const currentCart = await cart.getCurrentCart();
            
            // 2. Si el carrito tiene productos, los borramos todos
            if (currentCart.lineItems.length > 0) {
                const removePromises = currentCart.lineItems.map(item => cart.removeProduct(item.id));
                await Promise.all(removePromises);
                console.log("Carrito vaciado correctamente");
            }

            // 3. Cerramos la ventana emergente
            wixWindow.lightbox.close();

            // 4. Redirigimos a la página de confirmación
            // Nota: Asegúrate de que el enlace (URL) sea /confirmacion-de-pedido
            wixLocation.to("general-5"); 

        } catch (error) {
            console.error("Error en el proceso final:", error);
            // Si hay error, al menos cerramos la ventana
            wixWindow.lightbox.close();
        }
    });
});
