import { PdfSettings } from "../../../components/PdfConfig";

const getGlobalStyles = (isPDF: boolean, config: PdfSettings): string => {
  return `
* {
  box-sizing: border-box;
}
    .pdf {
      color: black;
     padding: ${isPDF ? "0.5cm" : "1.5cm"};
    }
 
 .paragraph {
  page-break-inside: avoid;
}
  p, h1, h2, h3, h4, h5, h6, .pdf, section {
    page-break-inside: avoid;
    break-inside: avoid;
    orphans: 3;
    widows: 3;
  }
    .section {
  page-break-inside: avoid;
}
.page-break {
    page-break-before: always;
    break-before: always;
  }
    h1.layout-style { font-size: ${isPDF ? config.h1Size : "1rem"}; text-align: center; ${config.underlineH1 ? "text-decoration: underline;" : ""}}
    h2.layout-style { font-size: ${isPDF ? config.h2Size : "0.6rem"}; text-align: center; margin-bottom: 30px;}
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
          .footer{
            color:#cccccc;
          }
            .paragraph {
      margin-top: 0;
      margin-bottom: 0;
      line-height: 1.6;
      text-indent: 2em;
    }

      `;
      break;
    case "NDA":
      specificStyle = `
        .layout-style {
          font-family: Times New Roman, sans-serif;
        }
          .paragraph{
         margin:0px;
          }
         .sub_paragraph{
       margin-block:10px;

       
         }
          .paragraph_title{
          // margin:0px;
          // padding:0px;
         margin-top:26px;
           margin-bottom:0px;
          font-style: italic;
          text-decoration: underline;
          font-weight: bold;
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
