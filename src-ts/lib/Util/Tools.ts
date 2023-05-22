import { Request } from "express";
import MissingApiRequestObject from "./Exceptions/MissingApiRequestObject";
import ApiRequestObject from "./Objects/ApiRequestObject";
import crypto from 'crypto';
import URL from 'url';
import cryptojs from 'crypto-js';
import Moment from "./Moment";
import {v4 as uuidv4} from 'uuid';
import _ from "lodash";
import DbQueryObject from "../db/Objects/DbQueryObject";

export default class Tools {

    /**
     * Encrypt value
     * @param value 
     * @param secretkey 
     * @returns 
     */
    static encryptValue (value: string, secretkey: string): string {
        const encrypted = cryptojs.AES.encrypt(value, secretkey);
        return encrypted.toString();
    }
    
    /**
     * Decrypt value
     * @param value 
     * @param secretkey 
     * @returns 
     */
    static decryptValue (value: string, secretkey: string): string {
        const bytes = cryptojs.AES.decrypt(value, secretkey);
        const originalText = bytes.toString(cryptojs.enc.Utf8);
        return originalText;
    }
    
    /**
     * Captilize the string
     * @param value 
     * @returns 
     */
    static captilizeString(value: string): string {
        if (!value) return value;
        return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
    }

    /**
     * binary search
     * @param dataset 
     * @param searchItem 
     * @returns 
     */
    static binarySearch(dataset: Array<number>, searchItem: number): number {
        //
        if (!searchItem) return -1;
        if (dataset.length === 0) return -1;

        //
        let firstIndex = 0;
        let lastIndex = dataset.length - 1;
        
        //
        while(firstIndex <= lastIndex) {

            //  always look for middle point
            let middleIndex = (firstIndex + lastIndex) / 2;
            let middleItem = dataset[middleIndex];

            //  if the item in the middle is the item we looking for
            if (middleItem === searchItem) return middleIndex;

            //
            if (searchItem < middleItem) {
                lastIndex = middleIndex - 1;
            }

            //
            if (searchItem > middleItem) {
                firstIndex = middleIndex + 1;
            }
        }

        //  not found
        return -1;
    }

    /**
     * parse request header object
     * @param req 
     * @returns 
     */
    static parseExpressRequestObject(req: Request): ApiRequestObject {
        if (!req) throw new MissingApiRequestObject();
        
        //
        const {headers, headers:{ referer, authorization }, method, statusCode, statusMessage, rawHeaders, body, query, cookies, url, socket} = req;

        //  parse to the object
        const response = new ApiRequestObject({
            userAgent: headers['user-agent'] ?? null,
            accept: headers.accept ?? null,
            host: headers.host,
            acceptEncoding: headers['accept-encoding'] ?? null,
            cookie: cookies ?? null,
            authorization: authorization,
            ip: socket.remoteAddress!,
            url: url,
            method: method,
            statusCode: statusCode ?? 200,
            statusMessage: statusMessage,
            referer: referer ?? null,
            body: JSON.parse(JSON.stringify(body)),
            refererQuery: (referer) ? URL.parse(referer, true).query : {},
            query,
            domain: "",
            authObject: null
        })

        //  assign auth object
        if (authorization) {
            const [authType, authCode] = authorization.split(' ');            
            response.authObject = {
                type: authType,
                token: authCode
            }
        }

        return response;
    }

    /**
     * Parse query param
     * @param address
     * @returns
     */
    static parseQueryParam(url: string): any {
        return URL.parse(url, true).query;
    }

    /**
     * parse query param to object
     * @param queryParam 
     * @returns 
     */
    static queryParamToObject (queryParam: string): any {
        const queryArr = queryParam.split('&');
        let obj = {};
        queryArr.forEach(el => {
            const [key, value] = el.split('=');
            obj[key] = value;
        });
        return obj;
    }

    /**
     * Encode all apostrophes in string
     * @param value 
     * @returns 
     */
    static encodeApostrophe(value: string): string {
        if(value === '') return value;
        return value.replace(/'/g, '&#39;');
    }

    /**
     * Decode all apostrophes in string
     * @param value 
     * @returns 
     */
    static decodeApostrophe(value: string): string {
        if(value === '') return value;
        return value.replace(/&#39;/g, "'");
    }

    /**
     * Sanitized input
     * @param value 
     * @returns 
     */
    static sanitizedInput(value: string): string { 
        return value.replace(/<[^>]*>/g, '');
    }

    /**
     * Generate salt code
     * @returns
     */
    static generateSalt() : string {
        return crypto.randomBytes(16).toString('hex');
    }

    /**
     * Generate unique id
     * @returns 
     */
    static generateUniqueId() : string {
        return uuidv4();
    }

    /**
     * Generate timestamp value
     * @param date
     * @returns
     */
    static generateTimestamp(date?: string) : number {
        return Moment.dateToTimestamp((date) ? new Date(date) : new Date());
    }

    /**
     * String to hex
     * @param {*} string
     * @returns
     */
    static encodeStringToHex(string: string): string {
        return Buffer.from(string, 'utf8').toString('hex')
    }

    /**
     * Hex to string
     * @param {*} hexcode
     * @returns
     */
    static decodeHexToString(hexcode: string): string {
        return Buffer.from(hexcode, 'hex').toString('utf8')
    }

    /**
     * Base64 to string
     * @param value
     * @returns
     */
    static decodeBase64ToString(value: string): string {
        return Buffer.from(value, 'base64').toString('utf8')
    }

    /**
     * String to base 64
     * @param value
     * @returns
     */
    static endoceStringToBase64(value: string): string {
        return Buffer.from(value, 'utf8').toString('base64')
    }

    /**
     * Get random item
     * @param items 
     * @returns 
     */
    static getRandomItem<T>(items: Array<T>): T {
        return items[Math.floor(Math.random() * items.length)];
    }

    /**
     * Remove the duplicate item
     * @param items 
     * @returns 
     */
    static getUniqueItem<T>(items: Array<T>): Array<T> {
        return [...new Set(items)];
    }

    /**
     * Sort objects
     * @param items 
     * @param key 
     * @returns 
     */
    static sortObjects<T>(items: Array<T>, key: string): Array<T> {
        return items.sort((a, b) => {
            return (a[key] > b[key]) 
                ? 1 
                : (a[key] < b[key]) 
                    ? -1 
                    : 0
        });
    }

    /**
     * Deep comparison
     * @param itemA 
     * @param itemB 
     * @returns 
     */
    static deepComparison<T> (itemA: T, itemB: T): boolean {
        return _.isEqual(itemA, itemB);
    }

    /**
     * Insert item into array
     * @param items 
     * @param item 
     * @param index 
     * @returns 
     */
    static insertItemIntoArray<T> (items: Array<T>, item: T, index: number): Array<T> {
        return [...items.slice(0, index), item, ...items.slice(index)];
    }
}