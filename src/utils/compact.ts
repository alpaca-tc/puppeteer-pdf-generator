import { identity, pickBy } from "lodash";

export default (options: object): object => {
  return pickBy(options, identity);
};
