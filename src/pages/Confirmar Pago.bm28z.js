import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
    // Configuración para el botón de Tarjeta
    $w('#btnTarjeta').onClick(() => {
        registrarPedido("Tarjeta de Crédito/Débito");
    });

    // Configuración para el botón de Contra Entrega
    $w('#btnEntrega').onClick(() => {
        registrarPedido("Pago contra entrega");
    });
});

function registrarPedido(metodo) {
    let datosPedido = {
        "title": "Pedido LinWok",
        "total": "RD$ 1,500.00", 
        "estado": "Pendiente",
        "metodoPago": metodo
    };

    wixData.insert("Pedidos", datosPedido)
        .then(() => {
            $w('#textoExito').text = "¡Pedido realizado con éxito!";
            $w('#textoExito').show();
            
            // Opcional: Mandarlos a la página de inicio después de 3 segundos
            setTimeout(() => {
                wixLocation.to("/inicio"); 
            }, 3000);
        })
        .catch((err) => {
            console.error("Error al guardar: " + err);
        });
}
