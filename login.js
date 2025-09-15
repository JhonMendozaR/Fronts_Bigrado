// Configuración de la API
const API_BASE_URL = 'http://localhost:8080/api';

// Variables globales
let isLoading = false;

// Función para alternar visibilidad de contraseña
function togglePassword() {
    const passwordInput = document.getElementById('clave');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

// Función para mostrar mensajes de error
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        hideError();
    }, 5000);
}

// Función para ocultar mensajes de error
function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.classList.remove('show');
}

// Función para mostrar loading
function showLoading() {
    isLoading = true;
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const spinner = loginBtn.querySelector('.loading-spinner');
    
    loginBtn.disabled = true;
    btnText.style.display = 'none';
    spinner.style.display = 'block';
}

// Función para ocultar loading
function hideLoading() {
    isLoading = false;
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const spinner = loginBtn.querySelector('.loading-spinner');
    
    loginBtn.disabled = false;
    btnText.style.display = 'inline';
    spinner.style.display = 'none';
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar formulario
function validateForm(formData) {
    const errors = [];
    
    if (!formData.correoElectronico.trim()) {
        errors.push('El correo electrónico es requerido');
    } else if (!isValidEmail(formData.correoElectronico)) {
        errors.push('El formato del correo electrónico no es válido');
    }
    
    if (!formData.clave.trim()) {
        errors.push('La contraseña es requerida');
    } else if (formData.clave.length < 3) {
        errors.push('La contraseña debe tener al menos 3 caracteres');
    }
    
    return errors;
}

// Función para realizar login
async function performLogin(loginData) {
    try {
        const response = await fetch(`${API_BASE_URL}/usuario/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Credenciales incorrectas');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else {
                throw new Error(`Error HTTP: ${response.status}`);
            }
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error en login:', error);
        
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            throw new Error('No se puede conectar con el servidor. Verifique que el backend esté ejecutándose.');
        }
        
        throw error;
    }
}

// Función para mostrar modal de éxito
function showSuccessModal(userData) {
    const modal = document.getElementById('successModal');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    const userName = userData.nombres ? `${userData.nombres} ${userData.apellidos}` : userData.correoElectronico;
    welcomeMessage.textContent = `¡Bienvenido, ${userName}!`;
    
    modal.style.display = 'block';
    
    // Auto-redirect después de 3 segundos
    setTimeout(() => {
        redirectToDashboard();
    }, 3000);
}

// Función para redireccionar al dashboard
function redirectToDashboard() {
    // Aquí puedes redireccionar a la página principal de tu aplicación
    // Por ahora, simplemente recargamos la página o redirigimos a una página de bienvenida
    window.location.href = '/dashboard.html'; // Cambia esto por tu página principal
}

// Función para guardar datos de usuario en localStorage
function saveUserSession(userData) {
    const userSession = {
        idUsuario: userData.idUsuario,
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        correoElectronico: userData.correoElectronico,
        idRol: userData.idRol,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('userSession', JSON.stringify(userSession));
}

// Event listener para el formulario
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Ocultar error al escribir en los inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', hideError);
    });
    
    // Envío del formulario
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isLoading) return;
        
        hideError();
        
        // Obtener datos del formulario
        const formData = {
            correoElectronico: document.getElementById('correoElectronico').value.trim(),
            clave: document.getElementById('clave').value
        };
        
        // Validar formulario
        const validationErrors = validateForm(formData);
        if (validationErrors.length > 0) {
            showError(validationErrors.join('. '));
            return;
        }
        
        // Mostrar loading
        showLoading();
        
        try {
            // Realizar login
            const response = await performLogin(formData);
            
            if (response.success) {
                // Guardar sesión
                saveUserSession(response.usuario);
                
                // Mostrar modal de éxito
                showSuccessModal(response.usuario);
            } else {
                showError(response.message || 'Error de autenticación');
            }
            
        } catch (error) {
            showError(error.message || 'Error inesperado durante el login');
        } finally {
            hideLoading();
        }
    });
    
    // Cerrar modal al hacer clic fuera de él
    const modal = document.getElementById('successModal');
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Focus en el primer input
    document.getElementById('correoElectronico').focus();
});

// Función para verificar si hay sesión activa
function checkExistingSession() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
        try {
            const sessionData = JSON.parse(userSession);
            const loginTime = new Date(sessionData.loginTime);
            const now = new Date();
            const hoursDifference = (now - loginTime) / (1000 * 60 * 60);
            
            // Si la sesión tiene menos de 24 horas, redireccionar
            if (hoursDifference < 24) {
                redirectToDashboard();
            } else {
                // Limpiar sesión expirada
                localStorage.removeItem('userSession');
            }
        } catch (error) {
            // Limpiar sesión corrupta
            localStorage.removeItem('userSession');
        }
    }
}

// Verificar sesión al cargar la página
checkExistingSession();

// Funciones de utilidad adicionales
window.togglePassword = togglePassword;
window.redirectToDashboard = redirectToDashboard;