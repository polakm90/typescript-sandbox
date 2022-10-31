import "reflect-metadata";

export function on(type: string, handling: EventListener) {
  document.body.addEventListener(type, handling);
}

export function publish(type: string, detail: any) {
  const event = new CustomEvent<any>(type, {
    detail: detail,
    bubbles: true,
    cancelable: true,
    composed: false
  });
  document.body.dispatchEvent(event);
}

export function On(eventName: string) {
  return (target: any, key: any) => {
    const handlers = Reflect.getOwnMetadata("custom-handlers", target) || [];
    handlers.push({ key: key, eventName: eventName });
    Reflect.defineMetadata("custom-handlers", handlers, target);
  };
}

export function registerCustomHandlers(component: any) {
  let target = Object.getPrototypeOf(component);
  let handlers = Reflect.getOwnMetadata("custom-handlers", target) || [];
  handlers?.forEach((handler: any) => {
    var method = Reflect.get(target, handler.key);
    document.body.addEventListener(handler.eventName, (event) => {
      method.call(component, event);
    });
  });
}
