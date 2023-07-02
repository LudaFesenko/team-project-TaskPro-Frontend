import { Modal } from 'components/Modal';
// import { useState } from 'react';
import icon from '../../sourse/sprite.svg';
import {
  Wrap,
  DeadlineIcon,
  DeadlineWrapper,
  DeadlineIconBlur,
} from './EditPanelCard.Styled';
import { SvgBtn } from 'components/SvgBtn/SvgBtn';
import { useToggleModal } from 'hooks';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'services/board-servises';
import { differenceInHours } from 'date-fns';

export const EditPanelCard = ({ id, deadline }) => {
  const { isOpen, close, open } = useToggleModal();
  // const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const onDelete = id => {
    dispatch(deleteTask(id));
    // сохранить в стейт /перерендерить страницу
    close();
  };

  const is24Hours = differenceInHours(new Date(deadline), Date.now()) < 24;
  console.log(is24Hours);
  return (
    <>
      <Wrap>
        {is24Hours && (
          <DeadlineWrapper>
            <DeadlineIconBlur />
            <DeadlineIcon width="16" height="16">
              <use xlinkHref={`${icon}#${'icon-bell'}`} />
            </DeadlineIcon>
          </DeadlineWrapper>
        )}
        <SvgBtn idIcon={'icon-move'} onClick={() => {}} />
        <SvgBtn idIcon={'icon-pencil'} onClick={open} />
        <SvgBtn idIcon={'icon-trash'} onClick={onDelete} />
        {isOpen && <Modal onClose={close}>"edit card"</Modal>}
      </Wrap>
    </>
  );
};
