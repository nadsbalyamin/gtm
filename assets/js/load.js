// Track when the load event is completed
let loadEventCompleted = false;
let tfJsLoaded = false; // Indicates TensorFlow.js has loaded
let tmImageLoaded = false; // Indicates Teachable Machine Image model has loaded
let minTimeElapsed = false;

// Function to check conditions and show content
function showContentIfReady() {
    if (loadEventCompleted && tfJsLoaded && tmImageLoaded && minTimeElapsed) {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';

        // const content = document.getElementById('content');
        // content.style.display = 'block';

        // const webcambt = document.getElementById('webcamButton');
        // webcambt.style.display = 'show';
        // const uploadbt = document.getElementById('uploadButton');
        // uploadbt.style.display = 'show';
        // const resetbt = document.getElementById('resetButton');
        // resetbt.style.display = 'show';
    }
}

// Listen for the window load event
window.addEventListener('load', function() {
    loadEventCompleted = true;
    checkLibrariesLoaded(); // Check if TensorFlow.js and TM are loaded
    showContentIfReady();
});

// Function to periodically check if TensorFlow.js and Teachable Machine are loaded
function checkLibrariesLoaded() {
    if (typeof tf !== 'undefined' && !tfJsLoaded) {
        tfJsLoaded = true;
        // Now check for Teachable Machine
        checkTmImageLoaded();
    } else if (!tfJsLoaded) {
        // Retry checking TensorFlow.js after a short delay
        setTimeout(checkLibrariesLoaded, 100);
    }
}

// Function to periodically check if Teachable Machine Image model has loaded
function checkTmImageLoaded() {
    if (typeof tmImage !== 'undefined') {
        tmImageLoaded = true;
        showContentIfReady();
    } else {
        // Retry checking Teachable Machine after a short delay
        setTimeout(checkTmImageLoaded, 100);
    }
}

// Ensure the loader is displayed for at least 5 seconds
setTimeout(function() {
    minTimeElapsed = true;
    showContentIfReady();
}, 0); // 5000 milliseconds = 5 seconds
