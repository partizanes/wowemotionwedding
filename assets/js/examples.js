var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function copyToClipboard(text) {
    swal({
        html: "true",
        title: "",
        text: "Чтобы скопировать текст в буфер обмена, <br> Нажмите Ctrl+C и Enter",
        type: "input",
        inputValue: text ,
        confirmButtonText: "Ok",
        allowEscapeKey: "true",
        allowOutsideClick: "true"
    });

    $('fieldset > input[type=text]').select();
}

$(document).ready(function(){
    $("#footer .menu li:first-child").lettering();

	$("#demosMenu").change(function(){
	  window.location.href = $(this).find("option:selected").attr("id") + '.html';
	});

    $('#gallery-container').sGallery({
        fullScreenEnabled: true //default is false
    });

    if(isMobile.any()){
        var cssObj = {
            'width' : '0%',
            'height' : '0%'};
        $('video').css(cssObj);
    }

    $('#fullpage').fullpage({
		verticalCentered: true,
		anchors: ['about', 'gallery', 'blog' , 'reviews' , 'contacts'],
		menu: '#nav',
		loopTop: true,
		loopBottom: true,
        slidesNavigation: true,
        slidesNavPosition: 'top',
        controlArrows: false,
        afterRender: function () {
            $('video').get(0).play();
        }
	});

    $(".polaroid").each(function (i) {
        var tempVal = Math.round(Math.random());
        if(tempVal == 1) {
            var rotDegrees = randomXToY(-20, 20); // rotate left
        } else {
            var rotDegrees = randomXToY(-15, 15); // rotate right
        }

        // Internet Explorer doesn't have the "window.innerWidth" and "window.innerHeight" properties
        if(window.innerWidth == undefined) {
            var wiw = 1000;
            var wih = 700;
        } else {
            var wiw = window.innerWidth;
            var wih = window.innerHeight;
        }

        var cssObj = {
            'display' : 'inline-block',
            'left' : Math.random()*(wiw-200),
            'top' : Math.random()*(wih-250),
            'tranform' : 'rotate('+ rotDegrees +'deg)', //added in case CSS3 is standard
            '-moz-transform' : 'rotate('+ rotDegrees +'deg)',
            '-webkit-transform' : 'rotate('+ rotDegrees +'deg)'};  // safari only
        $(this).css(cssObj);
    });

    // Set the Z-Index (used to display images on top while dragging)
    var zindexnr = 1;

    // boolean to check if the user is dragging
    var dragging = false;

    // Show the polaroid on top when clicked on
    $(".polaroid").mouseup(function(e){
        if(!dragging) {
            // Bring polaroid to the foreground
            zindexnr++;
            var cssObj = { 'z-index' : zindexnr,
                   'transform' : 'rotate(0deg)',	 // added in case CSS3 is standard
                   '-webkit-transform' : 'rotate(0deg)' };  // safari only
            $(this).css(cssObj);
        }
    });

    // Make the polaroid draggable & display a shadow when dragging
    $(".polaroid").draggable({
        cursor: 'crosshair',
        start: function(event, ui) {
            dragging = true;
            zindexnr++;
            var cssObj = { 'box-shadow' : '#888 5px 10px 10px', // added in case CSS3 is standard
                '-webkit-box-shadow' : '#888 5px 10px 10px', // safari only
                'margin-left' : '-10px',
                'margin-top' : '-10px',
                'z-index' : zindexnr };
            $(this).css(cssObj);
        },
        stop: function(event, ui) {
            var tempVal = Math.round(Math.random());
            if(tempVal == 1) {
                var rotDegrees = randomXToY(-20, 20); // rotate left
            } else {
                var rotDegrees = randomXToY(-15, 15); // rotate right
            }
            var cssObj = { 'box-shadow' : '', // added in case CSS3 is standard
                '-webkit-box-shadow' : '', // safari only
                'transform' : 'rotate('+ rotDegrees +'deg)', // added in case CSS3 is standard
                '-webkit-transform' : 'rotate('+ rotDegrees +'deg)', // safari only
                'margin-left' : '0px',
                'margin-top' : '0px' };
            $(this).css(cssObj);
            dragging = false;
        }
    });

    // Function to get random number upto m

    function randomXToY(minVal,maxVal,floatVal) {
        var randVal = minVal+(Math.random()*(maxVal-minVal));
        return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
    }
});

