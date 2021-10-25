export const processTemplate = (template, data) => {
  const pattern = /{\s*(\w+?)\s*}/g;
  return template.replace(pattern, (_, token) => data[token] || "");
};
