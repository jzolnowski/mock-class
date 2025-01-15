export function mockClass<C extends { new(...args: unknown[]): unknown }>(classObj: C): jasmine.SpyObj<InstanceType<C>> {
  let props: string[] = [];
  let proto = classObj.prototype;
  while (proto !== Object.prototype) {
    props.push(...Object.getOwnPropertyNames(proto).filter(name => name !== 'constructor'));
    proto = Object.getPrototypeOf(proto);
  }

  return jasmine.createSpyObj<InstanceType<C>>(classObj.constructor.name, props as unknown as jasmine.SpyObjMethodNames<InstanceType<C>>);
}
