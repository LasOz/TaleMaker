document.fonts.ready.then(() => {
const imageGallery = document.getElementById('imageGallery');
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const textInput1 = document.getElementById('textInput1');
const textInput2 = document.getElementById('textInput2');
const textInput3 = document.getElementById('textInput3');
const addTextButton = document.getElementById('addTextButton');

let startingImage = new Image();
startingImage.src = 'background.png'; // Adjust the path and filename
let headshot = new Image();
headshot.src = 'faces/happy1.png'

function loadImages() {
    const imageNames = ['happy1.png', 'happy2.png', 'wink1.png', 'wink2.png', 'sad1.png', 'sad2.png', 'serious1.png', 'serious2.png']; // List your image filenames here
    imageNames.forEach((imageName) => {
        const img = document.createElement('img');
        img.src = `faces/${imageName}`;
        img.alt = imageName;
        img.classList.add('thumbnail'); // Add a class for styling
        img.addEventListener('click', () => {
            headshot.src = img.src; // Set the selected image as the starting image
            draw();
        });
        imageGallery.appendChild(img); // Add the image to the gallery
    });
}

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        headshot.onload = () => {
            draw();
        };
        headshot.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Function to draw the image and text
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(startingImage, 0, 0); // Draw the starting image
    ctx.fillStyle = 'black';
    ctx.fillRect(5, 5, 283, 70);
    ctx.drawImage(headshot, 5, 5);
    ctx.font = '16.5px UndertaleFont'; // Use your custom font
    ctx.fillStyle = 'white';
    ctx.fillText(textInput1.value, 74, 25); // Draw the text
    ctx.fillText(textInput2.value, 74, 43); // Draw the text
    ctx.fillText(textInput3.value, 74, 61); // Draw the text
    const images = imageGallery.getElementsByTagName("img");
    Array.from(images).forEach((img) => 
    {
        if (img.src === headshot.src)
        {
            img.style.borderColor = "red";
        }
        else
        {
            img.style.borderColor = "black";
        }
    });
}

// Load the starting image when the page loads
startingImage.onload = () => {
    canvas.width = startingImage.width;
    canvas.height = startingImage.height;
    draw(); // Initial draw
};

loadImages();

// Update the canvas with every keystroke
textInput1.addEventListener('input', draw);
textInput2.addEventListener('input', draw);
textInput3.addEventListener('input', draw);
}).catch((error) => {
    console.error('Error loading fonts:', error);
});