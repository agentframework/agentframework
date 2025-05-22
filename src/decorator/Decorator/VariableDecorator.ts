export type VariableDecorator = (
  target: Object,
  propertyKey?: string | symbol | undefined,
  parameterIndex?: PropertyDescriptor | number
) => void;
