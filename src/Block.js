var Block=cc.Node.extend({
	type:null,
	w:0,
	h:0,
	ctor:function(t,wa,ha){
		this._super();
		this.type=t;
		this.w=wa;
		this.h=ha;
		this.anchorX=0.5;
		this.anchorY=0.5;
		this.retain();
		var nd=new cc.DrawNode();
		this.addChild(nd);
		if(t=="block"){
			nd.drawRect(cc.p(-1*wa,ha),cc.p(wa,-1*ha),cc.color(150,150,150,255),2,cc.color(255,255,255,255));
		}
		else{
			nd.drawRect(cc.p(-1*wa,ha),cc.p(wa,-1*ha),cc.color(250,250,150,255),2,cc.color(255,255,255,255));
		}
	}
});