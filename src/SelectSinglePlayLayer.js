
var SinglePlaySelectorLayer=cc.Layer.extend({
	game:null,
	selectNum:0,
	selectMsg:null,
	selector:null,
	ctor:function(g){
		this._super();
		this.game=g;
		this.initEvent();
		this.retain();
		//初始化菜单和选择器以及信息显示。
		//菜单
		cc.MenuItemFont.setFontName("微软雅黑");
		cc.MenuItemFont.setFontSize(46);
		var start=new cc.MenuItemFont("开始",
			function (){
			this.game.startSinglePlay();			
			},this);
		cc.MenuItemFont.setFontSize(26);
		var back=new cc.MenuItemFont("返回",
			function (){
				this.game.switchMenuFromSinglePlaySelector();
			},this);
		var mn=new cc.Menu(start,back);
		mn.x=sz.width/2;
		mn.y=70;
		mn.alignItemsVertically();
		this.addChild(mn);

		//选择器
		this.selector=new cc.Node();
		this.selector.selectorShower=new cc.DrawNode();
		this.selector.addChild(this.selector.selectorShower,2);
		var nd=new cc.DrawNode();
	    for(var i=0;i<5;i++){
		 	nd.drawCircle(cc.p(-200+i*100,0),40,360,10,false,1,cc.color(255,0,0,255));
		 	nd.drawCircle(cc.p(-200+i*100,100),40,360,10,false,1,cc.color(255,0,0,255));		 	
		 }
		 this.selector.addChild(nd);
		
		this.selector.x=sz.width/2;
		this.selector.y=sz.height-200;
		this.addChild(this.selector);

	},
	initEvent:function(){
		//控制单位的选择
		that=this;
		var f2=function(t){				
				if(that.game)
				{	
					var pos=t.getLocation();
					var sz=cc.view.getFrameSize();
					if(pos.x>(sz.width/2-250) && pos.x<(sz.width/2+250)){
						if(pos.y>(sz.height-250) && pos.y<sz.height-50){
						var x=Math.floor((pos.x-sz.width/2+250)/100);
						var y=Math.floor((pos.y-sz.height+250)/100);
						that.selectNum=x+y*5;
						that.selector.selectorShower.clear();
						that.selector.selectorShower.
						drawCircle(cc.p(-200+x*100,y*100),20,360,10,false,40,cc.color(255,255,0,255));
						
						}
					}
				}
			};
		var f3=function(t){
			cc.log(t);
		}
		// cc.eventManager.addListener({
		// 	event:cc.EventListener.MOUSE,
		// 	onMouseUp:f
		// },this);
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false, 
			onTouchBegan:f2,
			onTouchMoved:f3,
			onTouchEnded:function(t,e){cc.log("moved");},
			onTouchCancelled:function(t,e){cc.log("moved");},

		},this);
	},
	
});

