import { validateEmail } from './validators';

describe('validateEmail', () => {
    test('it should return true for valid email', () => {
        const email = 'test@test.com';
        const result = validateEmail(email);
        expect(result).not.toBe(null);
    })

    test('it should return false for invalid email', () => {
        const testCases = [
            'test',
            'test@test',
            'test@test.',
            '@test.',
            'test@.com',
            ''
        ]
        testCases.forEach(testCase => {
            const result = validateEmail(testCase);
            expect(result).toBe(null);
        })
    })
});