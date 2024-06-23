<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	import type { Content } from '@prismicio/client';
	import background from './background.jpg';
	import LogoBackground from './LogoBackground.svelte';
	import Bounded from '$lib/components/atoms/Bounded.svelte';
	import StylizedLogoMark from '$lib/components/atoms/StylizedLogoMark.svelte';
	import { PrismicRichText } from '@prismicio/svelte';
	import Heading2 from '$lib/rich-text/components/Heading2.svelte';
	import SpanHeading from '$lib/rich-text/components/SpanHeading.svelte';
	import clsx from 'clsx';

	import IconNpm from '~icons/fa6-brands/npm';
	import IconGithub from '~icons/fa6-brands/github';
	import IconFigma from '~icons/fa6-brands/figma';
	import IconFly from '~icons/fa6-brands/fly';
	import IconCloudflare from '~icons/fa6-brands/cloudflare';
	import IconDigitialOcean from '~icons/fa6-brands/digital-ocean';

	const ICONS = {
		npm: IconNpm,
		github: IconGithub,
		figma: IconFigma,
		fly: IconFly,
		cloudflare: IconCloudflare,
		digitalocean: IconDigitialOcean
	};

	export let slice: Content.IntegrationsSlice;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) return;

		const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

		tl.to('.pulsing-logo', {
			keyframes: [
				{ filter: 'brightness(2)', opacity: 1, duration: 0.4, ease: 'power2.in' },
				{ filter: 'brightness(1)', opacity: 0.7, duration: 0.9 }
			]
		});

		tl.to(
			'.signal-line',
			{
				keyframes: [
					{ backgroundPosition: '0% 0%' },
					{ backgroundPosition: '100% 100%', stagger: { from: 'center', each: 0.3 }, duration: 1 }
				]
			},
			'-=1.4'
		);

		tl.to(
			'.pulsing-icon',
			{
				keyframes: [
					{
						opacity: 1,
						duration: 1,
						stagger: {
							from: 'center',
							each: 0.3
						}
					},
					{
						opacity: 0.4,
						duration: 1,
						stagger: {
							from: 'center',
							each: 0.3
						}
					}
				]
			},
			'-=2'
		);
	});
</script>

<Bounded
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="relative overflow-hidden"
>
	<img src={background} alt="Background" class="absolute inset-0 h-full w-full object-cover" />
	<LogoBackground />

	<div class="relative">
		{#if slice.primary.heading}
			<Heading2
				class="bg-gradient-to-b from-violet-50 to-violet-300 bg-clip-text py-2 text-transparent"
			>
				<PrismicRichText field={slice.primary.heading} components={{ heading2: SpanHeading }} />
			</Heading2>
		{/if}
		{#if slice.primary.body}
			<div class="mx-auto mt-6 max-w-md text-center text-gray-300">
				<PrismicRichText field={slice.primary.body} />
			</div>
		{/if}
		<div class="mt-20 flex flex-col items-center md:flex-row">
			{#each slice.primary.items as item, index}
				{#if item.icon}
					{#if index === Math.floor(slice.primary.items.length / 2)}
						<StylizedLogoMark />
						<div class="signal-line rotate-180" />
					{/if}

					<div
						class="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-violet-50/30 bg-violet-50/25 p-3 text-3xl text-violet-100 opacity-40 lg:text-5xl"
					>
						<svelte:component this={ICONS[item.icon]} />
					</div>

					{#if index !== slice.primary.items.length - 1}
						<div
							class={clsx(
								'signal-line',
								index >= Math.floor(slice.primary.items.length / 2) ? 'rotate-180' : 'rotate-0'
							)}
						/>
					{/if}
				{/if}
			{/each}
		</div>
	</div>
</Bounded>
