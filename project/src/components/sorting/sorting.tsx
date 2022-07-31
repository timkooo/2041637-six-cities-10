import { FC, useState } from 'react';
import { SortingTypes } from '../../const';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { changeSorting } from '../../store/action';
import classNames from 'classnames';

const sortingOptions: { label : string, type : SortingTypes}[] = [
  {
    label: 'Popular',
    type: SortingTypes.Popular,
  },
  {
    label: 'Price: low to high',
    type: SortingTypes.PriceLowToHigh,
  },
  {
    label: 'Price: high to low',
    type: SortingTypes.PriceHighToLow,
  },
  {
    label: 'Top rated first',
    type: SortingTypes.TopRated,
  }
];

type SortingProps = {
  currentSorting: SortingTypes;
};

export const Sorting: FC<SortingProps> = ({ currentSorting }) => {
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const toggleSortMenu = () => setIsSortMenuVisible((prevState) => !prevState);
  const dispatch = useAppDispatch();

  const handleSelectedSorting = (sorting: SortingTypes) => {
    if (currentSorting === sorting) {
      return;
    }
    dispatch(changeSorting(sorting));
    toggleSortMenu();
  };

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
        className={classNames('places__options places__options--custom', {'places__options--opened' : isSortMenuVisible })}
      >
        {sortingOptions.map((option) => (
          <li
            key={option.type}
            className={classNames('places__option', {'places__option--active' : currentSorting === option.type})}
            onClick={() => handleSelectedSorting(option.type)}
            tabIndex={0}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
};
