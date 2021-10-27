import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Modal from './Modal';

describe('Modal', () => {

    it('matches snapshot', () => {
        const tree = renderer
            .create(<Modal handleClose={jest.fn()}>Content</Modal>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})