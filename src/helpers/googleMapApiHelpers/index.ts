import { Loader } from '@googlemaps/js-api-loader';
import getGoogleMapApiKey from "@/environments/getGoogleMapApiKey";
import tryDo from '@/functions/tryDo';
const APIKEY = getGoogleMapApiKey();
let isLoaded = false;
/**
 * IMPORTANT! DO NOT CHANGE.
 * this value must be the same as the one of `google-map-react`
 */
const LOADER = new Loader({ apiKey: APIKEY, libraries: [] });
export const placeService: { current: google.maps.places.AutocompleteService } = { current: null as any };
export const placeDetailService: { current: google.maps.Geocoder } = { current: null as any };
export function loadPlacesLibrary() {
  if (isLoaded) return;
  LOADER.load().then(async () => {
    if (!google) return;
    const { AutocompleteService } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
    placeService.current = new AutocompleteService();
    const { Geocoder } = (await google.maps.importLibrary('geocoding')) as google.maps.GeocodingLibrary;
    placeDetailService.current = new Geocoder();
    isLoaded = true;
  });
}
export async function getPlacesBySearchText(searchText: string): Promise<google.maps.places.AutocompletePrediction[]> {
  if (!searchText || !searchText.trim()) return [];
  if (!placeService.current) return [];
  const promise = new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
    placeService.current
      .getPlacePredictions({ input: searchText })
      .then((results) => {
        resolve(results?.predictions || []);
      })
      .catch(reject);
  });
  const [error, results] = await tryDo(promise);
  if (!!error || !results) return [];
  return results;
}
export async function getPlaceById(placeId: string): Promise<google.maps.GeocoderResult | null | undefined> {
  if (!placeId || !placeId.trim()) return null;
  if (!placeDetailService.current) return null;
  const promise = new Promise<google.maps.GeocoderResult | null | undefined>((resolve, reject) => {
    placeDetailService.current
      .geocode({ placeId })
      .then(({ results }) => {
        if (!results?.[0]) resolve(null);
        return resolve(results[0]);
      })
      .catch(reject);
  });
  const [error, result] = await tryDo(promise);
  if (!!error || !result) return null;
  return result;
}