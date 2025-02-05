# Modules Folder

Modules define domains within your application. Fastify provides an
easy path to a microservice architecture, in the future you might want
to independently deploy some of those.

In this folder you should define all the modules that define the domains
of your web application.
Each module is a [Fastify
plugin](https://www.fastify.io/docs/latest/Reference/Plugins/), it breaks encapsulation
by exposing the first level to sibling modules (normally an `index.ts`).

To create a new module, follow the structure in this example module folder.

```
/modules
|-/myNewModule
|--index.ts
|--/routes
|---index.ts
|---anotherRoute.ts
```

If you need to expose functionality from one module to a sibling module, register that plugin
at the root of a module directory (e.g. `/modules/example/index.ts`) and it can be shared
via [decorators](https://www.fastify.io/docs/latest/Reference/Decorators/).
This acts as the interface between modules.

If you need to share functionality between modules (such as a database client), place that
functionality into the `plugins` folder, and share it via
[decorators](https://www.fastify.io/docs/latest/Reference/Decorators/).
