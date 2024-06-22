<script lang="ts">
	import type { Content } from '@prismicio/client';

	import Bounded from '$lib/components/atoms/Bounded.svelte';
	import { PrismicImage, PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';
	import Heading2 from '$lib/rich-text/components/Heading2.svelte';
	import SpanHeading from '$lib/rich-text/components/SpanHeading.svelte';
	import clsx from 'clsx';

	export let slice: Content.CaseStudiesSlice;
	export let caseStudies: Content.CaseStudyDocument[] = [];
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	{#if slice.primary.heading}
		<Heading2>
			<PrismicRichText field={slice.primary.heading} components={{ heading2: SpanHeading }} />
		</Heading2>
	{/if}
	{#if slice.primary.body}
		<div class="mx-auto mt-6 max-w-md text-center text-gray-300">
			<PrismicRichText field={slice.primary.body} />
		</div>
	{/if}

	<div class="mt-20 grid gap-16">
		{#each caseStudies as caseStudy, index}
			<div
				class="group relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
			>
				<div class="col-span-1 flex flex-col justify-center gap-4">
					<h3 class="text-4xl">
						<PrismicText field={caseStudy.data.company} />
					</h3>
					<div class="max-w-md">
						<PrismicRichText field={caseStudy.data.description} />
					</div>
					<PrismicLink
						document={caseStudy}
						class="z-10 after:absolute after:inset-0 hover:underline"
					>
						Read <PrismicText field={caseStudy.data.company} /> case study
					</PrismicLink>
				</div>
				<div class={clsx('relative lg:col-span-2', index % 2 && 'md:-order-1')}>
					<div class="image-glow -bottom-8 -left-4 bg-orange-500" />
					<div class="image-glow -right-4 -top-8 bg-violet-500" />
					<PrismicImage
						field={caseStudy.data.image}
						sizes="(min-width: 1024px) 50vw, 100vw"
						class="z-20 scale-[.98] rounded-xl transition-transform duration-300 group-hover:scale-100"
					/>
				</div>
			</div>
		{/each}
	</div>
</Bounded>

<style>
	.image-glow {
		@apply absolute h-1/2 w-1/2 rounded-full opacity-0 mix-blend-screen blur-3xl transition-opacity duration-500 group-hover:opacity-30;
	}
</style>
