import { CommentItem } from '../comment-item/comment-item';
import { useAppSelector } from '../../hooks/rtkHooks';
import {
  selectAreCommentsLoaded,
  selectSortedComments,
} from '../../store/comments/comments.selectors';

export const CommentsList = () => {
  const comments = useAppSelector(selectSortedComments);
  const areCommentsLoaded = useAppSelector(selectAreCommentsLoaded);

  if (!areCommentsLoaded) {
    return <p>Loading comments . . .</p>;
  }

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{comments.length}</span>
      </h2>

      <ul className="reviews__list">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  );
};
