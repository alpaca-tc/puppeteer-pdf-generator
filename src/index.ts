import fs from "fs";
import pick from "lodash/pick";
import createPdf from "./createPdf";
import optionParser from "./optionParser";

(async (): Promise<void> => {
  const options = optionParser(process.argv);
  const pdf = await createPdf(options);
  fs.writeFileSync(options.out, pdf, "binary");
})();
