import { registerCustomHandlers } from "./event";
import { registerHandlers, registerNodes } from "./node";

export abstract class Component {
  private state: any;
  protected readonly selector: string;

  protected root: HTMLElement;

  // set initial state and relates components
  constructor(state: any, selector: string = null) {
    this.state = Object.assign({}, state);
    this.selector = selector || this.defaultSelector();
  }

  // solution for cycles in dependency injection
  public postConstruct(): void {}

  public initialize(): void {
    this.preStartup();
    this.root = document.querySelector(this.selector);
    if (this.root) {
      registerNodes(this.root, this);
      registerCustomHandlers(this);
      this.startup(this.root);
      registerHandlers(this);
      this.postStartup();
      this.render(this.getState());
    } else {
      console.warn(
        "Root node '" +
          this.selector +
          "' for component " +
          this.constructor.name +
          " not found."
      );
    }
  }

  private defaultSelector() {
    return (
      ".js-" +
      this.constructor.name
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase()
    );
  }

  // draw html required by component if not exists
  protected preStartup(): void {}

  // register nodes and listeners
  protected abstract startup(root: HTMLElement): void;

  // ---------- STATE SECTION ----------

  // load initial state by async functions
  // or get initial state form html nodes
  protected postStartup(): void {}

  protected setState(newState: any): void {
    var copyOfNewState = Object.assign({}, newState);
    this.state = copyOfNewState;
    var copyOfState = Object.assign({}, this.state);
    this.render(copyOfState);
  }

  protected getState(): any {
    var copyOfState = Object.assign({}, this.state);
    return copyOfState;
  }

  protected setStateValue(key: string, value: any): void {
    this.state[key] = value;
    this.state = Object.assign({}, this.state);
    var copyOfState = Object.assign({}, this.state);
    this.render(copyOfState);
  }

  protected rewriteStateValue(key: string, valueKey: any): void {
    this.state[key] = this.state[valueKey];
    this.state = Object.assign({}, this.state);
    var copyOfState = Object.assign({}, this.state);
    this.render(copyOfState);
  }

  protected getStateValue(key: string): any {
    var copyOfState = Object.assign({}, this.state);
    return copyOfState[key];
  }

  protected mergeState(object: any): void {
    var copyOfState = Object.assign({}, this.state);
    this.state = Object.assign(copyOfState, object);
    this.render(this.state);
  }

  protected gatStateValueAsBoolean(key: string): boolean {
    var copyOfState = Object.assign({}, this.state);
    return copyOfState[key] as boolean;
  }

  protected keyExists(key: string): boolean {
    var copyOfState = Object.assign({}, this.state);
    return copyOfState[key] !== undefined;
  }

  // ---------- RENDER SECTION ----------

  protected abstract render(state: any | void): void;

  // -------------- DESTROY -------------
  public destroy(): void {
    this.root.remove();
  }
}

// -------------- HELPERS ---------------

export function drawFromHtmlText(
  html: string,
  selector: string,
  parentNode: HTMLElement
) {
  var alreadyExists = document.querySelector(selector);
  if (alreadyExists) {
    return;
  }
  parentNode.innerHTML = html;
}

export function drawFromTemplate(
  template: HTMLElement,
  selector: string,
  add: string[] = [],
  remove: string[] = []
) {
  var alreadyExists = template.parentNode.querySelector(selector);
  if (alreadyExists) {
    return;
  }
  if (template) {
    var row = template.cloneNode(true) as HTMLElement;
    add.forEach((className) => {
      row.classList.add(className);
    });
    remove.forEach((className) => {
      row.classList.remove(className);
    });
    template.parentNode.append(row);
  } else {
    console.error("No template to draw!");
  }
}
