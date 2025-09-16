// Cargar información del usuario
document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
});

function loadUserInfo() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
        try {
            const userData = JSON.parse(userSession);
            const userName = `${userData.nombres} ${userData.apellidos}`;
            const userEmail = userData.correoElectronico;
            
            document.getElementById('userName').textContent = userName;
            document.getElementById('userRole').textContent = userEmail;
        } catch (error) {
            console.error('Error al cargar información del usuario:', error);
            redirectToLogin();
        }
    } else {
        redirectToLogin();
    }
}

function logout() {
    // Limpiar sesión
    localStorage.removeItem('userSession');
    
    // Redireccionar al login
    redirectToLogin();
}

function redirectToLogin() {
    window.location.href = '/index.html';
}