// Original source:
const modelURL = "https://teachablemachine.withgoogle.com/models/o2sXRpv64/";
const updateURL = "https://github.com/nadsbalyamin/gtm/?tab=readme-ov-file#update-or-download-the-model";

// Fetch the local model
async function localModel() {
  try {
    // Path to the local model files
    const modelFile = "model/model.json";
    const metadataFile = "model/metadata.json";
    // const weightsFile = "model/model.weights.bin";

    // Check if local model files exist
    const modelExists = await checkFileExists(modelFile);
    const metadataExists = await checkFileExists(metadataFile);
    // const weightsExists = await checkFileExists(weightsFile);

    if (modelExists && metadataExists //&& weightsExists
      ) {
      // Load the local model
      const model = await tmImage.load(modelFile, metadataFile);
      console.log("Model, metadata, and weights exist.");
      return model;

    } else {
      // Ask the user if they want to download the models
      const downloadChoice = confirm("Do you want to fetch the model online? If not, you will be redirected to the README.md for instructions.");

      if (downloadChoice) {
        // If the user chooses to fetch, attempt to fetch the model online
        alert("Attempting to fetch the model online...");

        // Fetch the model online. Example using TensorFlow.js:
        const modelFile = modelURL + "model.json";
        const metadataFile = modelURL + "metadata.json";
        // const weightsFile = modelURL + "model.weights.bin";
        const model = await tmImage.load(modelFile, metadataFile);
        console.log("Model fetched online.");
        return model;
      } else {
        // If the user chooses to download, redirect to README.md for instructions
        window.location.href = updateURL;
      }

      // Return null to indicate that the model is either being fetched or the user is being redirected
      return null;
    }
  } catch (error) {
    console.error("Error loading local model:", error);
  }
}

// Check if a file exists
async function checkFileExists(file) {
  try {
    const response = await fetch(file);
    return response.ok;
  } catch (error) {
    console.error("Error checking file existence:", error);
    return false;
  }
}