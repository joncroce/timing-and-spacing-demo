<script lang="ts">
	import { Presentation, Slide } from '@components';
	import { gsap } from 'gsap';
	import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
	import { onMount } from 'svelte';

	onMount(() => {
		gsap.registerPlugin(MotionPathPlugin);
	});
</script>

<Presentation>
	<!-- 1 -->
	<Slide>
		<p class="font-bold">⏳ Timing and Spacing Demo ⌛</p>
	</Slide>
</Presentation>
