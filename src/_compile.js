export default function _compile(code) {
  return (new Function([], `return ${code}`))();
}
