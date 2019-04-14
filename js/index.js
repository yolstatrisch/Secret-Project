$(function(){
    $('#container').css('background', 'url(vividisgust.png)');

    var w = window.innerWidth - 128;
    var h = window.innerHeight - 128;

    var x_pos = 0;
    var y_pos = 0;
    var x_dir = 1;
    var y_dir = 1;

    var x_dis = w;
    var y_dis = h;

    move();

    function move(){
        x_pos += (Math.min(x_dis, y_dis) * x_dir);
        y_pos += (Math.min(x_dis, y_dis) * y_dir);

        if(x_pos >= w || x_pos <= 0){
            x_dir *= -1;
        }
        if(y_pos >= h || y_pos <= 0){
            y_dir *= -1;
        }

        $('#container').animate({
            top: y_pos + "px",
            left: x_pos + "px"
        }, Math.min(x_dis, y_dis) * 10, "linear", function(){
            move();
            replace();
        });

        x_dis = (x_dir == 1) ? w - x_pos : x_pos;
        y_dis = (y_dir == 1) ? h - y_pos : y_pos;
    }

    function replace(){
        var text = $('#ipsum').html();
        var ch = "abcdefghijklmnopqrstuvwxyz,.";

        var fr = ch.charAt(Math.floor(Math.random() * ch.length));
        var to = ch.charAt(Math.floor(Math.random() * ch.length));

        var ap_fr = (fr == '.') ? "\\" : "";
        var ap_to = (to == '.') ? "\\" : "";

        var re_fr = new RegExp(ap_fr + fr, "gi");
        var re_to = new RegExp(ap_to + to, "gi");
        var re_md = new RegExp("~", "gi");

        text = text.replace(re_fr, "~");
        text = text.replace(re_to, fr);
        text = text.replace(re_md, to);

        $('#ipsum').html(text);
    }
});
