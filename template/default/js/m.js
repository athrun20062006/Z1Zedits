//auto scroll
function run(){
    if(parseInt($("#pnl_scroll").css("left"))>-(375*(cfg.num-1)))
    {
        run.index++;
        $("#pnl_scroll").animate({left : '-=375px'}, cfg.scroll,function(){
            $("#pnl_btn li.on").removeClass("on");
           $("#pnl_btn li").eq(run.index).addClass("on");
            /*index=run.index;
            var left=375*index;
            var left2;
            var index1 = index%4;
            if(index1 == 0){
                left2 = $("#pnl_btn").css("left");
               if(left2 != "auto" && left2 != "0px"){
                    left2 = Math.abs(parseInt(left2)+360);
               }
                
            } else if(index1 == 3){
               if(count/4 != (parseInt(index)+1)/4){
                    left2 = 360*((parseInt(index)+1)/4);
                }
            }
            $("#pnl_scroll").animate({left: '-'+left+'px'}, cfg.scroll,function(){
                $("#pnl_btn li.on").removeClass("on");
                $("#pnl_btn li").eq(run.index).addClass("on");
            });
            $("#pnl_btn").animate({left:'-'+left2+"px"},cfg.scroll);*/
            start_auto();
        });
    }
    else
    {
        run.index=0;
        $("#pnl_scroll").animate({left : '0px'}, cfg.scroll,function(){
            $("#pnl_btn li.on").removeClass("on");
            $("#pnl_btn li").eq(run.index).addClass("on");
            start_auto();
        });
    }
}
run.index=0;
run.time=0;
function go_to(index,count,ye){
    run.index=index;
    var left=375*index;
    //var left2 = 90*index;
    var left2;
    var index1 = index%4;
    if(index1 == 0){
        left2 = $("#pnl_btn").css("left");
       if(left2 != "auto" && left2 != "0px"){
            left2 = Math.abs(parseInt(left2)+330);
       }
        jQuery("#biao").show();
        
    } else if(index1 == 3){
        if(count/4 != (parseInt(index)+1)/4){
            left2 = 330*((parseInt(index)+1)/4);
            jQuery("#biao").show();
        } else {
            jQuery("#biao").hide();
        }
    }
    $("#pnl_scroll").animate({left: '-'+left+'px'}, cfg.scroll,function(){
        $("#pnl_btn li").removeClass("on");
         $("#pnl_btn li").eq(run.index).addClass("on");
    });
    $("#pnl_btn").animate({left:'-'+left2+"px"},cfg.scroll);
    /*$("#pnl_scroll").animate({left: '-'+left+'px'}, cfg.scroll,function(){
        $("#pnl_btn li").removeClass("on");
         $("#pnl_btn li").eq(run.index).addClass("on");
    });
    if(ye ){
        left2 = (run.index-2)*90;
         $("#pnl_btn li").eq((run.index-1)).addClass("on");
    } else {

        $("#pnl_btn li").eq(run.index).addClass("on");
    }
    $("#pnl_btn").animate({left:'-'+left2+"px"},cfg.scroll);*/

   
}

function start_auto(){
    stop_auto();
    run.time=setTimeout(run,cfg.stop);
}
function stop_auto(){
    clearTimeout(run.time);
}
$(function(){
    start_auto();
    $("#pnl_btn,#pnl_scroll").hover(function(){
        stop_auto();
    },function(){
        start_auto();
    });
    $("#pnl_btn li").each(function(i,j){
        $(this).click(function(){
            var li = $("#pnl_btn").find("li");
            var ye = 0;
            if($(this).attr("class") == "on"){
                ye = 1;
            } 
            go_to(i,li.length,ye);
        });
    });
    setInterval(function(){
        $("li",$("#pnl_ey")).first().appendTo($("#pnl_ey"));
    },4000);
    $("#pnl_speak_b").mouseenter(function(){
        $("#pnl_speak").height(130);
    }).mouseleave(function(){
            $("#pnl_speak").height(55);
        });
    $("#pnl_together_b").mouseenter(function(){
        $("#pnl_together").show();
    }).mouseleave(function(){
            $("#pnl_together").hide();
        });
   // $('#slide_box').mfwSlide();
});
//寻找旅行家 自动翻转
jQuery.fn.mfwSlide = function(options) {
    var settings = $.extend( {
        'width' : 260,
        'height': 240,
        'speed' : 300,
        'thumb_box' : '.slide_tab',
        'prev_btn' : '',
        'next_btn' : '',
        'thumb_focus_class' : 'on',
        'auto_play' : true,
        'interval' : 10
    }, options);
    return this.each(function(){
        var i = 0; //当前图片索引
        $(this).width(settings.width).height(settings.height);
        var li = $(this).find('ul>li').css('position', 'absolute');
        var n = li.length-1; //图片总数
        var speed = settings.speed;
        //li.find('img').width(settings.width).height(settings.height);
        if(n>0){
            li.not(":first").css({left:settings.width + "px"});
            li.eq(n).css({left:'-'+settings.width + "px"});

            var thumb_box = $(this).find(settings['thumb_box']).css('overflow', 'hidden');
            var thumb = thumb_box.find('li');
            thumb.eq(0).addClass(settings['thumb_focus_class']);

            var fun_next_img = function (){
                if (!li.is(":animated")) {
                    li.eq(i).animate({left:'-' + settings.width + "px"},{duration :speed});
                    thumb.filter('.'+settings['thumb_focus_class']).removeClass(settings['thumb_focus_class']);
                    if(n==1){
                        li.eq(!i).css({left:settings.width + "px"});
                        li.eq(!i).animate({left:'0'},{duration :speed});
                        i=!i;
                        thumb.eq(i).addClass(settings['thumb_focus_class']);
                    } else {
                        if (i>=n){
                            li.eq(0).animate({left:"0"},{duration :speed, complete:function(){
                                li.eq(n-1).css({left:settings.width + "px"});
                                i = 0;
                                thumb.eq(i).addClass(settings['thumb_focus_class']);
                            }});
                        }else{
                            li.eq(i+1).animate({left:"0"},{duration :speed, complete:function(){
                                if(i==0){
                                    li.eq(n).css({left:settings.width + "px"});
                                } else {
                                    li.eq(i-1).css({left:settings.width + "px"});
                                }
                                i++;
                                thumb.eq(i).addClass(settings['thumb_focus_class']);
                            }});
                        };
                    }
                };
            };

            var fun_prev_img = function (){
                if (!li.is(":animated")) {

                    li.eq(i).animate({left:settings.width + "px"},{duration :speed});
                    thumb.filter('.'+settings['thumb_focus_class']).removeClass(settings['thumb_focus_class']);
                    if(n==1){
                        li.eq(!i).css({left:"-" + settings.width + "px"});
                        li.eq(!i).animate({left:'0'},{duration :speed});
                        i=!i;
                        thumb.eq(i).addClass(settings['thumb_focus_class']);
                    } else {
                        if (i<=0){
                            li.eq(n).animate({left:"0"},{duration :speed, complete:function(){
                                li.eq(n-1).css({left:'-'+settings.width + "px"});
                                i = n;
                                thumb.eq(i).addClass(settings['thumb_focus_class']);
                            }});
                        }else{
                            li.eq(i-1).animate({left:"0"},{duration :speed, complete:function(){
                                if(i==1){
                                    li.eq(n).css({left:'-'+settings.width + "px"});
                                } else {
                                    li.eq(i-2).css({left:'-'+settings.width + "px"});
                                }
                                i--;
                                thumb.eq(i).addClass(settings['thumb_focus_class']);
                            }});
                        }
                    }
                };
            };

            fun_jump_img = function($this){
                var id = $this.data('id');
                thumb.filter('.'+settings['thumb_focus_class']).removeClass(settings['thumb_focus_class']);
                $(this).addClass(settings['thumb_focus_class']);

                if(i!=id){
                    li.eq(i).animate({left:'-' + settings.width + "px"},{duration :speed});
                    li.eq(id).css({left:settings.width + "px"});
                    li.eq(id).animate({left:'0'},{duration :speed, complete:function(){
                        if(id==0){
                            li.eq(n).css({left:'-'+settings.width + "px"});
                        } else {
                            li.eq(id-1).css({left:'-'+settings.width + "px"});
                        }
                        if(id==n){
                            li.eq(0).css({left:settings.width + "px"});
                        } else {
                            li.eq(id+1).css({left:settings.width + "px"});
                        }
                        i = id;
                    }});
                }
            };

            if(settings['auto_play']){
                time = setInterval(fun_next_img, settings['interval']*1000);
            }
            if(settings.next_btn!=''){
                $(settings['next_btn']).click(function(){
                    clearInterval(time);
                    fun_next_img();
                });
            }
            if(settings.prev_btn!=''){
                $(settings['prev_btn']).click(function(){
                    clearInterval(time);
                    fun_prev_img();
                });
            }
            thumb.click(function(){
                clearInterval(time);
                var $this = $(this);
                fun_jump_img($this);
            });

        }
    });
}









