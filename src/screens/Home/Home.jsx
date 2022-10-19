import _ from 'lodash';

import React, { useMemo, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import { DICT_FIELDS, DEFAULT_FORM, isDisabledCalculate } from './helper';

import Field from '../../componentes/Field/Field';
import Toolbar from '../../componentes/Toolbar/Toolbar';
import ModalResults from './ModalResults';

const Home = (props) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = () => {
    setModalShow(true);
  };

  const clearForm = () => {
    setForm(DEFAULT_FORM);
  };

  const disabledCalculate = useMemo(() => isDisabledCalculate(form), [form]);

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
            {
              disabledCalculate
                ? (
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Por favor diligencie todos los campos</Tooltip>}
                  >
                    <Button
                      variant="primary"
                    >
                      Calcular
                    </Button>
                  </OverlayTrigger>
                )
                : (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Calcular
                  </Button>
                )
            }
            &nbsp;
            <Button
              variant="danger"
              onClick={clearForm}
            >
              Limpiar
            </Button>
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
