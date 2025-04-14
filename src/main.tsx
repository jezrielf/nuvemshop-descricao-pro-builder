
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Certifica-se de que o elemento root existe antes de renderizar
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);
root.render(<App />);

// Adiciona um log para debug
console.log("Aplicação inicializada");
