import commander from "commander";
import pick from "lodash/pick";
import Debug from "./utils/Debug";

export interface Options {
  url?: string;
  path?: string;
  out: string;
  format: string;
  timeout: number;
  waitFor: number;
  userAgent: string;
  landscape: boolean;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export const formats = [
  "Letter",
  "Legal",
  "Tabloid",
  "Ledger",
  "A0",
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6",
];

const debug = Debug("optionParser");

commander
  .option("--out <path>", "output path")
  .option("--path <path>", "input html file")
  .option("--url <url>", "input url")
  .option("--format <format>", formats.toString())
  .option("--user-agent <string>", "user agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36")
  .option("--timeout <number>", "time out ms", 30000)
  .option("--wait-for <number>", "wait for ms", 250)
  .option("--landscape", "landscape pdf file", false)
  .option("--margin-top", "margin top size", 0)
  .option("--margin-right", "margin right size", 0)
  .option("--margin-bottom", "margin bottom size", 0)
  .option("--margin-left", "margin left size", 0)
  .usage("--path index.html --out index.pdf");

export default (argv): Options => {
  commander.parse(argv);

  return {
    out: commander.out,
    url: commander.url,
    format: commander.format,
    path: commander.path,
    timeout: commander.timeout,
    waitFor: commander.waitFor,
    userAgent: commander.userAgent,
    landscape: commander.landscape,
  } as Options;
};
