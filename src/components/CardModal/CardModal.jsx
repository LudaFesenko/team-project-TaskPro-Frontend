import { useState } from 'react';
import React from 'react';
import { Modal } from 'components/Modal';
import {
  TitleCard,
  StyledForm,
  StyledField,
  LabelTitle,
  Labels,
  RadioLabel,
  LabelRadiobutton,
  Checkmark,
  DedlineTitle,
  ButtonCard,
  Textarea,
  ErrorText,
  ErrorMessageText,
} from './CardModal.styled';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import TaskCalendar from 'components/Board/TaskCalendar/TaskCalendar';
// import { useDispatch } from 'react-redux';
import { addCard } from 'services/board-servises';

const labels = [
  { value: 'without', color: '#FFFFFF4D' },
  { value: 'low', color: '#8FA1D0' },
  { value: 'medium', color: '#E09CB5' },
  { value: 'high', color: '#BEDBB0' },
];

const CommentSchema = Yup.object().shape({
  title: Yup.string().required('title is required'),
  description: Yup.string().required('Description is required'),
});

const CardModal = ({ isOpen, onClose, operationName, id }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [date, setDate] = useState(new Date());

  if (!isOpen) {
    return null;
  }

  const onDateChange = selectDate => {
    setDate(selectDate);
  };

  const handleSubmit = async (value, { setSubmitting }) => {
    value.deadline = date;
    setSubmitting(true);

    const response = await dispatch(addCard({ id, value }));
    if (response.error) {
      setErrorMessage(response.payload);
    } else {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TitleCard>{operationName} card</TitleCard>
      <Formik
        initialValues={{
          title: '',
          description: '',
          label: 'without',
          deadline: '',
        }}
        validationSchema={CommentSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <StyledField name="title" type="text" placeholder="Title" />
            <ErrorText name="title" component="div" />

            <Textarea
              name="description"
              as="textarea"
              placeholder="Description"
            />
            <ErrorText name="description" component="div" />

            <LabelTitle>Label color</LabelTitle>
            <Labels>
              {labels.slice().map(({ name, value, color }) => (
                <div style={{ display: 'flex' }} key={value}>
                  <RadioLabel buttoncolor={color} className="inputlabel">
                    <LabelRadiobutton
                      buttoncolor={color}
                      name="label"
                      type="radio"
                      value={value}
                    />
                    <Checkmark buttoncolor={color}></Checkmark>
                  </RadioLabel>
                  <p style={{ fontSize: 'var(--fontSize12)' }}>{name}</p>
                </div>
              ))}
            </Labels>

            <DedlineTitle>Deadline</DedlineTitle>
            <TaskCalendar dateChange={onDateChange} initialDate={date} />
            <ButtonCard type="submit" disabled={isSubmitting}>
              {operationName}
            </ButtonCard>
            {errorMessage && (
              <ErrorMessageText>{errorMessage}</ErrorMessageText>
            )}
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default CardModal;
