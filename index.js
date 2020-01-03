const fs = require('fs');

const xml = require("xml");

const content = require("./bpmnWrapper");

class xmlTemplate {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.process = this.wrapper.definitions[1].process;
    this.diagram = this.wrapper.definitions[2]["bpmndi:BPMNDiagram"][0][
      "bpmndi:BPMNPlane"
    ];
    this.shapeCounter = 1;
    this.edgeCounter = 1;
  }

  /**
   * Add new shape
   * @Param {h} height
   * @Param {w} width
   * @Param {x} x coordinate
   * @Param {y} y coordinate
   * @Param {text} text inside shape
   */
  addShape(h, w, x, y, text) {
    let id = this.shapeCounter;
    let elementForTask = {
      task: [
        {
          _attr: {
            completionQuantity: 1,
            isForCompensation: false,
            startQuantity: 1,
            name: `${text}`,
            id: `ID_TASK_${id}`
          }
        }
      ]
    };

    let elementForShape = {
      "bpmndi:BPMNShape": [
        {
          _attr: {
            bpmnElement: `ID_TASK_${id}`
          }
        },
        {
          "omgdc:Bounds": [
            {
              _attr: {
                height: `${h}`,
                width: `${w}`,
                x: `${x}`,
                y: `${y}`
              }
            }
          ]
        }
      ]
    };

    this.process.push(elementForTask);
    this.diagram.push(elementForShape);
    this.shapeCounter++;
    return {
      id: id,
      height: `${h}`,
      width: `${w}`,
      x: `${x}`,
      y: `${y}`
    }
  }

  /**
   * Add new edge
   * @Param {x1} x1 coordinate
   * @Param {y1} y1 coordinate
   * @Param {x2} x2 coordinate
   * @Param {y2} y2 coordinate
   * @Param {id_start} id of start shape
   * @Param {end} id of end shape
   */
  addEdge(x1, y1, x2, y2, id_start, id_end) {
    let elementForTask = {
      sequenceFlow: [
        {
          _attr: {
            id: `ID_CONNECTION_${this.edgeCounter}`,
            sourceRef: `ID_TASK_${id_start}`,
            targetRef: `ID_TASK_${id_end}`
          }
        }
      ]
    };

    let elementForShape = {
      "bpmndi:BPMNEdge": [
        {
          _attr: {
            bpmnElement: `ID_CONNECTION_${this.edgeCounter}`
          }
        },
        {
          "omgdi:waypoint": [
            {
              _attr: {
                x: `${x1}`,
                y: `${y1}`
              }
            }
          ]
        },
        {
          "omgdi:waypoint": [
            {
              _attr: {
                x: `${x2}`,
                y: `${y2}`
              }
            }
          ]
        }
      ]
    };

    this.process.push(elementForTask);
    this.diagram.push(elementForShape);
    this.edgeCounter++;
  }

  /**
   * Connecting 2 shapes
   * @Param {el1} start shape parametrs
   * @Param {el2} end shape parametrs
   */
  connect(el1, el2) {
    let elementForTask = {
      sequenceFlow: [
        {
          _attr: {
            id: `ID_CONNECTION_${this.edgeCounter}`,
            sourceRef: `ID_TASK_${el1.id}`,
            targetRef: `ID_TASK_${el2.id}`
          }
        }
      ]
    };

    let elementForShape = {
      "bpmndi:BPMNEdge": [
        {
          _attr: {
            bpmnElement: `ID_CONNECTION_${this.edgeCounter}`
          }
        },
        {
          "omgdi:waypoint": [
            {
              _attr: {
                x: `${parseFloat(el1.x) + parseFloat(el1.width)}`,
                y: `${parseFloat(el1.y) + (parseFloat(el1.height) * 0.5)}`
              }
            }
          ]
        },
        {
          "omgdi:waypoint": [
            {
              _attr: {
                x: `${parseFloat(el2.x)}`,
                y: `${parseFloat(el2.y) + (parseFloat(el2.height) * 0.5)}`
              }
            }
          ]
        }
      ]
    };

    this.process.push(elementForTask);
    this.diagram.push(elementForShape);
    this.edgeCounter++;
  }

  get xml() {
    return xml(this.wrapper, {
      declaration: true,
      indent: true
    });
  }
}

let test = new xmlTemplate(content);

let first = test.addShape(80, 100, 105, 150, "First element");
let second = test.addShape(80, 100, 360, 150, "Second element");
let third = test.addShape(80, 100, 560, 350, "Third element");

test.connect(second, third);
test.connect(first, third);
test.connect(first, second);

// console.log(test.xml);

fs.writeFile("main.bpmn", test.xml,()=>{
    console.log("Done");
});