import {renderHook } from '@testing-library/react';
import { Map } from 'leaflet';
import { MutableRefObject } from 'react';
import { makeFakeCity } from '../utils/mocks';
import { useMap } from './useMap';

const fakeCity = makeFakeCity();
const fakeMapRef: MutableRefObject<HTMLElement> = {current: document.createElement('div')};

describe('Hook: useMap', () => {
  it('should return object Map', () => {
    const {result} = renderHook(() =>
      useMap(fakeMapRef, fakeCity),
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });

});
