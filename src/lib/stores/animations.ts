import { type AnimationName } from '@lib/animations';
import { writable } from 'svelte/store';

export const animations = writable<Record<AnimationName, gsap.core.Timeline>>({
	noEase: null,
	easeIn: null,
	easeOut: null,
	easeInOut: null
});