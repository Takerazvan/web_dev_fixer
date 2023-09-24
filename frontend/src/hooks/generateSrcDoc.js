export function generateSrcDoc(html, css, js) {
  const hasHead = /<head[\s\S]*?<\/head>/i.test(html);
  if (hasHead) {
    // Extract the <head> section
    const headSection = html.match(/<head[\s\S]*?<\/head>/i)[0];

    // Remove the <head> section from the HTML
    html = html.replace(headSection, "");

    // Create the final srcDoc with both <head> and <body>
    return `
      <html>
        ${headSection}
        <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; box-sizing: border-box; overflow: auto;">
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
  } else {
    // If no <head> section is found, use the original function
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
} 