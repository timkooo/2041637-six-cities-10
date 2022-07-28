import { FC, useRef, useState } from 'react';
import { SortingTypes } from '../../const';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { changeSorting } from '../../store/action';

type SortingProps = {
  currentSorting: string;
};

export const Sorting: FC<SortingProps> = ({ currentSorting }) => {
  const [isSortingTypeShown, setIsSortingTypeShown] = useState(false);
  const popular = useRef<HTMLLIElement>(null);
  const priceLTH = useRef<HTMLLIElement>(null);
  const priceHTL = useRef<HTMLLIElement>(null);
  const rated = useRef<HTMLLIElement>(null);

  const sortingTypeToLiElement = {
    [SortingTypes.Popular]: popular,
    [SortingTypes.PriceLowToHigh]: priceLTH,
    [SortingTypes.PriceHighToLow]: priceHTL,
    [SortingTypes.TopRated]: rated,
  };

  const [prevOption, setPrevOption] = useState(popular);
  const dispatch = useAppDispatch();

  const sortHandler = (sortingType: SortingTypes) => {
    dispatch(changeSorting(sortingType));
    setIsSortingTypeShown((prevState) => !prevState);
    prevOption.current?.classList.remove('places__option--active');
    switch (sortingType) {
      case SortingTypes.Popular:
        if (popular.current !== null) {
          popular.current.classList.add('places__option--active');
        }
        break;
      case SortingTypes.PriceLowToHigh:
        if (priceLTH.current !== null) {
          priceLTH.current.classList.add('places__option--active');
        }
        break;
      case SortingTypes.PriceHighToLow:
        if (priceHTL.current !== null) {
          priceHTL.current.classList.add('places__option--active');
        }
        break;
      case SortingTypes.TopRated:
        if (rated.current !== null) {
          rated.current.classList.add('places__option--active');
        }
        break;
    }
    setPrevOption(sortingTypeToLiElement[sortingType]);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={() => setIsSortingTypeShown((prevState) => !prevState)}
        tabIndex={0}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isSortingTypeShown && 'places__options--opened'
        }`}
      >
        <li
          className="places__option places__option--active"
          ref={popular}
          onClick={() => sortHandler(SortingTypes.Popular)}
          tabIndex={0}
        >
          Popular
        </li>
        <li
          className="places__option"
          ref={priceLTH}
          onClick={() => sortHandler(SortingTypes.PriceLowToHigh)}
          tabIndex={0}
        >
          Price: low to high
        </li>
        <li
          className="places__option"
          ref={priceHTL}
          onClick={() => sortHandler(SortingTypes.PriceHighToLow)}
          tabIndex={0}
        >
          Price: high to low
        </li>
        <li
          className="places__option"
          ref={rated}
          onClick={() => sortHandler(SortingTypes.TopRated)}
          tabIndex={0}
        >
          Top rated first
        </li>
      </ul>
    </form>
  );
};
