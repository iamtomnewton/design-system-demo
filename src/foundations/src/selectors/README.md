# Theme Selectors

## Purpose 
Removes breaking config/design token changes from SPA's encapsulating them inside ATDS.

### Original PR
https://github.atcloud.io/AutoTrader/design-system/pull/139

## Example and Usage
[https://app.atds.preprod.k8.atcloud.io/?path=/docs/for-developers-styledcomponents-guidelines--page#themeprovider-example]

## Points

- Similar selector pattern (Redux)

- Limits ATDS breaking changes

- Easy to understand util functions

- Confidently select theme values (no optional chaining)

- Minimal maintenance (basic utils)

- No arrays (objects only)

- Source of truth for all styles/themes

- Reflection of design tokens, same language

- Includes `legacy` naming (commit to two themes for now)

## Steps for migration (to new design)
- Convert everything to use non legacy selectors
- Update the legacy selectors to use the current theme config

## Steps for rebrand
- Update all SPA’s to use legacy selectors - find and replace
- Update non legacy selectors to use new config

_Subject to change_

## Notes

Breaking change solely inside ATDS no major versioning for downstream apps only minor or patch
Basic utils no over engineering - low maintenance easy to use
Any logic or branches to be implemented where needed in SPA
Commit to one legacy version
Naming of legacy version - 2020, sparkplug hidden from consumer
Designers could use these in framer - get an understanding of the cost to add or change something
No arrays! Have to do null checks - add risk to down stream apps OBJECTS ONLY
Source of truth for all styles even legacy styles - ATDS is a delivery mechanism not one design
Selectors are a reflection of the tokens naming from the design language 

Version re-brands v2, v3, v4 etc