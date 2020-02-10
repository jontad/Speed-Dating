/*
function MenuItem(name, ingredients, allergy, kcal, stringPath) {
    "use strict";
    this.name = name;
    this.ingredients = ingredients;
    this.allergy = allergy;
    this.kcal = kcal;
    this.stringPath = stringPath;
}

function nameAndKcal(burger) {
    "use strict";
    return burger.name + " " + burger.kcal + "kcal";
}
*/
/*
let burger1 = new MenuItem("The Void Burger", "bröd", "gluten", "60", "https://previews.123rf.com/images/ha4ipuri/ha4ipuri1806/ha4ipuri180600022/103956150-hamburger-bread-or-bun-without-anything-isolated-on-white-background-clipping-path.jpg");

let burger2 = new MenuItem("The Cheese Burger", "Bröd, 90g nötfärsburgare, ost, sallad, tomat, gurka, hamburgare dressing", "gluten och laktose", "450", "https://p7.hiclipart.com/preview/520/119/677/french-fries-cheeseburger-whopper-buffalo-burger-hamburger-big-burger.jpg");

let burger3 = new MenuItem("The Extra Meat-burger", "Bröd, 180g nötfärsburgare, ost, tomat, gurka, BBQ sås", "gluten och laktose", "640", "http://www.bigkitchenafrica.com/imgs/DSC_1303png2.png");

let burger4 = new MenuItem("The Veggie Burger", "Bröd, 90g quornfärsburgare, sallad, tomat, gurka", "gluten", "440", "https://f0.pngfuel.com/png/604/771/veggie-burger-hamburger-cheeseburger-vegetarian-cuisine-mcdonald-big-mac-burger-king-png-clip-art.png");

let burger5 = new MenuItem("The Future Burger", "Bröd, 90g halloumi, sallad, tomat, gurka", "gluten och laktose", "440", "https://www.burgerking.se/011_se/Product%20images/Veggie/image-thumb__7675__product_detail/HALLOUMI%20KING%201500x1500.png");


console.log(nameAndKcal(burger1));
console.log(nameAndKcal(burger2));
console.log(nameAndKcal(burger3));
console.log(nameAndKcal(burger4));
console.log(nameAndKcal(burger5));
*/

/*
let wrapper = document.getElementById('wrapper');
let burgers = [burger1, burger2, burger3, burger4, burger5];
let i = 0;
for(i; i < burgers.length; i++)
{
    let burgerDiv = document.createElement('div');
    let burgerImg = document.createElement('img');
    let burgerPara = document.createElement('p');
    let burgerName = document.createTextNode(burgers[i].name);
    let burgerIng = document.createTextNode('Innehåll: ' + burgers[i].ingredients);
    let br = document.createElement('br');
    
    burgerDiv.classList.add('box');
    
    burgerImg.src = burgers[i].imgPath;
    burgerImg.height = 180;
    burgerImg.width = 180;
    
    burgerPara.appendChild(burgerName);
    
    burgerDiv.appendChild(burgerPara);
    burgerDiv.appendChild(burgerImg);
    burgerDiv.appendChild(br);
    burgerDiv.appendChild(burgerIng);
    
    if(burgers[i].allergy)
        {
            let br1 = document.createElement('br');
            let burgerAllergy = document.createTextNode('allergi: ' + burgers[i].allergy);
            burgerDiv.appendChild(br1);
            burgerDiv.appendChild(burgerAllergy);
        }

    wrapper.appendChild(burgerDiv);
}
*/
/*
let div1 = document.createElement('div');
let img1 = document.createElement('img');
img1.height = 100;
img1.width = 100;
img1.src = burger1.stringPath;
let txt1 = document.createTextNode('Hej hej');
wrapper.appendChild(div1);
div1.appendChild(txt1);
div1.appendChild(img1);

let div2 = document.createElement('div');
let img2 = document.createElement('img');
img2.src = burger2.stringPath;
img2.height = 100;
img2.width = 100;
let txt2 = document.createTextNode('Hej hej');
div2.appendChild(txt2);
div2.appendChild(img2);
wrapper.appendChild(div2);

let div3 = document.createElement('div');
let img3 = document.createElement('img');
img3.src = burger3.stringPath;
img3.height = 100;
img3.width = 100;
let txt3 = document.createTextNode('Hej hej');
div3.appendChild(txt3);
div3.appendChild(img3);
wrapper.appendChild(div3);
let div4 = document.createElement('div');
let img4 = document.createElement('img');
img4.src = burger4.stringPath;
img4.height = 100;
img4.width = 100;
let txt4 = document.createTextNode('Hej hej');
div4.appendChild(txt4);
div4.appendChild(img4);
wrapper.appendChild(div4);
let div5 = document.createElement('div');
*/
//document.getElementById("myDiv").innerHTML = "Välj en burgare";
/*
function MenuItem(name, ingredients, allergy, kcal, stringPath) {
    this.name = name;
    this.ingredients = ingredients;
    this.allergy = allergy;
    this.kcal = kcal;
    this.stringPath = stringPath;
}

function nameAndKcal(burger) {
    "use strict";
    return burger.name + " " + burger.kcal + "kcal";
}

let br = document.createElement('br');

let burger1 = new MenuItem("The Void Burger", "bröd", "gluten", "60", "https://previews.123rf.com/images/ha4ipuri/ha4ipuri1806/ha4ipuri180600022/103956150-hamburger-bread-or-bun-without-anything-isolated-on-white-background-clipping-path.jpg");

let p1 = document.createElement('p');
let txt1 = document.createTextNode(nameAndKcal(burger1));
p1.appendChild(txt1);
document.body.appendChild(p1);

let burger2 = new MenuItem("The Cheese Burger", "Bröd, 90g nötfärsburgare, ost, sallad, tomat, gurka, hamburgare dressing", "gluten och laktose", "450", "https://p7.hiclipart.com/preview/520/119/677/french-fries-cheeseburger-whopper-buffalo-burger-hamburger-big-burger.jpg");

let p2 = document.createElement('p');
let txt2 = document.createTextNode(nameAndKcal(burger2));
p2.appendChild(txt2);
document.body.appendChild(p2);

let burger3 = new MenuItem("The Extra Meat-burger", "Bröd, 180g nötfärsburgare, ost, tomat, gurka, BBQ sås", "gluten och laktose", "640", "http://www.bigkitchenafrica.com/imgs/DSC_1303png2.png");

let p3 = document.createElement('p');
let txt3 = document.createTextNode(nameAndKcal(burger3));
p3.appendChild(txt3);
document.body.appendChild(p3);

let burger4 = new MenuItem("The Veggie Burger", "Bröd, 90g quornfärsburgare, sallad, tomat, gurka", "gluten", "440", "https://f0.pngfuel.com/png/604/771/veggie-burger-hamburger-cheeseburger-vegetarian-cuisine-mcdonald-big-mac-burger-king-png-clip-art.png");

let p4 = document.createElement('p');
let txt4 = document.createTextNode(nameAndKcal(burger4));
p4.appendChild(txt4);
document.body.appendChild(p4);

let burger5 = new MenuItem("The Future Burger", "Bröd, 90g halloumi, sallad, tomat, gurka", "gluten och laktose", "440", "https://www.burgerking.se/011_se/Product%20images/Veggie/image-thumb__7675__product_detail/HALLOUMI%20KING%201500x1500.png");

let p5 = document.createElement('p');
let txt5 = document.createTextNode(nameAndKcal(burger5));
p5.appendChild(txt5);
document.body.appendChild(p5);

let burgers = [burger1, burger2, burger3, burger4, burger5];

let i = 0;
let main = document.getElementById('myID');
for (i; i < 5;i++)
{
	let currentBurger = burgers[i];
  let allergy = "";
	let p = document.createElement('p');
  let txt3 = document.createTextNode(nameAndKcal(currentBurger));
  if(currentBurger.allergy)
  {
  	allergy = currentBurger.allergy;
    txt3 = document.createTextNode(nameAndKcal(currentBurger) + ' ' + allergy);
  } 
 
  p.appendChild(txt3);
  main.appendChild(p);  
}
*/

/*
function writeConsole (fullname) {
    let name = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let street = document.getElementById('street').value;
    let husnr = document.getElementById('street1').value;
    let payment = document.getElementById('payment').value;
    let radios = document.getElementsByName('gender');
    let gender = ' ';
    for(var i = 0; i < radios.length; i++)
        {
            if(radios[i].checked)
                {
                    gender = radios[i].value;
                    break;
                }
        }
    let values = [name, email, street, husnr, payment, gender];
    console.log('knapp klickad ' + values);
}
let myButton = document.getElementById('order');
myButton.onclick = writeConsole;
*/

