import wixUsers from 'wix-users';
import wixData from 'wix-data';

$w.onReady(function () {
    // 1. Verificamos si el usuario ya inició sesión
    if (wixUsers.currentUser.loggedIn) {
        
        const usuario = wixUsers.currentUser;
        
        usuario.getEmail()
            .then((email) => {
                // 2. Buscamos en TU tabla usando el ID EXACTO: "RestauranteDb"
                wixData.query("RestauranteDb")
                    .eq("email", email) 
                    .find()
                    .then((resultados) => {
                        
                        // 3. Si no encontramos ese email, ¡lo guardamos!
                        if (resultados.items.length === 0) {
                            console.log("Usuario nuevo. Guardando...");
                            guardarUsuario(email);
                        } else {
                            console.log("El usuario ya existe.");
                        }
                    })
                    .catch((err) => {
                        console.log("Error buscando usuario: " + err);
                    });
            });
    }
});

function guardarUsuario(email) {
    
    let nuevoUsuario = {
        // OJO: En tu imagen, la columna "Nombre" tiene una banderita que dice "Primario".
        // En Wix, la columna Primaria SIEMPRE se llama "title" en el código.
        "title": "Usuario Web", 
        
        // Tus otras columnas (basado en tus fotos):
        "email": email,
        "telefono": "", // Lo dejamos vacío por ahora
        "passwordHash": "LoginExterno" // Texto de relleno
    };

    wixData.insert("RestauranteDb", nuevoUsuario)
        .then((resultado) => {
            console.log("¡Guardado exitoso!", resultado);
        })
        .catch((error) => {
            console.error("Falló el guardado:", error);
        });
}