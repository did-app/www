# Style guide

## General

Almost all style rules should be tied to a component class.
The component class should be defined in a file with the same name as the class.
Modifiers to a component should be defined in the same file and scoped to the component.

Styles should not be rarely attached to element types.
Instead define a class with the same name e.g. `.header {}` instead of `header {}`.
Rules that do exist for the element type should be colocated in the component file of the same name.

Reusable rules are defined in the abstract directory.

### Page

All page content should be wrapped in a `div.page` element.
This is so that all scripts etc that can be added after the page content
The top level rules that are applied to `html` and body are in this file.
