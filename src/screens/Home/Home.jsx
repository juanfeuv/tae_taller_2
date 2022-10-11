import _ from 'lodash';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { DICT_FIELDS } from './helper';

import Field from '../../componentes/Field/Field';
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
        <Row className="p-3">
          {
            DICT_FIELDS.map(item => (
              <Col key={item?.field} md={4}>
                <Field
                  handleChange={e => setForm({ ...form, [item?.field]: e.target.value })}
                  item={item}
                  value={!_.isNil(form[item?.field]) ? form[item?.field] : ''}
                />
              </Col>
            ))
          }
        </Row>
        <Row>
          <Col xs={12}>
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
