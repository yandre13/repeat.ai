<script lang="ts">
	import clsx from 'clsx';
	import type { Content } from '@prismicio/client';
	import IconGear from '~icons/ph/gear';
	import IconCycle from '~icons/ph/arrows-clockwise';

	import Bounded from '$lib/components/atoms/Bounded.svelte';
	import ButtonLink from '$lib/components/atoms/ButtonLink.svelte';
	import Heading2 from '$lib/rich-text/components/Heading2.svelte';
	import SpanHeading from '$lib/rich-text/components/SpanHeading.svelte';
	import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/svelte';

	export let slice: Content.ShowcaseSlice;

	const ICONS = {
		gear: IconGear,
		cycle: IconCycle
	};
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div
		class="absolute -z-10 aspect-video w-full max-w-2xl rounded-full bg-violet-500/40 mix-blend-screen blur-[120px] filter"
	/>
	{#if slice.primary.heading}
		<Heading2>
			<PrismicRichText field={slice.primary.heading} components={{ heading2: SpanHeading }} />
		</Heading2>
	{/if}
	<div
		class="relative mt-16 grid items-center gap-8 rounded-xl border border-violet-50/20 bg-gradient-to-b from-gray-50/15 to-gray-50/5 p-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12"
	>
		<div class="grid-background" />
		<div>
			{#if slice.primary.icon}
				<div class="w-fit rounded-lg bg-violet-800 p-4 text-3xl">
					<svelte:component this={ICONS[slice.primary.icon]} class="text-violet-50" />
				</div>
			{/if}
			{#if slice.primary.subheading}
				<h3 class="mt-6 text-2xl">
					<PrismicText field={slice.primary.subheading} />
				</h3>
			{/if}
			{#if slice.primary.body}
				<div class="prose prose-invert mt-4 max-w-xl">
					<PrismicRichText field={slice.primary.body} />
				</div>
			{/if}
			{#if slice.primary.button_label}
				<ButtonLink class="mt-6" field={slice.primary.button_link}>
					{slice.primary.button_label}
				</ButtonLink>
			{/if}
		</div>
		<PrismicImage
			field={slice.primary.image}
			class={clsx(
				'rounded-lg opacity-90 shadow-2xl lg:col-span-2 lg:pt-0',
				slice.variation === 'reverse'
					? 'lg:order-1 lg:translate-x-[15%]'
					: 'lg:-order-1 lg:translate-x-[-15%]'
			)}
			sizes="(min-width: 1024px) 50vw, 100vw"
		/>
	</div>
</Bounded>

<style>
	.grid-background {
		background-image: url('/assets/grid-pattern.png');
		position: absolute;
		inset: 0;
		background-repeat: repeat;
		z-index: -1;
		background-position: center;
		opacity: 0.15;
		mask-image: radial-gradient(circle at 60% 50%, black 10%, transparent 40%);
	}
</style>
