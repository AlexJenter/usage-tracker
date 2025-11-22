<template>
    <menu>
        <li>
            <NuxtLink to="/">home</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/product">product</NuxtLink>
        </li>
    </menu>
    <slot />
</template>

<style>
menu {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 1em;
}
</style>
