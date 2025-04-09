type Stack = {
  func: string;
  path: string;
  line: string;
  column: string;
}[];

export function getStack(): Stack {
  const rawStack = new Error()?.stack?.split('\n')?.slice(2, -3);
  const entry = rawStack?.at(-1)?.split('at ')[1]?.split(':');
  const stackEntry = {
    func: '',
    path: entry?.[0] ?? '',
    line: entry?.[1] ?? '',
    column: '',
  };
  const stackLines = rawStack?.slice(0, -1);
  const stack =
    stackLines?.map((line) => {
      const seg = line.split('at ')[1]?.split(' (');
      const seg1 = seg?.[1]?.split(':');
      return {
        func: seg?.[0],
        path: seg1?.[0],
        line: seg1?.[1],
        column: seg1?.[2].slice(0, -1),
      };
    }) ?? [];

  stack.push(stackEntry);
  return stack;
}
