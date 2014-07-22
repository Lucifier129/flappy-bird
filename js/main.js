// JavaScript Document
$(document).ready(function() {
    var i = 0,
        s = 0,
        over = true;
		
		function getPipe() {
                i += 1;
                Pipes(i);
            }
			
    $('#play').on('click',function() {
		var bird = $('#bird');
        s = 0;
        $(this).css('z-index', -1);
        $('#score').css('opacity', 0);
		
        setTimeout(function() {
            bird.removeClass('bird_down bird_up').animate({
                top: "30%"
            }, 300, function() {
                $(this).stop(true).animate({
                    top: '400px'
                }, 1100);
            });
			
            over = false;
            start = setInterval(getPipe, 2000);
        }, 300);
		
    });
	
	
    $('#mask').on('click', function() {
        var bird = $('#bird'),
            top = bird.position().top;
        if (top > 0) {
            play(bird);
        }
    });

    function play(elem) {
        //小鸟跳呀跳
        if (!over) {
            elem.removeClass('bird_down').addClass('bird_up').stop(true).animate({
                top: '-=50px'
            }, 200, function() {
				$(this).removeClass('bird_up').addClass('bird_down').stop(true).animate({
                top: '400px'
            }, 1000);
			});
        }
        
    }

    function Pipes(i) {
        var pipes = document.createElement("ul"),
            one = document.createElement('li'),
            two = document.createElement('li'),
			t;
			
        pipes.id = "score" + i;
        pipes.className = "pipes";
        one.className = "one";
        two.className = "two";
        one.style.marginTop = -(Math.random() * 210) + 'px';
        pipes.appendChild(one);
        pipes.appendChild(two);
		
        $('#game_bg').append(pipes);
		
        setTimeout(function() {
                $('#' + pipes.id).remove();
            }, 4000);
			
		
        setTimeout(function() {
            s += 1;
            t = setInterval(check, 100);
        }, 1111);

        function check() {
            var elem = $('#' + pipes.id),
			score = $('#score'),
			mask = $('#mask'),
			bird = $('#bird'),
			right = parseInt(elem.css("right"), 10),
			top = $('#bird').position().top,
			margin = parseInt(elem.find('.one').css('margin-top'), 10),
			min_height = 280 + margin;
				
            if (right > 163) {
                clearInterval(t);
            }
            if (top > min_height && top < (min_height + 92)) {
                score.html(s);
                var j = 1,
                    q = setInterval(function() {
                        j -= 0.1;
                        score.css("opacity", j);
                        if (j <= 0) {
                            clearInterval(q);
                            score.css("opacity", 0);
                        }
                    }, 10);
            }
            else {
                var i = 1,
                    p = setInterval(function() {
                        i -= 0.1;
                        mask.css("opacity", i);
                        if (i <= 0) {
                            clearInterval(p);
                            mask.css("opacity", 0);
                        }
                    }, 10);
                clearInterval(start);
                over = true;
                bird.removeClass('bird_up').addClass('bird_down').stop(true).animate({
                    top: '400px'
                }, 300, function() {
                    $('#play').css('z-index', 10);
                    score.css('opacity', 1).html('只有' + (s - 1) + '分');
                });
            }
        }
    }
});