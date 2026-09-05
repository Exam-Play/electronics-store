import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/style.scss'

createRoot(document.querySelector('body')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);