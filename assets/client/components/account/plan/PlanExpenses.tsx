import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useApi from '@/client/hooks/useApi';
import { Account } from '@/client/interfaces/Account';
import './PlanExpenses.scss';

export default function PlanExpenses() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { data: account, isLoading, error } = useApi<Account>(`accounts/${id}`);

  // { t('PLAN.TAB_SPENT.ERROR_MESSAGE.PRODUCT_INPUT')}
  // { t('PLAN.TAB_SPENT.ERROR_MESSAGE.AMOUNT_INPUT')}

  function calculate() {
    // if (this.fieldsAreEmpty(spendingForm)) {
    //   return;
    // } else if (spendingForm.valid) {
    //   const displayAmount = spendingForm.value.amount;
    //   const enteredAmount =
    //     this.formattingHelperService.germanFormatToNumber(
    //       displayAmount
    //     ) * 100;
    //   console.log('enteredAmount: ', enteredAmount);
    //   this.calculateAmount.emit(enteredAmount);
    //   this.icon = 'ℹ';
    //   this.message = 'PLAN.TAB_SPENT.MESSAGE_CONFIRM';
    // } else {
    //   this.icon = '⚠';
    //   this.message =
    //     'PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INVALID.PART_1 ' +
    //     spendingForm.value.amount +
    //     ' PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INVALID.PART_2 ' +
    //     spendingForm.value.title +
    //     ' PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INVALID.PART_3';
    // }
  }

  function apply() {
    // if (this.fieldsAreEmpty(spendingForm)) {
    //   return;
    // } else if (spendingForm.valid) {
    //   const title = spendingForm.value.title;
    //   const enteredAmount = spendingForm.value.amount;
    //   const formattedAmount =
    //     this.formattingHelperService.germanFormatToNumber(
    //       enteredAmount
    //     );
    //   const amount = formattedAmount * -100;
    //   console.log('selected name & sum:', title, amount);
    //
    //   this.applyChanges.emit({ title, amount });
    //   this.icon = '✔';
    //   this.message = 'PLAN.TAB_SPENT.MESSAGE_SUCCESS';
    // } else {
    //   this.icon = '⚠';
    //   this.message = 'PLAN.TAB_SPENT.ERROR_MESSAGE.GENERAL';
    // }
  }

  return (
    <>
      <form className="form-container">
        <div className="form-group">
          <label className="name-label" htmlFor="title">
            {t('PLAN.TAB_SPENT.NAME_LABEL')}
          </label>
          <input
            className="name-input"
            type="text"
            id="title"
            name="title"
            required
            pattern="^[a-zA-Z\s0-9\-.]+$"
            title={t('PLAN.TAB_SPENT.INPUT_HINT.PRODUCT_INPUT')}
          />
        </div>

        <div className="form-group">
          <label className="amount-label" htmlFor="amount">
            {t('PLAN.TAB_SPENT.AMOUNT_LABEL')}
          </label>
          <input
            className="amount-input"
            type="text"
            id="amount"
            name="amount"
            required
            pattern="^\d+(?:,\d{1,2})?$"
            title={t('PLAN.TAB_SPENT.INPUT_HINT.AMOUNT_INPUT')}
          />
        </div>

        <div className="button-group--plan-page">
          <button className="button" type="submit" onClick={() => calculate()}>
            {t('PLAN.TAB_SPENT.BUTTON_LABEL.CALCULATE')}
          </button>
          <button className="button" type="submit" onClick={() => apply()}>
            {t('PLAN.TAB_SPENT.BUTTON_LABEL.SUBMIT')}
          </button>
        </div>
      </form>
    </>
  );
}
