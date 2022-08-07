import { CommentItem } from '../comment-item/comment-item';
import { CommentsForm } from '../comments-form/comments-form';
import { useAppSelector } from '../../hooks/rtkHooks';
import { selectAreCommentsLoaded, selectComments } from '../../store/comments/comments.selectors';
import { selectAuthorizationStatus } from '../../store/user/user.selectors';
import { AuthorizationStatus } from '../../const';
import { FC } from 'react';

type CommentsListProps = {
  placeId: string;
}

export const CommentsList: FC<CommentsListProps> = ({placeId}) => {
  const comments = useAppSelector(selectComments).slice(-10).reverse();
  const areCommentsLoaded = useAppSelector(selectAreCommentsLoaded);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (!areCommentsLoaded) {
    return (<section className="property__reviews reviews">Loading comments . . .</section>);
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{comments.length}</span>
      </h2>

      <ul className="reviews__list">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <CommentsForm id={placeId}/>}
    </section>
  );
};
