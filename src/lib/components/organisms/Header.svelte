<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import { asLink, type LinkField } from '@prismicio/client';

	import WordMark from '$lib/components/atoms/WordMark.svelte';
	import ButtonLink from '$lib/components/atoms/ButtonLink.svelte';

	import type { HeaderProps } from '$lib/types';
	import clsx from 'clsx';

	import IconClose from '~icons/ph/x-bold';
	import IconMenu from '~icons/ph/list-bold';
	import { page } from '$app/stores';

	export let props: HeaderProps;

	let isOpen = false;
	const toggleOpen = () => (isOpen = !isOpen);
	const onClose = () => (isOpen = false);

	const isActive = (link: LinkField) => {
		const path = asLink(link);

		return path && $page.url.pathname.includes(path);
	};
</script>

<svelte:head>
	{#if isOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>

<header class="p-4 md:p-6">
	<nav
		class="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium md:flex-row md:items-center"
		aria-label="Main navigation"
	>
		<div class="flex items-center justify-between">
			<a href="/" class="z-50" on:click={onClose}>
				<WordMark />
				<span class="sr-only">{props.site_title} home page</span>
			</a>

			<button
				class="block p-2 text-3xl text-white md:hidden"
				on:click={toggleOpen}
				aria-expanded={isOpen}
				aria-label="Toggle menu"
			>
				<IconMenu />
			</button>
		</div>
		<!-- Mobile -->
		<div
			class={clsx(
				'fixed inset-0 z-40 flex flex-col items-end bg-gray-950 pr-4 pt-6 transition-transform duration-300 ease-in-out md:invisible md:hidden',
				isOpen ? 'translate-x-0' : 'translate-x-[100%]'
			)}
		>
			<button class="block p-2 text-3xl text-white md:hidden" on:click={toggleOpen}>
				<IconClose />
			</button>
			<ul class="flex flex-col items-end gap-6">
				{#each props.navigation as item}
					<li>
						{#if item.as_cta}
							<ButtonLink
								field={item.link}
								on:click={onClose}
								aria-current={isActive(item.link) ? 'page' : undefined}
							>
								{item.label}
							</ButtonLink>
						{:else}
							<PrismicLink
								field={item.link}
								class="block min-h-11 px-3 text-2xl first:mt-8"
								on:click={onClose}
								aria-current={isActive(item.link) ? 'page' : undefined}
							>
								{item.label}
							</PrismicLink>
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<!-- Desk -->
		<ul class="invisible hidden items-center gap-6 md:visible md:flex">
			{#each props.navigation as item}
				<li>
					{#if item.as_cta}
						<ButtonLink field={item.link} aria-current={isActive(item.link) ? 'page' : undefined}>
							{item.label}
						</ButtonLink>
					{:else}
						<PrismicLink
							field={item.link}
							class="inline-flex min-h-11 items-center"
							aria-current={isActive(item.link) ? 'page' : undefined}
						>
							{item.label}
						</PrismicLink>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
</header>
