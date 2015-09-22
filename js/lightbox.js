// Chelsea Town 2015

// Self Executing Anonymous Function
(function(){
	// select box
	var myNode = document.querySelector('#artlist .pixgrid ul');

	myNode.addEventListener("click", function(e) {  // allows us to only target things within this node.

		if(e.target.tagName === 'IMG') { // if the event (e) target is an image, then...
			
			var myOverlay = document.createElement('div'); // this creates a div for the element that's clicked
			myOverlay.id = 'overlay'; // this gives the div and id of "overlay"
			document.body.appendChild(myOverlay);

			// set up overlay in styles -- move all this part to CSS stylesheet
			myOverlay.style.position = 'absolute';
			myOverlay.style.top = 0;
			myOverlay.style.backgroundColor = '#000000'; // have to set the color before opacity can be used
			myOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)'; // last number is for transparency
			myOverlay.style.cursor = 'pointer';
			// size and position of overlay in css
			myOverlay.style.width = window.innerWidth + 'px';
			myOverlay.style.height = window.innerHeight + 'px';
			myOverlay.style.top = window.pageYOffset + 'px';
			myOverlay.style.left = window.pageXOffset + 'px';

			// create large overlay image
			var imageSrc = e.target.src; // what we clicked on's source will be stored in this variable
			var largeImage = document.createElement('img'); // will create an element stored in this variable
			largeImage.id = 'largeImage'; // the id will be named largeImage
			largeImage.src = imageSrc.substr(0, imageSrc.length-7) + '.jpg';  // the source will be the target's source minus 7 characters from the end to remove _th.jpg, then add back jpg
			largeImage.style.display = 'block';
			largeImage.style.position = 'absolute';


			// wait until image is loaded
			largeImage.addEventListener('load', function(){
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
				myOverlay.appendChild(largeImage);  //  add the largeimage to the overlay (needs to be after the image has loaded so that H and W can be calculated)
			});  //image has loaded


			// close overlay when image clicked
			largeImage.addEventListener('click', function() {
				if (myOverlay) { // if the overlay is present...
					window.removeEventListener('resize', window, false); // cleans up anything that might be left behind after the overlay's been removed.
					window.removeEventListener('scroll', window, false);
					myOverlay.parentNode.removeChild(myOverlay);  //removeChild always works on the PARENT of the node you want to remove!
				}
			}, false) // pass it false so that it bubbles properly. So if the overlay is not up, then it should end the function and not work during normal website workings.


			// close overlay when overlay is clicked
			myOverlay.addEventListener('click', function() {
				if (myOverlay) { // if the overlay is present...
					window.removeEventListener('resize', window, false); // cleans up anything that might be left behind after the overlay's been removed.
					window.removeEventListener('scroll', window, false);
					myOverlay.parentNode.removeChild(myOverlay);  //removeChild always works on the PARENT of the node you want to remove!
				}
			}, false) // pass it false so that it bubbles properly. So if the overlay is not up, then it should end the function and not work during normal website workings.


			// listen for screen scroll so that overlay adjusts with it.
			window.addEventListener('scroll', function() {
				if (myOverlay) {
					myOverlay.style.top = window.pageYOffset + 'px';
					myOverlay.style.left = window.pageXOffset + 'px';
				}
			}, false);

			// listener for another window event, resizing the screen.
			window.addEventListener('resize', function(){
				if (myOverlay) {
					myOverlay.style.width = window.innerWidth + 'px';
					myOverlay.style.height = window.innerHeight + 'px';
					myOverlay.style.top = window.pageYOffset + 'px';
					myOverlay.style.left = window.pageXOffset + 'px';

					centerImage(largeImage);
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

