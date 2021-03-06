interface StringConvertable {
  toString: () => string;
}

type InterpolatedValue = string | StringConvertable | Array<StringConvertable>;

export default function html(
  literals: TemplateStringsArray,
  ...vars: InterpolatedValue[]
) {
  const raw = literals.raw;
  const length = vars.length + 1;

  let result = "";
  let i = 1;

  while (i < length) {
    const str = raw[i - 1];
    let variable = vars[i - 1];

    if (Array.isArray(variable)) {
      variable = variable.join("\n");
    }

    result += str + variable;
    i++;
  }

  result += raw[raw.length - 1];

  return result;
}
