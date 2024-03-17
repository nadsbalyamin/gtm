let model, imageSource, imageContainer, labelContainer, maxPredictions;

// Load the image model and setup the image source
async function setupModelAndPredict() {
  if (!model) {
    model = await localModel();
  }
  maxPredictions = model.getTotalClasses();

  imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = ''; // Clear existing content
  imageContainer.appendChild(imageSource.canvas || imageSource); // canvas or img element

  labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = ''; // Prepare label container

  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function predict() {
  // Predict can take in an image, video, or canvas HTML element
  const prediction = await model.predict(imageSource.canvas || imageSource);
  displayPredictions(prediction);
}

function displayPredictions(prediction) {
  let highestPredictionIndex = 0;
  let highestPredictionValue = 0;

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction = prediction[i].className + ": " + Math.round(prediction[i].probability * 100) + "%";
    const labelContainerChild = labelContainer.childNodes[i];
    labelContainerChild.innerHTML = classPrediction;

    // Set unique color for each label
    const hue = (i * (360 / maxPredictions)) % 360;
    labelContainerChild.style.color = `hsl(${hue}, 80%, 50%)`;
    labelContainerChild.style.backgroundColor = `hsla(${hue}, 50%, 50%, ${prediction[i].probability})`;

    // Find the highest prediction
    if (prediction[i].probability > highestPredictionValue) {
      highestPredictionIndex = i;
      highestPredictionValue = prediction[i].probability;
    }
  }

  highlightHighestPrediction(highestPredictionIndex);
}

function highlightHighestPrediction(highestPredictionIndex) {
  // Highlight the label with the highest prediction
  const highestPredictionLabel = labelContainer.childNodes[highestPredictionIndex];
  highestPredictionLabel.style.fontWeight = "bold";
  highestPredictionLabel.style.color = "#ffffff"; // Set font color to white
  highestPredictionLabel.style.backgroundColor = "#000000"; // Set background color to black

  // Reset other labels to default style
  for (let i = 0; i < maxPredictions; i++) {
    const labelContainerChild = labelContainer.childNodes[i];
    if (labelContainerChild !== highestPredictionLabel) {
      labelContainerChild.style.backgroundColor = `hsla(${(i * (360 / maxPredictions)) % 360}, 50%, 50%, 1)`;
      labelContainerChild.style.color = "#000000"; // Set font color to black
      labelContainerChild.style.fontWeight = "";
    }
  }
}

async function loop() {
  if (imageSource instanceof tmImage.Webcam) { // Check if the source is webcam
    imageSource.update(); // update the webcam frame
    await predict(); // Separated prediction logic into its own function
    window.requestAnimationFrame(loop); // Continue the loop only for webcam
  }
}

// Function to set up the webcam
async function useWebcam() {
  imageSource = new tmImage.Webcam(400, 400, true); // width, height, flip
  await imageSource.setup(); // request access to the webcam
  await imageSource.play();
  await setupModelAndPredict();
  window.requestAnimationFrame(loop); // Start prediction loop for webcam

}

// Function to trigger the file input dialog
function triggerFileUpload() {
  document.getElementById('fileInput').click(); // Trigger file input
}

// Function to handle the file upload
async function handleFileUpload(input) {
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async (event) => {
    if (!model) {
      model = await localModel();
    }
    imageSource = document.createElement('img');
    imageSource.src = event.target.result;
    imageSource.onload = async () => {
      await setupModelAndPredict(); // Setup for prediction
      await predict(); // Predict for the uploaded image
    };
  }
}

function reset() {
  // stop the image source if it's a webcam
  if (imageSource instanceof tmImage.Webcam) {
    imageSource.stop();
  }

  // clear the image and label containers
  imageContainer.innerHTML = "";
  labelContainer.innerHTML = "";
}

document.addEventListener('DOMContentLoaded', (event) => {
  setupModelAndPredict();
});