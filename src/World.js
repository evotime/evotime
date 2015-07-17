
var World=cc.Layer.extend({

	map:null,
	winSize:null,
	game:null,
	jump:null,
	attack:null,
	skill1:null,
	skill2:null,
	skill3:null,
	stickInitLocation:null,

	units:{},
	ctor:function(g){
		this._super();
		this.winSize=cc.view.getFrameSize();
		this.retain();
		this.init();
		this.game=g;
		this.map=new Map(g); //地图在此
		this.addChild(this.map,-1);
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
		this.addChild(mn,5);

		//摇杆
		

		//按键
		//跳跃
		this.jump=new cc.Node();
		this.addChild(this.jump);
		this.jump.x=this.winSize.width-60;
		this.jump.y=240;
		this.jump.addChild(new cc.Sprite(res.jump));
		
		
	},

	init:function(){
		
		this.scheduleUpdate();
		self=this;
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan:function(t,e){
				var sz=t.getLocation();
				if(sz.x< ( self.winSize.width/2)){					
					self.stickInitLocation=sz;
					return true;
				}
				return false;
				},
			onTouchMoved:function(t,e){
				if(self.stickInitLocation!=null){
					var delta=t.getDelta();
					if(delta.x>0&&delta.y>0){
						if(delta.x>delta.y){
							 self.map.mainActor.cmdDrift="right";
							 self.map.mainActor.cmdClimb="none";
							 
						}else{
							self.map.mainActor.cmdDrift="none";
							self.map.mainActor.cmdClimb="up";
						}
					}
					if(delta.x>0&&delta.y<=0){
						if(delta.x>(-1*delta.y)){
							self.map.mainActor.cmdDrift="right";
							self.map.mainActor.cmdClimb="none";
						}else{
							self.map.mainActor.cmdDrift="none";
							self.map.mainActor.cmdClimb="down";
						}
					}
					if(delta.x<=0 && delta.y<=0){
						if((-1*delta.x)>(-1*delta.y)){
							self.map.mainActor.cmdDrift="left";
							self.map.mainActor.cmdClimb="none";
						}else{
							self.map.mainActor.cmdDrift="none";
							self.map.mainActor.cmdClimb="down";
						}
					}
					if(delta.x<=0&&delta.y>0){
						if((-1*delta.x) > delta.y){
							self.map.mainActor.cmdDrift="left";
							self.map.mainActor.cmdClimb="none";
						}else{
							self.map.mainActor.cmdDrift="none";
							self.map.mainActor.cmdClimb="up";
						}
					}
				}
				return true;
			},
			onTouchEnded:function(t,e){			
				self.init_location=null;
				self.map.mainActor.cmdDrift="none";
				self.map.mainActor.cmdClimb="none";
				return true;},
			onTouchCancelled:function(t,e){
				
				self.init_location=null;
				return true;},			
		},this);

	cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchEnded:function(){return true},
			onTouchMoved:function(){return true},
			onTouchCancelled:function(){return true},
			onTouchBegan:function(t,e){			
				sz=t.getLocation();
				if(sz.x> (self.jump.x-60) && sz.x < (self.jump.x+60)){
					if(sz.y>(self.jump.y-60) && sz.y <(self.jump.y+60)){
						self.map.mainActor.jump();					
					}
				}
				return true;},
			},this);

	},

	update:function(dt){
		this.map.update();
	}

});

