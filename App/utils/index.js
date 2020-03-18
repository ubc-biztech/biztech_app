import { STAGING_API } from 'react-native-dotenv';
import { STAGING_API_KEY } from 'react-native-dotenv';

const API_URL = STAGING_API
const API_KEY = STAGING_API_KEY

export function fetchBackend(endpoint, method, body) {
    let headers;
    if (method === 'POST') {
        headers = {
            'x-api-key': API_KEY,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    } else { // method === 'GET'
        headers = {
            'x-api-key': API_KEY
        }
    }
    return fetch(API_URL + endpoint, { method, headers, body })
}