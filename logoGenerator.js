const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

async function promptUser(inquirer) {
  const userInput = {};

  // Prompt for text
  const { text } = await inquirer.prompt({
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
  const { textColor } = await inquirer.prompt({
    type: 'input',
    name: 'textColor',
    message: 'Enter text color (keyword or hexadecimal number):'
  });
  userInput.textColor = textColor;

  // Prompt for shape
  const { shape } = await inquirer.prompt({
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['circle', 'triangle', 'square']
  });
  userInput.shape = shape;

  // Prompt for shape color
  const { shapeColor } = await inquirer.prompt({
    type: 'input',
    name: 'shapeColor',
    message: `Enter ${shape}'s color (keyword or hexadecimal number):`
  });
  userInput.shapeColor = shapeColor;

  return userInput;
}

function createLogo(userInput) {
  const { text, textColor, shape, shapeColor } = userInput;

  let shapeObject;

  switch (shape) {
    case 'circle':
      shapeObject = new Circle(shapeColor, textColor, text);
      break;
    case 'triangle':
      shapeObject = new Triangle(shapeColor, textColor, text);
      break;
    case 'square':
      shapeObject = new Square(shapeColor, textColor, text);
      break;
    default:
      throw new Error('Invalid shape specified.');
  }

  const svgContent = shapeObject.render();

  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
}

module.exports = {
  promptUser,
  createLogo
};
