// Package metadata for feature-toggle-service.js.

Package.describe({
  name: "willmendesneto:feature-toggle-service",
  summary: "The simplest solution for feature toggle in Javascript. Simple how it should be.",
  version: "2.0.0",
  git: "https://github.com/willmendesneto/feature-toggle-service.js"
});

Package.onUse(function (api) {
  api.addFiles("lib/feature-toggle-service.js", "client");
});
