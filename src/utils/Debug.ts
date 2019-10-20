import debug from "debug";

export default (label: string): debug => {
  return debug(`puppeteer-pdf-generator:${label}`);
};
