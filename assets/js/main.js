let model, imageSource, imageContainer, labelContainer, maxPredictions;

// Load the image model and setup the image source
async function setupModelAndPredict() {
  if (!model) {
    model = await localModel();
  }
  maxPredictions = model.getTotalClasses();

  imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = ''; // Clear existing content
  imageContainer.appendChild(imageSource.canvas || imageSource); // Append the source

  labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = ''; // Prepare label container
  // Only one label is necessary
  labelContainer.appendChild(document.createElement("div"));
}

async function predict() {
  const prediction = await model.predict(imageSource.canvas || imageSource);
  displayPredictions(prediction);
}

function displayPredictions(prediction) {
  let highestPrediction = prediction[0];
  for (let i = 1; i < maxPredictions; i++) {
    if (prediction[i].probability > highestPrediction.probability) {
      highestPrediction = prediction[i];
    }
  }

  // Display only the highest prediction
  const classPrediction = highestPrediction.className + ": " + Math.round(highestPrediction.probability * 100) + "%";
  labelContainer.firstChild.innerHTML = classPrediction;
  labelContainer.firstChild.style.fontWeight = "bold";
  labelContainer.firstChild.style.color = "#ffffff"; // White text for visibility
  labelContainer.firstChild.style.backgroundColor = "#000000"; // Black background for contrast
}

async function loop() {
  if (imageSource instanceof tmImage.Webcam) { // Check if the source is webcam
    imageSource.update(); // update the webcam frame
    await predict(); // Separated prediction logic into its own function
    window.requestAnimationFrame(loop); // Continue the loop only for webcam
  }
}

async function useFlip() {
  if (imageSource instanceof tmImage.Webcam) {
    const imageContainer = document.getElementById('image-container');
    // Check if the container already has the 'flipped' class
    if (imageContainer.classList.contains('flipped')) {
        imageContainer.classList.remove('flipped'); // Remove the flipped class if it exists
    } else {
        imageContainer.classList.add('flipped'); // Add the flipped class if it does not exist
    }
  }
}

async function useWebcam() {
  imageSource = new tmImage.Webcam(400, 400, true); // width, height, flip
  await imageSource.setup(); // request access to the webcam
  await imageSource.play();
  await setupModelAndPredict();
  window.requestAnimationFrame(loop); // Start prediction loop for webcam
}

function triggerFileUpload() {
  document.getElementById('fileInput').click(); // Trigger file input
}

async function handleFileUpload(input) {
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    if (!model) {
      model = await localModel();
    }
    imageSource = document.createElement('img');
    imageSource.src = reader.result;
    imageSource.onload = async () => {
      await setupModelAndPredict(); // Setup for prediction
      await predict(); // Predict for the uploaded image
    };
  }
}

function reset() {
  if (imageSource instanceof tmImage.Webcam) {
    imageSource.stop();
  }
  imageContainer.innerHTML = "";
  labelContainer.innerHTML = "";
}

// document.addEventListener('DOMContentLoaded', () => {
//   setupModelAndPredict();
// });

// $('.switch input').on('change', function(){
//   var dad = $(this).parent();
//   if($(this).is(':checked'))
//     dad.addClass('switch-checked');
//   else
//     dad.removeClass('switch-checked');
// });
