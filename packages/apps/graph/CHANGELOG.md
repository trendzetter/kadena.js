# @kadena/graph

## 1.0.1

### Patch Changes

- c94594f12: Added totalCount to Connections; implemented resizable table and
  pagination in path
- 29d7ada24: Show tx overview in block page and create transactions page; make
  transactions query dynamically assign filters; minor fixes and refactoring
- c8bbec395: Fix `types` in package.json
- 42651dd76: Updated the README file
- 9568dff4b: Added fragments for the graph fields and fixed some field names
- ea67704fe: Added account query, chain account query, transactions query,
  transfers query and their pages
- 52f13b9e1: Added block query, confirmation depth query. Implemented block page
  and block transaction page. Performed some adjustments on components to make
  them generic
- 5d705a14f: Added relation between transaction and transfer; applied some logic
  in transaction column code: it now returns 'cont' when null
- fec8dfafd: Upgrade `typescript` and `@types/node` dependencies
- 8b579d89f: Change default timeout for simulation
- Updated dependencies [badc7c2a3]
- Updated dependencies [831c022c8]
- Updated dependencies [2a0e92cd1]
- Updated dependencies [3e00cf2ac]
- Updated dependencies [c8bbec395]
- Updated dependencies [b51b86507]
- Updated dependencies [a664a9535]
- Updated dependencies [69eec056f]
- Updated dependencies [c143687bd]
- Updated dependencies [591bf035e]
- Updated dependencies [d62a23ffe]
- Updated dependencies [fec8dfafd]
- Updated dependencies [eede6962f]
- Updated dependencies [699e73b51]
- Updated dependencies [7e5bfb25f]
- Updated dependencies [a664a9535]
- Updated dependencies [f6c52c340]
- Updated dependencies [c375cb124]
- Updated dependencies [f1259eafa]
  - @kadena/chainweb-node-client@0.5.0
  - @kadena/cryptography-utils@0.4.0
  - @kadena/client@1.5.0
  - @kadena/pactjs@0.4.0