import "reflect-metadata";

export function Node(selector: string | null = null) {
  return (target: any, key: any) => {
    const fields = Reflect.getOwnMetadata("nodes", target) || [];
    fields.push({ key: key, selector: selector });
    Reflect.defineMetadata("nodes", fields, target);
  };
}

export function registerNodes(root: HTMLElement, component: any) {
  let target = Object.getPrototypeOf(component);
  let nodes = Reflect.getOwnMetadata("nodes", target) || [];
  nodes?.forEach((node: any) => {
    let selector = node.selector || ".js-" + node.key;
    Reflect.set(target, node.key, root.querySelector(selector));
  });
}

export function OnClick(field: string | null = null) {
  return (target: any, key: any) => {
    const handlers = Reflect.getOwnMetadata("handlers", target) || [];
    handlers.push({ key: key, field: field, type: "click" });
    let otherHandlers = Reflect.getOwnMetadata("handlers", target) || [];
    Reflect.defineMetadata("handlers", otherHandlers.concat(handlers), target);
  };
}

export function OnChange(field: string | null = null) {
  return (target: any, key: any) => {
    const handlers = Reflect.getOwnMetadata("handlers", target) || [];
    handlers.push({ key: key, field: field, type: "change" });
    let otherHandlers = Reflect.getOwnMetadata("handlers", target) || [];
    Reflect.defineMetadata("handlers", otherHandlers.concat(handlers), target);
  };
}

export function registerHandlers(component: any) {
  let target = Object.getPrototypeOf(component);
  var handlers = [];
  handlers = Reflect.getOwnMetadata("handlers", target) || [];
  handlers?.forEach((handler: any) => {
    let method = Reflect.get(target, handler.key);
    let node =
      (handler.field && Reflect.get(target, handler.field)) ||
      component[handler.field];
    console.log(component[handler.field]);
    node?.addEventListener(handler.type, (event: any) => {
      method.call(component, event);
    });
  });
}
