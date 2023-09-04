<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Presentation,
		Slide,
		EaseDemo,
		AnimationControls,
	} from '@components';
	import {
		animations,
		currentAnimationName,
		labelByAnimationName,
		ready,
	} from '@stores/animations';

	onMount(() => {
		$ready = true;
	});

	function playAnimation() {
		if ($currentAnimationName !== null) {
			console.log(`Playing ${$currentAnimationName}`);
			$animations[$currentAnimationName].play(0);
		}
	}

	function resetAnimation() {
		if ($currentAnimationName !== null) {
			console.log(`Resetting ${$currentAnimationName}`);
			$animations[$currentAnimationName].pause(0);
		}
	}
</script>

<Presentation>
	<Slide
		animate
		on:in={() => {
			$currentAnimationName = null;
		}}
	>
		<p class="font-bold">⏳ Timing and Spacing Demo ⌛</p>
	</Slide>
	{#each labelByAnimationName.entries() as [animationName, label]}
		<Slide
			animate
			on:in={() => {
				$currentAnimationName = animationName;
			}}
			on:out={() => {
				resetAnimation();
			}}
		>
			<h2 class="my-12 font-bold">{label}</h2>
			<EaseDemo {animationName} />
			<AnimationControls play={playAnimation} reset={resetAnimation} />
		</Slide>
	{/each}
</Presentation>
