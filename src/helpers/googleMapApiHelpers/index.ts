import { Loader } from '@googlemaps/js-api-loader';
import getGoogleMapApiKey from "@/environments/getGoogleMapApiKey";
const APIKEY = getGoogleMapApiKey();
let isLoaded = false;
/**
 * IMPORTANT! DO NOT CHANGE.
 * this value must be the same as the one of `google-map-react`
 */
const LOADER = new Loader({ apiKey: APIKEY, libraries: [] });
export const placeService: { current: google.maps.places.AutocompleteService } = { current: null as any };
export function loadPlacesLibrary() {
  if (isLoaded) return;
  LOADER.load().then(async () => {
    if (!google) return;
    const { AutocompleteService } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
    placeService.current = new AutocompleteService();
    isLoaded = true;
  });
}