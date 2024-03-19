// Packages needed
const fs = require('fs');

// Dynamic import for inquirer
import('inquirer').then((inquirer) => {
    // Your code using inquirer goes here
    const { createLogo } = require('./logoGenerator');

    async function promptUser() {
      const userInput = {};

      // Prompt for text
      const { text } = await inquirer.default.prompt({
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters:',
        validate: input => {
          if (input.length > 3) {
            return 'Please enter up to three characters.';
          }
          return true;
        }
      });
      userInput.text = text;

      // Prompt for text color
      const { textColor } = await inquirer.default.prompt({
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (keyword or hexadecimal number):'
      });
      userInput.textColor = textColor;

      // Prompt for shape
      const { shape } = await inquirer.default.prompt({
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square']
      });
      userInput.shape = shape;

      // Prompt for shape color
      const { shapeColor } = await inquirer.default.prompt({
        type: 'input',
        name: 'shapeColor',
        message: `Enter ${shape}'s color (keyword or hexadecimal number):`
      });
      userInput.shapeColor = shapeColor;

      return userInput;
    }

    async function main() {
      const userInput = await promptUser();
      createLogo(userInput);
    }

    main();

    // Jest testing
    module.exports = {
      promptUser
    };
}).catch((error) => {
    // Handle error if inquirer fails to load
    console.error('Error loading inquirer:', error);
});
