var cfg={"scroll":500,"stop":5000};
run.index=0;
run.time=0;
function stop_auto(){clearTimeout(run.time);}
function start_auto(){stop_auto();run.time=setTimeout(run,cfg.stop);}
function run()
{
  if(parseInt(jQuery("#pnl_scroll").css("left"))>-(730*(cfg.num-1)))
  {
    run.index+=1;
    jQuery("#pnl_scroll").animate({left:'-=730px'},cfg.scroll,function(){
      jQuery("#pnl_btn li.on").removeClass("on");
      jQuery("#pnl_btn img.on").removeClass("on");
      jQuery("#pnl_btn li").eq(run.index).addClass("on");
      jQuery("#pnl_btn img").eq(run.index).addClass("on");
      start_auto();
    });
  }
  else
  {
    run.index=0;
    jQuery("#pnl_scroll").css('left','0px');
    jQuery("#pnl_btn li.on").removeClass("on");
    jQuery("#pnl_btn li").eq(run.index).addClass("on");
    jQuery("#pnl_btn img").removeClass("on");
    jQuery("#pnl_btn img").eq(run.index).addClass("on");
    start_auto();
  }
}
function go_to(index)
{
  run.index=index;
  var left=730*index;
  jQuery("#pnl_scroll").animate({left:'-'+left+'px'},cfg.scroll,function(){
    jQuery("#pnl_btn li.on").removeClass("on");
    jQuery("#pnl_btn img").removeClass("on");
    jQuery("#pnl_btn img").eq(run.index).addClass("on");
    jQuery("#pnl_btn li").eq(run.index).addClass("on");
  });
}
jQuery(function(){
  start_auto();
  jQuery("#pnl_btn,#pnl_scroll").hover(function(){stop_auto();},function(){start_auto();});
  jQuery("#pnl_btn li").each(function(i,j){jQuery(this).click(function(){go_to(i);});});
});