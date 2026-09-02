# Changelog — Show de Prêmios Mais B

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

## [2026-09-02] - Criação da Página de Política de Privacidade e Termos de Uso
### Adicionado
- Criação do arquivo `termos-e-privacidade.html` contendo:
  - Política de Privacidade completa (coleta, retenção, segurança, cookies Google AdSense, compromisso do usuário A, B, C e vigência a partir de 02/09/2026).
  - Termos e Condições de Uso completos (uso de licença, restrições, isenção de responsabilidade, limitações, links, modificações e foro).
  - Header oficial responsivo com navegação de retorno à Home e acionamento do modal Clube +Fidelidade.
  - Quick nav sticky com pills interativas para alternância suave entre Política de Privacidade, Termos e download do Regulamento em PDF.
  - Botão flutuante "Voltar ao Topo" e suporte nativo a impressão limpa (`@media print`).
- Criação do arquivo `src/css/legal.css` com estilos dedicados seguindo o Design System oficial da marca Mais B com fundo branco (clean white), alta legibilidade e contraste.
- Atualização do link de "Termos & Privacidade" no rodapé de `index.html` apontando diretamente para `termos-e-privacidade.html`.
### Alterado
- Mantido o fundo geral da página e hero no padrão oficial dark premium (`sp-body` com gradiente radial e topbar dourada), e aplicado fundo branco puro (`#FFFFFF`) exclusivamente no container central do documento (`.legal-document-card`) com tipografia escura de alta legibilidade.
- Removida a barra flutuante de botões/pills ("Política de Privacidade" e "Termos e Condições de Uso"), deixando a transição entre o Hero e o Container do documento direta e limpa.
- Alterado o botão de ação principal (vermelho) no card final de suporte para "Baixar Regulamento (PDF)" com link direto para o arquivo oficial.
