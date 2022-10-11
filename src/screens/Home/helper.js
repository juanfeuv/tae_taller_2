import moment from 'moment';
import React from 'react';

import { FaDollarSign, FaCalendarAlt, FaBusinessTime, FaPercent, FaHouseUser, FaClock, FaCheckCircle, FaHandshake, FaScroll } from "react-icons/fa";

const currentDate = moment().format('L');

console.log(currentDate);

export const DICT_FIELDS = [
  {
    field: 'term',
    placeholder: 'Meses de duración del préstamo',
    lectura: 'Meses duración',
    type: 'number',
    min: 0,
    max: 10,
    inputGroupPrepend: <FaBusinessTime />,
  },
  {
    field: 'int_rate',
    placeholder: 'Tasa de interés',
    lectura: 'Tasa interés',
    type: 'number',
    min: 0,
    inputGroupPrepend: <FaPercent />,
  },
  {
    field: 'grade',
    placeholder: 'Nota crediticia asignada',
    lectura: 'Nota crediticia',
    type: 'select',
    inputGroupPrepend: <FaScroll />,
    options: [
      {
        value: 'A',
        label: 'A',
      },
      {
        value: 'B',
        label: 'B',
      },
      {
        value: 'C',
        label: 'C',
      },
      {
        value: 'D',
        label: 'D',
      },
      {
        value: 'E',
        label: 'E',
      },
      {
        value: 'F',
        label: 'F',
      },
      {
        value: 'G',
        label: 'G',
      },
    ]
  },
  {
    field: 'emp_length',
    placeholder: 'Tiempo en años durante los cuales ha estado empleado',
    lectura: 'Tiempo laborado',
    type: 'number',
    min: 0,
    max: 10,
    inputGroupPrepend: <FaClock />,
  },
  {
    field: 'home_ownership',
    placeholder: 'Estado de propiedad de vivienda',
    lectura: 'Propiedad vivienda',
    type: 'select',
    inputGroupPrepend: <FaHouseUser />,
    options: [
      {
        value: 'MORTGAGE',
        label: 'MORTGAGE',
      },
      {
        value: 'NONE',
        label: 'NONE',
      },
      {
        value: 'OTHER',
        label: 'OTHER',
      },
      {
        value: 'OWN',
        label: 'OWN',
      },
      {
        value: 'RENT',
        label: 'RENT',
      },
    ]
  },
  {
    field: 'annual_inc',
    placeholder: 'Ganancias anuales en dólares',
    lectura: 'Ganancia anual',
    type: 'number',
    min: 0,
    inputGroupPrepend: <FaDollarSign />,
  },
  {
    field: 'verification_status',
    placeholder: 'Estado de verificación de los ingresos',
    lectura: 'Estado verificación ingresos',
    type: 'select',
    inputGroupPrepend: <FaCheckCircle />,
    options: [
      {
        value: 'Not_Verified',
        label: 'Not Verified',
      },
      {
        value: 'Source_verified',
        label: 'Source verified',
      },
      {
        value: 'verified',
        label: 'verified',
      },
    ]
  },
  {
    field: 'purpose',
    placeholder: 'Motivo por el cual se hace el préstamo',
    lectura: 'Motivo prestamo',
    type: 'select',
    inputGroupPrepend: <FaHandshake />,
    options: [
      {
        value: 'car',
        label: 'car',
      },
      {
        value: 'credit_card',
        label: 'credit card',
      },
      {
        value: 'debt_consolidation',
        label: 'debt consolidation',
      },
      {
        value: 'educational',
        label: 'educational',
      },
      {
        value: 'home_improvement',
        label: 'home improvement',
      },
      {
        value: 'house',
        label: 'house',
      },
      {
        value: 'major_purchase',
        label: 'major purchase',
      },
      {
        value: 'medical',
        label: 'medical',
      },
      {
        value: 'moving',
        label: 'moving',
      },
      {
        value: 'other',
        label: 'other',
      },
      {
        value: 'small_business',
        label: 'small business',
      },
      {
        value: 'vacation',
        label: 'vacation',
      },
      {
        value: 'wedding',
        label: 'wedding',
      },
    ]
  },
  {
    field: 'inq_last_6mths',
    placeholder: 'Número de estudios crediticios los últimos 6 meses',
    lectura: 'Cantidad estudios crediticios',
    type: 'number',
    min: 0,
    inputGroupPrepend: '#',
  },
  {
    field: 'revol_util',
    placeholder: 'Razón entre crédito rotativo utilizado y crédito rotativo total',
    lectura: 'Razón crédito rotativo utilizado vs total',
    type: 'number',
    min: 0,
  },
  {
    field: 'total_acc',
    placeholder: 'Número de líneas de crédito que tiene actualmente la persona',
    lectura: 'Número lineas crédito',
    type: 'number',
    min: 0,
    inputGroupPrepend: '#',
  },
  {
    field: 'tot_cur_bal',
    placeholder: 'Saldo total en todas las cuentas',
    lectura: 'Salto total en cuentas',
    type: 'number',
    min: 0,
    inputGroupPrepend: <FaDollarSign />,
  },
  {
    field: 'total_rev_hi_lim',
    placeholder: 'Límite de crédito rotativo',
    lectura: 'Límite crédito rotativo',
    type: 'number',
    inputGroupPrepend: <FaDollarSign />,
  },
  {
    field: 'mths_since_earliest_cr_line',
    placeholder: 'Meses desde la primera línea de crédito',
    lectura: 'Fec. primer línea crédito',
    type: 'date',
    max: currentDate,
    inputGroupPrepend: <FaCalendarAlt />,
  },
  {
    field: 'mths_since_issue_d',
    placeholder: 'Meses desde la apertura del préstamo',
    lectura: 'Fec. apertura préstamo',
    type: 'date',
    max: currentDate,
    inputGroupPrepend: <FaCalendarAlt />,
  },
  {
    field: 'mths_since_last_pymnt_d',
    placeholder: 'Meses desde el último pago',
    lectura: 'Fec. último pago',
    type: 'date',
    max: currentDate,
    inputGroupPrepend: <FaCalendarAlt />,
  },
  {
    field: 'mths_since_last_credit_pull_d',
    placeholder: 'Meses desde el último estudio de crédito',
    lectura: 'Fec. último estudio crédito',
    type: 'date',
    max: currentDate,
    inputGroupPrepend: <FaCalendarAlt />,
  },
];

export const fake = false;