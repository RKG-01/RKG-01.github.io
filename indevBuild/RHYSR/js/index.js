document.addEventListener("DOMContentLoaded", (event) =>{
    // gsap.registerPlugin(ScrollTrigger,ScrollToPlugin)
    console.log("Everything Loaded")

    // Lenis
        // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);
    lenis.duration = 5

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
////////////////////////////
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let introTl = gsap.timeline({
        delay: 0.7,
        defaults: { //Children Inherit
            duration: 1
        }
    })
    introTl.from("#greeting", {filter: "blur(5px)", duration: 0.7})
            .from(".topbarElement", {opacity: "0", duration: 0.5})
            .from("#scrollRequest", {opacity: "0", duration: 0.7})

    // To speed up animations if the user clicks.            
    const heroSectionElement = document.getElementById("hero");
    heroSectionElement.addEventListener("click", () => {
        console.log("CLICK")
        introTl.duration(0.5);
    })

    // Animate vertically during scroll.
    let scrollTl = gsap.timeline({
        delay: 0,
        defaults: {
            duration: 0.7
        },
        // scrollTrigger: {trigger: '.listSection', scrub: true, start: 0, end: (windowHeight)/1}
    })

    scrollTl.to("#scrollRequest", {
        text: "Please scroll.", zIndex: "-5",
        scrollTrigger: {trigger: '.listSection', scrub: true, start: 0, end: (windowHeight)/1}
    })
            .to("#greeting",{
                lineHeight: "2",
                scrollTrigger: {trigger: '.listSection', scrub: true, start: 0, end: (windowHeight)/3}
            })

    let topBarItems = document.getElementsByClassName("topbarElement")
    for (var i =0; i < topBarItems.length; i++){
        topBarItems[i].id += `${topBarItems[i].innerText.replace(/\s/g, '')}`;

        topBarItems[i].addEventListener("mouseover", event =>{
            let item = event.currentTarget;
            let id_ = `#${item.id}`
            gsap.to(id_,{
                y: 10
            })
        });
        topBarItems[i].addEventListener("mouseleave", event =>{
            let item = event.currentTarget;
            let id_ = `#${item.id}`
            gsap.to(id_, {
                y: 0
            });
        });
    }








    let projectList = document.getElementById("projectsList")
    function preview(id) {
        let dict = {
            "Photographer": [["As far as I can remember, I have had an interest in conveying aesthetics, emotions or capturing moments through static photos. <br><br>Whether it be renders, or real life, I explored these interests and made something I was content with."],["My lens has a nice camera."]],
            "Graphic Designer": [["I like making grafics"],["Adobe costs HOW MUCH?!"]],
            "Programmer": [["I am interested in making products to better humanity."],["Thank you."]],
            "Editor": [["Davinci Resolve Superiority"],['I promise the colours look alright on my monitor.']],
            
        };

        console.log(dict)
        let element = document.getElementById(String(id.replace("#", "")))

        let titleHeader = document.getElementById("titleHeader")
        let para1 = document.getElementById("previewPara1")
        let para2 = document.getElementById("previewPara2")

        //Fill in text and stuff
        for (var [key, value] of Object.entries(dict)){ //https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
            if (String(key) == element.innerText){
                // console.log(value[1][0])
                titleHeader.innerHTML = String(key)
                para1.innerHTML = String(value[0][0])
                para2.innerHTML = String(value[1][0])
            }
        }

        //Create the clickable hyperlinks
        let projectList = document.getElementById("projectsList")
        console.log(projectList)
        let previewLinks = {
            "Photographer": [
                ["Real Life", "Assetto Corsa"],["Photos taken IRL.", "Photos taken through a modified instance of the Assetto Corsa game engine."],["pages/photography.html", "youtube.com"]
            ],
            "Programmer": [
                ["KOMOREBI.", "Project: ATLAS.", "Rhys-Ree.com", "Just Drive"],["A revolutionary project designed for the Roblox Game Engine.", "The IRIS Project: Institute of Research in Schools.", "My Personal Website", 'From my time as a Senior Developer @ Synthwave Interactive'],["pages/photography.html", "youtube.com", "", ""]
            ],
            "Editor": [
                ["Ruff"],["A self-improvement Youtuber. I chose to work with him because of his previous editing style."],[""]
            ],
        }

        for (var [key, value] of Object.entries(previewLinks)){
            if (String(key) == element.innerText){
                for (var j = 0; j<value[0].length; j++){
                    let e = document.createElement("a")
                    e.className = "projectsListItem"
                    e.innerHTML = value[0][j]
                    projectList.appendChild(e)
                    e.href = value[2][j]
                    e.id = value[1][j]
                    e.addEventListener("mouseover", event =>{
                        para2.innerHTML = event.currentTarget.id
                    })

                }

            }
        }
        lenis.stop()
        let previewTl = gsap.timeline({
            stagger: 0.7,
            defaults: { //Children Inherit
                duration: 0.7
            },
            onComplete: document.getElementsByClassName("listSection")[0].scrollIntoView()
        })
        // previewTl.to(id, {
        //     y: -100
        // });
        previewTl.to(".listDiv", {
            opacity: 0,
            zIndex: -1, //so that buttons aren't still clickable.
            y: 100,
            ease: "power1.inOut",
        })
        
        previewTl.to(".previewDiv", {
            opacity: 1,
            zIndex: 2,
            // onComplete: document.getElementsByClassName("listSection")[0].scrollIntoView()
        })

        previewTl.to(".projectsDiv", {
            opacity: 1
        })
        
        function hideProjectsList(){
            while (projectList.firstChild){
                console.log("complete")
                projectList.removeChild(projectList.lastChild)
            };
        }

            //To return to the home page from the preview menu
        function noPreview() {
            gsap.to(".projectsDiv", {
                opacity: 0,
                duration: 0.7,
                onComplete: hideProjectsList()
            })


            lenis.start()
        }
        let returnButton = document.getElementById("previewReturn")
        returnButton.addEventListener("click", event => {
            previewTl.reverse();
            noPreview()
        })
    }





    // Animate list items on hover

    // console.log(document.getElementsByClassName("listItem"))

    let listItems = document.getElementsByClassName("listItem")
    for(var i = 0; i < listItems.length; i++){
        console.log(listItems[i]);
        listItems[i].id += `${listItems[i].innerText.replace(/\s/g, '')}`;
        listItems[i].addEventListener("mouseover", event => {
            let item = event.currentTarget;
            let id_ = `#${item.id}`
            gsap.to(id_, {
                y: -10
            });
        });
        listItems[i].addEventListener("mouseleave", event =>{
        let item = event.currentTarget;
        let id_ = `#${item.id}`
        gsap.to(id_, {
            y: 0
        });
        });
        listItems[i].addEventListener("click", event => {
            let item = event.currentTarget;
            let id_ = `#${item.id}`
            preview(id_)
        })
    };



    // To manage the horizontal scrolling


    let listDivWidth = document.getElementsByClassName("listDiv")[0].offsetWidth
    let lastItemWidth = listItems[listItems.length-1].offsetWidth
    let imaWidth = document.getElementsByClassName("listHeader")[0].offsetWidth
    console.log(listDivWidth)

    window.onresize = function(){
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        
    }

    let section = document.getElementsByClassName("listContainer")
    console.log("windowWidth: "+windowWidth)

    if (windowWidth > 600){
        gsap.to(section, {
            x: -(listDivWidth-(lastItemWidth+imaWidth)),
            ease: "sine",
            // x: 0,y:0,
            scrollTrigger:{
                trigger: ".listSection",
                pin: true,
                scrub: true,
                // snap: 1
                end: (windowHeight)*3
            },
        })
    }



})


