import Card from 'react-bootstrap/Card';
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
      setChart(res);
    }
  }, [show]);

  return (
    <VerticalModal
      title="Evaluación crediticia"
      show={show}
      onHide={onHide}
    >
      <Container fluid>
        <Row className="p-2">
          <Col xs={12}>
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
                template: {
                  data: {
                    indicator: [
                      {
                        title: { text: "Score" },
                        mode: "number+delta+gauge",
                      }
                    ]
                  }
                },
              }}
            />
          </Col>
        </Row>
        <Row className="p-2">
          <Col xs={12} md={6}>
            <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header><b>Percentil</b></Card.Header>
              <Card.Body>
                <Card.Text>
                  El cliente se encuentra sobre el {chart?.percentil}% de la población
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header><b>Recomendaciones</b></Card.Header>
              <Card.Body>
                <Card.Text>
                  {chart?.recomendacion}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </VerticalModal>
  );
};

export default ModalResults;