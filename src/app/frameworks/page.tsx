
'use client';

import { useState, useEffect } from 'react';
import { ItemCard } from '@/components/shared/item-card';
import { FilterToolbar } from '@/components/shared/filter-toolbar';
import type { Framework } from '@/types';

const mockFrameworksData: Framework[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'The React Framework for Production. Best developer experience with features for production.',
    detailedDescription: 'Next.js enables you to create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds. It includes features like server-side rendering, static site generation, TypeScript support, smart bundling, route pre-fetching, and more, out of the box.',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMZD7gtOg-aRXiYZ_ZkmYGch46UxHAygL-Pw&s',
    dataAiHint: 'nextjs logo',
    version: '15.0',
    tags: ['React', 'SSR', 'Full-stack', 'Vercel', 'Web Development'],
    websiteUrl: 'https://nextjs.org',
    rating: 4.9,
    releaseDate: 'October 25, 2016',
    usage: 'Ideal for building server-rendered applications, static websites, and APIs with React. Supports both Node.js and Edge runtimes.',
    exampleCode: `// app/api/hello/route.js
export async function GET(request) {
  return new Response(JSON.stringify({ text: 'Hello' }), { status: 200 });
}`,
    exampleUrl: 'https://nextjs.org/docs/app-router'
  },
  {
    id: 'sveltekit',
    name: 'SvelteKit',
    description: 'A framework for building Svelte web applications of all sizes, with a beautiful development experience.',
    detailedDescription: 'SvelteKit is an application framework powered by Svelte. It provides a flexible filesystem-based router, server-side rendering (SSR), client-side hydration, and an adapter system for deploying to various platforms. Svelte compiles declarative components into efficient imperative code.',
    logoUrl: 'https://repository-images.githubusercontent.com/779820438/ce8957c2-bf24-4a5c-ab0c-18c5473c091e',
    dataAiHint: 'sveltekit logo',
    version: '2.5.10',
    tags: ['Svelte', 'Compiler', 'Web Apps', 'SSR', 'Performance'],
    websiteUrl: 'https://kit.svelte.dev',
    rating: 4.7,
    releaseDate: 'March 2021',
    usage: 'Build highly performant web applications with less code. Suitable for projects ranging from small sites to complex apps.',
    exampleCode: `<script>
  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>`,
    exampleUrl: 'https://learn.svelte.dev/tutorial/welcome-to-svelte'
  },
  {
    id: 'remix',
    name: 'Remix',
    description: 'A full stack web framework that focuses on web standards and modern web app UX.',
    detailedDescription: 'Remix leverages web standards to deliver fast, resilient user experiences. It supports server-side rendering, data loading, and mutations with a focus on progressive enhancement and nested routing. Backed by Shopify, it emphasizes simplicity and performance.',
    logoUrl: 'https://www.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-600w-1636661941.jpg',
    dataAiHint: 'remix logo',
    version: '2.9.2',
    tags: ['React', 'Web Standards', 'Routing', 'SSR', 'Forms'],
    websiteUrl: 'https://remix.run',
    rating: 4.6,
    releaseDate: 'November 2021',
    usage: 'Great for building web applications that embrace web standards, with robust data handling and progressive enhancement.',
    exampleCode: `// app/routes/index.jsx
export async function loader() {
  return { message: "Hello from the loader!" };
}
export default function Index() {
  const data = useLoaderData();
  return <h1>{data.message}</h1>;
}`,
    exampleUrl: 'https://remix.run/docs/en/main/tutorials/blog'
  },
  {
    id: 'astro',
    name: 'Astro',
    description: 'Build fast websites, faster. Pull content from anywhere and deploy everywhere.',
    detailedDescription: 'Astro is a web framework for content-driven websites like blogs and e-commerce. It uses server-side rendering of UI components (React, Svelte, Vue, etc.) to HTML by default, shipping zero client-side JavaScript unless opted-in via Astro islands.',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyExa7J9XUTwDPu6uvHeDbjVzqw0O3fcBxHw&s',
    dataAiHint: 'astro logo',
    version: '4.11.0',
    tags: ['Static Site', 'MPA', 'Islands', 'Content Focused', 'Performance'],
    websiteUrl: 'https://astro.build',
    rating: 4.8,
    releaseDate: 'June 2021',
    usage: 'Perfect for content-heavy sites where performance and SEO are critical. Allows using multiple UI frameworks on the same page.',
    exampleCode: `---
// src/pages/index.astro
const pageTitle = "My Astro Site";
---
<html lang="en">
<head>
  <title>{pageTitle}</title>
</head>
<body>
  <h1>Welcome to {pageTitle}!</h1>
</body>
</html>`,
    exampleUrl: 'https://docs.astro.build/en/tutorial/0-introduction/'
  },
  {
    id: 'nuxt',
    name: 'Nuxt',
    description: 'The Intuitive Vue Framework for building performant web applications.',
    detailedDescription: 'Nuxt is a full-stack framework built on Vue.js, offering server-side rendering, static site generation, and a powerful module ecosystem. It simplifies development with auto-imports, Vite integration, and hybrid rendering for flexible deployments.',
    logoUrl: 'https://smallit.co.jp/wp-content/uploads/2022/01/nuxt-1200x630.png',
    dataAiHint: 'nuxt logo',
    version: '3.12.0',
    tags: ['Vue', 'SSR', 'Static Site', 'Full-stack', 'Vite'],
    websiteUrl: 'https://nuxt.com',
    rating: 4.7,
    releaseDate: 'November 2016',
    usage: 'Ideal for Vue-based projects needing SEO, fast load times, and flexible rendering. Great for blogs, e-commerce, and enterprise apps.',
    exampleCode: `<script setup>
const count = ref(0)
</script>

<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template>`,
    exampleUrl: 'https://nuxt.com/docs/getting-started/introduction'
  },
  {
    id: 'gatsby',
    name: 'Gatsby',
    description: 'A React-based framework for creating fast, secure, and scalable websites.',
    detailedDescription: 'Gatsby combines React with a powerful static site generator, optimized for speed and SEO. It uses GraphQL for data fetching and supports a rich plugin ecosystem for extensibility, making it ideal for content-driven sites.',
    logoUrl: 'https://miro.medium.com/v2/resize:fit:770/1*9FO4Ll8_PQQcjb1NNPLlKA.png',
    dataAiHint: 'gatsby logo',
    version: '5.13.0',
    tags: ['React', 'Static Site', 'GraphQL', 'SEO', 'Performance'],
    websiteUrl: 'https://www.gatsbyjs.com',
    rating: 4.5,
    releaseDate: 'May 2015',
    usage: 'Best for static sites, blogs, and e-commerce platforms requiring fast load times and strong SEO performance.',
    exampleCode: `// src/pages/index.js
import * as React from "react"
export default function IndexPage() {
  return <h1>Welcome to Gatsby!</h1>
}`,
    exampleUrl: 'https://www.gatsbyjs.com/docs/tutorial/'
  },
  {
    id: 'qwik',
    name: 'Qwik',
    description: 'A framework designed for instant-loading web apps with minimal JavaScript.',
    detailedDescription: 'Qwik optimizes for instant page loads by serializing application state and resuming execution on the client. It minimizes JavaScript sent to the browser, using resumability to achieve unparalleled performance for complex apps.',
    logoUrl: 'https://repository-images.githubusercontent.com/368917877/cfcc0a17-1843-4713-942b-a122ffc2d72a',
    dataAiHint: 'qwik logo',
    version: '1.5.0',
    tags: ['Performance', 'Resumability', 'Static Site', 'Web Apps', 'TypeScript'],
    websiteUrl: 'https://qwik.dev',
    rating: 4.6,
    releaseDate: 'May 2022',
    usage: 'Ideal for performance-critical applications where instant loading is essential, such as e-commerce and interactive dashboards.',
    exampleCode: `import { component$ } from '@builder.io/qwik';
export default component$(() => {
  return <h1>Hello from Qwik!</h1>;
});`,
    exampleUrl: 'https://qwik.dev/docs/getting-started/'
  },
  {
    id: 'solidstart',
    name: 'SolidStart',
    description: 'A Solid.js framework for building fast, full-stack web applications.',
    detailedDescription: 'SolidStart extends Solid.js with server-side rendering, static site generation, and file-based routing. It focuses on fine-grained reactivity and minimal JavaScript for high-performance applications.',
    logoUrl: 'https://start.solidjs.com/start_og.png',
    dataAiHint: 'solidstart logo',
    version: '0.4.0',
    tags: ['Solid', 'SSR', 'Static Site', 'Reactivity', 'Performance'],
    websiteUrl: 'https://start.solidjs.com',
    rating: 4.4,
    releaseDate: 'June 2022',
    usage: 'Suitable for developers seeking a lightweight, reactive framework for building performant web apps and static sites.',
    exampleCode: `import { createSignal } from 'solid-js';
export default function Counter() {
  const [count, setCount] = createSignal(0);
  return <button onClick={() => setCount(count() + 1)}>Count: {count()}</button>;
}`,
    exampleUrl: 'https://start.solidjs.com/getting-started'
  },
  {
    id: 'angularuniversal',
    name: 'Angular Universal',
    description: 'Server-side rendering for Angular applications to improve performance and SEO.',
    detailedDescription: 'Angular Universal enables server-side rendering for Angular apps, improving initial load times and SEO. It integrates with Angular’s ecosystem, supporting dynamic rendering and prerendering for static sites.',
    logoUrl: 'https://angular.dev/assets/images/logos/angular/logo.png',
    dataAiHint: 'angular logo',
    version: '18.0.0',
    tags: ['Angular', 'SSR', 'SEO', 'Full-stack', 'TypeScript'],
    websiteUrl: 'https://img-c.udemycdn.com/course/750x422/1572898_a931_3.jpg',
    rating: 4.5,
    releaseDate: 'February 2017',
    usage: 'Best for enterprise-scale Angular applications requiring SEO and fast initial loads.',
    exampleCode: `// src/app/app.component.ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '<h1>Hello Angular Universal</h1>'
})
export class AppComponent {}`,
    exampleUrl: 'https://angular.dev/guide/ssr'
  },
  {
    id: 'blitzjs',
    name: 'Blitz.js',
    description: 'A full-stack React framework inspired by Ruby on Rails.',
    detailedDescription: 'Blitz.js builds on Next.js, adding conventions for rapid development, including authentication, database integration, and zero-API data layer. It aims to simplify full-stack development with a Rails-like experience.',
    logoUrl: 'https://miro.medium.com/v2/resize:fit:1400/0*UyEKhRBaINAtNNiB.png',
    dataAiHint: 'blitzjs logo',
    version: '2.0.0',
    tags: ['React', 'Full-stack', 'Next.js', 'Authentication', 'Database'],
    websiteUrl: 'https://blitzjs.com',
    rating: 4.3,
    releaseDate: 'August 2020',
    usage: 'Great for rapid prototyping and full-stack React apps with built-in authentication and database support.',
    exampleCode: `// app/pages/index.tsx
export default function Home() {
  return <h1>Welcome to Blitz.js!</h1>;
}`,
    exampleUrl: 'https://blitzjs.com/docs/getting-started'
  },
  {
    id: 'redwoodjs',
    name: 'RedwoodJS',
    description: 'A full-stack JavaScript framework for building scalable applications.',
    detailedDescription: 'RedwoodJS integrates React, GraphQL, and Prisma for a seamless full-stack experience. It offers file-based routing, cells for data fetching, and a CLI for rapid development, with a focus on developer productivity.',
    logoUrl: 'https://miro.medium.com/v2/resize:fit:1000/0*6gmmrBhYmMjmUNHa.png',
    dataAiHint: 'redwoodjs logo',
    version: '6.5.0',
    tags: ['React', 'GraphQL', 'Prisma', 'Full-stack', 'TypeScript'],
    websiteUrl: 'https://redwoodjs.com',
    rating: 4.4,
    releaseDate: 'March 2020',
    usage: 'Ideal for full-stack applications needing GraphQL and database integration, such as SaaS platforms and startups.',
    exampleCode: `// web/src/pages/HomePage/HomePage.js
export default () => <h1>Welcome to RedwoodJS!</h1>;`,
    exampleUrl: 'https://redwoodjs.com/docs/tutorial'
  },
  {
    id: 'hydrogen',
    name: 'Hydrogen',
    description: 'A React framework for building custom storefronts, optimized for Shopify.',
    detailedDescription: 'Hydrogen is a React-based framework by Shopify for creating fast, dynamic e-commerce storefronts. It integrates with Shopify’s APIs and Oxygen for edge deployment, focusing on performance and developer experience.',
    logoUrl: 'https://i.ytimg.com/vi/mAsM9c2sGjA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLClkFxPdGjiinedqeTbaZoMY4qHLQ',
    dataAiHint: 'hydrogen logo',
    version: '2023.7.0',
    tags: ['React', 'Shopify', 'E-commerce', 'SSR', 'Performance'],
    websiteUrl: 'https://shopify.dev/docs/custom-storefronts/hydrogen',
    rating: 4.5,
    releaseDate: 'June 2021',
    usage: 'Perfect for Shopify-powered e-commerce sites needing custom, high-performance storefronts.',
    exampleCode: `// src/App.jsx
import {useShopQuery} from '@shopify/hydrogen';
export default function App() {
  const {data} = useShopQuery({query: '{ shop { name } }'});
  return <h1>{data.shop.name}</h1>;
}`,
    exampleUrl: 'https://shopify.dev/docs/custom-storefronts/hydrogen/getting-started'
  },
  {
    id: 'fresh',
    name: 'Fresh',
    description: 'A full-stack web framework for Deno with zero-configuration.',
    detailedDescription: 'Fresh is a modern framework for Deno, offering server-side rendering and static site generation with minimal configuration. It uses Preact for the frontend and emphasizes simplicity and performance.',
    logoUrl: 'https://fresh.deno.dev/logo.svg',
    dataAiHint: 'fresh logo',
    version: '1.6.0',
    tags: ['Deno', 'Preact', 'SSR', 'Static Site', 'Performance'],
    websiteUrl: 'https://fresh.deno.dev',
    rating: 4.3,
    releaseDate: 'June 2022',
    usage: 'Ideal for lightweight, modern web apps using Deno, with a focus on simplicity and speed.',
    exampleCode: `// routes/index.tsx
export default function Home() {
  return <h1>Hello from Fresh!</h1>;
}`,
    exampleUrl: 'https://fresh.deno.dev/docs/getting-started'
  },
  {
    id: 'lit',
    name: 'Lit',
    description: 'A simple library for building fast, lightweight web components.',
    detailedDescription: 'Lit is a lightweight library for creating web components with a reactive, declarative API. It’s designed for performance and interoperability, working well with any framework or no framework at all.',
    logoUrl: 'https://lit.dev/images/logo.svg',
    dataAiHint: 'lit logo',
    version: '3.1.0',
    tags: ['Web Components', 'Reactive', 'Lightweight', 'Performance', 'Interoperable'],
    websiteUrl: 'https://lit.dev',
    rating: 4.4,
    releaseDate: 'May 2018',
    usage: 'Best for building reusable, framework-agnostic web components for modern web applications.',
    exampleCode: `import { LitElement, html } from 'lit';
class MyElement extends LitElement {
  render() {
    return html\`<h1>Hello from Lit!</h1>\`;
  }
}
customElements.define('my-element', MyElement);`,
    exampleUrl: 'https://lit.dev/docs/getting-started/'
  },
  {
    id: 'preact',
    name: 'Preact',
    description: 'A fast 3kB alternative to React with the same modern API.',
    detailedDescription: 'Preact is a lightweight alternative to React, offering a similar API with a smaller footprint. It’s ideal for performance-critical applications and supports modern JavaScript features with minimal overhead.',
    logoUrl: 'https://preactjs.com/assets/branding/symbol-light.svg',
    dataAiHint: 'preact logo',
    version: '10.19.0',
    tags: ['React', 'Lightweight', 'Performance', 'Web Apps', 'JavaScript'],
    websiteUrl: 'https://preactjs.com',
    rating: 4.5,
    releaseDate: 'September 2013',
    usage: 'Great for building fast, lightweight web apps where bundle size and performance are critical.',
    exampleCode: `import { h, render } from 'preact';
render(<h1>Hello from Preact!</h1>, document.body);`,
    exampleUrl: 'https://preactjs.com/guide/v10/getting-started'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    description: 'The Progressive JavaScript Framework for building user interfaces.',
    detailedDescription: 'Vue.js is a flexible framework for building interactive UIs. It supports single-file components, reactive data binding, and a robust ecosystem, making it suitable for both small and large-scale applications.',
    logoUrl: 'https://vuejs.org/images/logo.png',
    dataAiHint: 'vue logo',
    version: '3.4.0',
    tags: ['Vue', 'Reactive', 'Single-file Components', 'Web Apps', 'JavaScript'],
    websiteUrl: 'https://vuejs.org',
    rating: 4.8,
    releaseDate: 'February 2014',
    usage: 'Ideal for building dynamic, reactive web applications, from small widgets to enterprise-grade systems.',
    exampleCode: `<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template>`,
    exampleUrl: 'https://vuejs.org/guide/introduction.html'
  },
  {
    id: 'ember',
    name: 'Ember.js',
    description: 'A framework for ambitious web developers building scalable applications.',
    detailedDescription: 'Ember.js is a productive, battle-tested framework with a strong convention-over-configuration approach. It includes a CLI, routing, and data management for building complex single-page applications.',
    logoUrl: 'https://emberjs.com/images/ember-logo.svg',
    dataAiHint: 'ember logo',
    version: '5.4.0',
    tags: ['JavaScript', 'SPA', 'Convention', 'Routing', 'Productivity'],
    websiteUrl: 'https://emberjs.com',
    rating: 4.3,
    releaseDate: 'October 2011',
    usage: 'Best for large-scale, single-page applications requiring strong conventions and productivity tools.',
    exampleCode: `// app/components/hello-world.js
import Component from '@glimmer/component';
export default class HelloWorld extends Component {
  <template>
    <h1>Hello from Ember!</h1>
  </template>
}`,
    exampleUrl: 'https://guides.emberjs.com'
  },
  {
    id: 'backbone',
    name: 'Backbone.js',
    description: 'A lightweight framework for structuring JavaScript applications.',
    detailedDescription: 'Backbone.js provides structure to web applications with models, collections, views, and events. It’s lightweight and flexible, often used with other libraries for modern web development.',
    logoUrl: 'https://backbonejs.org/images/backbone.png',
    dataAiHint: 'backbone logo',
    version: '1.5.0',
    tags: ['JavaScript', 'Lightweight', 'MVC', 'Web Apps', 'Events'],
    websiteUrl: 'https://backbonejs.org',
    rating: 4.2,
    releaseDate: 'October 2010',
    usage: 'Suitable for lightweight applications needing structure without the overhead of larger frameworks.',
    exampleCode: `var AppView = Backbone.View.extend({
  el: '#app',
  render: function() {
    this.$el.html('<h1>Hello from Backbone!</h1>');
    return this;
  }
});
new AppView().render();`,
    exampleUrl: 'https://backbonejs.org/#Getting-started'
  },
  {
    id: 'alpine',
    name: 'Alpine.js',
    description: 'A rugged, minimal framework for composing JavaScript behavior in your markup.',
    detailedDescription: 'Alpine.js offers reactive and declarative data binding for lightweight interactivity without a heavy framework. It’s designed to enhance HTML directly, ideal for simple, dynamic UIs.',
    logoUrl: 'https://alpinejs.dev/alpine.png',
    dataAiHint: 'alpine logo',
    version: '3.13.0',
    tags: ['JavaScript', 'Lightweight', 'Reactive', 'Declarative', 'Frontend'],
    websiteUrl: 'https://alpinejs.dev',
    rating: 4.4,
    releaseDate: 'May 2019',
    usage: 'Perfect for adding interactivity to static pages or small projects without complex build tools.',
    exampleCode: `<div x-data="{ count: 0 }">
  <button x-on:click="count++">Clicked <span x-text="count"></span> times</button>
</div>`,
    exampleUrl: 'https://alpinejs.dev/start'
  },
  {
    id: 'fastify',
    name: 'Fastify',
    description: 'A fast and low-overhead web framework for Node.js.',
    detailedDescription: 'Fastify is a high-performance Node.js framework focused on speed, extensibility, and developer experience. It supports plugins, async/await, and JSON schema validation for building APIs and server-side applications.',
    logoUrl: 'https://fastify.dev/img/logos/fastify-black.svg',
    dataAiHint: 'fastify logo',
    version: '4.28.0',
    tags: ['Node.js', 'API', 'Performance', 'Server-side', 'JavaScript'],
    websiteUrl: 'https://fastify.dev',
    rating: 4.6,
    releaseDate: 'September 2016',
    usage: 'Ideal for building high-performance APIs and server-side applications with Node.js.',
    exampleCode: `const fastify = require('fastify')();
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});
fastify.listen({ port: 3000 });`,
    exampleUrl: 'https://fastify.dev/docs/latest/Guides/Getting-Started/'
  }
];

export default function FrameworksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFrameworks, setFilteredFrameworks] = useState<Framework[]>(mockFrameworksData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = mockFrameworksData.filter(framework =>
      framework.name.toLowerCase().includes(lowerCaseQuery) ||
      framework.description.toLowerCase().includes(lowerCaseQuery) ||
      framework.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredFrameworks(filtered);
  }, [searchQuery]);

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Frameworks</h1>
        <p className="text-muted-foreground">Discover and explore various web frameworks.</p>
      </header>
      
      <FilterToolbar 
        onSearchChange={handleSearch}
        searchPlaceholder="Search frameworks..." 
      />

      {filteredFrameworks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFrameworks.map((framework) => (
            <ItemCard key={framework.id} item={framework} type="framework" />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No frameworks found matching &quot;{searchQuery}&quot;.
        </p>
      )}
    </section>
  );
}
