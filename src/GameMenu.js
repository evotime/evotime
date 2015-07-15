var GameMenu=cc.Menu.extend({
	game:null,
	ctor:function(g){
		cc.MenuItemFont.setFontName("微软雅黑");
		cc.MenuItemFont.setFontSize(46);
		var single_play=new cc.MenuItemFont("单机游戏",
			function (){
			this.game.switchSinglePlaySelector();			
			},this);
		var multi_play=new cc.MenuItemFont("多人游戏",
			function (){				
			},this);
		var item_log=new cc.MenuItemFont("物品图鉴",
			function (){				
			},this);
		var monster_log=new cc.MenuItemFont("怪物图鉴",
			function (){				
			},this);
		var achievement=new cc.MenuItemFont("成就进度",
			function (){
			},this);
		var editor=new cc.MenuItemFont("地图编辑器",
			function (){
			},this);
		this._super(single_play,multi_play,item_log,monster_log,achievement,editor);
		this.game=g;
		this.alignItemsVertically();
		var size=cc.view.getFrameSize();
		this.x=size.width/2;
		this.y=size.height/2;	
		this.retain();
	}

});