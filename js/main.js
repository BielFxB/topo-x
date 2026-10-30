// Número do WhatsApp comercial: código do país (55) + DDD + número.
// ATENÇÃO: troque pelo número real. É o único lugar que precisa ser editado.
const WHATSAPP_NUMERO = "5518999999999";

// Todo link com data-wa vira um link de WhatsApp com a mensagem indicada.
document.querySelectorAll("[data-wa]").forEach((link) => {
  link.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(link.dataset.wa)}`;
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
linkServicos.addEventListener("click", (e) => {
  if (!celular.matches) return;
  e.preventDefault();
  const item = linkServicos.parentElement;
  const aberto = item.dataset.aberto === "true";
  item.dataset.aberto = String(!aberto);
  linkServicos.setAttribute("aria-expanded", String(!aberto));
});

// Fecha o menu ao escolher um destino
nav.querySelectorAll("a").forEach((a) => {
  if (a === linkServicos) return;
  a.addEventListener("click", fecharMenu);
});
