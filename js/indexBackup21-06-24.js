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
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
  lenis.scrollTo(document.getElementById("introSection"))
  lenis.stop()
  //End of Lenis stuff

  //Initial sequence of Animations.
    let tl = gsap.timeline()
    tl.to(".introText", {text: "Hello there, I'm Rhys.", duration: 3, delay: 1, ease: "power1.out"}, 1);
    tl.to(".introPara", {text: "...and I do stuff.", duration: 3, ease: "power1.out", onComplete: () => kek()}, ">"); //https://gsap.com/resources/getting-started/timelines
    
    function kek() { //https://gsap.com/resources/getting-started/control
      // document.getElementById("bod").style.overflowY = 'visible';
      lenis.start()
      gsap.to(".sd", {opacity: 1, duration: 1, ease: "power1.out"})
      console.log("Vis");
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
//Popups
  var popupTl = gsap.timeline({duration: 0.5, ease: "power4.inOut"});
  const close = document.getElementById("close");
  const popupDiv = document.getElementById("popupDiv");
  var popupToggled = false;

  //Buttons
  const photographer = document.getElementById("photographer");
  const videographer = document.getElementById("videographer");
  const musician = document.getElementById("musician");
  const gameDev = document.getElementById("gamedev");
  const any = [photographer, videographer, musician, gameDev]

  //Button features
  const popupDivH = document.getElementById("popupHeading");
  const popupDivP = document.getElementById("popupDivP");
  const popupDivBg = document.getElementById("popupBg");
  const popupDivSeeMore = document.getElementById("popupDivSM");
  const popupDivSub = document.getElementById("subPopupDiv");

  //functions

info_dict = {
  "photographer":
  ["I take photos (sometimes)", //0
    "I usually take photos in either Real Life or Assetto Corsa.", //1
    "url(/assets/images/photographyImg.jpg)", //2
    "#270b09", //3
    "/pages/photography.html" //4
  ]
}

  function toggle(param) {
    //If
    if (param == photographer){
      popupDivH.innerHTML = info_dict.photographer[0];
      popupDivP.innerHTML = info_dict.photographer[1];
      popupDivBg.style.backgroundImage = info_dict.photographer[2];
      popupDivSub.style.backgroundColor = info_dict.photographer[3];
      popupDivSeeMore.href = info_dict.photographer[4];
    }
    else if(param == videographer){
      popupDivH.innerHTML = "I make videos (sometimes)";
      popupDivP.innerHTML = "Videos go brr.";
      popupDivBg.style.backgroundImage = "url(/assets/images/ytThumbnail.png";
      popupDivSub.style.backgroundColor = "#0a1b0e"
      popupDivSeeMore.href = "https://www.youtube.com/@Rhys_Ree";
      popupDivSeeMore.target= "_blank" //Open in a new page.
    }
    else if(param == musician){
      popupDivH.innerHTML = "I make music.";
      popupDivP.innerHTML = "I make the beeps and boops.";
      popupDivBg.style.backgroundImage = "url(/assets/images/FLstudioSs.png)";
      popupDivSub.style.backgroundColor = "#281b08"
      popupDivSeeMore.href = "youtube.com";
    }
    else if(param == gameDev){
      popupDivH.innerHTML = "I make video games.";
      popupDivP.innerHTML = "Though never published any...";
      popupDivBg.style.backgroundImage = "url(/assets/images/gameDevSs.png)";
      popupDivSub.style.backgroundColor = "#0e1224"
      popupDivSeeMore.href = "youtube.com";
    }

    if (popupToggled == true){
      popupToggled = false
      popupTl.fromTo(".popupDiv", {
        delay: 1,
        height: "80%"},
        {
        height: "1%",
        opacity: 0,
        onComplete: () => popupDiv.style.visibility = "hidden" }
        )
    }
    else{
      popupToggled = true
      popupTl.fromTo(".popupDiv", {
        delay: 1,
        height: "1%"},
        {
        height: "80%",
        opacity: 1,
        onStart: () => popupDiv.style.visibility = "visible"}
        )
    }};

//Events
    any.forEach((element) => {
      element.addEventListener("click", () => { //When the user clicks
        toggle(element);
      });
      
      element.addEventListener("mouseover", () => { //When the user hovers over the element- the button in this case
        console.log("element");
        document.body.style.cursor = "url('/assets/images/altCurs.png')";
      });
      
      element.addEventListener("mouseleave", () => { //When the user leaves the element
        document.body.style.cursor = "default";
      });
    });


    let pc = false

    if (window.navigator.userAgent.indexOf("Windows") !=-1){
      pc = true
    } else if(window.navigator.userAgent.indexOf("Mac OS") != -1) {
      pc = true
    } else if (window.navigator.userAgent.indexOf("Ubuntu") != -1){
      pc = true
    } else (console.log("ERROR DETECTING CLIENT (whoopsie)"))

function fade(){ //To transition between images.
  gsap.fromTo(".subSecondSectionPreview", {
    duration: 0.5,
    'webkitFilter': 'blur(10px)',
    opacity: 0,
    ease: "power1.out"
   },{
    'webkitFilter': 'blur(0px)',
    opacity: 1,
   })
}

function checkIfEnabled(element){
  var sSSP = document.getElementById("subSecondSectionPreview")
  let sSSPstyle = getComputedStyle(sSSP)
    if (prevBg != sSSPstyle.backgroundImage){
      var prevBg = sSSPstyle.backgroundImage
      console.log("Prev: " + prevBg + " Current: " + sSSPstyle.backgroundImage)
      return true;
  } else console.log("false"); console.log(sSSPstyle.opacity);
}
const sSSP = document.getElementById("subSecondSectionPreview")
    if (pc == true){
      photographer.addEventListener("mouseover", e =>{
        if (checkIfEnabled()){
          console.log(checkIfEnabled())
          sSSP.style.backgroundImage = "url(/assets/images/photographyImg.jpg)"
          fade()
        }
      })
      videographer.addEventListener("mouseover", e =>{
        if (checkIfEnabled()){
          console.log(checkIfEnabled())
          sSSP.style.backgroundImage = "url(/assets/images/ytThumbnail.png)"
          fade()
        }
      })
    }

    //Close button
      close.addEventListener("click", e => {
        popupToggled = false
        popupTl.fromTo(".popupDiv", {
          delay: 1,
          height: "80%",
        }, {
          height: "1%",
          opacity: 0,
          onComplete: () => popupDiv.style.visibility = "hidden" 
        })
      })
 });