import { MainDashboard } from '../MainDashboard/MainDashboard';
import { HeaderDashboard } from '../HeaderDashboard/HeaderDashboard';
import { BoardContainer } from './Board.styled';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBoard } from 'services/board-servises';
import { useSelector, useDispatch } from 'react-redux';
import { bgs } from 'sourse/bgs';
// import { refreshUser } from 'redux/auth/authOperations.js';

export const Board = () => {
  const dispatch = useDispatch();

  const { boardId } = useParams();

  const [filter, setfilter] = useState('');

  const handleFilterChange = newData => {
    setfilter(newData);
  };

  useEffect(() => {
    if (!boardId) {
      return;
    }
    dispatch(fetchBoard({ boardId }));
  }, [boardId, dispatch]);

  const board = useSelector(state =>
    state.boardsList.items.find(item => item._id === boardId)
  );

  const bkgImg = () => {
    if (board) {
      const result = bgs.find(bg => board.background === bg.id);
      return result;
    }
    return bgs[0];
  };

  return (
    <>
      {board && (
        <BoardContainer backgroundImg={bkgImg()}>
          <HeaderDashboard
            boardId={boardId}
            handleFilterChange={handleFilterChange}
          />
          <MainDashboard filter={filter} />
        </BoardContainer>
      )}
    </>
  );
};
