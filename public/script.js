//LOGUEARSE CON GOOGLE
function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	// Enviar el token al servidor para verificar la autenticación
    // ...
}