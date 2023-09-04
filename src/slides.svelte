<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Presentation,
		Slide,
		EaseDemo,
		AnimationControls,
	} from '@components';
	import {
		createAnimations,
		labelByAnimationName,
		type AnimationName,
	} from '@lib/animations';

	let animations: Record<AnimationName, gsap.core.Timeline>;

	onMount(() => {
		animations = createAnimations();
	});

	function playAnimation(animationName: AnimationName) {
		animations[animationName].play(0);
	}

	function resetAnimation(animationName: AnimationName) {
		animations[animationName].pause(0);
	}
</script>

<Presentation>
	<Slide>
		<p class="font-bold">⏳ Timing and Spacing Demo ⌛</p>
	</Slide>
	{#each labelByAnimationName.entries() as [animationName, label]}
		<Slide animate on:in={() => resetAnimation(animationName)}>
			<h2 class="my-12 font-bold">{label}</h2>
			<EaseDemo {animationName} />
			<AnimationControls
				{animationName}
				play={playAnimation}
				reset={resetAnimation}
			/>
		</Slide>
	{/each}
</Presentation>
