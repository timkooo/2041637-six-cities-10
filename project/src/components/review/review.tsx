import { FC } from 'react';
import { Comment } from '../../types/comment';
import { getDateFromString, getRating } from '../../utils';

type ReviewProps = {
  review: Comment;
};

export const Review: FC<ReviewProps> = ({ review }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={review.user.avatarUrl}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{review.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{ width: getRating(review.rating)}}></span>
          <span className="visually-hidden">{review.rating}</span>
        </div>
      </div>
      <p className="reviews__text">{review.comment}</p>
      <time className="reviews__time" dateTime={getDateFromString(review.date)}>
        {review.date}
      </time>
    </div>
  </li>
);
