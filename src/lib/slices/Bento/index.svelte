<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/svelte';

	import Heading2 from '$lib/rich-text/components/Heading2.svelte';
	import Bounded from '$lib/components/atoms/Bounded.svelte';
	import GoldText from './GoldText.svelte';
	import clsx from 'clsx';

	export let slice: Content.BentoSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	{#if slice.primary.heading}
		<Heading2>
			<PrismicRichText field={slice.primary.heading} components={{ em: GoldText }} />
		</Heading2>
	{/if}

	{#if slice.primary.body}
		<div class="mx-auto mt-6 max-w-md text-center text-gray-300">
			<PrismicRichText field={slice.primary.body} />
		</div>
	{/if}

	{#if slice.primary.items.length > 0}
		<div class="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
			{#each slice.primary.items as item}
				<div
					class={clsx(
						'glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gray-950/60 p-4 before:bg-gray-100/10',
						item.wide ? 'md:col-span-2' : 'md:col-span-1'
					)}
				>
					<h3 class="text-2xl">
						<PrismicText field={item.title} />
					</h3>
					<div class="max-w-md text-gray-300">
						<PrismicRichText field={item.body} />
					</div>
					<PrismicImage class="max-h-36 w-auto" field={item.image} />
				</div>
			{/each}
		</div>
	{/if}
</Bounded>
