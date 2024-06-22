<script lang="ts">
	import clsx from 'clsx';

	let className: string = '';
	export { className as class };
</script>

<h2 class={clsx('mx-auto max-w-3xl text-center text-5xl font-medium md:text-7xl', className)}>
	<slot />
</h2>
