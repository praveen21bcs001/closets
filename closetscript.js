// Store the selected items
let selectedShirt = null;
let selectedPants = null;

// Predefined good outfit combinations
const outfitSuggestions = {
    'Red Shirt': ['Brown Pants', 'Green Pants'],
    'Blue Shirt': ['Brown Pants']
};

// Track carousel indexes
let currentIndex = {
    shirtCarousel: 0,
    pantsCarousel: 0
};

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addItemForm');
    const itemNameInput = document.getElementById('itemName');
    const itemTypeSelect = document.getElementById('itemType');
    const itemImageInput = document.getElementById('itemImage');

    const shirtCarousel = document.getElementById('shirtCarousel').querySelector('.items');
    const pantsCarousel = document.getElementById('pantsCarousel').querySelector('.items');

    // Handle form submission for new clothes
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const itemName = itemNameInput.value;
        const itemType = itemTypeSelect.value;
        const itemImage = itemImageInput.value;

        if (!itemImage.startsWith('http')) {
            alert('Please enter a valid image URL.');
            return;
        }

        // Add new item to the carousel
        addItemToCarousel(itemName, itemType, itemImage);
        form.reset();
    });

    // Add event listeners to pre-existing items
    initializeExistingItems();
});

// Function to add an item to the carousel (new clothes)
function addItemToCarousel(itemName, itemType, itemImage) {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = `
        <img src="${itemImage}" alt="${itemName}">
        <p>${itemName}</p>
        <button onclick="selectItem('${itemType}', '${itemName}', '${itemImage}')">Select</button>
    `;

    const carousel = document.getElementById(`${itemType}Carousel`).querySelector('.items');
    carousel.appendChild(newItem);
}

// Function to initialize event listeners for existing items
function initializeExistingItems() {
    const shirts = document.querySelectorAll('#shirtCarousel .item button');
    const pants = document.querySelectorAll('#pantsCarousel .item button');

    shirts.forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            const imgSrc = parent.querySelector('img').src;
            const name = parent.querySelector('p').textContent;
            selectItem('shirt', name, imgSrc);
        });
    });

    pants.forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            const imgSrc = parent.querySelector('img').src;
            const name = parent.querySelector('p').textContent;
            selectItem('pants', name, imgSrc);
        });
    });
}

// Function to select an item and update previews
function selectItem(type, itemName, itemImage) {
    const shirtPreview = document.getElementById('shirtPreview');
    const pantsPreview = document.getElementById('pantsPreview');

    if (type === 'shirt') {
        selectedShirt = itemName;
        document.getElementById('selected-shirt').textContent = itemName;
        shirtPreview.src = itemImage;
        shirtPreview.alt = itemName;
    } else if (type === 'pants') {
        selectedPants = itemName;
        document.getElementById('selected-pants').textContent = itemName;
        pantsPreview.src = itemImage;
        pantsPreview.alt = itemName;
    }

    suggestOutfit();
}

// Function to suggest an outfit based on selections
function suggestOutfit() {
    const suggestionText = document.getElementById('suggestion');

    if (selectedShirt && selectedPants) {
        const possiblePants = outfitSuggestions[selectedShirt];

        if (possiblePants && possiblePants.includes(selectedPants)) {
            suggestionText.textContent = `Great choice! The ${selectedShirt} and ${selectedPants} make a good pair.`;
        } else {
            suggestionText.textContent = `Hmm, the ${selectedShirt} and ${selectedPants} might not be the best match. Try something else!`;
        }
    }
}

// Carousel navigation functions
function prevItem(carouselId) {
    const carousel = document.getElementById(carouselId).querySelector('.items');
    if (currentIndex[carouselId] > 0) {
        currentIndex[carouselId]--;
        updateCarouselPosition(carousel, currentIndex[carouselId]);
    }
}

function nextItem(carouselId) {
    const carousel = document.getElementById(carouselId).querySelector('.items');
    const itemCount = carousel.children.length;
    if (currentIndex[carouselId] < itemCount - 1) {
        currentIndex[carouselId]++;
        updateCarouselPosition(carousel, currentIndex[carouselId]);
    }
}

// Function to update the carousel position
function updateCarouselPosition(carousel, index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}
