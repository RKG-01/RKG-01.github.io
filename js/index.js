// Index.html Javascript

//$ is Jquery
//anime is Anime.js



$(function(){ //when the page loads.




function intro() {
document.getElementsByClassName(".body").scroll = 0

    anime({
    targets: ".headingOne",
    duration: 2000,
    letterSpacing: 10,
    easing: 'easeInOutQuart',
    })

    anime({
      targets: ".headingTwo",
      duration: 2000,
      color: 'rgb(255, 255, 255)',
      easing: 'easeInOutQuart',
      })

};

function secondSection() {
  anime({
    targets: ".scrollDown",
    delay: 1000,
    duration: 2000,
    opacity: 1,
    easing: 'easeInOutQuart',
    begin: function(anim){ //When the animation is begind.
      $("body").css("overflow-y", "scroll"); //Enable scrolling. (Using Jquery.)
    }
    })

    
};

intro();
secondSection();


//Welcome Message.
document.getElementById("welcomeMessage").innerHTML = "Welcome, " + navigator.userAgent + "."

	


window.onscroll = function() {
  var scrollTop = $(window).scrollTop()
  var docheight = $(document).height()
  console.log(scrollTop)

  if (scrollTop > 100){
    anime({
      targets: ".body",
      duration: 2000,
      backgroundColor: 'rgb(255, 255, 255)',
      easing: 'easeInOutQuart',
      });
      anime({
        targets: '.thirdSection',
        duration: 2000,
        color: 'rgb(0,0,0)',
        easing: 'easeInOutQuart',
        });
      anime({
          targets: '.headingOne',
          duration: 2000,
          color: 'rgb(0,0,0)',
          fontSize: 30,
          easing: 'easeInOutQuart',
          begin: function(anim){
            document.getElementById("HeadingOne").innerHTML = "Welcome to Rhys_Ree."
          }
        });
      anime({
          targets: '.headingTwo',
          delay: 1000,
          duration: 2000,
          fontSize: 25,
          color: 'rgb(0,0,0)',
          easing: 'easeInOutQuart',
          begin: function(anim){
            document.getElementById("HeadingTwo").innerHTML = "Welcome to my website. There's nothing here right now, still developing the website!"
          }
        });
        anime({
          targets: '.scrollDown',
          duration: 2000,
          color: 'rgb(222, 129, 129)',
          easing: 'easeInOutQuart',
          begin: function(anim){
            document.getElementById("scrollDown").innerHTML = "(THIS SITE IS IN ACTIVE DEVELOPMENT.) You may scroll back up and awe."
          }
        });
  } else {
    anime({
      targets: ".body",
      duration: 2000,
      backgroundColor: 'rgb(0,0,0)',
      easing: 'easeInOutQuart',
      });
    anime({
        targets: '.thirdSection',
        duration: 2000,
        color: 'rgb(255,255,255)',
        easing: 'easeInOutQuart',
      });
    anime({
          targets: '.headingOne',
          duration: 2000,
          color: 'rgb(255,255,255)',
          fontSize: 70,
          easing: 'easeInOutQuart',
          begin: function(anim){
          document.getElementById("HeadingOne").innerHTML = "Hello There."
          }
      });
    anime({
        targets: '.headingTwo',
        duration: 2000,
        delay: 1000,
        fontSize: 45,
        color: 'rgb(255,255,255)',
        easing: 'easeInOutQuart',
        begin: function(anim){
          document.getElementById("HeadingTwo").innerHTML = "I'm Rhys."
        }
      });
      anime({
        targets: '.scrollDown',
        duration: 2000,
        color: 'rgb(255,255,255)',
        easing: 'easeInOutQuart',
        begin: function(anim){
          document.getElementById("scrollDown").innerHTML = "Scroll Down."
        }
      });
  };






}


});