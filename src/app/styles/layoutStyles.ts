const layoutStyles: Record<string, string> = {
  Default: `
    .layout-style { font-family: Georgia, serif; }
    .layout-style h1 { color: red; }
    .layout-style p { font-size: 14pt; text-align: justify; }
  `,
  NDA: `
    .layout-style { font-family: Arial, sans-serif; }
    .layout-style h1 { color: darkred; }
    .layout-style p { font-size: 12pt; }
  `,
  IP: `
    .layout-style { font-family: 'Courier New', monospace; }
    .layout-style h1 { color: darkgreen; }
    .layout-style p { font-size: 11pt; }
  `,
  Service: `
    .layout-style { font-family: Tahoma, sans-serif; }
    .layout-style h1 { color: darkorange; }
    .layout-style p { font-size: 13pt; }
  `
};

export default layoutStyles;
