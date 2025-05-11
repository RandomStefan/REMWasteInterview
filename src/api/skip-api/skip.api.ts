import type SkipEntry from '../../types/skip.interface';
import fallbackData from './skip.data.json'

export default async function getSkipData(postcode: string, area: string): Promise<SkipEntry[]> {
    const url = `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`;
    let response = null;
    try {
        console.info('Attempting to fetch data from url: ', url);
        response = await fetch(url);
    } catch (error) {
        console.error('Error fetching skip data: ', error);
        return fallbackData;
    }
    if (!response.ok) {
        console.warn('Response did not have an expected output, falling back to default data');
        return fallbackData;
    }
    const data = await response.json();
    return data;
}