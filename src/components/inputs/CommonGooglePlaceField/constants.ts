import getGoogleMapApiKey from "@/environments/getGoogleMapApiKey";
import { Loader } from "@googlemaps/js-api-loader";
export const APIKEY = getGoogleMapApiKey();
export const LOADER = new Loader({ apiKey: APIKEY, libraries: ["places"] });