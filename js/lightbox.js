// Chelsea Town 2015

// Self Executing Anonymous Function
(function(){
	// select box
	var lightbox = document.querySelector('#photoCont .photos ul');

	lightbox.addEventListener("click", function(event) {  // allows us to only target things within this node.

		if(event.target.tagName === 'IMG') { // if the event target is an image, then...
			
			var pOverlay = document.createElement('div'); // this creates a div for the element that's clicked
			pOverlay.id = 'overlay'; // this gives the div and id of "overlay"
			document.body.appendChild(pOverlay); // this adds the div to the body

			// size and position of overlay in css
			pOverlay.style.width = window.innerWidth + 'px';
			pOverlay.style.height = window.innerHeight + 'px';
			pOverlay.style.top = window.pageYOffset + 'px';
			pOverlay.style.left = window.pageXOffset + 'px';

			// create large overlay image
			var imageSrc = event.target.src; // what we clicked on's source will be stored in this variable
			var lgImage = document.createElement('img'); // will create an element stored in this variable
			lgImage.id = 'lgImage'; // the id will be named lgImage
			lgImage.src = imageSrc.substr(0, imageSrc.length-7) + '.jpg';  // the source will be the target's source minus 7 characters from the end to remove _th.jpg, then add back jpg

			// Next Left Button
			var nextLeftCont = document.createElement('div');  // creates mouseover zone left
			var nextLeft = document.createElement('div'); // this creates a div for the element that's clicked
			nextLeftCont.id = 'nextLeftCont'; // gives div id of "nextLeftCont"
			nextLeft.id = 'nextLeft'; // this gives the div an id of "nextLeft"
			nextLeft.innerHTML = '&#10092;';
			// Next Right Button
			var nextRight = document.createElement('div'); // this creates a div for the element that's clicked
			var nextRightCont = document.createElement('div');  // creates mouseover zone right
			nextRight.id = 'nextRight'; // this gives the div an id of "nextright"
			nextRightCont.id = 'nextRightCont'; // gives div id of "nextRightCont"
			nextRight.innerHTML = '&#10093;';


			// wait until image is loaded
			lgImage.addEventListener('load', function(){
				// resize if taller than window
				if (this.height > window.innerHeight) {
					this.ratio = window.innerHeight / this.height;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio;
				}

				// resize if wider
				if (this.width > window.innerWidth) {
					this.ratio = window.innerWidth / this.width;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio;
				}

				centerImage(this); // calling the function just below to center the image right before it is appended to the overlay
				pOverlay.appendChild(lgImage);  //  add the lgimage to the overlay (needs to be after the image has loaded so that H and W can be calculated)
				pOverlay.appendChild(nextLeft);  // adds the nextLeft button to overlay
				pOverlay.appendChild(nextLeftCont); // adds nextLeftCont mouseover zone
				pOverlay.appendChild(nextRight);  // adds the nextLeft button to overlay
				pOverlay.appendChild(nextRightCont); // adds nextRightCont mouseover zone
			});  //image has loaded


			// close overlay when overlay is clicked
			pOverlay.addEventListener('click', function() {
				if (pOverlay) { // if the overlay is present, close overlay...
					window.removeEventListener('resize', window, false); // cleans up anything that might be left behind after the overlay's been removed.
					window.removeEventListener('scroll', window, false);
					pOverlay.parentNode.removeChild(pOverlay);  //removeChild always works on the PARENT of the node you want to remove!
				}
			}, false); // pass it false so that it bubbles properly. So if the overlay is not up, then it should end the function and not work during normal website workings.





			// arrows appear when mouseover next containers
			nextLeftCont.addEventListener('mouseenter', function showArrows() {
				if (pOverlay) { // if the overlay is present...
					nextLeft.style.display = 'inline';  // show arrows
					nextRight.style.display = 'inline';  // show arrows
				}
			}, false); // pass it false so that it bubbles properly.
			nextRightCont.addEventListener('mouseenter', function showArrows() {
				if (pOverlay) { // if the overlay is present...
					nextLeft.style.display = 'inline';  // show arrows
					nextRight.style.display = 'inline';  // show arrows
				}
			}, false);

			// arrows hide on mouseleave
			nextLeftCont.addEventListener('mouseleave', function hideArrows() {
				if (pOverlay) { // if the overlay is present...
					nextLeft.style.display = 'none';  // show arrows
					nextRight.style.display = 'none';  // show arrows
				}
			}, false); // pass it false so that it bubbles properly.
			// arrows hide on mouseleave
			nextRightCont.addEventListener('mouseleave', function hideArrows() {
				if (pOverlay) { // if the overlay is present...
					nextLeft.style.display = 'none';  // show arrows
					nextRight.style.display = 'none';  // show arrows
				}
			}, false); 




			// listen for screen scroll so that overlay adjusts with it.
			window.addEventListener('scroll', function() {
				if (pOverlay) {
					pOverlay.style.top = window.pageYOffset + 'px';
					pOverlay.style.left = window.pageXOffset + 'px';
				}
			}, false);

			// listener for another window event, resizing the screen.
			window.addEventListener('resize', function(){
				if (pOverlay) {
					pOverlay.style.width = window.innerWidth + 'px';
					pOverlay.style.height = window.innerHeight + 'px';
					pOverlay.style.top = window.pageYOffset + 'px';
					pOverlay.style.left = window.pageXOffset + 'px';

					centerImage(lgImage);
				}
			}, false);


		}  // target is an image


	}, false); //image is clicked

	function centerImage(theImage) {
		// function will center the image.  This function expects theImage to be passed to it.
		var myDifX = (window.innerWidth - theImage.width)/2; // calculates the difference between the window width minus the image width, divided by 2 (to center the image)
		var myDifY = (window.innerHeight - theImage.height)/2;
		
		theImage.style.top = myDifY + 'px'; // this is CSS so must add pixels
		theImage.style.left = myDifX + 'px'; 

		return theImage;
	}

})();

