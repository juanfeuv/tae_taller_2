import React, { useState } from 'react';

import { Link } from 'react-router-dom';




import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import './Home.css';

import { DICT_FIELDS } from './helper';

import Toolbar from '../../componentes/Toolbar/Toolbar';

const Home = (props) => {
  const [form, setForm] = useState({});

  const handleSubmit = () => { };
  const clearForm = () => {
    setForm({});
  };

  console.log(form);

  return (
    <div>
      <Toolbar history={props.history} />
      <Container fluid style={{ position: 'absolute', top: '10%' }}>
        <Row className="justify-content-xs-center">
          <Col xs={12}>
            <Form.Row>
              {
                DICT_FIELDS.map(item => (
                  <Form.Group key={item?.field} as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>{item?.placeholder}</Form.Label>
                    <InputGroup>
                      {
                        item?.inputGroupPrepend && (
                          <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">{item?.inputGroupPrepend}</InputGroup.Text>
                          </InputGroup.Prepend>
                        )
                      }
                      <Form.Control
                        type={item?.type}
                        placeholder={item?.placeholder}
                        aria-describedby="inputGroupPrepend"
                        required
                        value={form[item?.field]}
                        name={item?.field}
                        onChange={e => setForm({ ...form, [item?.field]: e.target.value })}
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor diligencie el campo
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                ))
              }
            </Form.Row>
            <Button variant="primary" onClick={handleSubmit}>Calcular</Button>
            &nbsp;
            <Button variant="danger" onClick={clearForm}>Limpiar</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
