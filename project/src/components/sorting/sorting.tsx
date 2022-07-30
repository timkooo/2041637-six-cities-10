import { FC, useState } from 'react';
import { SortingTypes } from '../../const';
import { Option } from './option';

type SortingProps = {
  currentSorting: string;
};

export const Sorting: FC<SortingProps> = ({ currentSorting }) => {
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);

  const toggleSortMenu = () => setIsSortMenuVisible((prevState) => !prevState);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={toggleSortMenu}
        tabIndex={0}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isSortMenuVisible && 'places__options--opened'
        }`}
      >
        {Object.entries(SortingTypes).map(([name, value]) => (
          <Option
            key={value.toString()}
            currentSorting={currentSorting}
            sortingType={value}
            handleOptionsVisibility={toggleSortMenu}
          />
        ))}
      </ul>
    </form>
  );
};
