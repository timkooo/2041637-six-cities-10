import { FC } from 'react';
import { Comment } from '../../types/comment';
import {
  getRating,
  formatDateDisplayValue,
  formatDateAttribute,
} from '../../utils';

type CommentItemProps = {
  comment: Comment;
};

export const CommentItem: FC<CommentItemProps> = ({ comment }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={comment.user.avatarUrl}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{comment.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{ width: getRating(comment.rating) }}></span>
          <span className="visually-hidden">{comment.rating}</span>
        </div>
      </div>
      <p className="reviews__text">{comment.comment}</p>
      <time
        className="reviews__time"
        dateTime={formatDateAttribute(comment.date)}
      >
        {formatDateDisplayValue(comment.date)}
      </time>
    </div>
  </li>
);
