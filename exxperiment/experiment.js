var w_width = window.innerWidth;
var w_height = window.innerHeight;
var x = 80;
var y = 80;
var tri_size = 50;
//var wn = w_width/x;
//var hn = w_height/y;
var noise_scale = 30;
var tries = [];
var moving = 0;
var col_c = 0;
var tim = 0;
var bgsound;
var move_magnitude = 1;
var stuff_color;
var cursor_color;

bgsound = document.getElementById("bgaudio");
button = document.getElementById("play_button");

my_name = document.getElementById("name")

// function preload(){
// 	overlay_img = loadImage('exxperiment/overlay-pattern.png');
// }

function toggle_audio(){
	if (bgsound.paused){
		console.log(1);
		playAudio();
	}
	else{
		console.log(0);
		pauseAudio();
	}
}

function playAudio(){
	bgsound.play();
	button.innerHTML = "pause";
}
function pauseAudio(){
	bgsound.pause();
	button.innerHTML = "press to play music";
}

function avg(p1,p2){
	ans = createVector((p1.x+p2.x)/2,(p1.y+p2.y)/2);
	return ans;
}

function random_color(){
	r = random(0,255);
	g = random(0,255);
	b = random(0,255);
	var col = color(r,g,b);
	return col;
}

function lister(ll,bb){
	tries = new Array(ll);
	for (var i=0;i<ll;i++){
		tries[i] = new Array(bb);
	}
	setter();
}

function setter(){
	for (i = 0; i < wn; i++){
		for (j = 0; j < hn; j++){
			l = i*x;
			m = j*x
			tri_size = map(noise(i,j),0,1,60,70);
			if ((i+j)%2 != 0){
				p = createVector(l,m-tri_size+20);
				q = createVector(l+tri_size+20,m+tri_size-20);
				r = createVector(l-tri_size-20,m+tri_size-20);
	//			tries[i][j] = new tris(i*x,j*y);
			}
			else{
				p = createVector(l,m+tri_size-20);
				q = createVector(l-tri_size-20,m-tri_size+20);
				r = createVector(l+tri_size+20,m-tri_size+20);
			}
//			sizer = 60;
//			p = createVector(l+random(-sizer,sizer),m+random(-sizer,sizer));
//			q = createVector(l+random(-sizer,sizer),m+random(-sizer,sizer));
//			r = createVector(l+random(-sizer,sizer),m+random(-sizer,sizer));
			tries[i][j] = new tris(p,q,r);
		}
	}
	console.log(tries);
}



function aversion(){
	for (i = 0; i < wn; i++){
	for (j = 0; j < hn; j++){
//		tries[i][j].mover();
		tries[i][j].changer();
		}
	}
}

function reportsize(){
	resizeCanvas(windowWidth,windowHeight);
	init();
}
function change_direction(){
	move_magnitude = -(move_magnitude);
	if (move_magnitude==1){
		circle_color = color("white");
		stuff_color = color("white");
		circle_color.setAlpha(150)
	}
	else{
		circle_color = color(10,10,10);
		circle_color.setAlpha(150);
		stuff_color = (10,10,10);
	}
}

window.addEventListener('resize', reportsize);
window.addEventListener('click', change_direction);

//window.addEventListener('mousemove', aversion);

function init(){
	ww = window.innerWidth;
	wh = window.innerHeight;
	wn = round(ww/x) + 2;
	hn = round(wh/x) + 2;
	canvas = createCanvas(ww,wh);
	background(49,49,49);
	canvas.position(0,0);
	canvas.style('z-index','-2');
	lister(wn,hn);
//	p = createVector(50,50);
//	q = createVector(ww/2,wh-50);
//	r = createVector(ww-300,wh-50);
//	the_tr = new tris(p,q,r);
	i_off = 0;
	for (i = 0; i < wn; i++){
		j_off = 0;
		for (j = 0; j < hn; j++){
			tries[i][j].set_und(map(noise(i_off,j_off),0,1,0,30));
			j_off += 0.1;
		}
		i_off += 0.1;
	}

	circle_color = color("white");
	circle_color.setAlpha(150);
	stuff_color = ("white");
	fill(circle_color);
}


function setup(){
	init();
//	frameRate(10);

}

function draw(){
	tim += 0.05;
	col_c += 0.03;
	moving += 0.02 * move_magnitude;
	i_off = moving;
	for (i = 0; i < wn; i++){
		j_off = moving ;
		for (j = 0; j < hn; j++){
			tries[i][j].set_und(map(noise(i_off,j_off),0,1,0,10));
			j_off += 0.1;
		}
		i_off += 0.1;
	}
	ncol = color(map(noise(col_c,tim),0,1,0,255),100,255);
	background(ncol);
	for (i = 0; i < wn; i++){
		for (j = 0; j < hn; j++){
			var t = tries[i][j];
			t.undulate();
			t.show()
		}
	}
	strokeWeight(1);
	stroke(ncol);
	my_name.style.color = ncol;
	fill(circle_color);
circle(mouseX,mouseY,100);

}
