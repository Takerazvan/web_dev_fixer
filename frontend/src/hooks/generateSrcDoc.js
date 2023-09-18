export function generateSrcDoc(html, css, js) {
  return `
    <html>
      <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; box-sizing: border-box; overflow: hidden;">
        ${html}
      </body>
      <style>
        ${css}
      </style>
      <script>
        ${js}
      </script>
    </html>
  `;
}
