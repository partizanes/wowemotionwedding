$(document).ready(function(){
	$("#demosMenu").change(function(){
	  window.location.href = $(this).find("option:selected").attr("id") + '.html';
	});

	$(function() {
		$("a[href$=hash]").addClass('active');
	});

	$('#fullpage').fullpage({
		verticalCentered: true,
		sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#1bbc9b', '#4BBFC3'],
		anchors: ['about', 'gallery', 'blog' , 'reviews' , 'contacts'],
		menu: '#nav',
		loopTop: true,
		loopBottom: true,
        slidesNavigation: true,
		afterRender: function(){
			//playing the video
			$('video').get(0).play();
		}
	});
});

