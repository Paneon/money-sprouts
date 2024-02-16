import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Chore } from '@/client/config/chores';
import { formatCentsToEuro } from '@/client/utils/currency';
import './PlanEarnings.scss';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useChores from '@/client/hooks/useChores';
import { useEffect, useState } from 'react';
import { Message } from '@/client/interfaces/Message';
import {
  createEmptyMessage,
  createErrorMessage,
  createInfoMessage,
  createSuccessMessage,
} from '@/client/utils/MessageFactory';
import MessageContainer from '@/client/components/MessageContainer';
import { resourceUrlForAccount } from '@/client/utils/resource.factory';
import useTransactions from '@/client/hooks/useTransactions';

interface Inputs {
  selectedChore: null | string;
}

interface Props {
  onCalculateEarning: (v: number | null) => void;
}

const messages = {
  errorNoSelection: 'PLAN.TAB_EARN.ERROR_MESSAGE.NO_SELECTION',
  errorGeneral: 'PLAN.TAB_EARN.ERROR_MESSAGE.GENERAL',
  success: 'PLAN.TAB_EARN.MESSAGE_SUCCESS',
  confirm: 'PLAN.TAB_EARN.MESSAGE_CONFIRM',
  buttonSubmit: 'PLAN.TAB_EARN.BUTTON_LABEL.SUBMIT',
};

export default function PlanEarnings({ onCalculateEarning }: Props) {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: chores, getChores } = useChores();
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<Inputs>({
      defaultValues: {
        selectedChore: null,
      },
    });
  const [message, setMessage] = useState<Message>(createEmptyMessage());
  const { addTransaction } = useTransactions();

  useEffect(() => {
    getChores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChoreSelect(chore: Chore) {
    const currentSelection = getValues('selectedChore');
    const isSelected = currentSelection == chore.id;
    setValue('selectedChore', isSelected ? null : chore.id);
    calculate();
  }

  function calculate() {
    const selected = getValues('selectedChore');
    if (selected !== null && chores.length) {
      const choreValue = chores.find(
        (chore) => chore.id === selected[0]
      )?.value;
      if (choreValue) {
        onCalculateEarning(choreValue);
        setMessage(createInfoMessage(messages.confirm));
        return;
      } else {
        setMessage(createErrorMessage(messages.errorGeneral));
      }
    } else {
      setMessage(createErrorMessage(messages.errorNoSelection));
    }
    onCalculateEarning(null);
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setMessage(createEmptyMessage());

    if (!id) {
      setMessage(createErrorMessage('Invalid Account.'));
      return;
    }

    const chore = chores.filter((c) => c.id === data.selectedChore)[0];

    if (!chore) {
      setMessage(createErrorMessage(messages.errorNoSelection));
      return;
    }

    addTransaction({
      title: t(chore.name),
      value: chore.value,
      account: resourceUrlForAccount(id),
    })
      .then(() => {
        setMessage(createSuccessMessage(t(messages.success)));
      })
      .catch(() => {
        setMessage(createErrorMessage(t(messages.errorGeneral)));
      })
      .finally(() => {
        setValue('selectedChore', null);
      });
  };

  const onInvalid: SubmitErrorHandler<Inputs> = () => {
    setMessage(createErrorMessage(messages.errorNoSelection));
  };

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      {chores.map((chore, index) => (
        <div key={index} className="chore-item form-check">
          <input
            type="checkbox"
            className="checkbox form-check-input"
            value={chore.id}
            {...register('selectedChore')}
            name={`chore-${chore.id}`}
            id={`chore-${chore.id}`}
            onClick={() => onChoreSelect(chore)}
            checked={watch('selectedChore') === chore.id}
          />
          <label htmlFor={`chore-${chore.id}`} className="form-check-label">
            <img
              src={chore.iconPath}
              alt={t(chore.name)}
              className="chore-icon"
            />
            <span className="chore-name">{t(chore.name)}</span>
            <span className="chore-sum">{formatCentsToEuro(chore.value)}</span>
          </label>
        </div>
      ))}

      <div className="button-group--plan-page">
        <button className="button" type="submit">
          {t(messages.buttonSubmit)}
        </button>
      </div>
      <MessageContainer
        icon={message.icon}
        message={message.message}
        type={message.type}
      />
    </form>
  );
}
