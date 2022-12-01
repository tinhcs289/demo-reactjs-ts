import MockAdapter from 'axios-mock-adapter';
import httpMock from '@/api/httpMock';

const mockAdapter = new MockAdapter(httpMock);
export default mockAdapter;
