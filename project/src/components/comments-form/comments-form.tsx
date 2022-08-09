import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { postCommentAction } from '../../store/api-actions';
import { CommentData } from '../../types/comment-data';

type CommentsFormProps = {
  id: string;
};

const ratingConfig = [
  { rating: '5', value: 'perfect' },
  { rating: '4', value: 'good' },
  { rating: '3', value: 'not bad' },
  { rating: '2', value: 'badly' },
  { rating: '1', value: 'terribly' },
];

export const CommentsForm: FC<CommentsFormProps> = ({ id: placeId }) => {
  const dispatch = useAppDispatch();
  const [formDisableState, setFormDisableState] = useState<boolean>(false);

  const [formData, setFormData] = useState<CommentData>({
    rating: '',
    comment: '',
  });

  const isSubmitDisabled = !(formData.comment && formData.rating);

  const handleFormChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormDisableState(true);
    dispatch(postCommentAction({ formData, placeId }));
    setFormDisableState(false);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingConfig.map((rating) => (
          <React.Fragment key={rating.rating}>
            <input
              className="form__rating-input visually-hidden"
              checked={rating.rating === formData.rating}
              name="rating"
              value={rating.rating}
              id={`${rating.rating}-stars`}
              type="radio"
              disabled={formDisableState}
              onChange={handleFormChange}
            />
            <label
              htmlFor={`${rating.rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={rating.value}
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
        onChange={handleFormChange}
        disabled={formDisableState}
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
