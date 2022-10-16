import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Plot from 'react-plotly.js';
import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';

import calculateScore from './calculateScore';
import VerticalModal from '../../componentes/VerticalModal/VerticalModal';

const ModalResults = ({ form, show, onHide }) => {
  const [chart, setChart] = useState({});

  useEffect(() => {
    if (show) {
      const res = calculateScore(form);
      console.log(res);
      setChart(res);
    }
  }, [show]);

  return (
    <VerticalModal
      title="Evaluación crediticia"
      show={show}
      onHide={onHide}
    >
      <Container fluid >
        <Row className="p-2">
          <Col xs={12} md={6}>
            <Plot
              data={[
                {
                  type: "indicator",
                  value: chart?.score,
                  gauge: {
                    axis: {
                      visible: true,
                      range: [450, 973],
                    },
                    bar: { color: "gray" },
                    steps: [
                      { range: [450, 600], color: "red" },
                      { range: [601, 700], color: "yellow" },
                      { range: [701, 800], color: "#4DE383" },
                      { range: [801, 973], color: "green" },
                    ],
                  },
                }
              ]}
              layout={{
                margin: { t: 50, b: 50, l: 50, r: 50 },
                grid: { rows: 2, columns: 2, pattern: "independent" },
                template: {
                  data: {
                    indicator: [
                      {
                        title: { text: "Puntaje" },
                        mode: "number+delta+gauge",
                      }
                    ]
                  }
                },
              }}
            />
          </Col>
          <Col xs={12} md={6}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Percentil</Accordion.Header>
                <Accordion.Body>
                  <h1>El cliente se encuentra sobre el {chart?.percentil}% de la población</h1>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Recomendaciones</Accordion.Header>
                <Accordion.Body>
                  Descripción por color
                  <ul>
                    <li><b>Rojo: </b> descripción del rojo</li>
                    <li><b>Amarillo: </b> descripción del amarillo</li>
                    <li><b>Verde claro: </b> descripción del Verde claro</li>
                    <li><b>Verde: </b> descripción del Verde</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </VerticalModal>
  );
};

export default ModalResults;