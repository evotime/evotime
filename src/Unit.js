var Unit=cc.Node.extend({
	map:null,
	update:null,
	cmdDrift:"none",
	cmdClimb:"none",
	ladder:null,
	ground:null,
	speed:200/60,
	gravity:3,
	velocityVerticle:0,
	w:10,
	h:20,
	jumpTimes:1,
	climbing:false,
	ctor:function(m){
		this._super();
		this.map=m;	
		var mainActor=new cc.Sprite(res.commander_stand);
		this.addChild(mainActor,1);
		this.retain();
		mainActor.anchorY=0;
		this.update=function(){
			update_move(this,this.map)
		};
	},
	take_cmd:function(name,value){
		this[name]=value;
	},
	jump:function(){
		if(this.ladder!=null){
			this.ladder=null;
		}
		if(this.ground!=null){
			this.ground=null;
		}
		if(this.jumpTimes>0){
			this.jumpTimes-=1;
			this.velocityVerticle+=20;
			this.climbing=false;
		}
	}
});


var update_move=function(unit,map){
	//update ladder and ground object,count gravity,laddermovement,drift

	//update ladder
	if(unit.ladder!=null){
		if(unit.cmdClimb=="up"){
			unit.y+=unit.speed;
		}
		if(unit.cmdClimb=="down"){			
			unit.y-=unit.speed;
		}
		unit.x=unit.ladder.x;
		unit.climbing=true;
		if(Math.abs(unit.y-unit.ladder.y)>=unit.ladder.h){
			if(unit.y>unit.ladder.y){
				unit.y=unit.ladder.y+unit.ladder.h;
			}
			else{
				unit.y=unit.ladder.y-unit.ladder.h;
			}
			unit.ladder=null;
			unit.climbing=false;
			cc.log("outed");
		}
	}
	else{
		if(unit.cmdClimb!="none"){
			for(var i =0;i<map.ladders.length;i++){
				if(checkCollide(unit,map.ladders[i])){
				cc.log("checked ladder");
				unit.ladder=map.ladders[i];
				unit.jumpTimes=1;
				unit.climbing=true;
				}
			}
		}	
	}
	//update gravity
	if(unit.ground==null){
		if(unit.ladder==null){
		 unit.velocityVerticle-=unit.gravity;
		 //cc.log(unit.gravity);
		 unit.y+=unit.velocityVerticle;
		// cc.log(unit);
		 for(var i=0;i<map.blocks.length;i++){
			if(checkCollide(unit,map.blocks[i])){
				unit.ground=map.blocks[i];
				unit.y=map.blocks[i].y+map.blocks[i].h;
				unit.velocityVerticle=0;
				unit.jumpTimes=1;

			}
		}
		}
	}
	else{
		unit.ground=null;
		for(var i=0;i<map.blocks.length;i++){
			if(checkCollide(unit,map.blocks[i])){
				unit.ground=map.blocks[i];
				unit.y=map.blocks[i].y+map.blocks[i].h;
				unit.velocityVerticle=0;
				unit.jumpTimes=1;
			}
		}
		if(unit.ground==null){
			unit.y+=unit.velocityVerticle;
			unit.velocityVerticle-=unit.gravity;
		}
	}
	if(unit.climbing==false){
		if(unit.cmdDrift=="right"){
			unit.x+=unit.speed;
		}
		if(unit.cmdDrift=="left"){
			unit.x-=unit.speed;
		}
	}
}

var checkCollide=function(a,b){
	if((Math.abs(a.x-b.x)<(a.w+b.w))&&(Math.abs(a.y-b.y)<=(b.h))){
		return true;
	}
	return false;
}

// var addMover=function(unit){
// 		unit.updater.mover=function(){
			
// 		}

// 		unit.updater.droper=function(){
// 			if(unit.ladder!=null && unit.ground!=null){

// 			}
// 		}
// 	}