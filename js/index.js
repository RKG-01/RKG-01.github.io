//I tried learning Javascript on the fly making this... Please forgive the probably unoptimal and spaghetti code.
// const { duration } = require("@mui/material");
let dMode = false //Debug Mode

// Internal GSAP stuff
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,Draggable,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase)

  //Lenis Stuff https://lenis.darkroom.engineering/ https://github.com/darkroomengineering/lenis
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    // console.log(e)
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000) // "tick" time for lenis? (provided by GSAP)
  })
  gsap.ticker.lagSmoothing(0)
  lenis.scrollTo(document.getElementById("introSection"))
  if (dMode == false){ //If debug mode == on, then don't pause the scroll.
    lenis.stop()
  } 

  if (screen.width <= 640){
    console.log("Small Screen")
    lenis.start()
  }
  //End of Lenis stuff

  //Initial sequence of Animations.
    let tl = gsap.timeline()
    tl.to(".introText", {text: "Hello there, I'm Rhys.", duration: 3, delay: 1, ease: "power1.out"}, 1);
    tl.to(".introPara", {text: "...and I do stuff.", duration: 3, ease: "power1.out", onComplete: () => kek()}, ">"); //https://gsap.com/resources/getting-started/timelines
    
    
    function kek() { //https://gsap.com/resources/getting-started/control
      lenis.start()
      gsap.to(".sd", {opacity: 1, duration: 1, ease: "power1.out"})
      // console.log("Vis");
    };
    var height = window.innerHeight //https://www.w3schools.com/howto/howto_js_get_current_window.asp
    gsap.to(".sd", {
      text: "Thanks.",
      scrollTrigger: {trigger: '.secondSection', scrub: true, start: 100, end: height/3} //https://gsap.com/docs/v3/HelperFunctions/helpers/imageSequenceScrub?_highlight=scrub
    })

    gsap.to(".introDiv", {
      yPercent: 200,
      'webkitFilter': 'blur(20px)', //https://stackoverflow.com/questions/36875629/animate-blur-filter-with-gsap
      scrollTrigger: {trigger: '.secondSection', scrub: true, start: 0}
    })

    //When user clicks to skip animations.
    const section1Element = document.getElementById("homeSection");
      section1Element.addEventListener("click", () => {
        tl.totalProgress(1);
      });

    //if user have visited the website within one hour.
    // if ( firstImpression(0.04166666666666666666666666666667) ) { /*https://github.com/robflaherty/firstImpression.js*/
    //   console.log('New user');
    // }

    // firstImpression(null)

    //Second Section
    gsap.to(".secondSection", {
      duration: 1.5,
      ease: "power1.out",
      backgroundColor: '#080808',
      scrollTrigger: {trigger: '.secondSection', start: height},
      onStart: () => lenis.stop()
    })

    var bangSeq = gsap.timeline({duration: 0.5, ease: 'linear', scrollTrigger: {trigger: '.secondSection', start: height}}, "<")
    bangSeq.to(".bang", {
      text: "You're welcome."
    })
    bangSeq.to(".bang", {
      opacity: 0,
      onComplete: () => document.getElementById("bang").style.visibility = "hidden"
    })
    bangSeq.to(".secondSectionDiv", {
      opacity: 1,
      delay: 0.5,
      stagger: 1,
      onComplete: () => lenis.start()
    })
/////////////End of Initial Animations.

//Buttons on home page.

  //Button Constants
  const photographer = document.getElementById("photographer");
  const contentCreator = document.getElementById("contentCreator");
  const musician = document.getElementById("musician");
  const gameDeveloper = document.getElementById("gameDeveloper");
  const any = [photographer, contentCreator, musician, gameDeveloper];  //List all of the constants to be detected as one- for events.
  let states = {"photographer": [false], //Dictionary to control button states.
                "contentCreator": [false],
                "musician": [false],
                "gameDeveloper": [false]
  };

  //functions
//https://stackoverflow.com/questions/3559070/are-there-dictionaries-in-javascript-like-python Might eventually need a dictionary. (turns out, I did)

function toggle(element) { //Fired when the button(element) is clicked.
  //Finding the SubButtonDiv
  let elementId = element.getAttribute("id") //"photographer"/"contentCreator" --thus, the HTML must abide by the naming conventions.
  let elementDiv = elementId.toString()+"_SkillElementDiv" //synthesises the name of the SkillElement
  let elementDivClass = document.getElementById(elementDiv).className.toString() //to slice
  let elementDivClassSlice = elementDivClass.slice(0, 18) //to grab the name of the class. Should return: "subSkillElementDiv"
  // console.log(document.getElementById(elementDiv)) //return selected Div where the SubElement buttons are.
  // console.log(elementDivClassSlice)
  document.getElementById(elementDiv).style.height = "auto" //to automatically calculate the height it should tween to.
  document.getElementById(elementDiv).style.visibility = "visible"
  document.getElementById(elementDiv).style.color = document.getElementById(element.getAttribute("id")).style.color //not working

  function autoClose(active){ //to automatically close the other elements out of focus.
    for (let i =0; i < any.length; i++){ //to loop any many times as the "any" list.
      if (any[i].getAttribute("id") != active.getAttribute("id")){
        stringVer = any[i].getAttribute("id")
        states[any[i].getAttribute("id")][0] = false
        // console.log("Closing:  "+stringVer)
        gsap.to("."+stringVer+"_SkillElementDiv",{
          ease: "power1.out",
          duration: 1,
          height: 0,
          opacity: 0,
        })
      }
    }
  }

 var skillElementTL = gsap.timeline()
  if (states[elementId][0] == false) {
    // console.log("False now True")
    console.log(states[elementId][0])
    skillElementTL.from("."+elementDivClassSlice, {
      duration: 1,
      ease: "power1.out",
      height: 0, //The height to tween from.
      onComplete: () => states[elementId][0] = true, //Record the element state.
      onStart: () => autoClose(element)
    });
    skillElementTL.to("."+elementDivClassSlice,{
      duration: 1,
      ease: "power1.out",
      opacity: 1, //the opaccity to tween to.
    }, "<")
  } else{
    // console.log("True now False")
    skillElementTL.to("."+elementDivClassSlice, {
      duration: 1,
      ease: "power1.out",
      height: 0,
      opacity: 0,
      onComplete: () => states[elementId][0] = false, //Record the element state.
    });
    
  }
};//End of the "toggle" function

//Events
    any.forEach((element) => { //For each element in the array.
      element.addEventListener("click", () => { //When the user clicks
        toggle(element);
      });
      
      element.addEventListener("mouseover", () => { //When the user hovers over the element- any button in this case
        // console.log("element");
        document.body.style.cursor = "url('/assets/images/altCurs.png'), auto"; //change the cursor
      });
      
      element.addEventListener("mouseleave", () => { //When the user leaves the element
        // console.log("element Left");
        document.body.style.cursor = "default"; //change the cursor back to default
      });
    });

 });

 //Debug mode bc waiting for animations is boring.
 function debugMode(){
  console.log('%cDebug Mode.', 'color:red;font-size:large;'); //https://stackoverflow.com/questions/70991556/how-to-create-user-input-in-the-javascript-console
 }
 if (dMode == true){
  debugMode()
 }