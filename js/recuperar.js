function setLoading(isLoading) {
    const btn = document.getElementById('recoveryBtn');
    if (!btn) return;
    const text = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.loading-spinner');
    if (isLoading) {
        btn.disabled = true;
        if (text) text.style.display = 'none';
        if (spinner) spinner.style.display = 'block';
    } else {
        btn.disabled = false;
        if (text) text.style.display = 'inline';
        if (spinner) spinner.style.display = 'none';
    }
}

function showError(message) {
    const el = document.getElementById('errorMessage');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
}

function clearError() {
    const el = document.getElementById('errorMessage');
    if (!el) return;
    el.textContent = '';
    el.classList.remove('show');
}

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function openSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'block';
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'none';
}

function redirectToLogin() {
    window.location.href = '/index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recoveryForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearError();

        const correo = document.getElementById('correoElectronico')?.value || '';
        if (!correo.trim()) {
            showError('Por favor ingresa tu correo electrónico.');
            return;
        }
        if (!isValidEmail(correo)) {
            showError('El correo electrónico no es válido.');
            return;
        }

        setLoading(true);
        try {
            // TODO: Replace with real API call to request password reset
            await new Promise((res) => setTimeout(res, 1200));
            openSuccessModal();
        } catch (err) {
            showError('Ocurrió un error al procesar la solicitud. Inténtalo nuevamente.');
        } finally {
            setLoading(false);
        }
    });

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('successModal');
        if (event.target === modal) closeSuccessModal();
    });
});
