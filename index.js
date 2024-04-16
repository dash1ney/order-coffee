const addButton = document.querySelector(".add-button");
const form = document.querySelector("form");

let beverageCount = 1;

addButton.addEventListener("click", () => {
    beverageCount++;

    const beverageFields = document.querySelectorAll(".beverage")[0];
    const clonedFields = beverageFields.cloneNode(true);

    const milkElements = clonedFields.querySelectorAll('input[type="radio"][name="milk1"]');

    milkElements.forEach(element => {
        element.setAttribute('name', `milk${beverageCount}`);
    });


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

selectedDrink = { "cacao": "Какао", "espresso": "Эспрессо", "capuccino": "Капучино"};
milkType = { "обычном молоке": "обычное молоко",
    "обезжиренном молоке": "обезжиренное молоко",
    "соевом молоке": "соевое молоко",
    "кокосовом молоке": "кокосовое молоко",
};
extras = { "взбитых сливок": "взбитые сливки",
    "зефирок": "зефирки",
    "шоколад": "шоколад",
    "корицу": "корица"
}

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const openButton = document.querySelector('.submit-button');
    const lightboxButtons = document.querySelectorAll('.lightboxButton');
    const overlay = document.getElementById('overlay');
    const closeButton = document.querySelector('.close-img');
    const infoMenu = document.getElementById('info-menu');
    const table = document.getElementById('drinkTable');

    openButton.addEventListener('click', (event) => {
        let drinksData = getDataFromForm()
        let count = drinksData.length;
        let word_count = getBeverageDeclension(count);
        infoMenu.textContent = `Вы заказали ${count} ${word_count}`;
        table.innerHTML = "<tr><th>Напиток</th><th>Молоко</th><th>Добавки</th></tr>";
        drinksData.forEach(drink => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            cell1.textContent = selectedDrink[drink.selectedDrink];
            cell2.textContent = milkType[drink.milkType];
            cell3.textContent = drink.extras.map(element => extras[element]).join(', ');
        });
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


    function getDataFromForm() {
        let data = [];
        document.querySelectorAll('.beverage').forEach(beverageElement => {
            const selectedDrink = beverageElement.querySelector('select').value;

            let milkType = '';
            beverageElement.querySelectorAll('input[name="milk"]').forEach(input => {
                if (input.checked) {
                    milkType = input.nextElementSibling.innerText;
                }
            });

            const extras = [];
            beverageElement.querySelectorAll('input[name="options"]:checked').forEach(input => {
                extras.push(input.nextElementSibling.innerText);
            });

            data.push({
                selectedDrink: selectedDrink,
                milkType: milkType,
                extras: extras
            });
        });

        return data;
    }
});


function getBeverageDeclension(num) {
    if (num % 10 === 1 && num % 100 !== 11) {
        return "напиток";
    } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
        return "напитка";
    } else {
        return "напитков";
    }
}