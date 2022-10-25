export function injectString(str: string, variables?: { [key: string]: string }) {
  Object.entries(variables || process.env).forEach(([key, val]) => {
    const regex = new RegExp(`\\$\{${key}\}`, 'g');
    str = str.replace(regex, val as string);
  });

  return str;
}

export function inject(obj: any, variables?: { [key: string]: string }) {
  if (typeof obj === 'string') {
    return injectString(obj, variables);
  } else if (Array.isArray(obj)) {
    return (obj as Array<any>).map(val => inject(val, variables));
  } else if (typeof obj === 'object') {
    const dict = obj as { [key: string]: any };
    Object.entries(dict).forEach(([key, val]) => {
      dict[key] = inject(val, variables);
    });
    return dict;
  } else {
    return obj;
  }
}
