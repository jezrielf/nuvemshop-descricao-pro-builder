
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Certifica-se de que o elemento root existe antes de renderizar
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Elemento root não encontrado!");
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);
console.log("Root element encontrado, renderizando aplicação...");
root.render(<App />);

// Adiciona um log para debug
console.log("Aplicação inicializada");
