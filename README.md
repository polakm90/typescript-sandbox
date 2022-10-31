# Type Script Components - Proof of Concept

## Getting start

##### Module

- Create new module this way `export class MyModule extends Module {}`
- Create constructor `constructor() {}` and invoke super constructor this way `super({ declarations: [], bootstrap:[], provides:[]});`
- Import module and initialize in main script `initialize(MyModule);` when document is ready.

##### Component

- Extend the Component class this way `export class MyComponent extends Component { }`.
- Create `constructor()` and invoke `super.constuctor(state:any)` to set initial component state.
- Inject releated components using and arguments introduced this way `construcor(private otherCompontent: OtherComponent)`
- Implement method `startup(root: HTMLElement)` to egister nodes and event listeners.
- Register nodes using `this.myNode = root.querySelector('.js-my-node')` to find nodes.
- Register event listeners `this.myNode.addEventListener('click', (event) => this.doSomethig(event);`
- Manipulate sate using methods like this `this.setState(state:any)` or `this.setSateValue(key:string,value:any)` or `this.mergeState({key:value})` or `this.rewriteStateValue(key, valueKey)`.
- Implement method `render(state:any)` to manipulate HTML nodes to present new component state.
- Add your component to module this way `declarations:[MyComponent]` and if you want to automaticly inilitailize add also to bootrstrap `bootstrap:[MyComponent]`

## Framework rules

##### CREATION

- Don't do other things than set references to other components or set initial state

##### POST-CONSTRUCT

- Incject dependencies when you have problem with dependency cycles

##### PRE-STARTUP

- Use it for draw HTML element if is needed by your component.

##### STARTUP

- Don't register HTML nodes out of root node of your component,
- Don't manipulate state in `startup` method,
- Don't manipulate HTML in `startup` method,
- Don't handle events form nodes what are out of your component root.
- Don't render and initialize here other components.
- You can handle custom events here using `on` method
- You can invoke your methods from state section after handle event

##### POST-STARTUP

- Use it to initialize state of component form ajax or HTML

##### STATE

- Don't manipulate HTML in this section!
- Don't manipulate state of other components directly
- You can create public methods to manipulate state by other components.
- You can create private methods to manipulate state by events or other methods.
- You can use methods for state manipulation and state reading
- You can use data form ajax to change state of your component.
- Please, encapsulate ajax requests and handlig in providers

##### RENDER

- Don't manipulate state
- Don't register listeners and nodes
- Don't create releated components
- Don't startup releated components
- Don't use releated components
- Don't read state form HTML
- Don't use other values than this from `state` to control render
- Don't invoke `render(state:any)` method mannualy

# Featrures

##### Draw html elements

Import method like `drawFromHtmlText` or `drawFromTemplate` to create new nodes in HTML document.

##### Dependency injection container.

Add `@Injectable` to let auto-create and incject your component by other components.
Every component what is used in module need `@Incjectable` decorator.

##### Publish and consuming custom events

Use method `on`to handle custom events published by other components
Use method `publish` to publish custom events from component.
