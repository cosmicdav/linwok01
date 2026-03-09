import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
    // Al presionar pagar con tarjeta
    $w('#btnTarjeta').onClick(() => {
        procesarPedido("Tarjeta de Crédito/Débito");
    });

    // Al presionar pago contra entrega
    $w('#btnEntrega').onClick(() => {
        procesarPedido("Pago contra entrega");
    });
});

function procesarPedido(metodoElegido) {
    // Definimos los datos según el esquema SQL de tu Sección 3.7
    let nuevoPedido = {
        "title": "Pedido LinWok Bistro", // [cite: 9, 156]
        "total": "RD$ 1,500.00", // Valor de prueba [cite: 261]
        "estado": "Pendiente", // Para el módulo KDS [cite: 41, 156]
        "metodoPago": metodoElegido 
    };

    // Guardamos en la colección "Pedidos" [cite: 156, 172]
    wixData.insert("Orders", nuevoPedido)
        .then(() => {
            $w('#textoExito').text = "¡Pedido confirmado con éxito! Método: " + metodoElegido;
            $w('#textoExito').show();

            // Redirigir al inicio después de 3 segundos para que vean el mensaje
            setTimeout(() => {
                wixLocation.to("/inicio"); 
            }, 3000);
        })
        .catch((err) => {
            console.error("Error al procesar el pedido: ", err);
        });
}
