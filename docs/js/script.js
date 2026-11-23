document.addEventListener("DOMContentLoaded", () => {
    const alvos = [
      document.getElementById("sobre"),
      document.getElementById("aprendendo"),
      document.getElementById("contato"),
    ].filter(Boolean);
  
    const linksNav = document.querySelectorAll("nav a[href^='#']");
    const header = document.querySelector("header");
  
    function obterMargemCabecalho() {
      return (header ? header.offsetHeight : 64) + 24;
    }
  
    function atualizarNav() {
      if (!alvos.length || !linksNav.length) return;
  
      const margem = obterMargemCabecalho();
      const rolouAteOFim =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
  
      let atual = alvos[0].id;
  
      if (rolouAteOFim) {
        atual = alvos[alvos.length - 1].id;
      } else {
        alvos.forEach((alvo) => {
          if (window.scrollY + margem >= alvo.offsetTop) {
            atual = alvo.id;
          }
        });
      }
  
      linksNav.forEach((link) => {
        const corresponde = link.getAttribute("href") === `#${atual}`;
        link.classList.toggle("ativo", corresponde);
        if (corresponde) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }
  
    window.addEventListener("scroll", atualizarNav, { passive: true });
    window.addEventListener("resize", atualizarNav, { passive: true });
    atualizarNav();
  
    // Seleção de cartões com clique ou teclado (funciona no toque e no desktop)
    const cartoes = document.querySelectorAll("#aprendendo li");
  
    cartoes.forEach((cartao) => {
      cartao.setAttribute("tabindex", "0");
      cartao.setAttribute("role", "button");
      cartao.setAttribute("aria-pressed", "false");
      cartao.style.cursor = "pointer";
  
      const alternar = () => {
        const jaAtivo = cartao.classList.contains("selecionado");
  
        cartoes.forEach((outro) => {
          outro.classList.remove("selecionado");
          outro.setAttribute("aria-pressed", "false");
        });
  
        if (!jaAtivo) {
          cartao.classList.add("selecionado");
          cartao.setAttribute("aria-pressed", "true");
        }
      };
  
      cartao.addEventListener("click", alternar);
      cartao.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          alternar();
        }
      });
    });
  });