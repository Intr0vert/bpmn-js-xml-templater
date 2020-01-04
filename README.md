# bpmn-js-xml-templater

Basic templater for [bpmn-js](https://github.com/bpmn-io/bpmn-js)

## Getting Started

For create a bpmn template you need to make few simple steps.

## Installation

This will add bpmn-js-xml-templater in your project

```bash
npm i bpmn-js-xml-templater
```

Then import it to your file

```javascript
const xmlTemplate = require("bpmn-js-xml-templater");
```

Now you have a templater in your project!

## Usage

### Create few shapes

```javascript
let template = new xmlTemplate();

let firstShape = template.addShape(80, 100, 100, 150, "First element");
let secondShape = template.addShape(80, 100, 350, 150, "Second element");
let thirdShape = template.addShape(80, 100, 560, 350, "Third element");
let fourthShape = template.addShape(80, 100, 560, 150, "Fourth element");
```

### Then connect them

```javascript
template.connect(firstShape, secondShape);
template.connect(secondShape, thirdShape);
template.connect(thirdShape, fourthShape);
```

### For get result use

```javascript
console.log(template.xml);
```
