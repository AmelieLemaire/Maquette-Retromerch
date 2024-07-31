function showForm(formId) {
    const forms = document.querySelectorAll('.crud-form');
    forms.forEach(form => {
        form.style.display = 'none';
    });
    document.getElementById(formId).style.display = 'flex';
}