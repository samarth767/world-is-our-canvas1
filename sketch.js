var database;
var canvas;

function setup() {
    canvas = createCanvas(1800,800);
    database = firebase.database();
}

var drawing = [];
var db_drawing  = [];


function draw() {
    background(255);
    readPosition();
    beginShape();
    stroke(0);
    strokeWeight(4);
    noFill();
    if(db_drawing!=null){
        for(var i = 0 ; i<db_drawing.length ; i++){
            vertex(db_drawing[i].x,db_drawing[i].y);
            endShape();
        }
    }
}

function readPosition() {
  database.ref('drawing/d').on('value',function (data){
      db_drawing = data.val();
  })
}

function mouseDragged(){
    var point = {
        x:mouseX,
        y:mouseY
    }
    drawing.push(point);
    var databaseref = database.ref('drawing');
    databaseref.set({
        "d":drawing
    })
}