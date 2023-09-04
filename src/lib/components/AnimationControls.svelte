<script lang="ts">
	import {
		NumberInput,
		RadioButtonGroup,
		RadioButton,
		Slider,
	} from 'carbon-components-svelte';
	import { hotkey } from 'svelte-gh-hotkey';
	import {
		animations,
		duration,
		selectedFrameCount,
		currentAnimationName,
	} from '@stores/animations';

	export let play: () => void;
	export let reset: () => void;
</script>

<div>
	<button
		type="button"
		data-action="play"
		on:click={() => {
			play();
		}}
		use:hotkey={'e'}
		>Play <span class="font-mono text-[0.85em]">[e]</span></button
	>
	<button
		type="button"
		data-action="reset"
		on:click={() => {
			reset();
		}}
		use:hotkey={'r'}
		>Reset <span class="font-mono text-[0.85em]">[r]</span></button
	>
</div>
<div class="inputs-wrapper">
	<RadioButtonGroup
		bind:selected={$selectedFrameCount}
		legendText="Frame Count"
	>
		<RadioButton on:change={() => reset()} labelText="12" value="12" />
		<RadioButton on:change={() => reset()} labelText="24" value="24" />
	</RadioButtonGroup>

	<Slider
		bind:value={$duration}
		on:change={() => reset()}
		labelText="Duration (seconds)"
		min={1}
		max={10}
		step={1}
		style="flex: 0;"
	/>
</div>

<style lang="postcss">
	.inputs-wrapper {
		width: 100%;
		margin-block: 2rem;
		display: inline-flex;
		justify-content: space-between;
	}

	button {
		--default-border-color: #8d8a86;
		--default-background-color: #c3c2c0;
		--default-shadow-color: #8d8a86;

		--play-border-color: #14532d; /* tw green-900 */
		--play-background-color: #4ade80; /* tw green-400 */
		--play-shadow-color: #6a8171;

		--reset-border-color: #881337; /* tw rose 900 */
		--reset-background-color: #fb7185; /* tw rose 400 */
		--reset-shadow-color: #7a5059;

		margin: 1em;
		padding: 0.5em 0.75em;
		overflow: hidden;
		color: #050505;
		font-weight: 700;
		font-size: 1.25rem;
		border-radius: 0.8em;
		border: solid 0.15em var(--default-border-color);
		background: var(--default-background-color);
		box-shadow:
			0 8px 0 0 var(--default-shadow-color),
			0 8px 8px 0 rgba(0, 0, 0, 0.4);
		-webkit-appearance: button;
	}

	button:hover {
		cursor: pointer;
		top: 4px;
		transform: translateY(4px);
		padding-bottom: -4px;
		box-shadow:
			0 4px 0 0 var(--default-shadow-color),
			0 4px 4px 0 rgba(0, 0, 0, 0.4);
	}

	button:active {
		top: 8px;
		transform: translateY(8px);
		box-shadow: 0 0 0 0 var(--default-shadow-color);
	}

	button[data-action='play'] {
		border: solid 0.15em var(--play-border-color);
		background: var(--play-background-color);
		box-shadow:
			0 8px 0 0 var(--play-shadow-color),
			0 8px 8px 0 rgba(0, 0, 0, 0.4);
	}

	button[data-action='play']:hover {
		box-shadow:
			0 4px 0 0 var(--play-shadow-color),
			0 4px 4px 0 rgba(0, 0, 0, 0.4);
	}

	button[data-action='play']:active {
		box-shadow: 0 0 0 0 var(--play-shadow-color);
	}

	button[data-action='reset'] {
		border: solid 0.15em var(--reset-border-color);
		background: var(--reset-background-color);
		box-shadow:
			0 8px 0 0 var(--reset-shadow-color),
			0 8px 8px 0 rgba(0, 0, 0, 0.4);
	}

	button[data-action='reset']:hover {
		box-shadow:
			0 4px 0 0 var(--reset-shadow-color),
			0 4px 4px 0 rgba(0, 0, 0, 0.4);
	}

	button[data-action='reset']:active {
		box-shadow: 0 0 0 0 var(--reset-shadow-color);
	}
</style>
