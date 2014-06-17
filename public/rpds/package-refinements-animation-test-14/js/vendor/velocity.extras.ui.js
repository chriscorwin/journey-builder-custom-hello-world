/***************
    Details
***************/

/*!
 * velocity.ui.js: UI effects pack for Velocity. Load this after Velocity.
 * @version 1.0.1
 * @docs http://velocityjs.org/#uiPack
 * @support <=IE8: Callouts will have no effect, and transitions will simply fade in/out. IE9/Android 2.3: Most effects are fully supported, the rest fade in/out. All other browsers: Full support.
 * @license Copyright Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
 * @license Portions adapted from Animate.css, copyright Daniel Eden. MIT License: http://en.wikipedia.org/wiki/MIT_License
 * @license Portions adapted from Magic.css, copyright Christian Pucci. MIT License: http://en.wikipedia.org/wiki/MIT_License
 */

(function() {
	var Container = (jQuery || Zepto || window);

	if (!Container.Velocity || !Container.Velocity.Utilities) {
		console.log("Velocity UI Pack: Velocity must first be loaded. Aborting.");

		return;
	}

	/* Effect declarations. */
	var effects = {
		/* Animate.css */
		"move.slideRight": {
			defaultDuration: 800,
			calls: [
				[{
						translateZ: 0, // Force HA by animating a 3D property
						left: '+=50px'
					},
					0.3
				],
				[{
						translateZ: 0, // Force HA by animating a 3D property
						left: '-=20px'
					},
					0.35
				],
				[{
						translateZ: 0, // Force HA by animating a 3D property
						left: '+=10px'
					},
					0.35
				]
			],
			reset: {
				transformPerspective: 0
			}
			// calls: [
			// ]
		},

		/* Animate.css */
		"callout.tadaThenFadeOut": {
			defaultDuration: 1000,
			calls: [
				[{
						scaleX: 0.97,
						scaleY: 0.97,
						rotateZ: -0.3
					},
					0.10
				],
				[{
						scaleX: 1.03,
						scaleY: 1.03,
						rotateZ: 0.3
					},
					0.10
				],
				[{
						scaleX: 1.03,
						scaleY: 1.03,
						rotateZ: -0.3
					},
					0.10, 3
				],
				[{
						scaleX: 1,
						scaleY: 1,
						rotateZ: 0
					},
					0.20
				],
				[{
						opacity: 1,
						rotateZ: 0
					},
					0.05
				],
				[{
						opacity: 0.55,
						rotateZ: 0
					},
					0.20
				],
				[{
						opacity: 0.55,
						rotateZ: 0
					},
					2.6
				],
				[{
						opacity: 0,
						rotateZ: 0
					},
					0.2
				]
			]
		},


		/* Animate.css */
		"move.slideRight3": {
			defaultDuration: 800,
			calls: [
				[{
						translateZ: 0, // Force HA by animating a 3D property
						left: '+=50px'
					},
					0.3
				],
				[{
						translateZ: 0, // Force HA by animating a 3D property
						left: '-=20px'
					},
					0.35
				],
				[{
						translateZ: 0, // Force HA by animating a 3D property
						left: '+=10px'
					},
					0.35
				]
			],
			reset: {
				transformPerspective: 0
			}
			// calls: [
			// ]
		},
		/* Animate.css */
		"move.slideRight2": {
			defaultDuration: 800,
			calls: [
				[{
						left: '+=40px'
					},
					0.1
				],
				[{
						left: '+=5px'
					},
					0.55
				],
				[{
						left: '-=7px',
					},
					0.15
				],
				[{
						left: '+=2px'
					},
					0.25
				]
			],
			reset: {
				transformPerspective: 0
			}
			// calls: [
			// ]
		}
	};

	/* Sequence generator. */
	for (var effectName in effects) {
		(function(effectName) {
			var effect = effects[effectName];

			Container.Velocity.Sequences[effectName] = function(element, options) {
				for (var callIndex = 0; callIndex < effect.calls.length; callIndex++) {
					var opts = {};

					opts.duration = (options.duration || effect.defaultDuration || 1000) * (effect.calls[callIndex][1] || 1);
					opts.easing = "ease";
					opts.loop = effect.calls[callIndex][2];

					if (callIndex === 0) {
						opts.delay = options.delay;
						opts.begin = options.begin;

						if (/In$/.test(effectName)) {
							opts.display = Container.Velocity.CSS.Values.getDisplayType(element);
						}
					}

					if (callIndex === effect.calls.length - 1) {
						if (effect.reset) {
							opts.complete = function() {
								options.complete && options.complete.call();
								Container.Velocity.animate(element, effect.reset, {
									duration: 0,
									queue: false
								});
							};
						} else {
							opts.complete = options.complete;
						}

						if (/Out$/.test(effectName)) {
							opts.display = "none";
						}
					}

					Container.Velocity.animate(element, effect.calls[callIndex][0], opts);
				}
			};
		})(effectName);
	}
})();