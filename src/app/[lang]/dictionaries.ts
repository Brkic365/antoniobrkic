interface Dictionaries {
  [key: string]: () => Promise<any>;
}

const dictionaries: Dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  "en-US": () =>
    import("@/dictionaries/en.json").then((module) => module.default),
  hr: () => import("@/dictionaries/hr.json").then((module) => module.default),
  "hr-HR": () =>
    import("@/dictionaries/hr.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const dictionaryLoader = dictionaries[locale];

  if (!dictionaryLoader) {
    // Handle the case when the requested locale is not found
    throw new Error(`Dictionary not available for locale: ${locale}`);
  }

  return dictionaryLoader();
};
