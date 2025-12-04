<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <div class="navbar bg-base-200 sticky top-0 z-50 shadow-lg">
      <div class="navbar-start">
        <RouterLink to="/" class="btn btn-ghost text-xl gap-2 logo-link">
          <svg class="w-6 h-6 logo-globe" viewBox="0 0 24 24" fill="none" stroke-width="2">
            <defs>
              <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="50%" stop-color="#10b981" />
                <stop offset="100%" stop-color="#f59e0b" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" stroke="url(#globeGradient)"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="url(#globeGradient)"/>
          </svg>
          <span class="logo-text">
            <span class="text-primary">Globe</span> <span class="text-secondary">Explorer</span>
          </span>
        </RouterLink>
      </div>
      <div class="navbar-center hidden sm:flex">
        <ul class="menu menu-horizontal px-1 gap-1">
          <li><RouterLink to="/" class="nav-link font-medium">100 People</RouterLink></li>
          <li><RouterLink to="/cartogram" class="nav-link font-medium">Cartogram</RouterLink></li>
          <li><RouterLink to="/languages" class="nav-link font-medium">Languages</RouterLink></li>
          <li><RouterLink to="/compare" class="nav-link font-medium">Compare</RouterLink></li>
        </ul>
      </div>
      <div class="navbar-end">
        <label class="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" class="theme-controller" value="light" />
          <svg class="swap-on w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          <svg class="swap-off w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer footer-center p-4 bg-base-200 text-base-content">
      <aside>
        <p>Built with Vue 3 + DaisyUI | Data from REST Countries API</p>
      </aside>
    </footer>
  </div>
</template>

<style scoped>
/* Logo hover effect */
.logo-link:hover .logo-globe {
  transform: rotate(15deg);
  transition: transform 0.3s ease;
}

.logo-globe {
  transition: transform 0.3s ease;
}

/* Nav link styling with underline animation */
.nav-link {
  position: relative;
  background: transparent !important;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: oklch(var(--p));
  transition: width 0.3s ease, left 0.3s ease;
}

/* Hover: underline grows from center */
.nav-link:hover::after {
  width: 70%;
  left: 15%;
}

.nav-link:hover {
  color: oklch(var(--p));
}

/* Active link: full underline, different color */
.nav-link.router-link-exact-active {
  color: oklch(var(--s));
}

.nav-link.router-link-exact-active::after {
  width: 80%;
  left: 10%;
  background: oklch(var(--s));
}

/* Active link hover: subtle pulse */
.nav-link.router-link-exact-active:hover::after {
  animation: pulse-underline 1s ease infinite;
}

@keyframes pulse-underline {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>
