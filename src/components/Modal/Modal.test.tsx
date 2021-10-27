import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Modal from './Modal';
import { fireEvent, render, screen, within } from '@testing-library/react';

describe('Modal', () => {

    it('matches snapshot', () => {
        const tree = renderer
            .create(<Modal handleClose={jest.fn()}>Content</Modal>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it('calls handleClose function when close button is clicked', () => {
        const handleCloseMock = jest.fn()
        render(<Modal handleClose={handleCloseMock}>Content</Modal>)
        const closeButton = screen.getByRole('button')
        fireEvent.click(closeButton)
        expect(handleCloseMock).toBeCalled()
    })
})