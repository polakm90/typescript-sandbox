import { Injector } from "./ioc";
import { Component } from "./component";
import { Provider } from "./provider";

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

class ModuleRegister {
  components: Map<string, Component>;
  modules: Map<string, Module>;
  providers: Map<string, Provider>;

  constructor() {
    this.components = new Map<string, Component>();
    this.modules = new Map<string, Module>();
    this.providers = new Map<string, Provider>();
  }

  public registerComponent(key: string, component: Component) {
    this.components.set(key, component);
    console.log("Component '" + key + "' registerd!");
  }

  public findComponent(key: string): Component {
    return this.components.get(key) as Component;
  }

  public registerModule(key: string, module: Module) {
    this.modules.set(key, module);
    console.log("Module '" + key + "' registerd!");
  }

  public registerProvider(key: string, provider: Provider) {
    this.providers.set(key, provider);
    console.log("Provider '" + key + "' registerd!");
  }
}

export class Module {
  private declarations: Type<Component>[];
  private bootstrap: Type<Component>[];
  private exports: Type<Component>[];
  private imports: Type<Module>[];
  private providers: Type<Provider>[];
  private register: ModuleRegister;

  protected constructor({
    declarations = [] as Type<Component>[],
    bootstrap = [] as Type<Component>[],
    exports = [] as Type<Component>[],
    imports = [] as Type<Module>[],
    providers = [] as Type<Provider>[]
  }) {
    this.declarations = declarations;
    this.bootstrap = bootstrap;
    this.exports = exports;
    this.imports = imports;
    this.providers = providers;
    this.register = new ModuleRegister();
  }
  initialize() {
    this.declarations.forEach((typeOf: any) => {
      var component = Injector.resolve(typeOf) as Component;
      this.register.registerComponent(typeOf.name, component);
    });

    this.declarations.forEach((typeOf: any) => {
      var component = Injector.resolve(typeOf) as Component;
      component.postConstruct();
    });

    this.bootstrap.forEach((typeOf: any) => {
      var component =
        this.register.findComponent(typeOf.name) ||
        (Injector.resolve(typeOf) as Component);
      component.initialize();
      console.log("Component '" + typeOf.name + "' initialized!");
    });

    this.exports.forEach((typeOf: any) => {
      var module = Injector.resolve(typeOf) as Module;
      module.exports.forEach((typeOfComponent: any) => {
        var component = Injector.resolve(typeOfComponent) as Component;
        this.register.registerComponent(typeOfComponent.name, component);
      });
    });

    this.imports.forEach((typeOf: any) => {
      var component = Injector.resolve(typeOf) as Component;
      this.register.registerComponent(typeOf.name, component);
    });

    this.providers.forEach((typeOf: typeof Provider) => {
      var provider = Injector.resolve(typeOf) as Provider;
      provider.initialize();
      this.register.registerProvider(typeOf.name, provider);
    });
  }
}

export function initialize(...declaredTypes: Type<Module>[]) {
  declaredTypes?.forEach((DeclaredType: Type<Module>) => {
    var module = new DeclaredType() as Module;
    module.initialize();
  });
}
