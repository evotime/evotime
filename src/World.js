
var World=cc.Layer.extend({

	mainActor:null,
	winSize:null,
	game:null,
	ctor:function(g){
		this._super();
		this.winSize=cc.view.getFrameSize();
		this.init();
		this.game=g;

		//返回主界面
		cc.MenuItemFont.setFontName("微软雅黑");
		cc.MenuItemFont.setFontSize(30);
		var back=new cc.MenuItemFont("返回",
			function (){
				this.game.switchMenuFromSinglePlay();
			},this);
		var mn=new cc.Menu(back);
		mn.x=40;
		mn.y=this.winSize.height-30;
		mn.alignItemsVertically();
		this.addChild(mn);

	},

	init:function(){
		cc.log("initing");
		//暂时搞个主角
		this.mainActor=new cc.Sprite(res.commander_stand);
		this.addChild(this.mainActor);
		this.mainActor.x=this.winSize.width/2;
		this.mainActor.y=this.winSize.height/2;
		this.retain();
	}

});