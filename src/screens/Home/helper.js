import _ from 'lodash';

import moment from 'moment';
import React from 'react';

import {
  FaDollarSign, FaCalendarAlt, FaBusinessTime, FaPercent, FaHouseUser, FaCheckCircle, FaHandshake, FaScroll, FaDivide, FaMoneyBillAlt
} from "react-icons/fa";

const currentDate = moment().format('YYYY-MM-DD');

export const DEFAULT_FORM = {
  verification_status: 'NOT_VERIFIED',
  purpose: 'CAR',
  grade: 'A',
  home_ownership: 'MORTGAGE',
};

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
  // {
  //   field: 'emp_length',
  //   placeholder: 'Tiempo en años durante los cuales ha estado empleado',
  //   lectura: 'Tiempo laborado',
  //   type: 'number',
  //   min: 0,
  //   max: 10,
  //   inputGroupPrepend: <FaClock />,
  // },
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
    field: 'annual_out',
    placeholder: 'Egresos anuales en dólares',
    lectura: 'Egreso anual',
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
        value: 'NOT_VERIFIED',
        label: 'NOT VERIFIED',
      },
      {
        value: 'SOURCE_VERIFIED',
        label: 'SOURCE VERIFIED',
      },
      {
        value: 'VERIFIED',
        label: 'VERIFIED',
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
        value: 'CAR',
        label: 'CAR',
      },
      {
        value: 'CREDIT_CARD',
        label: 'CREDIT CARD',
      },
      {
        value: 'DEBT_CONSOLIDATION',
        label: 'DEBT CONSOLIDATION',
      },
      {
        value: 'EDUCATIONAL',
        label: 'EDUCATIONAL',
      },
      {
        value: 'HOME_IMPROVEMENT',
        label: 'HOME IMPROVEMENT',
      },
      {
        value: 'HOUSE',
        label: 'HOUSE',
      },
      {
        value: 'MAJOR_PURCHASE',
        label: 'MAJOR PURCHASE',
      },
      {
        value: 'MEDICAL',
        label: 'MEDICAL',
      },
      {
        value: 'MOVING',
        label: 'MOVING',
      },
      {
        value: 'OTHER',
        label: 'OTHER',
      },
      {
        value: 'RENEWABLE_ENERGY',
        label: 'RENEWABLE ENERGY',
      },
      {
        value: 'SMALL_BUSINESS',
        label: 'SMALL BUSINESS',
      },
      {
        value: 'VACATION',
        label: 'VACATION',
      },
      {
        value: 'WEDDING',
        label: 'WEDDING',
      },
    ]
  },
  {
    field: 'inq_last_6mths',
    placeholder: 'Número de estudios crediticios los últimos 6 meses',
    lectura: 'Cantidad estudios crediticios',
    type: 'number',
    min: 0,
    inputGroupPrepend: <FaMoneyBillAlt />,
  },
  {
    field: 'revol_util',
    placeholder: 'Razón entre crédito rotativo utilizado y crédito rotativo total',
    lectura: 'Razón crédito rotativo utilizado vs total',
    type: 'number',
    min: 0,
    inputGroupPrepend: <FaDivide />,
  },
  // {
  //   field: 'total_acc',
  //   placeholder: 'Número de líneas de crédito que tiene actualmente la persona',
  //   lectura: 'Número lineas crédito',
  //   type: 'number',
  //   min: 0,
  //   inputGroupPrepend: '#',
  // },
  // {
  //   field: 'tot_cur_bal',
  //   placeholder: 'Saldo total en todas las cuentas',
  //   lectura: 'Salto total en cuentas',
  //   type: 'number',
  //   min: 0,
  //   inputGroupPrepend: <FaDollarSign />,
  // },
  // {
  //   field: 'dti',
  //   placeholder: 'Razón entre el pago mensual y los ingresos',
  //   lectura: 'Razón pago mensual y los ingresos',
  //   type: 'number',
  //   min: 0,
  //   inputGroupPrepend: '#',
  // },
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
  // {
  //   field: 'mths_since_last_pymnt_d',
  //   placeholder: 'Meses desde el último pago',
  //   lectura: 'Fec. último pago',
  //   type: 'date',
  //   max: currentDate,
  //   inputGroupPrepend: <FaCalendarAlt />,
  // },
  {
    field: 'mths_since_last_credit_pull_d',
    placeholder: 'Meses desde el último estudio de crédito',
    lectura: 'Fec. último estudio crédito',
    type: 'date',
    max: currentDate,
    inputGroupPrepend: <FaCalendarAlt />,
  },
];

export const MATRIZ_COHEFICIENTES = {
  "Intercept": 598,
  "grade:A": 84,
  "grade:B": 64,
  "grade:C": 52,
  "grade:D": 41,
  "grade:E": 27,
  "grade:F": 16,
  "home_ownership:OWN": -2,
  "home_ownership:OTHER_NONE_RENT": -10,
  "verification_status:Source Verified": -7,
  "verification_status:Verified": -8,
  "purpose:debt_consolidation": -7,
  "purpose:credit_card": 0,
  "purpose:educ__ren_en__sm_b__mov": -28,
  "purpose:vacation__house__wedding__med__oth": -3,
  "term:36": 4,
  "int_rate:<7.071": 93,
  "int_rate:7.071-10.374": 52,
  "int_rate:10.374-13.676": 29,
  "int_rate:13.676-15.74": 18,
  "int_rate:15.74-20.281": 5,
  "annual_inc:missing": 14,
  "annual_inc:<28,555": -39,
  "annual_inc:28,555-37,440": -36,
  "annual_inc:37,440-61,137": -26,
  "annual_inc:61,137-81,872": -15,
  "annual_inc:81,872-102,606": -7,
  "annual_inc:102,606-120,379": -3,
  "annual_inc:120,379-150,000": 0,
  "dti:<=1.6": 27,
  "dti:1.6-5.599": 22,
  "dti:5.599-10.397": 17,
  "dti:10.397-15.196": 9,
  "dti:15.196-19.195": 2,
  "dti:19.195-24.794": -3,
  "dti:24.794-35.191": -8,
  "inq_last_6mths:missing": 10,
  "inq_last_6mths:0": 42,
  "inq_last_6mths:1-2": 31,
  "inq_last_6mths:3-4": 19,
  "revol_util:missing": -8,
  "revol_util:<0.1": -8,
  "revol_util:0.1-0.2": -11,
  "revol_util:0.2-0.3": 44,
  "revol_util:0.3-0.4": -9,
  "revol_util:0.4-0.5": 16,
  "revol_util:0.5-0.6": 35,
  "revol_util:0.6-0.7": -9,
  "revol_util:0.7-0.8": 11,
  "revol_util:0.8-0.9": 10,
  "revol_util:0.9-1.0": 39,
  "total_rev_hi_lim:missing": -15,
  "total_rev_hi_lim:<6,381": -13,
  "total_rev_hi_lim:6,381-19,144": -10,
  "total_rev_hi_lim:19,144-25,525": -9,
  "total_rev_hi_lim:25,525-35,097": -11,
  "total_rev_hi_lim:35,097-54,241": -7,
  "total_rev_hi_lim:54,241-79,780": -6,
  "mths_since_earliest_cr_line:missing": 10,
  "mths_since_earliest_cr_line:<125": 1,
  "mths_since_earliest_cr_line:125-167": -7,
  "mths_since_earliest_cr_line:167-249": -3,
  "mths_since_earliest_cr_line:249-331": -1,
  "mths_since_earliest_cr_line:331-434": 2,
  "mths_since_issue_d:<79": 20,
  "mths_since_issue_d:79-89": 0,
  "mths_since_issue_d:89-100": -11,
  "mths_since_issue_d:100-122": -6,
  "mths_since_last_credit_pull_d:missing": 29,
  "mths_since_last_credit_pull_d:<56": 74,
  "mths_since_last_credit_pull_d:56-61": 76,
  "mths_since_last_credit_pull_d:61-75": 9,
  "mths_since_last_credit_pull_d:>75": 0,
  "mths_since_issue_d:>122": 0,
  "mths_since_earliest_cr_line:>434": 0,
  "total_rev_hi_lim:>79,780": 0,
  "revol_util:>1.0": 0,
  "inq_last_6mths:>4": 0,
  "dti:>35.191": 0,
  "annual_inc:>150K": 0,
  "int_rate:>20.281": 0,
  "term:60": 0,
  "purpose:major_purch__car__home_impr": 0,
  "verification_status:Not Verified": 0,
  "home_ownership:MORTGAGE": 0,
  "grade:G": 0
};

export const isDisabledCalculate = (form) => {
  const newForm = DICT_FIELDS.reduce((accum, item) => ({ ...accum, [item.field]: undefined }), {});

  _.assign(newForm, form);

  return _.some(newForm, (item) => _.isNil(item) || _.isEmpty(item));
};
