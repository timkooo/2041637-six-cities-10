import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { postCommentAction } from '../../store/api-actions';
import { CommentData } from '../../types/comment-data';

type CommentsFormProps = {
  id: string;
};

const ratingConfig = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export const CommentsForm: FC<CommentsFormProps> = ({ id }) => {
  const placeId = id;
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<CommentData>({
    comment: '',
    rating: 0,
  });

  const isSubmitDisabled = !(formData.comment && formData.rating);

  const handleInputRaiting = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputReview = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postCommentAction({ formData, placeId }));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingConfig).map(([stars, title]) => (
          <React.Fragment key={stars}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={stars}
              id={`${stars}-stars`}
              type="radio"
              onChange={handleInputRaiting}
            />
            <label
              htmlFor={`${stars}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleInputReview}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
