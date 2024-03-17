# Solid Waste AI

This project utilizes Google Teachable Machine to identify solid waste items.

## Introduction

Solid waste management is an important aspect of environmental sustainability. With the advancement in artificial intelligence, it is now possible to automate the process of identifying different types of solid waste items. This project leverages Google Teachable Machine, a web-based tool for training machine learning models, to create a solid waste identification system.

## How it Works

1. Data Collection: Gather a diverse set of images representing different types of solid waste items such as plastic bottles, paper, glass, etc.

2. Training the Model: Use Google Teachable Machine to train a machine learning model using the collected images. The model will learn to classify the images into different categories based on the type of solid waste.

3. Testing and Evaluation: Evaluate the trained model by testing it with new images of solid waste items. Measure the accuracy and performance of the model.

4. Integration: Integrate the trained model into an application or system that can identify solid waste items in real-time.

## Benefits

- Efficient Solid Waste Management: By automating the identification process, the system can help in efficiently managing solid waste by sorting it into different categories.

- Environmental Impact: Proper management of solid waste is crucial for minimizing its impact on the environment. The AI-powered system can contribute to better waste management practices.

- Education and Awareness: The project can be used as an educational tool to raise awareness about solid waste management and encourage responsible waste disposal.

## Conclusion

Solid Waste AI using Google Teachable Machine offers a promising solution for automating the identification of solid waste items. By leveraging machine learning, this project can contribute to efficient waste management practices and environmental sustainability.

## Setup

To run this project, you need to have the following:

1. Clone the repository:

```bash
git clone https://github.com/nadsbalyamin/gtm/
```

2. Open the `index.html` file in your web browser.

## Update or Download the Model

If you want to update the model with new images or retrain it with different categories, you can use Google Teachable Machine to create a new model and replace the existing model files in the `model` directory.

Then go to your working directory and run the following command:
```ps1
cd model
```

Download the new model files from Google Teachable Machine and replace the existing files:
```ps1
wget -O model.json https://teachablemachine.withgoogle.com/models/o2sXRpv64/model.json
wget -O metadata.json https://teachablemachine.withgoogle.com/models/o2sXRpv64/metadata.json
wget -O model.weights.bin https://teachablemachine.withgoogle.com/models/o2sXRpv64/model.weights.bin
```

Also update offline scripts:

```ps1
cd assets/js
```

Download the lastest GTM for offline use:
```ps1
wget -O teachablemachine-image.min.js https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js
```