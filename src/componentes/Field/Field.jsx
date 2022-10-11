import React from "react";
import div from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FaInfoCircle } from "react-icons/fa";

const Field = ({ value, handleChange, item }) => {

  return (
    <Form.Group as={div} md="12" controlId={item?.field}>
      <Form.Label>
        {item?.lectura}
        &nbsp;
        <OverlayTrigger
          placement="bottom-end"
          overlay={<Tooltip >{item?.placeholder}</Tooltip>}
        >
          <span>
            <FaInfoCircle color="gray" />
          </span>
        </OverlayTrigger>

      </Form.Label>
      <InputGroup>
        <InputGroup.Text
          style={{ width: '10%', textAlign: 'center' }}
          id="inputGroupPrepend">
          {item?.inputGroupPrepend}
        </InputGroup.Text>
        {
          item?.type === 'select'
            ? (
              <Form.Select style={{ width: '90%', }}>
                {
                  item?.options?.map(element => (
                    <option key={element?.value} value={element?.value}>{element?.label}</option>
                  ))
                }
              </Form.Select>
            )
            : (
              <>
                <Form.Control
                  style={{ width: '80%' }}
                  type={item?.type}
                  placeholder={item?.placeholder}
                  aria-describedby="inputGroupPrepend"
                  required
                  value={value}
                  name={item?.field}
                  onChange={handleChange}
                  min={item?.min}
                  max={item?.max}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor diligencie el campo
                </Form.Control.Feedback>
              </>
            )
        }
      </InputGroup>
    </Form.Group >
  );
};

export default Field;