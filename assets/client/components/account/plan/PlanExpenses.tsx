import { useTranslation } from 'react-i18next';
import './PlanExpenses.scss';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  createEmptyMessage,
  createErrorMessage,
  createSuccessMessage,
} from '@/client/utils/MessageFactory';
import { Message } from '@/client/interfaces/Message';
import MessageContainer from '@/client/components/MessageContainer';
import { parseFormattedCurrencyToCents } from '@/client/utils/currency';
import clsx from 'clsx';
import useTransactions from '@/client/hooks/useTransactions';
import { useParams } from 'react-router-dom';
import { resourceUrlForAccount } from '@/client/utils/resource.factory';

type Inputs = {
  title: string;
  amount: string;
};

interface Props {
  onCalculateExpense: (v: number) => void;
}

export default function PlanExpenses({ onCalculateExpense }: Props) {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { title: '', amount: '' },
  });
  const [message, setMessage] = useState<Message>(createEmptyMessage());
  const { addTransaction, isLoading, error } = useTransactions();

  async function calculate() {
    await trigger('amount');
    const amount = watch('amount');

    if (amount === '' || errors.amount) {
      let errorMessage = t('PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INCOMPLETE');

      switch (errors.amount?.type) {
        case 'pattern':
          errorMessage = t('PLAN.TAB_SPENT.ERROR_MESSAGE.AMOUNT_INPUT');
      }

      setMessage(createErrorMessage(errorMessage));
      return;
    }

    onCalculateExpense(parseFormattedCurrencyToCents(amount));
    setMessage(createSuccessMessage('PLAN.TAB_SPENT.MESSAGE_CONFIRM'));
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('on submit', data);
    if (!id) {
      throw new Error('Invalid Account ID');
    }

    addTransaction({
      title: data.title,
      value: parseFormattedCurrencyToCents(data.amount),
      account: resourceUrlForAccount(id),
    })
      .then((r) => {
        setMessage(createSuccessMessage(t('PLAN.TAB_SPENT.MESSAGE_SUCCESS')));
      })
      .catch(() => {
        setMessage(
          createErrorMessage(t('PLAN.TAB_SPENT.ERROR_MESSAGE.GENERAL'))
        );
      });
  };

  const onInvalid: SubmitErrorHandler<Inputs> = async (errors) => {
    let errorMessage = t('PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INCOMPLETE');
    if (errors.amount?.type === 'pattern') {
      errorMessage = t('PLAN.TAB_SPENT.INPUT_HINT.AMOUNT_INPUT');
    } else if (errors.title?.type === 'pattern') {
      errorMessage = t('PLAN.TAB_SPENT.INPUT_HINT.PRODUCT_INPUT');
    }

    setMessage(createErrorMessage(errorMessage));
  };

  return (
    <>
      <form
        className="form-container"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <div className="form-group">
          <label className="name-label" htmlFor="title">
            {t('PLAN.TAB_SPENT.NAME_LABEL')}
          </label>
          <input
            className="name-input"
            type="text"
            id="title"
            title={t('PLAN.TAB_SPENT.INPUT_HINT.PRODUCT_INPUT')}
            {...register('title', {
              required: true,
              pattern: /^[a-zA-Zs0-9-.]+$/,
            })}
          />
        </div>

        <div className="form-group">
          <label className="amount-label" htmlFor="amount">
            {t('PLAN.TAB_SPENT.AMOUNT_LABEL')}
          </label>
          <input
            className={clsx({
              'amount-input': true,
              'border-danger': errors.amount,
            })}
            type="text"
            required
            title={t('PLAN.TAB_SPENT.INPUT_HINT.AMOUNT_INPUT')}
            {...register('amount', {
              required: true,
              pattern: /^\d+(?:,\d{1,2})?$/,
            })}
          />
        </div>

        <div className="button-group--plan-page">
          <button className="button" type="button" onClick={() => calculate()}>
            {t('PLAN.TAB_SPENT.BUTTON_LABEL.CALCULATE')}
          </button>
          <button
            className="button"
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? 'Saving..' : t('PLAN.TAB_SPENT.BUTTON_LABEL.SUBMIT')}
          </button>
        </div>
      </form>
      <MessageContainer
        icon={message.icon}
        message={message.message}
        type={message.type}
      />
    </>
  );
}
