const addButton = document.querySelector(".add-button");
const form = document.querySelector("form");

let beverageCount = 1;

addButton.addEventListener("click", () => {
    beverageCount++;

    const beverageFields = document.querySelectorAll(".beverage")[0];
    const clonedFields = beverageFields.cloneNode(true);

    const clonedBeverageCount = clonedFields.querySelector(".beverage-count");
    clonedBeverageCount.textContent = `Напиток №${beverageCount}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete-button");

    clonedFields.insertBefore(deleteButton, clonedBeverageCount);

    form.insertBefore(clonedFields, addButton.parentNode);

    deleteButton.addEventListener("click", () => {
        clonedFields.remove();
        beverageCount--;
        updateBeverageCounts();
    });

    function updateBeverageCounts() {
        const beverageContainers = document.querySelectorAll(".beverage .beverage-count");
        beverageContainers.forEach((container, index) => {
            container.textContent = `Напиток №${index + 1}`;
        });
    }
});

const lightbox = document.getElementById('lightbox');
const openButton = document.querySelector('.submit-button');
const lightboxButtons = document.querySelectorAll('.lightboxButton');
const overlay = document.getElementById('overlay');
const closeButton = document.querySelector('.close-img');

openButton.addEventListener('click', (event) => {
    event.preventDefault();
    lightbox.style.display = 'flex';
    overlay.style.display = 'block';
});

lightboxButtons.forEach(lightboxButtonElement => {
    lightboxButtonElement.addEventListener('click', () => {
        lightbox.style.display = 'none';
        overlay.style.display = 'none';
    });
});

closeButton.addEventListener("click", function() {
    lightbox.style.display = 'none';
    overlay.style.display = 'none';
});