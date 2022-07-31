import { FC, useState } from 'react';
import { SortingTypes } from '../../const';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { changeSorting } from '../../store/action';
import classNames from 'classnames';

type SortingProps = {
  currentSorting: keyof typeof SortingTypes;
};

export const Sorting: FC<SortingProps> = ({ currentSorting }) => {
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState('Popular');
  const toggleSortMenu = () => setIsSortMenuVisible((prevState) => !prevState);
  const dispatch = useAppDispatch();

  const handleSelectedSorting = (sorting: string) => {
    if (currentSorting === sorting) {
      return;
    }
    setSelectedSorting(sorting);
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
        {Object.entries(SortingTypes).map(([name, value]) => (
          <li
            key={value}
            className={classNames('places__option', {'places__option--active' : selectedSorting === name})}
            onClick={() => handleSelectedSorting(name)}
            tabIndex={0}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
};
