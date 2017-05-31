// Package metadata for feature-toggle-service.js.

Package.describe({
  name: "willmendesneto:feature-toggle-service",
  summary: "The simplest solution for feature toggle in Javascript. Simple how it should be.",
  version: "1.1.0",
  git: "https://github.com/willmendesneto/feature-toggle-service.js"
});

Package.onUse(function(api) {
  api.addFiles("dist/feature-toggle-service.js", "client");
});
