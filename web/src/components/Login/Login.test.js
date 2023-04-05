import '@testing-library/jest-dom';
import {act, render, screen, waitFor} from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '.';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockedUseNavigate
}));

const fakeUserCredentials = {
    email: 'test@test.com',
    password: 'testPassword$'
}

describe('<Login />', () => {
    test('it should render Login page', () => {
        render (
            <BrowserRouter> 
                <Login />
            </BrowserRouter>
        )
        const [loginTitle] = screen.getAllByText(/Login/);
        const login = screen.getByRole('button', {name: /Login/});
        const emailField = screen.getByLabelText(/Email/);
        const passwordField = screen.getByLabelText(/Password/);

        expect(loginTitle).toBeInTheDocument()
        expect(login).toBeInTheDocument()
        expect(emailField).toBeInTheDocument()
        expect(passwordField).toBeInTheDocument()
    })

    test('it should allow user to type email and password and submit form',  async () => {
        const promise = Promise.resolve();
        const mockHandleLogin = jest.fn(() => promise);
        global.fetch = mockHandleLogin

        render (
            <BrowserRouter> 
                <Login />
            </BrowserRouter>
        )
        const emailField = screen.getByLabelText(/Email/);
        const passwordField = screen.getByLabelText(/Password/);
        const loginButton = screen.getByRole('button', {name: /Login/});
        
        user.type(emailField, 'test@test.com')
        user.type(passwordField, 'testPassword$')
        user.click(loginButton)
        
        await act(() => promise)

        expect(mockHandleLogin).toHaveBeenCalledTimes(1)
    })

    test('it shows an error with wrong credentials',  async () => {
        const promise = Promise.resolve({
            json: () => Promise.resolve({ message: 'invalid email or password' })
        });
        const mockHandleLogin = jest.fn(() => promise);
        global.fetch = mockHandleLogin

        render (
            <BrowserRouter> 
                <Login />
            </BrowserRouter>
        )
        const emailField = screen.getByLabelText(/Email/);
        const passwordField = screen.getByLabelText(/Password/);
        const loginButton = screen.getByRole('button', {name: /Login/});

        user.type(emailField, fakeUserCredentials.email)
        user.type(passwordField, fakeUserCredentials.password)
        user.click(loginButton)
        
        await waitFor(() =>  {
            const alert = screen.getByText(/Invalid email or password/i)
            expect(alert).toBeInTheDocument()
        })
    })

    test('it shows an error when request fails',  async () => {
        const promise = Promise.reject();
        const mockHandleLogin = jest.fn(() => promise);
        global.fetch = mockHandleLogin

        render (
            <BrowserRouter> 
                <Login />
            </BrowserRouter>
        )
        const emailField = screen.getByLabelText(/Email/);
        const passwordField = screen.getByLabelText(/Password/);
        const loginButton = screen.getByRole('button', {name: /Login/});

        user.type(emailField, fakeUserCredentials.email)
        user.type(passwordField, fakeUserCredentials.password)
        user.click(loginButton)
        
        await waitFor(() =>  {
            const alert = screen.getByText(/An error has occurred. Try again later./i)
            expect(alert).toBeInTheDocument()
        })
    })

    test('redirects to next page with right credentials',  async () => {
        const promise = Promise.resolve({
            json: () => Promise.resolve({ Token: 'fakeToken', Email: fakeUserCredentials.email })
        });

        const mockHandleLogin = jest.fn(() => promise);
        global.fetch = mockHandleLogin


        render (
            <BrowserRouter> 
                <Login />
            </BrowserRouter>
        )
        const emailField = screen.getByLabelText(/Email/);
        const passwordField = screen.getByLabelText(/Password/);
        const loginButton = screen.getByRole('button', {name: /Login/});

        user.type(emailField, fakeUserCredentials.email)
        user.type(passwordField, fakeUserCredentials.password)
        user.click(loginButton)

        await act(() => expect(mockHandleLogin).toHaveBeenCalledTimes(1))
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
        expect(mockedUseNavigate).toHaveBeenCalledWith('/buildings')
    })
})