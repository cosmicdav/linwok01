import wixWindow from 'wix-window';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
    $w.onReady(function () {
    console.log("¡La página de pago cargó correctamente!");

    $w('#btnTarjeta').onClick(() => {
        console.log("Hiciste clic en el botón de Tarjeta");
        wixWindow.openLightbox("VentanaTarjeta");
    });
});
    // 1. Botón de Tarjeta: Abre la ventana y espera el resultado
    $w('#btnTarjeta').onClick(() => {
        wixWindow.openLightbox("VentanaTarjeta")
            .then((resultado) => {
                // Si la ventana mandó "PAGO_OK", guardamos el pedido
                if (resultado === "PAGO_OK") {
                    registrarPedido("Tarjeta (Validada)");
                }
            });
    });

    // 2. Botón de Contra Entrega: Guarda directo
    $w('#btnEntrega').onClick(() => {
        registrarPedido("Pago contra entrega");
    });
});

function registrarPedido(metodo) {
    let datosPedido = {
        "title": "Pedido LinWok Bistro",
        "total": "RD$ 1,500.00",
        "estado": "Pendiente",
        "metodoPago": metodo
    };

    wixData.insert("Orders", datosPedido)
        .then(() => {
            $w('#textoExito').text = "¡Pedido confirmado! Método: " + metodo;
            $w('#textoExito').show();

            setTimeout(() => {
                wixLocation.to("/inicio"); 
            }, 3000);
        })
        .catch((err) => {
            console.error("Error al guardar: ", err);
        });
}
