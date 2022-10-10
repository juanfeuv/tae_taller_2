export const DICT_FIELDS = [
  {
    field: 'term',
    placeholder: 'Meses de duración del préstamo',
    type: 'number',
    min: 0,
    max: 10,
    inputGroupPrepend: '#',
  },
  {
    field: 'int_rate',
    placeholder: 'Tasa de interés',
    type: 'number',
    min: 0,
  },
  {
    field: 'grade',
    placeholder: 'Nota crediticia asignada',
    type: 'select',
  },
  {
    field: 'emp_length',
    placeholder: 'Tiempo en años durante los cuales ha estado empleado',
    type: 'number',
    min: 0,
    max: 10,
  },
  {
    field: 'home_ownership',
    placeholder: 'Estado de propiedad de vivienda',
    type: 'select',
  },
  {
    field: 'annual_inc',
    placeholder: 'Ganancias anuales en dólares',
    type: 'number',
    min: 0,
  },
  {
    field: 'verification_status',
    placeholder: 'Estado de verificación de los ingresos',
    type: 'select',
  },
  {
    field: 'purpose',
    placeholder: 'Motivo por el cual se hace el préstamo',
    type: 'select',
  },
  {
    field: 'inq_last_6mths',
    placeholder: 'Número de estudios crediticios los últimos 6 meses',
    type: 'number',
    min: 0,
  },
  {
    field: 'revol_util',
    placeholder: 'Razón entre crédito rotativo utilizado y crédito rotativo total',
    type: 'number',
    min: 0,
  },
  {
    field: 'total_acc',
    placeholder: 'Número de líneas de crédito que tiene actualmente la persona',
    type: 'number',
    min: 0,
  },
  {
    field: 'tot_cur_bal',
    placeholder: 'Saldo total en todas las cuentas',
    type: 'number',
    min: 0,
  },
  {
    field: 'total_rev_hi_lim',
    placeholder: 'Límite de crédito rotativo',
    type: 'number',
    min: 0,
  },
  {
    field: 'mths_since_earliest_cr_line',
    placeholder: 'Meses desde la primera línea de crédito',
    type: 'number',
    min: 0,
  },
  {
    field: 'mths_since_issue_d',
    placeholder: 'Meses desde la apertura del préstamo',
    type: 'number',
    min: 0,
  },
  {
    field: 'mths_since_last_pymnt_d',
    placeholder: 'Meses desde el último pago',
    type: 'number',
    min: 0,
  },
  {
    field: 'mths_since_last_credit_pull_d',
    placeholder: 'Meses desde el último estudio de crédito',
    type: 'number',
    min: 0,
  },
];

export const fake = false;