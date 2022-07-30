import { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { changeSorting } from '../../store/action';

type OptionProps = {
  currentSorting: string;
  sortingType: string;
  handleOptionsVisibility: (state: boolean) => void;
};

export const Option: FC<OptionProps> = ({
  currentSorting,
  sortingType,
  handleOptionsVisibility,
}) => {
  const [isSortingTypeSelected, setisSortingTypeSelected] = useState(false);
  const dispatch = useAppDispatch();

  if (currentSorting !== sortingType && isSortingTypeSelected) {
    setisSortingTypeSelected(false);
  }

  let optionClass = 'places__option';
  if (isSortingTypeSelected) {
    optionClass += ' places__option--active';
  }

  const sortHandler = (type: string) => {
    if (currentSorting !== sortingType) {
      dispatch(changeSorting(type));
      setisSortingTypeSelected((prevState) => !prevState);
    }
    handleOptionsVisibility(false);
  };

  return (
    <li
      className={optionClass}
      onClick={() => sortHandler(sortingType)}
      tabIndex={0}
    >
      {sortingType}
    </li>
  );
};
