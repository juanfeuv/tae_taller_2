import _ from 'lodash';

import transform from './transform';

import { MATRIZ_COHEFICIENTES } from './helper';

const calculateScore = (form) => {
  const transformedForm = transform(form);

  const score = Object.keys(MATRIZ_COHEFICIENTES).reduce((accum, key) => accum + (MATRIZ_COHEFICIENTES[key] * transformedForm[key]), 0);

  const percentil = (score / 973) * 100;

  return {
    score,
    percentil: _.isFinite(percentil) ? _.round(percentil, 1) : 0,
  }
};

export default calculateScore;
