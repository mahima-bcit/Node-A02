const form = document.getElementById('contact_form');
const responseArea = document.getElementById('form_response');

function renderMessage(type, text) {
    const cls = type === 'success' ? 'success-message' : 'error-message';
    responseArea.innerHTML = `<div class="${cls}">${text}</div>`;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const body = new URLSearchParams(formData);

    try {
        const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body,
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            renderMessage('error', data?.message || 'Something went wrong.');
            return;
        }

        renderMessage('success', data?.message || 'Message sent!');
        form.reset();
    } catch (err) {
        console.error(err);
        renderMessage('error', 'Network error. Please try again.');
    }
});