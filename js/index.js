//Testing
console.log("@Rhys_Ree on Youtube :)");
let potato = "spud"
const spud = "irish"

console.log(potato);

let potatoAbt = {
  naem: potato,
  age: 5
};

console.log(potatoAbt);
console.log(potatoAbt.age);







$(document).ready(function(){ //When the document has fully loaded.


const lenis = new Lenis({ //Lenis smooth scrolling
scrollWheel: true, //enable smooth
Lerp: 0.7, //smooth intensity
wheelMultiplier: 0.5 //scroll amount
});

lenis.on('scroll', (e) => {
  lenis.on('scroll', ScrollTrigger.update)
  //console.log(e)
});

//for lenis internal operations
function raf(time) { 
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf);

lenis.stop()

//Functions

function afterIntroAnim(){
  lenis.start();
 $("body").css("overflow-y", "scroll"); //To enable scrolling
}

function bgAnim(){
  gsap.timeline()
    .to(".bgImg", {opacity: 0.7, duration: 1, ease: 'Power1.easeInOut'});
}

//Triggered Animations

//Sequence of anims on the first section.
// https://greensock.com/docs/v3/Plugins/ScrollTrigger
gsap.timeline({}) // To create the timeline.
.from("#hello_there, #rhys", {letterSpacing:'50px', opacity:0, duration: 2, ease: 'Power4.easeInOut'})

gsap.timeline({})
.from("#scroll_down", {opacity:0, delay: 0, duration: 0.8, ease: 'Power1.easeInOut', onComplete: afterIntroAnim})


//thirdSection
gsap.timeline({ //Create a timeline.
   //Timeline properties
   scrollTrigger: ".thirdSection", //To trigger the timeline animation when class in view.
}) 
.from(".thirdSection", {opacity:0, delay: 0.5, duration: 0.8, ease: 'Power1.easeInOut', onComplete: bgAnim}) //Anime from properties. https://greensock.com/docs/v2/Easing
  
//overviewSection
gsap.timeline({
  scrollTrigger: ".overviewSection",
})
.from("#overviewH", {paddingLeft:100, duration:0.8, delay: 0.1, ease: 'Power1.easeInOut'})

//Images in the OverviewSection.
//Photography
gsap.timeline({scrollTrigger: "#photo"})
.to("#photoP", {letterSpacing:'4px', duration: 0.8, delay: 0.5, ease: CustomEase.create("easeInOutQuart", ".76,0,.24,1")})
.from("#photoImg", {filter: 'blur(64px)', scale: 1, duration: 0.8,  ease: CustomEase.create("easeInOutQuad", "0,-0.04,0,1.05")})
//Youtube
gsap.timeline({scrollTrigger: "#yt"})
.to("#ytP", {letterSpacing:'4px', duration: 0.8, delay: 0.5, ease: CustomEase.create("easeInOutQuart", ".76,0,.24,1")})
.from("#ytImg", {filter: 'blur(64px)', scale: 1, duration: 0.8,  ease: CustomEase.create("easeInOutQuad", "0,-0.04,0,1.05")})




}) ;




//If placed on seperate lines, will play animations chronologically.
//introAnim.from("#rhys", {opacity:0, duration: 2 , ease: 'Power1.easeInOut'})

//Welcome Message. TEST
//document.getElementById("welcomeMessage").innerHTML = "Welcome, " + navigator.userAgent + "."
//.play() //Play the animation manually.
