import React from 'react';
import RatingSelector from './ratingSelector';
import renderer from 'react-test-renderer';
import expect from 'expect';

describe('RatingSelector component', () => {
  it('should render as expected', () => {
    
    const ratingSelector = renderer.create(
      <RatingSelector minimumRating={5} onChange={() => {}} />
    )

    let tree = ratingSelector.toJSON();
    expect(tree).toMatchSnapshot();

    // TODO:

  });
});
