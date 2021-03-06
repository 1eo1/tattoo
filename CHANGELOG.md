# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!-- ## Unreleased -->
<!-- Add new, unreleased changes here. -->

## 2.0.0
- Updated to use `web-components-tester` v6.0.0

## 2.0.0-alpha.3
- Reworked most of tattoo to make it a general purpose bulk web component test
  automation tool.
- Added support for wildcard searching of repositories by name within a user
  or org account.  E.g. `tattoo MyOrg/cool-*`
- Enabled referencing specific branches of repositories.  E.g.
  `tattoo MyOrg/cool-input#new-hotness`
- Provide a means to require a repository without trying to run `wct` directly
  on it.  E.g. `tattoo MyOrg/cool-input -r Polymer/polymer#2.0-preview`  This
  is useful for testing how elements behave prior to release of a shared
  dependency.
- Added color!
- Added an ordered summary of all repositories tested and results.
- Added config file support.
- Made web-component-tester a versioned dependency of tattoo (no more global
  version mismatch problems!)

## 1.x
- The 1.x version of tattoo was only used by the Polymer team to automate tests
  for a specific set of custom elements.
