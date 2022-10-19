import _ from 'lodash';

import moment from 'moment';

const getMonthsToNow = (date) => {
  return date && moment(date, 'YYYY-MM-DD').isBefore(new Date())
    ? moment(new Date()).diff(moment(date, 'YYYY-MM-DD'), 'months', true)
    : 0;
}

const calculatedFields = ({
  mths_since_last_credit_pull_d, mths_since_issue_d, mths_since_earliest_cr_line, ...input
}) => {
  const dti = (input.annual_out * 100) / input.annual_inc;

  return {
    ...input,
    dti: _.isFinite(dti) ? _.round(dti, 1) : 0,
    mths_since_last_credit_pull_d: _.round(getMonthsToNow(mths_since_last_credit_pull_d), 0),
    mths_since_issue_d: _.round(getMonthsToNow(mths_since_issue_d), 0),
    mths_since_earliest_cr_line: _.round(getMonthsToNow(mths_since_earliest_cr_line), 0),
  };
};

const transform = (input) => {
  const X = calculatedFields(input);
  const X_new = {};

  X_new['Intercept'] = 1;
  X_new['grade:A'] = Number(X['grade'] === 'A');
  X_new['grade:B'] = Number(X['grade'] === 'B');
  X_new['grade:C'] = Number(X['grade'] === 'C');
  X_new['grade:D'] = Number(X['grade'] === 'D');
  X_new['grade:E'] = Number(X['grade'] === 'E');
  X_new['grade:F'] = Number(X['grade'] === 'F');
  X_new['home_ownership:OWN'] = Number(X['home_ownership'] === 'OWN');
  X_new['home_ownership:OTHER_NONE_RENT'] = Number(_.includes(['OTHER', 'NONE', 'RENT'], X['home_ownership']));
  X_new['verification_status:Source Verified'] = Number(X['verification_status'] === 'SOURCE_VERIFIED');
  X_new['verification_status:Verified'] = Number(X['verification_status'] === 'VERIFIED');
  X_new['purpose:debt_consolidation'] = Number(X['purpose'] === 'DEBT_CONSOLIDATION');
  X_new['purpose:credit_card'] = Number(X['purpose'] === 'CREDIT_CARD');
  X_new['purpose:educ__ren_en__sm_b__mov'] = Number(_.includes(['EDUCATIONAL', 'RENEWABLE_ENERGY', 'SMALL_BUSINESS', 'MOVING'], X['purpose']));
  X_new['purpose:vacation__house__wedding__med__oth'] = Number(_.includes(['VACATION', 'HOUSE', 'WEDDING', 'MEDICAL', 'OTHER'], X['purpose']));
  X_new['term:36'] = Number(X['term'] === 36);
  X_new['int_rate:<7.071'] = Number(X['int_rate'] <= 7.071);
  X_new['int_rate:7.071-10.374'] = Number(X['int_rate'] > 7.071 && X['int_rate'] <= 10.374);
  X_new['int_rate:10.374-13.676'] = Number(X['int_rate'] > 10.374 && X['int_rate'] <= 13.676);
  X_new['int_rate:13.676-15.74'] = Number(X['int_rate'] > 13.676 && X['int_rate'] <= 15.74);
  X_new['int_rate:15.74-20.281'] = Number(X['int_rate'] > 15.74 && X['int_rate'] <= 20.281);
  X_new['annual_inc:missing'] = Number(_.isNil(X['annual_inc']));
  X_new['annual_inc:<28,555'] = Number(X['annual_inc'] <= 28555);
  X_new['annual_inc:28,555-37,440'] = Number(X['annual_inc'] > 28555 && X['annual_inc'] <= 37440);
  X_new['annual_inc:37,440-61,137'] = Number(X['annual_inc'] > 37440 && X['annual_inc'] <= 61137);
  X_new['annual_inc:61,137-81,872'] = Number((X['annual_inc'] > 61137) && (X['annual_inc'] <= 81872));
  X_new['annual_inc:81,872-102,606'] = Number((X['annual_inc'] > 81872) && (X['annual_inc'] <= 102606));
  X_new['annual_inc:102,606-120,379'] = Number((X['annual_inc'] > 102606) && (X['annual_inc'] <= 120379));
  X_new['annual_inc:120,379-150,000'] = Number((X['annual_inc'] > 120379) && (X['annual_inc'] <= 150000));
  X_new['dti:<=1.6'] = Number((X['dti'] <= 1.6));
  X_new['dti:1.6-5.599'] = Number((X['dti'] > 1.6) && (X['dti'] <= 5.599));
  X_new['dti:5.599-10.397'] = Number((X['dti'] > 5.599) && (X['dti'] <= 10.397));
  X_new['dti:10.397-15.196'] = Number((X['dti'] > 10.397) && (X['dti'] <= 15.196));
  X_new['dti:15.196-19.195'] = Number((X['dti'] > 15.196) && (X['dti'] <= 19.195));
  X_new['dti:19.195-24.794'] = Number((X['dti'] > 19.195) && (X['dti'] <= 24.794));
  X_new['dti:24.794-35.191'] = Number((X['dti'] > 24.794) && (X['dti'] <= 35.191));
  X_new['inq_last_6mths:missing'] = Number(_.isNil(X['inq_last_6mths']));
  X_new['inq_last_6mths:0'] = Number((X['inq_last_6mths'] === 0));
  X_new['inq_last_6mths:1-2'] = Number((X['inq_last_6mths'] >= 1) && (X['inq_last_6mths'] <= 2));
  X_new['inq_last_6mths:3-4'] = Number((X['inq_last_6mths'] >= 3) && (X['inq_last_6mths'] <= 4));
  X_new['revol_util:missing'] = Number(_.isNil(X['revol_util']));
  X_new['revol_util:<0.1'] = Number((X['revol_util'] <= 0.1));
  X_new['revol_util:0.1-0.2'] = Number((X['revol_util'] > 0.1) && (X['revol_util'] <= 0.2));
  X_new['revol_util:0.2-0.3'] = Number((X['revol_util'] > 0.2) && (X['revol_util'] <= 0.3));
  X_new['revol_util:0.3-0.4'] = Number((X['revol_util'] > 0.3) && (X['revol_util'] <= 0.4));
  X_new['revol_util:0.4-0.5'] = Number((X['revol_util'] > 0.4) && (X['revol_util'] <= 0.5));
  X_new['revol_util:0.5-0.6'] = Number((X['revol_util'] > 0.5) && (X['revol_util'] <= 0.6));
  X_new['revol_util:0.6-0.7'] = Number((X['revol_util'] > 0.6) && (X['revol_util'] <= 0.7));
  X_new['revol_util:0.7-0.8'] = Number((X['revol_util'] > 0.7) && (X['revol_util'] <= 0.8));
  X_new['revol_util:0.8-0.9'] = Number((X['revol_util'] > 0.8) && (X['revol_util'] <= 0.9));
  X_new['revol_util:0.9-1.0'] = Number((X['revol_util'] > 0.9) && (X['revol_util'] <= 1.0));
  X_new['total_rev_hi_lim:missing'] = Number(_.isNil(X['total_rev_hi_lim']));
  X_new['total_rev_hi_lim:<6,381'] = Number((X['total_rev_hi_lim'] <= 6381));
  X_new['total_rev_hi_lim:6,381-19,144'] = Number((X['total_rev_hi_lim'] > 6381) && (X['total_rev_hi_lim'] <= 19144));
  X_new['total_rev_hi_lim:19,144-25,525'] = Number((X['total_rev_hi_lim'] > 19144) && (X['total_rev_hi_lim'] <= 25525));
  X_new['total_rev_hi_lim:25,525-35,097'] = Number((X['total_rev_hi_lim'] > 25525) && (X['total_rev_hi_lim'] <= 35097));
  X_new['total_rev_hi_lim:35,097-54,241'] = Number((X['total_rev_hi_lim'] > 35097) && (X['total_rev_hi_lim'] <= 54241));
  X_new['total_rev_hi_lim:54,241-79,780'] = Number((X['total_rev_hi_lim'] > 54241) && (X['total_rev_hi_lim'] <= 79780));
  X_new['mths_since_earliest_cr_line:missing'] = Number(_.isNil(X['mths_since_earliest_cr_line']));
  X_new['mths_since_earliest_cr_line:<125'] = Number((X['mths_since_earliest_cr_line'] <= 125));
  X_new['mths_since_earliest_cr_line:125-167'] = Number((X['mths_since_earliest_cr_line'] > 125) && (X['mths_since_earliest_cr_line'] <= 167));
  X_new['mths_since_earliest_cr_line:167-249'] = Number((X['mths_since_earliest_cr_line'] > 167) && (X['mths_since_earliest_cr_line'] <= 249));
  X_new['mths_since_earliest_cr_line:249-331'] = Number((X['mths_since_earliest_cr_line'] > 249) && (X['mths_since_earliest_cr_line'] <= 331));
  X_new['mths_since_earliest_cr_line:331-434'] = Number((X['mths_since_earliest_cr_line'] > 331) && (X['mths_since_earliest_cr_line'] <= 434));
  X_new['mths_since_issue_d:<79'] = Number((X['mths_since_issue_d'] <= 79));
  X_new['mths_since_issue_d:79-89'] = Number((X['mths_since_issue_d'] > 79) && (X['mths_since_issue_d'] <= 89));
  X_new['mths_since_issue_d:89-100'] = Number((X['mths_since_issue_d'] > 89) && (X['mths_since_issue_d'] <= 100));
  X_new['mths_since_issue_d:100-122'] = Number((X['mths_since_issue_d'] > 100) && (X['mths_since_issue_d'] <= 122));
  X_new['mths_since_last_credit_pull_d:missing'] = Number(_.isNil(X['mths_since_last_credit_pull_d']));
  X_new['mths_since_last_credit_pull_d:<56'] = Number((X['mths_since_last_credit_pull_d'] <= 56));
  X_new['mths_since_last_credit_pull_d:56-61'] = Number((X['mths_since_last_credit_pull_d'] > 56) && (X['mths_since_last_credit_pull_d'] <= 61));
  X_new['mths_since_last_credit_pull_d:61-75'] = Number((X['mths_since_last_credit_pull_d'] > 61) && (X['mths_since_last_credit_pull_d'] <= 75));
  X_new['mths_since_last_credit_pull_d:>75'] = Number((X['mths_since_last_credit_pull_d'] > 75));
  X_new['mths_since_issue_d:>122'] = Number((X['mths_since_issue_d'] > 122));
  X_new['mths_since_earliest_cr_line:>434'] = Number((X['mths_since_earliest_cr_line'] > 434));
  X_new['total_rev_hi_lim:>79,780'] = Number((X['total_rev_hi_lim'] > 79780));
  X_new['revol_util:>1.0'] = Number((X['revol_util'] > 1.0));
  X_new['inq_last_6mths:>4'] = Number((X['inq_last_6mths'] > 4));
  X_new['dti:>35.191'] = Number((X['dti'] > 35.191));
  X_new['annual_inc:>150K'] = Number((X['annual_inc'] > 150000));
  X_new['int_rate:>20.281'] = Number(X['int_rate'] > 20.281);
  X_new['term:60'] = Number(X['term'] === 60);
  X_new['purpose:major_purch__car__home_impr'] = Number(_.includes(['MAJOR_PURCHASE', 'CAR', 'HOME_IMPROVEMENT'], X['purpose']));
  X_new['verification_status:Not Verified'] = Number(X['verification_status'] === 'NOT_VERIFIED');
  X_new['home_ownership:MORTGAGE'] = Number(X['home_ownership'] === 'MORTGAGE');
  X_new['grade:G'] = Number(X['grade'] === 'G');

  return X_new;
};

export default transform;
