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
import ModalResults from './ModalResults';

const DEFAULT_FORM = {
  verification_status: 'NOT_VERIFIED',
  purpose: 'CAR',
  grade: 'A',
  home_ownership: 'MORTGAGE',
};

const Home = (props) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = () => {
    setModalShow(true);
  };

  const clearForm = () => {
    setForm(DEFAULT_FORM);
  };

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
      <ModalResults
        show={modalShow}
        form={form}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Home;
