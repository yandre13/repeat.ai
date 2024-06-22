<script lang="ts">
	import { PrismicLink, PrismicRichText } from '@prismicio/svelte';

	import WordMark from '$lib/components/atoms/WordMark.svelte';

	import type { FooterProps } from '$lib/types';

	export let props: FooterProps;
</script>

<footer class="text-white">
	<div
		class="container flex flex-col gap-6 py-12 md:flex-row md:flex-wrap md:justify-between md:gap-8"
	>
		<div>
			<a href="/">
				<WordMark />
				<span class="sr-only">{props.title}</span>
			</a>
		</div>

		<div class="flex items-center gap-4">
			<p>{props.title}</p>
			<ul class="flex flex-wrap items-center gap-2">
				{#each props.social_links as item}
					<li>
						<PrismicLink field={item.link}>
							<img width="40" height="40" src={item.icon.url} alt={item.label} />
							<span class="sr-only">{item.label}</span>
						</PrismicLink>
					</li>
				{/each}
			</ul>
		</div>

		<div class="w-full">
			<PrismicRichText field={props.copyrights} />
		</div>
	</div>
</footer>
