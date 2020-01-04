"use strict";
(function () {
    const xml = require("xml");
    const definitionsAttr = {
    _attr: {
        xmlns: "http://www.omg.org/spec/BPMN/20100524/MODEL",
        "xmlns:bpmndi": "http://www.omg.org/spec/BPMN/20100524/DI",
        "xmlns:omgdc": "http://www.omg.org/spec/DD/20100524/DC",
        "xmlns:omgdi": "http://www.omg.org/spec/DD/20100524/DI",
        "xmlns:signavio": "http://www.signavio.com",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        expressionLanguage: "http://www.w3.org/1999/XPath",
        targetNamespace: "http://www.signavio.com/bpmn20",
        typeLanguage: "http://www.w3.org/2001/XMLSchema",
        "xsi:schemaLocation":
        "http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd"
    }
    };
    // basic template
    const defaultWrapper = {
        definitions: [
            definitionsAttr,
            {
                process: [
                {
                    _attr: {
                    id: "ID_PROCESS_1",
                    isClosed: "false",
                    isExecutable: "false",
                    processType: "None"
                    }
                }
                ]
            },
            {
                "bpmndi:BPMNDiagram": [
                {
                    "bpmndi:BPMNPlane": [
                    {
                        _attr: {
                        bpmnElement: "ID_PROCESS_1"
                        }
                    }
                    ]
                }
                ]
            }
        ]
    };
    
    class xmlTemplate {
        constructor(wrapper = "default") {
            if (wrapper != "default") {
                this.wrapper = wrapper;
            } else {
                this.wrapper = defaultWrapper;
            }
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
            let y1,
                y2,
                x1,
                x2;
            if (
              parseFloat(el1.x) > parseFloat(el2.x) &&
              parseFloat(el1.y) >= parseFloat(el2.y)
            ) {
                y1 = parseFloat(el1.y) + parseFloat(el1.height) * 0.5;
                x1 = parseFloat(el1.x);
                y2 = parseFloat(el2.y) + parseFloat(el2.height) * 0.5;
                x2 = parseFloat(el2.x) + parseFloat(el2.width);
            } else if (
                parseFloat(el1.x) < parseFloat(el2.x) &&
                parseFloat(el1.y) >= parseFloat(el2.y)
            ) {
                y1 = parseFloat(el1.y) + parseFloat(el1.height) * 0.5;
                x1 = parseFloat(el1.x) + parseFloat(el1.width);
                y2 = parseFloat(el2.y) + parseFloat(el2.height) * 0.5;
                x2 = parseFloat(el2.x);
            } else if (
                parseFloat(el1.x) > parseFloat(el2.x) &&
                parseFloat(el1.y) <= parseFloat(el2.y)
            ) {
                y1 = parseFloat(el1.y) + parseFloat(el1.height) * 0.5;
                x1 = parseFloat(el1.x);
                y2 = parseFloat(el2.y) + parseFloat(el2.height) * 0.5;
                x2 = parseFloat(el2.x) + parseFloat(el2.width);
            } else if (
                parseFloat(el1.x) < parseFloat(el2.x) &&
                parseFloat(el1.y) <= parseFloat(el2.y)
            ) {
                y1 = parseFloat(el1.y) + parseFloat(el1.height) * 0.5;
                x1 = parseFloat(el1.x) + parseFloat(el1.width);
                y2 = parseFloat(el2.y) + parseFloat(el2.height) * 0.5;
                x2 = parseFloat(el2.x);
            } else if (
                parseFloat(el1.x) === parseFloat(el2.x) &&
                parseFloat(el1.y) < parseFloat(el2.y)
            ) {
                y1 = parseFloat(el1.y) + parseFloat(el1.height);
                x1 = parseFloat(el1.x) + parseFloat(el1.width) * 0.5;
                y2 = parseFloat(el2.y);
                x2 = parseFloat(el2.x) + parseFloat(el2.width) * 0.5;
            } else if (
                parseFloat(el1.x) === parseFloat(el2.x) &&
                parseFloat(el1.y) > parseFloat(el2.y)
            ) {
                y1 = parseFloat(el1.y);
                x1 = parseFloat(el1.x) + parseFloat(el1.width) * 0.5;
                y2 = parseFloat(el2.y) + parseFloat(el2.height);
                x2 = parseFloat(el2.x) + parseFloat(el2.width) * 0.5;
            } else {
                console.err(new Error("Wrong arguments"));
            }
    
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

        get xml() {
            if (typeof xml === "undefined") {
                console.error("Error: XML doesnt exist");
                return Error;
            }
            return xml(this.wrapper, {
                declaration: true,
                indent: true
            });
        }

        get content() {
            return this.wrapper;
        }
    }

    module.exports = xmlTemplate;
})();