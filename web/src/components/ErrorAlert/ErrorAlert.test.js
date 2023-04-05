import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ErrorAlert from '.'
import { act, render, screen } from '@testing-library/react';

describe('<ErrorAlert />', () => {
    test('it should render ErrorAlert component', () => {
        const message = 'test message';
        const isOpen = true;
        render (
            <BrowserRouter> 
                <ErrorAlert error={message} open={isOpen} />
            </BrowserRouter>
        )
        const errorMessage = screen.getByText(message);
        expect(errorMessage).toBeInTheDocument()
    })

    test('it should call onClose when timer is done', () => {
        jest.useFakeTimers();
        const message = 'test message';
        const isOpen = true;
        const mockHandleClose = jest.fn();
        render (
            <BrowserRouter> 
                <ErrorAlert error={message} open={isOpen} onClose={mockHandleClose}/>
            </BrowserRouter>
        )
        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(mockHandleClose).toHaveBeenCalled();
    })
})