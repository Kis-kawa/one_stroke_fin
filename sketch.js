let state = "START";
let points = [];
let locat = 0;
let mylevel = 0;

class MyGame {
  constructor(points){
    this.leng = points.length;
    this.arr = [];
  }
  mytable(){
    for(let i=0; i<this.leng; i++){
      let seq = [...Array(this.leng).keys()].map(j => j + 1);
      seq.splice(i,1);
      this.arr.push(seq);
    }
  }
  myremove(next){
    for(let i=0; i<this.arr[locat].length; i++){
      if(this.arr[locat][i] == next) this.arr[locat].splice(i,1);
    }
    for(let i=0; i<this.arr[next-1].length; i++){
      if(this.arr[next-1][i] == locat+1) this.arr[next-1].splice(i,1);
    }
  }
  printer(){
    console.log("今", locat+1, "にいます");
    // console.log(this.arr[locat]);
    // console.log(this.arr);
  }
  confirm(ans) {
    for (let i = 0; i < ans.length; i++) {
      if (ans[i].length !== this.arr[i].length) {
        return false;
      }
      for (let j = 0; j < ans[i].length; j++) {
        if (ans[i][j] !== this.arr[i][j]) {
          return false;
        }
      }
    }
    return true;
  }
  mycheck(next){
    let flug = true;
    for(let i=0; i<this.arr[locat].length; i++){
      if(this.arr[locat][i] == next) flug = false;
    }
    return flug;
  }
}


function setup() {
  createCanvas(400, 300);
  strokeWeight(1);
}

function draw() {
  background(220);
  init();
}

function init() {
  clear();
  if (state == "START") {
    start();
  }
  if (state == "LEVEL"){
    level();
  }
  if (state == "GAME"){
    game();
  }
}

function start(){
  clear();

  stroke("#FFEB3B");
  fill("#FFCF3F");
  rect(100, 60, 200, 50, 20);

  fill(0);
  textSize(15);
  stroke(220);
  text("Click to start", 152, 90);

  if(mouseX >= 100 && mouseX <= 300 && mouseY >= 60 && mouseY <= 110 && mouseIsPressed == true){
    state = "LEVEL";
    mouseIsPressed = false;
  }
}


function level(){
  clear();

  stroke("#FFEB3B");
  fill("#FFCF3F");
  rect( 10, 10, 80, 80, 20);
  rect(100, 10, 80, 80, 20);
  rect(190, 10, 80, 80, 20);

  fill(0);
  textSize(15);
  stroke(220);
  text("level 1", 27, 80);
  text("level 2", 117, 80);
  text("level 3", 207, 80);

  if(mouseX >= 10 && mouseX <= 90 && mouseY >= 10 && mouseY <= 90 && mouseIsPressed == true){
    state = "GAME";
    mylevel = 1;
    mouseIsPressed = false;
  }
  if(mouseX >= 100 && mouseX <= 180 && mouseY >= 10 && mouseY <= 90 && mouseIsPressed == true){
    state = "GAME";
    mylevel = 2;
    mouseIsPressed = false;
  }
  if(mouseX >= 190 && mouseX <= 270 && mouseY >= 10 && mouseY <= 90 && mouseIsPressed == true){
    state = "GAME";
    mylevel = 3;
    mouseIsPressed = false;
  }
}


function game(){
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 7; j++) {
      let x = i * (400/10); // セルのx座標
      let y = j * (400/10); // セルのy座標

      if ((i + j) % 2 === 0) {
        fill(180);
      } else {
        fill(255);
      }
      strokeWeight(1);
      stroke("#000000");
      rect(x, y, 40, 40);
    }
  }
  if(mylevel == 1){ LevelOne(); }
  if(mylevel == 2){ LevelTwo(); }
  if(mylevel == 3){ LevelThree(); }
}


function makepoint(points){
  for (let val of points){
    fill(30,144,255);
    ellipse(val[0], val[1], 10);
  }
}

function LevelOne(){
  noLoop();
  points = [[120,120], [120, 200]];
  makepoint(points);
  pnum(points);

  strokeWeight(2.5);
  stroke("#FFEB3B");
  line(120,120,120,200);

  const myObject = new MyGame(points);
  myObject.mytable();
  myObject.printer();

  field = createInput("次の番号");
  button = createButton("draw");
  button.mousePressed(function() {
    mydraw(myObject, points);
    if(myObject.confirm(myObject.confirm([[], []]))){
      alert('クリア!');
      window.location.reload();
    }
  });
}


function LevelTwo (){
  noLoop();
  points = [[80,240], [80,120], [200,40], [320,120], [320,240]];
  makepoint(points);
  pnum(points);

  strokeWeight(2);
  stroke("#FFEB3B");
  line( 80,240,320,120);
  line( 80,240, 80,120);
  line( 80,240,320,240);
  line( 80,120,200, 40);
  line( 80,120,320,120);
  line( 80,120,320,240);
  line(200, 40,320,120);
  line(320,120,320,240);

  const myObject = new MyGame(points);
  myObject.mytable();
  myObject.printer();

  field = createInput("次の番号");
  button = createButton("draw");
  button.mousePressed(function() {
    mydraw(myObject, points);
    if(myObject.confirm([[3], [], [1,5], [], [3] ])){
      alert('クリア!');
      window.location.reload();
    }
  });
}


function LevelThree (){
  noLoop();
  points = [[80,240], [80,80], [240,80], [240,240],[160, 40], [320, 40], [320, 200]];
  makepoint(points);
  pnum(points);

  strokeWeight(2);
  stroke("#FFEB3B");
  line( 80,240, 80, 80);
  line( 80,240,240, 80);
  line( 80,240,240,240);
  line( 80, 80,160, 40);
  line( 80, 80,240, 80);
  line( 80, 80,240,240);
  line(240, 80,240,240);
  line(240, 80,320, 40);
  line(240,240,320,200);
  line(160, 40,320, 40);
  line(320, 40,320,200);

  const myObject = new MyGame(points);
  myObject.mytable();
  myObject.printer();

  field = createInput("次の番号");
  button = createButton("draw");
  button.mousePressed(function() {
    mydraw(myObject, points);
    if(myObject.confirm([[5,6,7], [6,7], [5,7], [5,6], [1,3,4,7], [1,2,4], [1,2,3,5]])){
      alert('クリア!');
      window.location.reload();
    }
  });

}


function mydraw(myObject,points){
  var next = field.value() - 1;
  if(myObject.mycheck(next+1)) {
    alert('一筆書きに失敗しました');
    window.location.reload();
  }
  fill(0);
  stroke(30,144,255);
  line(points[locat][0], points[locat][1], points[next][0], points[next][1]);

  myObject.myremove(next+1);
  locat = next;
  myObject.printer();
}

function pnum(points){
  for(let i=1; i<points.length+1; i++){
    textSize(20);
    fill(0);
    text(i, points[i-1][0], points[i-1][1]);
    if(i==1){
      textSize(15);
      fill(0);
      stroke(255);
      text("start", points[i-1][0]+12, points[i-1][1]-5);
    }
  }
}
