import { gsap } from 'gsap';
import config from '@config';

const { width } = config;
export const frames = 12;
export const elementWidth = 84;

const distance = width - elementWidth;
const duration = 2;

export type AnimationName = 'noEase' | 'easeIn' | 'easeOut' | 'easeInOut';

export const labelByAnimationName = new Map<AnimationName, string>([
	['noEase', 'Linear'],
	['easeIn', 'Ease In'],
	['easeOut', 'Ease Out'],
	['easeInOut', 'Ease In Out']
]);

const easeFnByAnimationName: Record<AnimationName, gsap.EaseFunction> = {
	noEase: gsap.parseEase('none'),
	easeIn: gsap.parseEase('power1.in'),
	easeOut: gsap.parseEase('power1.out'),
	easeInOut: gsap.parseEase('power1.inOut'),
};

export function createAnimations(): Record<AnimationName, gsap.core.Timeline> {
	return {
		noEase: createAnimation('noEase'),
		easeIn: createAnimation('easeIn'),
		easeOut: createAnimation('easeOut'),
		easeInOut: createAnimation('easeInOut')
	};
}

function createAnimation(animationName: AnimationName): gsap.core.Timeline {
	const selectorPrefix = `#${animationName}`;
	const easeFn = easeFnByAnimationName[animationName];
	const keyframes = Array.from({ length: frames }, (_, i) => {
		const currentTime = (1 / frames) * (i + 1);

		const progress = easeFn(currentTime);

		return { x: distance * progress, opacity: (i + 1) / frames };
	});

	keyframes.forEach((keyframe, i) => {
		gsap.set(`${selectorPrefix}-${i + 1}`, keyframe);
	});

	gsap.set(selectorPrefix, { transformOrigin: '50% 50%' });

	const tl = gsap.timeline({ paused: true });
	const tween = gsap.to(selectorPrefix, {
		ease: easeFn,
		duration,
		x: distance,
	});

	tl.add(tween, 0);

	return tl;
}