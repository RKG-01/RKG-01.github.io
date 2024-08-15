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
    //End of Lenis stuff
})
