import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const httpMock = Axios.create();
export default httpMock;
export const mockAdapter = new MockAdapter(httpMock);
