import fs from "fs";
import puppeteer from "puppeteer";
import tmp from "tmp-promise";
import { Options } from "./optionParser";
import compact from "./utils/compact";
import Debug from "./utils/Debug";

const debug = Debug("createPdf");

export default async (options: Options) => {
  let href;

  if (options.path) {
    href = `file://${options.path}`;
  } else if (options.url) {
    href = options.url;
  } else {
    throw new TypeError('The "path" or "url" argument must be of type string.')
  }

  debug(href);

  let browser;

  try {
    debug(`Generate pdf fro ${href}`);

    const launchOptions = compact(
      {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-gpu",
          `--user-agent="${options.userAgent}"`,
        ],
      },
    );

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();
    await page.goto(href, { timeout: options.timeout, waitUntil: "networkidle2" });
    await page.waitFor(options.waitFor);

    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
    const pdf = await page.pdf({
      format: options.format,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      printBackground: true,
    });

    return pdf;
  } finally {
    if (browser) {
      browser.close();
    }
  }
};
