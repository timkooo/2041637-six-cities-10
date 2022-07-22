import { FC } from 'react';
import { Review } from '../review/review';
import { Comment } from '../../types/comment';

type ReviewsListProps = {
  reviews: Comment[];
};

export const ReviewsList: FC<ReviewsListProps> = ({ reviews }) => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <Review key={review.id} review={review} />
    ))}
  </ul>
);
