import {render, screen} from '@testing-library/react';
import { makeFakeComment } from '../../utils/mocks';
import { CommentItem } from './comment-item';

const fakeComment = makeFakeComment();

describe('Component: CommentItem', () => {
  it('should render correctly', () => {
    render(
      <CommentItem comment={fakeComment}/>);

    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
  });
});
