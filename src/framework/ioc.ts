import "reflect-metadata";

export const __IOC__ = new Map<string, any>();

export interface Constructor<T> {
  new (...args: any[]): T;
}

export type ClassDecorator<T extends Function> = (
  Target: Constructor<T>
) => T | void;

export const Injectable = (): ClassDecorator<any> => {
  return (target) => {};
};

export const Injector = new (class {
  resolve<T>(Target: Constructor<T>): T {
    const requiredParams =
      Reflect.getMetadata("design:paramtypes", Target) || [];
    const resolvedParams = requiredParams.map((param: any) =>
      Injector.resolve(param)
    );
    const instance = __IOC__.get(Target.name) || new Target(...resolvedParams);
    __IOC__.set(Target.name, instance);
    return instance;
  }
})();
