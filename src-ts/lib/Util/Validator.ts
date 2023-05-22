import { strict } from 'assert';
import validator from 'validator';

export default class Validator {
    /**
     * Check if it's email
     * @param email 
     * @returns 
     */
    static isEmail(email: string) : boolean {
        return validator.isEmail(email);
    }

    /**
     * Check if it's boolean
     * @param bool 
     * @returns 
     */
    static isBoolean(bool: string): boolean {
        return validator.isBoolean(bool, {
            loose: false
        })
    }

    /**
     * Check if it's credit card
     * @param card 
     * @returns 
     */
    static isCreditCard(card: string): boolean {
        return validator.isCreditCard(card);
    }

    /**
     * Check if it's jwt token
     * @param token 
     * @returns 
     */
    static isJwt(token: string): boolean {
        return validator.isJWT(token);
    }

    /**
     * Check if it's us mobile phone
     * @param phone 
     * @returns 
     */
    static isUsMobilePhone(phone: string): boolean {
        return validator.isMobilePhone(phone, 'en-US');
    }

    /**
     * Check if it's strong password
     * @param password 
     * @returns 
     */
    static isStrongPassword(password: string): boolean {
        return validator.isStrongPassword(password, {
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
    }

    /**
     * escape(input)
     * eplace <, >, &, ', " and / with HTML entities.
     * @param value 
     * @returns 
     */
    static EscapeSanitizer (value: string): string {
        return validator.escape(value);
    }
    static UnEscapeSanitizer (value: string): string {
        return validator.unescape(value);
    }

    /**
     * trim(input [, chars])
     * trim characters (whitespace by default) from both sides of the input.
     * @param value 
     * @returns 
     */
    static TrimSanitizer (value: string): string {
        return validator.trim(value);
    }

    /**
     * Convert string to boolean
     * @param value 
     * @returns 
     */
    static ConvertToBoolean(value: string): boolean {
        return validator.toBoolean(value, true);
    }
}