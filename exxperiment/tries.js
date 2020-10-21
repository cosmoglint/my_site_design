function tris(p,q,r){
	//o is original position
	//m is midpoint of the points opposite line
	//c is current position
	this.col = 0;
	this.und = 0;
	this.op = p;
	this.oq = q;
	this.or = r;
	this.mp = p5.Vector.div(p5.Vector.add(this.oq,this.or),2);
	this.mq = p5.Vector.div(p5.Vector.add(this.op,this.or),2);
	this.mr = p5.Vector.div(p5.Vector.add(this.oq,this.op),2);
	this.slope_p = (this.mp.y-this.op.y)/(this.mp.x-this.op.x);
	this.slope_q = (this.mq.y-this.oq.y)/(this.mq.x-this.oq.x);
	this.slope_r = (this.mr.y-this.or.y)/(this.mr.x-this.or.x);
	this.ang_p = atan(this.slope_p);// * Math.PI/180;
	this.ang_q = atan(this.slope_q);// * Math.PI/180;
	this.ang_r = atan(this.slope_r);// * Math.PI/180;	
	this.const_p = this.mp.y-(this.ang_p) * this.mp.x;
	this.const_q = this.mq.y-(this.ang_q) * this.mq.x;
	this.const_r = this.mr.y-(this.ang_r) * this.mr.x; 
	
	this.xinp = (( - this.const_p )/this.ang_p);
	this.xinq = (( - this.const_q )/this.ang_q);
	this.xinr = (( - this.const_r )/this.ang_r);
//	this.pxin = (( - this.const_p )/this.ang_p)<0 ? -1 : 1;
//	this.qxin = (( - this.const_q )/this.ang_q)<0 ? -1 : 1;
//	this.rxin = (( - this.const_r )/this.ang_r)<0 ? -1 : 1;
	this.pxin = ((this.xinp<this.op.x && dist(this.xinp,0,this.mp.x,this.mp.y) < dist(this.xinp,0,this.op.x,this.op.y)) || (this.xinp>this.op.x && dist(this.xinp,0,this.op.x,this.op.y) < dist(this.xinp,0,this.mp.x,this.mp.y))) ? -1 : 1;
	
	this.qxin = ((this.xinq<this.oq.x && dist(this.xinq,0,this.mq.x,this.mq.y) < dist(this.xinq,0,this.oq.x,this.oq.y)) || (this.xinq>this.oq.x && dist(this.xinq,0,this.oq.x,this.oq.y) < dist(this.xinq,0,this.mq.x,this.mq.y))) ? -1 : 1;

	this.rxin = ((this.xinr<this.or.x && dist(this.xinr,0,this.mr.x,this.mr.y) < dist(this.xinr,0,this.or.x,this.or.y)) || (this.xinr>this.or.x && dist(this.xinr,0,this.or.x,this.or.y) < dist(this.xinr,0,this.mr.x,this.mr.y))) ? -1 : 1;
	
	
	this.cp = p;
	this.cq = q;
	this.cr = r;
	this.diff = 100;
}
tris.prototype.show = function(){
//	fill(150,10,this.col);
	strokeWeight(0);
	fill(stuff_color);
	triangle(this.cp.x,this.cp.y,this.cq.x,this.cq.y,this.cr.x,this.cr.y);
}

tris.prototype.reseter = function(){
//	console.log(this.op,this.cp);
		this.cp = this.op;
		this.cq = this.oq;
		this.cr = this.or;
}

tris.prototype.set_und = function(uu){
	this.col = map(uu,0,30,0,255);
	this.und = uu;
}

tris.prototype.changer = function(){
//	console.log(this.ang_p,this.ang_q,this.ang_r);
	
	dp = dist(mouseX,mouseY,this.cp.x,this.cp.y);
	dq = dist(mouseX,mouseY,this.cq.x,this.cq.y);
	dr = dist(mouseX,mouseY,this.cr.x,this.cr.y);
//	console.log(p5.Vector.sub(this.p,this.op));
	
//	
//	if (dp<this.diff,dq<this.diff,dr<this.diff){
//		rem = (this.diff) * this.pxin;
//		mov_x = Math.cos(this.ang_p) * rem;
//		mov_y = Math.sin(this.ang_p) * rem;
//		this.cp = createVector(this.op.x + mov_x,this.op.y+mov_y);
//		rem = (this.diff) * this.qxin;
//		mov_x = Math.cos(this.ang_q) * rem;
//		mov_y = Math.sin(this.ang_q) * rem;
//		this.cq = createVector(this.oq.x + mov_x,this.oq.y+mov_y);
//		rem = (this.diff) * this.rxin;
//		mov_x = Math.cos(this.ang_r) * rem;
//		mov_y = Math.sin(this.ang_r) * rem;
//		this.cr = createVector(this.or.x + mov_x,this.or.y+mov_y);
//
//	}
	
	if (dp<=this.diff){
		rem = (this.diff -dp) * this.pxin;
		mov_x = Math.cos(this.ang_p) * rem;
		mov_y = Math.sin(this.ang_p) * rem;
		this.cp = createVector(this.op.x + mov_x,this.op.y+mov_y);
//		this.cq = createVector(this.oq.x + mov_x,this.oq.y+mov_y);
//		this.cr = createVector(this.or.x + mov_x,this.or.y+mov_y);
//		this.cq = createVector(this.oq.x+rem,this.oq.y);
//		this.cr = createVector(this.or.x-rem,this.or.y);
	}
	else if (dq<=this.diff){
		rem = (this.diff -dq) * this.qxin;
		mov_x = Math.cos(this.ang_q) * rem;
		mov_y = Math.sin(this.ang_q) * rem;
		this.cq = createVector(this.oq.x + mov_x,this.oq.y+mov_y);
//		this.cq = createVector(this.oq.x+rem,this.oq.y);
//		this.cr = createVector(this.or.x-rem,this.or.y);
	}
	else if (dr<=this.diff){
		rem = (this.diff -dr) * this.rxin;
		mov_x = Math.cos(this.ang_r) * rem;
		mov_y = Math.sin(this.ang_r) * rem;
		this.cr = createVector(this.or.x + mov_x,this.or.y+mov_y);
//		this.cq = createVector(this.oq.x+rem,this.oq.y);
//		this.cr = createVector(this.or.x-rem,this.or.y);
	}
	else if (dp==50){
		this.cp = this.cp;
	}
	else{
		this.undulate();
	}
	this.show();
}

tris.prototype.undulate = function(){
	
	mov = this.und;
	
	rem = mov * this.pxin;
	mov_x = Math.cos(this.ang_p) * rem;
	mov_y = Math.sin(this.ang_p) * rem;
	this.cp = createVector(this.op.x + mov_x,this.op.y+mov_y);

	rem = mov * this.qxin;
	mov_x = Math.cos(this.ang_q) * rem;
	mov_y = Math.sin(this.ang_q) * rem;
	this.cq = createVector(this.oq.x + mov_x,this.oq.y+mov_y);
	
	rem = mov * this.rxin;
	mov_x = Math.cos(this.ang_r) * rem;
	mov_y = Math.sin(this.ang_r) * rem;
	this.cr = createVector(this.or.x + mov_x,this.or.y+mov_y);
	
	this.show();
}
