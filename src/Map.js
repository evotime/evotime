var Map=cc.Node.extend({
	game:null,
	mainActor:null,
	units:[],
	blocks:[],
	ladders:[],
	ctor:function(g){
		this._super();
		this.retain();
		this.game=g;
		this.mainActor=new Unit(this);
		this.mainActor.x=400;
		this.mainActor.y=300;

		this.addChild(this.mainActor,3);
		this.units.push(this.mainActor);

		var blk=new Block("block",300,20);
		this.addChild(blk,1);
		blk.x=500;
		blk.y=200;
		this.blocks.push(blk);

		var blk2=new Block("block",200,20);
		this.addChild(blk2,1);
		blk2.x=500;
		blk2.y=500;
		this.blocks.push(blk2);

		var ladder=new Block("ladder",20,150);
		this.addChild(ladder,2);
		ladder.x=500;
		ladder.y=370;
		this.ladders.push(ladder);
	},


	update:function(){
		for(var i=0;i<this.units.length;i++){
			
			this.units[i].update();
		}
	}

});