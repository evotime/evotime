var GameLayer = cc.Layer.extend({
	menu:null,
	singlePlaySelectorLayer:null,
	world:null,
	ctor:function(){
		this._super();
		//把啥都先初始化了再说
		this.make_menu();
		this.singlePlaySelectorLayer=new SinglePlaySelectorLayer(this);	
		this.world=new World(this);		
	},
	make_menu:function(){
		this.menu=new GameMenu(this);
		this.addChild(this.menu);
	},
	switchSinglePlaySelector:function(){
		
		this.removeChild(this.menu);	
		this.addChild(this.singlePlaySelectorLayer,1);
		this.singlePlaySelectorLayer.initEvent();
	},

	switchMenuFromSinglePlaySelector:function(){

		this.removeChild(this.singlePlaySelectorLayer);				
		this.addChild(this.menu,1);
	},
	startSinglePlay:function(){
		this.removeChild(this.singlePlaySelectorLayer);
		this.addChild(this.world);
		this.world.init();
	},

	switchMenuFromSinglePlay:function(){
		this.removeChild(this.world);
		this.addChild(this.menu);
	}

});


var GameScene = cc.Scene.extend({
	game_layer:null,
	onEnter:function(){
		this._super();
		if(game_layer==null){
			var game_layer = new GameLayer();
			this.addChild(game_layer);
		}
	}
});