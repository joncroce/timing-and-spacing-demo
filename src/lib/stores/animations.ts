import config from '@config';
import { gsap } from 'gsap';
import { writable, derived } from 'svelte/store';

export type AnimationName = 'noEase' | 'easeIn' | 'easeOut' | 'easeInOut';
export const MAX_FRAMES = 24;
export const elementWidth = 84;
export const labelByAnimationName = new Map<AnimationName, string>([
	['noEase', 'Linear'],
	['easeIn', 'Ease In'],
	['easeOut', 'Ease Out'],
	['easeInOut', 'Ease In Out']
]);
export const ready = writable<boolean>(false);
export const duration = writable<number>(2);
export const selectedFrameCount = writable<string>("24");
export const frames = derived([selectedFrameCount], ([$selectedFrameCount]) => +$selectedFrameCount);
export const currentAnimationName = writable<AnimationName | null>(null);
export const animations = derived([frames, duration, ready], ([$frames, $duration, $ready]) => {
	return Array
		.from(labelByAnimationName.keys())
		.reduce(
			(result: Record<AnimationName, gsap.core.Timeline | null>, animationName: AnimationName) => {
				if ($ready) {
					result[animationName] = createAnimation(animationName, $frames, $duration);
				}

				return result;
			}, {
			noEase: null,
			easeIn: null,
			easeOut: null,
			easeInOut: null
		});
});

/**
 * Animators and developers use conflicting definitions of Easing In/Out.
 * This demo uses the animators' definition, thus the seemingly inverted
 * easing functions for easeIn and easeOut.
 * See https://medium.com/@gordonnl/ease-in-or-ease-out-ed9a0969042e
 */
const easeFnByAnimationName: Record<AnimationName, gsap.EaseFunction> = {
	noEase: gsap.parseEase('none'),
	easeIn: gsap.parseEase('power1.out'),
	easeOut: gsap.parseEase('power1.in'),
	easeInOut: gsap.parseEase('power1.inOut'),
};

function createAnimation(animationName: AnimationName, frames: number, duration: number): gsap.core.Timeline {
	const tl = gsap.timeline({ paused: true });
	const easeFn = easeFnByAnimationName[animationName];
	const selectorPrefix = `#${animationName}`;
	const { width } = config;
	const distance = width - elementWidth;

	const keyframes = Array.from({ length: MAX_FRAMES }, (_, i) => {
		const currentTime = (1 / frames) * (i + 1);
		const progress = easeFn(currentTime);

		return { x: distance * progress, opacity: (i + 1) / frames };
	});

	keyframes.forEach((keyframe, i) => {
		gsap.set(
			`${selectorPrefix}-${i + 1}`,
			i < frames ? keyframe : { x: elementWidth, opacity: 0 });
	});

	gsap.set(selectorPrefix, { x: 0, transformOrigin: '50% 50%' });

	const tween = gsap.to(selectorPrefix, {
		ease: easeFn,
		duration,
		x: distance,
	});

	tl.add(tween, 0);

	return tl;
}
