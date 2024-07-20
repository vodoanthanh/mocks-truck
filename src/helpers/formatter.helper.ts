import _ from "lodash";

export const FormatterHelper = new (class {
  formatStringToObject<T>(object: string | T): T {
    if (_.isString(object)) {
      return JSON.parse(object);
    }
    return object;
  }

  formatObjectToString<T>(object: string | T): string {
    if (_.isString(object)) {
      return object;
    }
    return JSON.stringify(object);
  }
})();
