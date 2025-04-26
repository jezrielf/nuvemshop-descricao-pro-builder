
import { CarouselBlock } from '@/types/editor/blocks/carousel';
import { getStylesFromBlock } from '../styleConverter';

export function generateCarouselBlockHtml(block: CarouselBlock): string {
  const { images, autoplay, autoplaySpeed, showArrows, showDots, infinite } = block;
  const containerStyle = getStylesFromBlock(block);

  // Se não houver imagens, retorna um placeholder
  if (!images || images.length === 0) {
    return `<div style="${containerStyle}"><p>Carrosel sem imagens</p></div>`;
  }

  // CSS específico para funcionar na Nuvemshop
  const carouselCss = `
    <style>
      .nuvemshop-carousel {
        position: relative;
        overflow: hidden;
      }
      .nuvemshop-carousel-slides {
        display: flex;
        transition: transform 0.5s ease;
      }
      .nuvemshop-carousel-slide {
        flex: 0 0 100%;
        width: 100%;
        position: relative;
      }
      .nuvemshop-carousel-image {
        width: 100%;
        display: block;
      }
      .nuvemshop-carousel-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 8px;
        text-align: center;
      }
      .nuvemshop-carousel-prev,
      .nuvemshop-carousel-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1;
      }
      .nuvemshop-carousel-prev { left: 10px; }
      .nuvemshop-carousel-next { right: 10px; }
      .nuvemshop-carousel-dots {
        display: flex;
        justify-content: center;
        padding: 10px 0;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
      }
      .nuvemshop-carousel-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        margin: 0 4px;
        cursor: pointer;
      }
      .nuvemshop-carousel-dot.active {
        background-color: white;
      }
    </style>
  `;

  // Estrutura do carrossel usando JavaScript para a navegação
  const slidesHtml = images.map((image, index) => `
    <div class="nuvemshop-carousel-slide" data-index="${index}">
      <img src="${image.src}" alt="${image.alt || ''}" class="nuvemshop-carousel-image">
      ${image.caption ? `<div class="nuvemshop-carousel-caption">${image.caption}</div>` : ''}
    </div>
  `).join('');

  // Navegação de pontos (dots)
  const dotsHtml = showDots ? `
    <div class="nuvemshop-carousel-dots">
      ${images.map((_, index) => `
        <span class="nuvemshop-carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
      `).join('')}
    </div>
  ` : '';

  // Navegação de setas (arrows)
  const arrowsHtml = showArrows ? `
    <button class="nuvemshop-carousel-prev">&lt;</button>
    <button class="nuvemshop-carousel-next">&gt;</button>
  ` : '';

  // Script para o carrossel funcionar na loja Nuvemshop
  const carouselScript = `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.querySelector('[data-carousel-id="${block.id}"]');
        if (!carousel) return;
        
        const slides = carousel.querySelectorAll('.nuvemshop-carousel-slide');
        const totalSlides = slides.length;
        if (totalSlides <= 1) return;
        
        const slidesContainer = carousel.querySelector('.nuvemshop-carousel-slides');
        const dots = carousel.querySelectorAll('.nuvemshop-carousel-dot');
        const prevBtn = carousel.querySelector('.nuvemshop-carousel-prev');
        const nextBtn = carousel.querySelector('.nuvemshop-carousel-next');
        
        let currentIndex = 0;
        let autoplayInterval;

        // Função para exibir slide
        function goToSlide(index) {
          // Verificar limites ou aplicar loop
          if (${infinite ? 'true' : 'false'}) {
            // Loop infinito
            index = (index + totalSlides) % totalSlides;
          } else {
            // Sem loop
            index = Math.max(0, Math.min(index, totalSlides - 1));
          }
          
          currentIndex = index;
          slidesContainer.style.transform = 'translateX(' + (-index * 100) + '%)';
          
          // Atualizar dots ativos
          if (dots) {
            dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === index);
            });
          }
        }

        // Configurar autoplay
        function startAutoplay() {
          if (${autoplay ? 'true' : 'false'}) {
            autoplayInterval = setInterval(() => {
              goToSlide(currentIndex + 1);
            }, ${autoplaySpeed || 3000});
          }
        }

        function stopAutoplay() {
          clearInterval(autoplayInterval);
        }

        // Navegação com setas
        if (prevBtn) {
          prevBtn.addEventListener('click', function() {
            stopAutoplay();
            goToSlide(currentIndex - 1);
            startAutoplay();
          });
        }
        
        if (nextBtn) {
          nextBtn.addEventListener('click', function() {
            stopAutoplay();
            goToSlide(currentIndex + 1);
            startAutoplay();
          });
        }

        // Navegação com dots
        dots.forEach(dot => {
          dot.addEventListener('click', function() {
            stopAutoplay();
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
            startAutoplay();
          });
        });

        // Inicializar autoplay
        startAutoplay();
        
        // Pausar autoplay com hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
      });
    </script>
  `;

  return `
    ${carouselCss}
    <div class="nuvemshop-carousel" data-carousel-id="${block.id}" style="${containerStyle}">
      <div class="nuvemshop-carousel-slides">
        ${slidesHtml}
      </div>
      ${dotsHtml}
      ${arrowsHtml}
    </div>
    ${carouselScript}
  `;
}
