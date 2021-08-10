//Create variables here
var dog,dogimg1,dogimg
var database
var foodS, foodStock
var foodobj
var feed,addfood
function preload()
{
	//load images here
  dogimg=loadImage("images/dogImg.png")
  dogimg1=loadImage("images/dogImg1.png")

}

function setup() {
  database=firebase.database()
	createCanvas(500, 500);
  dog=createSprite(250,300,150,150)
  dog.addImage(dogimg)
  dog.scale=0.15

  foodStock=database.ref('Food')
foodStock.on("value",readStock)

feed=createButton("feed the dog")
feed.position(700,94)
//feed.mousePressed(feeddog)

addfood=createButton("add food")
addfood.position(800,95)
//addfood.mousepressed(addfoods)
}


function draw() {  
background(46,139,87)
foodobj.display()
fedtime=databse.ref('FeedTime')
fedtime.on("value",function(data){
  lastfed=data.val()
})
fill(255,255,254)
textSize(15)
if(lastfed>=12){
  text("last feed:"+ lastfed%12+"PM", 350,30)
}
else if(lastfed==0){
  text("last feed:12 AM" , 350,30)
}
else{
  text("last feed:"+ lastfed+"AM", 350,30)

}


  drawSprites();
  //add styles here

}

function readStock(data){
foodS=data.val()
foodobj.updatefoodstock(foods)
}

function feeddog(){
  dog.addimage(dogimg1)
  if(foodobj.getfoodstock()<=0){
    foodobj.updatefoodstock(foodobj.getfoodstock()*0)
  }
  else{
    foodobj.updatefoodstock(foodobj.getfoodstock()-1)

  }
  database.ref('/').update({
Food:foodobj.getfoodstock(),
FeedTime:hour()
  })

  
}
function addfoods(){
  foodS++
  database.ref('/').update({
    Food:foodS

})}