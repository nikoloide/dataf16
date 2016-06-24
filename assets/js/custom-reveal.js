$(function() {

	// More info https://github.com/hakimel/reveal.js#configuration
	Reveal.initialize({
		history: true,
		transition: 'fade',
		center: true,
		controls: false,
		progress: false,

		// More info https://github.com/hakimel/reveal.js#dependencies
		dependencies: [
      { src: 'components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
			{ src: 'components/reveal.js/plugin/markdown/marked.js' },
			{ src: 'components/reveal.js/plugin/markdown/markdown.js' }
		]
	});

  var changeColor;

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

Reveal.addEventListener('soy', function(event) {
  changeColor = 'white';
}, false);

Reveal.addEventListener('google', function(event) {
  changeColor = 'green';
}, false);


Reveal.addEventListener('vamos', function(event) {
  changeColor = 'red';
}, false);


Reveal.addEventListener('slidechanged', function(event) {
	// todas las diapos

	var tl = new TimelineMax();
	var contentOpenData;


	shape.rotation = Math.floor(Math.random() * 6) * Math.PI / 2 + Math.PI / 4;

	for (var i = 0; i < event.currentSlide.children.length ; i++){
		var tag = event.currentSlide.children[i].localName;

		if (tag == "h1"){
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
			}, 0.25);
		}
		if (tag == "h2" || tag == "h3"){
			var contentOpenData = $(event.currentSlide.children[i]);

			contentSplit = new SplitText(contentOpenData, {
				type: "words"
			});

			TweenLite.set(contentOpenData, {
				perspective: 700
			});
			tl.staggerFrom(contentSplit.words, .5, {
				autoAlpha: 0,
				y: 80,
				rotationX: -180,
				ease: Power1.easeOutIn
			}, 0.05);
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



  var colorsAlt = [
    '#fffdc2',
    '#b3dfbc',
    '#ff9c99',
    '#dce4ef'
  ];

  var colors = [
    '#FF9273',
    '#6161BB',
    '#FD6B30',
    '#9CE7FA',
    '#3B5BCA'
  ];

  var type = 'canvas';
  var two = new Two({
    type: Two.Types[type],
    fullscreen: true,
    autostart: true
  }).appendTo(document.getElementById("generative"));

  var background = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
  background.noStroke();
  background.fill = 'rgb(255, 255, 255)';
  background.name = 'background';

  var container = two.makeGroup(background);

  var rows = Math.floor(two.height / 100);
  var cols = Math.floor(two.width / 250);
  var width = Math.round(two.height / Math.max(rows, cols));

  for (var i = 0; i < rows; i++) {

    var even = !!(i % 2);
    var vi = i / (rows - 1);

    for (var j = 0; j < cols; j++) {

      var k = j;

      if (even) {
        k += 0.5;
        if (j >=  cols - 1) {
          continue;
        }
      }

      var hi = k / (cols - 1);

      var type = !!(j % 2) ? 'Squiggle' : 'Nonagon';
      var height = !!(j % 2) ? width / 10 : width;
      var shape = two['make' + type](width, height, Math.floor(Math.random() * 3) + 2);
      var color = colors[Math.floor(Math.random() * colors.length)];

      shape.rotation = Math.floor(Math.random() * 6) * Math.PI / 2 + Math.PI / 4;
      shape.translation.set(hi * two.width, vi * two.height);

      if (j % 2) {
        shape.noFill();
        shape.stroke = color;
        shape.linewidth = 3;
        shape.cap = 'round';
      } else {
        shape.noFill();
        shape.stroke = color;
        shape.linewidth = 3;
        shape.cap = 'round';
      }

      shape.step = (Math.floor(Math.random() * 8) / 8) * Math.PI / 120;
      shape.step *= Math.random() > 0.25 ? - 1 : 1;

      container.add(shape);

    }

  }


  two.bind('update', function() {

    if(changeColor == 'green') {
      background.fill = 'rgb(0, 255, 255)';
    } else if (changeColor == 'white') {
      background.fill = 'white';
    } else if (changeColor == 'red') {
      background.fill = '#FD6B30';
    }

    for (var k in container.children) {
      var child = container.children[k];
      if (child.name === 'background') {
        continue;
      }
      child.rotation += child.step;
    }

  });

});

Two.prototype.makeSquiggle = function(width, height, phi) {

  var amt = 96;

  var squiggle = this.makeCurve(
    _.map(_.range(amt), function(i) {
      var pct = i / (amt - 1);
      var theta = pct * Math.PI * 2 * phi + Math.PI / 2;
      var x = width * pct - width / 2;
      var y = height / 2 * Math.sin(theta);
      return new Two.Anchor(x, y);
    }),
    true
  );

  return squiggle;

};

Two.prototype.makeNonagon = function(width, height, sides) {

  width /= 2;
  height /= 2;

  var shape = this.makePath(
    _.map(_.range(sides), function(i) {
      var pct = i / sides;
      var theta = Math.PI * 2 * pct - Math.PI / 2;
      var x = width * Math.cos(theta);
      var y = height * Math.sin(theta);
      return new Two.Anchor(x, y);
    })
  );

  return shape;

};
