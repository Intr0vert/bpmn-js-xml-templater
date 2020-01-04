const xmlTemplate = require("./");

let template = new xmlTemplate();

let firstShape = template.addShape(80, 100, 100, 150, "First element");
let secondShape = template.addShape(80, 100, 350, 150, "Second element");
let thirdShape = template.addShape(80, 100, 560, 350, "Third element");
let fourthShape = template.addShape(80, 100, 560, 150, "Fourth element");

template.connect(firstShape, secondShape);
template.connect(secondShape, thirdShape);
template.connect(thirdShape, fourthShape);

console.log(template.xml);