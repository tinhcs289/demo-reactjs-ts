import language from '@/browser/localStorage/language';
import getEnviromentName, { environmentIs } from '@/environments/getEnvironmentName';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
// turn off all console message logger on production
if (environmentIs.production()) {
  window.console.log = function (...data: any[]) {};
  window.console.warn = function (...data: any[]) {};
  window.console.info = function (...data: any[]) {};
}
console.log(`---- environment: ${getEnviromentName()} ----`);
console.log(`---- accept-language: ${language.get()} ----`);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
reportWebVitals();
//@ts-ignore
window.debugUIOnHover = function (ms?: number) {
  setTimeout(() => {
    debugger;
  }, ms || 2000);
};
