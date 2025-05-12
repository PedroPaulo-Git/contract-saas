import { PdfSettings } from "../../../components/PdfConfig";

const getGlobalStyles = (isPDF: boolean, config: PdfSettings): string => {
  return `
    .pdf {
      color: black;
      padding: ${isPDF ? "0.5cm" : "1.5cm"};
    }
 
    .paragrafy {
      margin-top: 0;
      margin-bottom: 0;
      line-height: 1.6;
      text-indent: 2em;
    }

    h1 { font-size: ${isPDF ? config.h1Size : "1rem"}; text-align: center; ${config.underlineH1 ? "text-decoration: underline;" : ""}}
    h2 { font-size: ${isPDF ? config.h2Size : "0.6rem"}; text-align: center; margin-bottom: 30px;}
    .receive {
      font-size: ${isPDF ? config.receiveSize : "0.6rem"};
    }

     @media (max-width: 640px) {
      body { padding: 0cm; }
      .pdf { padding: ${isPDF ? "0.5cm" : "0.8cm"}; overflow-y: auto; }
    }

  `;
};

const layoutStyles = (layout: string, isPDF: boolean, config: PdfSettings): string => {
  let specificStyle = "";

  switch (layout) {
    case "Default":
      specificStyle = `
        .layout-style {
          font-family: Georgia, serif;
        }
        .layout-style h1 {
          color: red;
        }
      `;
      break;
    case "NDA":
      specificStyle = `
        .layout-style {
          font-family: Arial, sans-serif;
        }
        .layout-style h1 {
          color: ${isPDF ? "black" : "darkred"};
        }
      `;
      break;
    case "IP":
      specificStyle = `
        .layout-style {
          font-family: 'Courier New', monospace;
        }
        .layout-style h1 {
          color: ${isPDF ? "black" : "darkgreen"};
        }
      `;
      break;
    default:
      specificStyle = `
        .layout-style h1 {
          color: ${isPDF ? "black" : "darkgreen"};
        }
      `;
  }

  return `${getGlobalStyles(isPDF, config)}\n${specificStyle}`;
};

export default layoutStyles;
