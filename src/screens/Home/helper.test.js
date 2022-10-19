import { isDisabledCalculate } from './helper';

describe('isDisabledCalculate', () => {
  it('Validate when all fields are fullfilled exept 4', () => {
    const received = isDisabledCalculate({});

    expect(received).toBe(true);
  });

  it('All fields fullfilled', () => {
    const inputToTest = {
      "verification_status": "SOURCE_VERIFIED",
      "purpose": "CAR",
      "grade": "G",
      "home_ownership": "RENT",
      "term": "2",
      "int_rate": "1342",
      "annual_out": "23",
      "annual_inc": "244",
      "revol_util": "32",
      "total_rev_hi_lim": "323333333",
      "mths_since_earliest_cr_line": "2022-09-27",
      "mths_since_last_credit_pull_d": "2022-10-06",
      "mths_since_issue_d": "2022-10-06",
      "inq_last_6mths": "15"
    };
    const received = isDisabledCalculate(inputToTest);

    expect(received).toBe(false);
  });
});