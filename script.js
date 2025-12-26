const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const boom = document.getElementById("boom");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.onresize = ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
};

let soundEnabled = false;

document.addEventListener("click", ()=>{
    soundEnabled = true;
    document.getElementById("click").style.display="none";
});

/* Firework Class */
class Firework{
    constructor(x,y){
        this.p=[];
        for(let i=0;i<100;i++){
            this.p.push({
                x,y,
                a:Math.random()*Math.PI*2,
                s:Math.random()*6+2,
                l:100,
                c:`hsl(${Math.random()*360},100%,50%)`
            });
        }
        if(soundEnabled){
            boom.currentTime=0;
            boom.play();
        }
    }
    update(){
        this.p.forEach(o=>{
            o.x+=Math.cos(o.a)*o.s;
            o.y+=Math.sin(o.a)*o.s;
            o.l--;
        });
        this.p=this.p.filter(o=>o.l>0);
    }
    draw(){
        this.p.forEach(o=>{
            ctx.beginPath();
            ctx.arc(o.x,o.y,2,0,Math.PI*2);
            ctx.fillStyle=o.c;
            ctx.fill();
        });
    }
}

let fireworks=[];

function animate(){
    ctx.fillStyle="rgba(0,0,0,0.25)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    fireworks.forEach(f=>{f.update();f.draw();});
    requestAnimationFrame(animate);
}

setInterval(()=>{
    fireworks.push(new Firework(
        Math.random()*canvas.width,
        Math.random()*canvas.height/2
    ));
},700);

animate();
