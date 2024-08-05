document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.game-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const categoryTitle = document.querySelector('.category-title');
    const totalCards = 28;
    const cardsPerPage = 28;

    function createCard(title, description) {
        return `
            <div class="game">
                <img src="image.png" alt="Jeu">
                <h3><a href="fiche-produit.html" class="fiche-produit">${title}</a></h3>
                <p>${description}</p>
            </div>
        `;
    }

    function generateCards() {
        let cards = [];
        for (let i = 1; i <= totalCards; i++) {
            cards.push(createCard(`Jeu ${i}`, `Description du jeu ${i}`));
        }
        return cards;
    }

    const allCards = generateCards();

    function displayCards(section, cards, page = 1) {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const paginatedCards = cards.slice(startIndex, endIndex).join('');
        section.querySelector('.game-grid').innerHTML = paginatedCards;
    }

    function setupPagination(section, totalCards) {
        const totalPages = Math.ceil(totalCards / cardsPerPage);
        let currentPage = 1;

        function renderPagination() {
            let paginationHtml = `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">Prev</button>`;
            for (let i = 1; i <= totalPages; i++) {
                paginationHtml += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            }
            paginationHtml += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">Next</button>`;
            section.querySelector('.pagination').innerHTML = paginationHtml;

            section.querySelectorAll('.pagination-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const page = parseInt(btn.getAttribute('data-page'), 10);
                    if (page > 0 && page <= totalPages) {
                        currentPage = page;
                        displayCards(section, allCards, page);
                        renderPagination();
                    }
                });
            });
        }

        renderPagination();
    }

    function generateSection(section) {
        displayCards(section, allCards, 1);
        setupPagination(section, allCards.length);
    }

    sections.forEach(generateSection);

    // Initialisation de la première section
    document.querySelector('.game-section').classList.add('active');

    // Gestion de la navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Changer le titre de la catégorie
            const category = link.getAttribute('data-category');
            categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

            // Masquer toutes les sections
            sections.forEach(section => section.classList.remove('active'));

            // Afficher la section correspondante
            const targetSection = document.querySelector('.game-section');
            targetSection.classList.add('active');
        });
    });
});