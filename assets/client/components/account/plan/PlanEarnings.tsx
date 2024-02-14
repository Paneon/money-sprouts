import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Chore, chores } from '@/client/config/chores';
import { formatCentsToEuro } from '@/client/utils/currency';
import './PlanEarnings.scss';

interface TextWithIcon {
  text: string;
  icon: string;
}

export default function PlanEarnings() {
  const { t } = useTranslation();
  const { id } = useParams();

  function onChoreSelect(chore: Chore) {
    // if (chore.selected) {
    //   this.clearAction();
    //   this.chores.forEach((c) => {
    //     c.selected = c.id === chore.id;
    //     if (c.id !== chore.id) {
    //       c.calculated = false;
    //     }
    //   });
    //   this.selectedChore = chore;
    // } else {
    //   this.selectedChore = null;
    // }
  }

  function calculate() {
    // if (this.selectedChore && !this.selectedChore.calculated) {
    //   console.log('selected Sum:', this.selectedChore.sum);
    //   const formatedAmount = this.selectedChore.sum * 100;
    //   this.calculateAmount.emit(formatedAmount);
    //   this.icon = 'ℹ';
    //   this.message = 'PLAN.TAB_EARN.MESSAGE_CONFIRM';
    //   this.selectedChore.calculated = true;
    // } else if (this.selectedChore && this.selectedChore.calculated) {
    //   this.message = '';
    //   this.errorMessage = 'PLAN.TAB_EARN.MESSAGE_DENY';
    //   this.icon = '⚠';
    // } else {
    //   this.clearMessages();
    //   this.icon = '⚠';
    //   this.errorMessage = 'PLAN.TAB_EARN.ERROR_MESSAGE.NO_SELECTION';
    // }
  }

  function apply() {
    // if (this.selectedChore) {
    //   this.clearMessages();
    //   this.translate
    //     .get(this.selectedChore.name)
    //     .subscribe((translatedTitle) => {
    //       const title = translatedTitle;
    //       const amount = this.selectedChore.sum * 100;
    //
    //       console.log('selected name & sum:', translatedTitle, amount);
    //
    //       this.applyChanges.emit({ title, amount });
    //       this.resetChoreSelection();
    //     });
    //
    //   this.message = 'PLAN.TAB_EARN.MESSAGE_SUCCESS';
    //   this.icon = '✔';
    // } else {
    //   this.clearMessages();
    //   this.icon = '⚠';
    //   this.errorMessage = 'PLAN.TAB_EARN.ERROR_MESSAGE.NO_SELECTION';
    // }
  }

  return (
    <div>
      {chores.map((chore, index) => (
        <div key={index} className="chore-item">
          <input
            type="checkbox"
            className="checkbox"
            id={chore.id}
            name={`chore-${chore.id}`}
            onChange={() => onChoreSelect(chore)}
          />
          <label htmlFor={`chore-${chore.id}`}>
            <img
              src={chore.iconPath}
              alt={t(chore.name)}
              className="chore-icon"
            />
            <span className="chore-name">{t(chore.name)}</span>
            <span className="chore-sum">{formatCentsToEuro(chore.sum)}</span>
          </label>
        </div>
      ))}

      <div className="button-group--plan-page">
        <button className="button" type="submit" onClick={() => calculate()}>
          {t('PLAN.TAB_EARN.BUTTON_LABEL.CALCULATE')}
        </button>
        <button className="button" type="submit" onClick={() => apply()}>
          {t('PLAN.TAB_EARN.BUTTON_LABEL.SUBMIT')}
        </button>
      </div>
    </div>
  );
}
