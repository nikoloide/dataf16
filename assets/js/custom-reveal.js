
			// More info https://github.com/hakimel/reveal.js#configuration
			Reveal.initialize({
				history: true,
				transition: 'fade',

				// More info https://github.com/hakimel/reveal.js#dependencies
				dependencies: [
					{ src: 'components/reveal.js/plugin/markdown/marked.js' },
					{ src: 'components/reveal.js/plugin/markdown/markdown.js' }
				]
			});


		Reveal.addEventListener('internet', function(event) {

			/* 
			var tl2 = new TimelineMax();
			var tl3 = new TimelineMax();

			tl2.to(posicion, 0, { opacity: 0 });
			// numero.html("02");
			// leyenda.html("Internet de las cosas");
			tl2.to(posicion, 0.5, { opacity: 1.0 });

			tl3.to(iconoAnimado, 0.25, { opacity: 1 });

			tl3.to(iconoAnimado, 1.5, {
				scale: .35,
				x: -520,
				y: -210,
				rotationY: 360,
				ease: Expo.easeOut
			}, 0.5);

			var tl3 = new TimelineMax();
			*/

		}, false);

		Reveal.addEventListener('slidechanged', function(event) {
			// todas las diapos

			var tl = new TimelineMax();
			var contentOpenData;

			for (var i = 0; i < event.currentSlide.children.length ; i++){
				var tag = event.currentSlide.children[i].localName;

				if (tag == "h1" || tag == "h2" || tag == "h3"){
					var contentOpenData = $(event.currentSlide.children[i]);

					contentSplit = new SplitText(contentOpenData, {
						type: "words"
					});

					TweenLite.set(contentOpenData, {
						perspective: 700
					});
					tl.staggerFrom(contentSplit.words, .75, {
						autoAlpha: 0,
						y: 500,
						rotationX: 180,
						rotationZ: 90,
						transformOrigin: "50% top 1000",
						ease: Power1.easeOutIn
					}, 0.5);
				}

				if (tag == "ul"){
					for (var p = 0; p < event.currentSlide.children[i].children.length ; p++){

						var contentOpenData = $(event.currentSlide.children[i].children[p]);

						tl.staggerFrom(contentOpenData, 0.75, {
							autoAlpha: 0,
							x: (Math.random() * 200) + 500,
							rotationZ: 45,
							rotationX: 180/2,
							ease: Power1.easeInOut
						}, -1.05);

					}
				}
			}
		}, false);
