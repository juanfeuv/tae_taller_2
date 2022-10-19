import _ from 'lodash';

import transform from './transform';

import { MATRIZ_COHEFICIENTES } from './helper';

const getRecomendacionByScore = (score) => {
  if (score >= 450 && score <= 600) {
    return 'No se recomienda ningún préstamo. Por sus antecedentes se considera que tiene alta probabilidad de incumplir con sus obligaciones crediticias';
  }

  if (score >= 601 && score <= 700) {
    return 'Se recomiendan préstamos de montos menores al introducido. Su probabilidad de incumplir con sus obligaciones es media - alta';
  }

  if (score >= 701 && score <= 800) {
    return 'Son aceptables préstamos de montos menores o iguales al introducido. La probabilidad de que incumpla con sus obligaciones crediticias es baja';
  }

  if (score >= 801 && score <= 973) {
    return 'Son aceptables préstamos de montos mayores al introducido. La probabilidad de que incumpla con sus obligaciones crediticias es muy baja';
  }

  return '';
};

const calculateScore = (form) => {
  const transformedForm = transform(form);

  const score = Object.keys(MATRIZ_COHEFICIENTES).reduce((accum, key) => accum + (MATRIZ_COHEFICIENTES[key] * transformedForm[key]), 0);

  const percentil = (score / 973) * 100;

  return {
    score,
    percentil: _.isFinite(percentil) ? _.round(percentil, 1) : 0,
    recomendacion: getRecomendacionByScore(score),
  }
};

export default calculateScore;
