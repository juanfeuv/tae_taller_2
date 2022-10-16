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
                      range: [300, 850],
                    },
                    bar: { color: "gray" },
                    steps: [
                      { range: [300, 629], color: "red" },
                      { range: [630, 689], color: "yellow" },
                      { range: [690, 719], color: "#4DE383" },
                      { range: [720, 850], color: "green" },
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Recomendaciones</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
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