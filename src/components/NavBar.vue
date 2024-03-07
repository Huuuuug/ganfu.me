<script setup lang="ts">
import { RouterLink } from "vue-router";
import Logo from "./Logo.vue";
import ToggleTheme from "./ToggleTheme.vue";
</script>

<template>
  <header class="header z-40">
    <RouterLink
      class="w-12 h-12 absolute xl:fixed m-5 select-none outline-none"
      to="/"
      focusable="false"
    >
      <Logo />
    </RouterLink>
    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <RouterLink to="/articles" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </RouterLink>
        <a
          href="https://github.com/Huuuuug"
          target="_blank"
          title="GitHub"
          class="lt-md:hidden"
        >
          <div i-uil-github-alt />
        </a>
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.nav {
  padding: 1.5rem;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
  color: var(--f-base-color);
}

.nav .right > * {
  margin: auto;
}
</style>
