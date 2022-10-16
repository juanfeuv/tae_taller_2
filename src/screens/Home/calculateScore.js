import transform from './transform';

import { MATRIZ_COHEFICIENTES } from './helper';

const calculateScore = (form) => {
  const transformedForm = transform(form);

  const score = Object.keys(MATRIZ_COHEFICIENTES).reduce((accum, key) => accum + (MATRIZ_COHEFICIENTES[key] * transformedForm[key]), 0);

  return {
    score,
  }
};

export default calculateScore;
