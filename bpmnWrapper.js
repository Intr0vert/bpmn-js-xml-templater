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
const definitions = [
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
    ];

exports.definitions = definitions;