<script lang="ts">
	import type { AnimationName } from '@lib/animations';

	export let animationName: AnimationName;
	export let play: (animationName: AnimationName) => void;
	export let reset: (animationName: AnimationName) => void;
</script>

<button
	class="my-8 border-emerald-400 border-solid border-4 px-4 py-2 rounded-md"
	on:click={() => {
		play(animationName);
	}}>Play</button
>
<button
	class="my-8 border-emerald-400 border-solid border-4 px-4 py-2 rounded-md"
	on:click={() => {
		reset(animationName);
	}}>Reset</button
>
