// Número do WhatsApp comercial: código do país (55) + DDD + número.
const WHATSAPP_NUMERO = "5518981477228";
const WHATSAPP_MENSAGEM_PADRAO = "Ola! Gostaria de fazer um orçamento.";

// Todo link com data-wa vira um link de WhatsApp com a mensagem indicada.
document.querySelectorAll("[data-wa]").forEach((link) => {
  const mensagem = link.dataset.wa || WHATSAPP_MENSAGEM_PADRAO;
  link.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.getElementById("ano").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".nav__toggle");
const nav = document.getElementById("nav-principal");
const celular = window.matchMedia("(max-width: 960px)");

function fecharMenu() {
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
  nav.dataset.aberto = "false";
}

toggle.addEventListener("click", () => {
  const abrir = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(abrir));
  toggle.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  nav.dataset.aberto = String(abrir);
});

// "Serviços": no celular abre/fecha o submenu; no computador vai até a seção.
const linkServicos = document.querySelector(".nav__item--tem-filho > .nav__link");
if (linkServicos) {
  linkServicos.addEventListener("click", (e) => {
    if (!celular.matches) return;
    e.preventDefault();
    const item = linkServicos.parentElement;
    const aberto = item.dataset.aberto === "true";
    item.dataset.aberto = String(!aberto);
    linkServicos.setAttribute("aria-expanded", String(!aberto));
  });
}

// Fecha o menu ao escolher um destino
nav.querySelectorAll("a").forEach((a) => {
  if (a === linkServicos) return;
  a.addEventListener("click", fecharMenu);
});

// Animação de scroll para ícones (Fallback para navegadores sem suporte a CSS Scroll-driven animations)
if (!CSS.supports("(animation-timeline: view()) and (animation-range: entry)")) {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const icones = document.querySelectorAll(".stat__icone, .servico__icone, .card-detalhe__icone");
    icones.forEach((ico) => ico.classList.add("animar-scroll-fallback"));

    const observador = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
            observador.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );

    icones.forEach((ico) => observador.observe(ico));
  }
}

// Animação da seta correndo entre as etapas:
// Ativa uma única vez ao entrar na tela e permanece no estado ativo enquanto o usuário estiver na seção.
// Quando o usuário sai da área da seção, reseta a classe para reanimar caso retorne.
const secaoComoFunciona = document.querySelector("#como-funciona");
if (secaoComoFunciona) {
  const observadorEtapas = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          secaoComoFunciona.classList.add("animar-etapas");
        } else {
          secaoComoFunciona.classList.remove("animar-etapas");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
  );
  observadorEtapas.observe(secaoComoFunciona);
}
