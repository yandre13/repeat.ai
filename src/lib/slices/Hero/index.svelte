<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicText } from '@prismicio/svelte';

	import Bounded from '$lib/components/atoms/Bounded.svelte';
	import ButtonLink from '$lib/components/atoms/ButtonLink.svelte';
	import TriangleGrid from '$lib/components/molecules/TriangleGrid.svelte';

	export let slice: Content.HeroSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="relative text-center">
		<TriangleGrid />
		<div class="mx-auto max-w-3xl">
			{#if slice.primary.heading}
				<h1 class="text-balance text-5xl font-medium md:text-7xl">
					<PrismicText field={slice.primary.heading} />
				</h1>
			{/if}

			{#if slice.primary.body}
				<p class="mx-auto mt-6 max-w-sm text-gray-300">
					<PrismicText field={slice.primary.body} />
				</p>
			{/if}
		</div>

		{#if slice.primary.button_link}
			<ButtonLink class="mt-6" field={slice.primary.button_link}
				>{slice.primary.button_label}</ButtonLink
			>
		{/if}

		{#if slice.primary.cover}
			<div class="glass-container mt-16 w-fit">
				<div
					class="absolute left-1/3 top-0 -z-10 h-2/3 w-2/3 bg-violet-700/50 mix-blend-screen blur-[120px] filter"
				/>
				<div
					class="absolute left-0 top-1/3 -z-10 h-2/3 w-2/3 bg-orange-600/50 mix-blend-screen blur-[120px] filter"
				/>
				<PrismicImage class="rounded-lg" field={slice.primary.cover} />
			</div>
		{/if}
	</div>
</Bounded>
