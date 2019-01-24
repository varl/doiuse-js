# What ES features do I use?

Figures out what ECMAScript features are in use, which helps you figure
out if your code needs polyfills and/or additional compilation to
another ES-level.

Based on the [W3C advice regarding Polyfills for Library
authors](https://w3ctag.github.io/polyfills/#consider-alternatives) one
should consider:

> Declare the need for the feature as a requirement in your
> documentation, and allow the website developer to decide whether to
> polyfill it

To aid this strategy this tool goes through the given code, and gathers
a report of what ES features are in use.

This gives you a way to sanity check your codebase in relation to the
level of ES you want to ship.

It works on bundles too, so you can run it with a set target to make it
give a non-zero exit code if the build contains non-targeted features.

## Usage

```
doiuse-js src/**/*.js
doiuse-js build/bundle.js
```

## ToDo

- [ ] Identify ES6 features
- [ ] Identify ES7 features
- [ ] Integrate
  [Browserslist](https://github.com/browserslist/browserslist) to check
  if target level is compatible.
- [ ] Suggested polyfills
