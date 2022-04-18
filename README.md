# Vue Flow 🌊

[![vue flow](package/src/assets/vue-flow.gif)](https://vueflow.dev/)
![top-language](https://img.shields.io/github/languages/top/bcakmakoglu/vue-flow)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/bcakmakoglu/vue-flow)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bcakmakoglu/vue-flow)
![GitHub last commit](https://img.shields.io/github/last-commit/bcakmakoglu/vue-flow)

### __Vue Flow: A highly customizable Vue 3 Flowchart component.__

With Vue Flow you can build your own, customized node-based applications like static diagrams or even more complex and
interactive editors!

You can find a detailed explanation on how to get started in the [documentation](https://vueflow.dev/docs) or check
the [examples](https://vueflow.dev/examples).

## ⭐️ Features

- 👶 __Easy setup__: Get started hassle-free - Built-in zoom- & pan features, element dragging, selection and much more

- 🎨 __Customizable__: Use your own custom nodes, edges, connection lines and expand on the Vue Flows functionality

- 🚀 __Fast__: Tracks changes reactively and only re-renders the appropriate elements

- 🧲 __Utils & Composition__: Comes with graph helper and state composable functions for advanced uses

- 📦 __Additional Components__:

  - 🖼 Background: With two built-in patterns and some configuration options like height, width or color.

  - 🧭 Minimap: Shows current nodes in a small map shape in the bottom right corner

  - 🕹 Controls: Control zoom behavior from a panel on the bottom left

- 🦾 __Reliable__: Fully written in TypeScript

## 🛠 Setup

```bash
$ npm i @braks/vue-flow

# or
$ yarn add @braks/vue-flow
```

## 🎮 Quickstart

A flow consists of __nodes__ and __edges__ (or just nodes). Together we call them
__elements__.

__Each element needs a unique id.__ 

A node also needs a xy-position.
An edge needs a source (node id) and a target (node id). 

A simple setup could look like this:

```vue
<!-- Flowchart.vue -->
<template>
  <VueFlow :elements="elements"></VueFlow>
</template>
<script setup>
import { VueFlow } from '@braks/vue-flow'

const elements = ref([
  {
    id: '1',
    label: 'node 1',
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    label: 'node 2',
    position: { x: 100, y: 200 },
  },
  {
    id: 'e1-2',
    target: '2',
    source: '1',
  },
])
</script>
```

### __Make sure to import the necessary styles:__

```css
/* main.css */

/* import the required styles */
@import "@braks/vue-flow/dist/style.css";

/* import the default theme (optional) */
@import "@braks/vue-flow/dist/theme-default.css";
```

### ▸ Vue 2

**_This library doesn't work with Vue2._**

## 🧪 Development

### Prerequisites

- [Node.js v12+](https://nodejs.org/)
- [Vue 3](https://vuejs.org/)
- [pnpm](https://pnpm.io/) (Optional)


```bash
# install pnpm
$ npm i -g pnpm

# start (dev)
$ pnpm dev

# build dist
$ pnpm build
```

## ⭐ Stargazers

Thanks for your star!

[![Stargazers repo roster for @braks/vue-flow](https://reporoster.com/stars/bcakmakoglu/vue-flow)](https://github.com/bcakmakoglu/vue-flow/stargazers)

## 💝 Acknowledgement

This project is based on [webkid's](https://webkid.io/) [react flow](https://reactflow.dev/). I wholeheartedly thank
them for their amazing work! Without them this project would've been impossible for me.
Please consider [donating](https://github.com/sponsors/wbkd) to them if you like Vue Flow.
