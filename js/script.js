var direction = "right";
var animLength = 4;
var reset = false;
const split = c => {
    const elementsHTML = document.querySelectorAll('.'+c);
    elements = [...elementsHTML];

    elements.forEach((element, index) => {
        text = element.innerText.split("");

        element.innerText = "";

        text.forEach((value, index) => {
            const outer = document.createElement("span");
            
            outer.className = "outer";
            
            const inner = document.createElement("span");
            
            inner.className = "inner";
            
            //inner.style.animationDelay = `${rand(-5000, 0)}ms`;
            
            const letter = document.createElement("span");
            
            letter.className = "letter";
            
            letter.innerText = value;
            
            // letter.style.animationDelay = `${index * 1000 }ms`;
            
            inner.appendChild(letter);    
            
            outer.appendChild(inner);    
            
            element.appendChild(outer);
        });

    });
  }

  const offsetByX = c => {
    const elementsHTML = document.querySelectorAll('.'+c);
    elements = [...elementsHTML];

    elements.forEach((element, index) => {
        element.setAttribute("direction", "left")
        updateAnimation(element);

    });
  }

  const updateParticleOpacity = () => {
    const menuItems = document.getElementById("menu-items");
      if(direction == "left"){
        if(tsParticles.domItem(0) != null){
          tsParticles.domItem(0).options.particles.move.direction = "right";
          tsParticles.domItem(1).options.particles.move.direction = "right";
          direction = "right";
        }
      }else{
        if(tsParticles.domItem(0) != null){
          tsParticles.domItem(0).options.particles.move.direction = "left";
          tsParticles.domItem(1).options.particles.move.direction = "left";
          direction = "left";
        }
      }
      tsParticles.refresh();
      setTimeout(updateParticleOpacity, 1000*animLength+menuItems.offsetWidth)
  }

  const updateAnimation = (element) => {
    const menuItems = document.getElementById("menu-items");
    const elementX = element.getBoundingClientRect().left - menuItems.getBoundingClientRect().left;
    const elementY = menuItems.getBoundingClientRect().right - element.getBoundingClientRect().right;
    

    if(element.getAttribute("direction") == "left"){
        element.style.animation = `skew-right ${animLength}s`;
        element.style.animationDelay = `${elementX}ms`;
        element.setAttribute("direction","right");

        if(reset == false){
          document.getElementById("tsparticles").style.animation = `opacity-breathe ${animLength}s ease`;
          document.getElementById("tsparticles").style.animationDelay = `${elementX}ms`;

          document.getElementById("blur").style.animation = `blur-breathe ${animLength}s ease`;
          document.getElementById("blur").style.animationDelay = `${elementX}ms`;
          reset = true;
        }
    }else{
        element.style.animation = `skew-left ${animLength}s ease`;
        element.style.animationDelay = `${elementY}ms`;
        element.setAttribute("direction","left")
        
        document.getElementById("tsparticles").style.animation = `opacity-breathe-alt ${animLength}s ease`;
        document.getElementById("tsparticles").style.animationDelay = `${0}ms`;

        document.getElementById("blur").style.animation = `blur-breathe-alt ${animLength}s ease`;
        document.getElementById("blur").style.animationDelay = `${0}ms`;
        reset = false;
        
    }

    
    setTimeout(()=>{updateAnimation(element)}, 1000*animLength+menuItems.offsetWidth);
  }

  const showAbout = () => {
    const aboutMenuItem = document.getElementById("about-menu-item");
    const menu = document.getElementById("menu");
    const aboutWrapper = document.getElementById("about-wrapper");

    menu.style.opacity = "0";
    setTimeout(()=>{
      menu.style.display = "none"; 
      aboutWrapper.style.display = "flex";
      setTimeout(()=>{aboutWrapper.style.opacity = "1";},0);
      
    },500);
  }

window.addEventListener("popstate", (e) => {
    if(e.state){
        switch (e.state.page) {
          case "menu":
            showMenu();
            break;
          
          case "shows":
            showShows();
            
            break;
        
          default:
            break;
        }
    }
});

const switchPage = (page, isDefault=false) => {
  switch (page) {
    case "menu":
      history.pushState({ page: page }, "Equator - Electronic/Bass Music Artist - Sydney, Australia", location.pathname);
      showMenu(isDefault);
      break;
    
    case "shows":
      showShows(isDefault);
      history.pushState({ page: page }, "Equator Shows - Trap, Dubstep, Bass Events - Sydney DJ, AU", "#shows");
      
      break;
  
    default:
      break;
  }
}

  const showShows = (isDefault=false) => {
    const showsMenuItem = document.getElementById("shows-menu-item");
    const menu = document.getElementById("menu");
    const showsHeader = document.getElementById("shows-header");
    const socials = document.getElementsByClassName("socials-outer")[0];
    const showsWrapper = document.getElementById("shows-wrapper");
    const loading = document.getElementById("loading");

    const menuHeader = document.getElementById("menu-header");

    const showsTitle = "Equator Shows - Trap, Dubstep, Bass Events - Sydney DJ, AU";
    const showsDescription = "Equator shows - See upcoming concerts for Australian EDM & bass music artist Equator. Producer based in Sydney. Melodic dubstep, trap, future bass events.";
    const showsURL = "https://equator.com.au/shows";

    document.title = showsTitle;
    document.querySelector('meta[property="og:title"]').setAttribute("content", showsTitle);
    document.querySelector('meta[name="twitter:title"]').setAttribute("content", showsTitle);

    document.querySelector('meta[name="description"]').setAttribute("content", showsDescription);
    document.querySelector('meta[property="og:description"]').setAttribute("content", showsDescription);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", showsDescription);

    document.querySelector('meta[property="og:url"]').setAttribute("content", showsURL);

    menu.style.opacity = "0";
    socials.style.opacity = "0";
    loading.style.opacity = "0";

    if (isDefault) {
      showsHeader.hidden = true;
    }
    
    setTimeout(()=>{
      menu.style.display = "none"; 
      socials.style.display = "none";
      showsWrapper.style.display = "flex";
      setTimeout(()=>{showsWrapper.style.opacity = "1";},0);
      showsHeader.hidden = false;
      menuHeader.hidden = true;
    },500);
  }

  const showMenu = (isDefault=false) => {
    const menu = document.getElementById("menu");
    const showsWrapper = document.getElementById("shows-wrapper");
    const socials = document.getElementsByClassName("socials-outer")[0];
    const loading = document.getElementById("loading");
    const showsHeader = document.getElementById("shows-header");
    const menuHeader = document.getElementById("menu-header");

    const menuTitle = "Equator - Electronic Music Artist - EDM & Bass - Sydney, Australia";
    const menuDescription = "Australian electronic music artist. EDM & bass music producer and DJ based in Sydney. Melodic dubstep, trap, future bass, remixes. Listen now. aka jjonah";
    const menuURL = "https://equator.com.au";

    document.title = menuTitle;
    document.querySelector('meta[property="og:title"]').setAttribute("content", menuTitle);
    document.querySelector('meta[name="twitter:title"]').setAttribute("content", menuTitle);

    document.querySelector('meta[name="description"]').setAttribute("content", menuDescription);
    document.querySelector('meta[property="og:description"]').setAttribute("content", menuDescription);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", menuDescription);

    document.querySelector('meta[property="og:url"]').setAttribute("content", menuURL);

    showsWrapper.style.opacity = "0";
    loading.style.opacity = "0";

    if (isDefault) {
      menuHeader.hidden = true;
    }

    setTimeout(()=>{
      showsWrapper.style.display = "none"; 
      socials.style.display = "flex";
      menu.style.display = "flex";
      setTimeout(()=>{menu.style.opacity = "1";},0);
      setTimeout(()=>{socials.style.opacity = "1";},0);
      showsHeader.hidden = true;
      menuHeader.hidden = false;
    },500);
  }
  
  window.onload = () =>{
    if(window.innerWidth >= 1000){
      const showsWrapper = document.getElementsByClassName("bit-widget")[0];
      showsWrapper.classList.remove('bit-layout-ipad');
      showsWrapper.classList.add('bit-layout-desktop');
    }

    switch (window.location.hash) {
      case "#shows":
        showShows();
        break;
    
      default:
        showMenu();
        break;
    }
    
    split("menu-text");
    offsetByX("letter");

    (async () => {
      await loadFull(tsParticles); // not needed if using the bundle script, required for any other installation
    
      await tsParticles.load("tsparticles", {
        "particles": {
          "number": {
            "value": 100,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": ["#ffffff","#ffffff", "#ffffff", "#c7ffec"]
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": true,
              "speed": 0.2,
              "opacity_min": 0.1,
              "sync": true
            }
          },
          "size": {
            "value": 2,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1.5,
            "direction": direction,
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "window",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 55
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      });

      await tsParticles.load("blur", {
        "particles": {
          "number": {
            "value": 300,
            "density": {
              "enable": true,
              "value_area": 1500
            }
          },
          "color": {
            "value": ["#c7ffec", "#69a5e4"]
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.25,
            "random": false,
            "anim": {
              "enable": true,
              "speed": 0.2,
              "opacity_min": 0.1,
              "sync": true
            }
          },
          "size": {
            "value": 50,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": direction,
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "window",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "repulse"
            },
            "onclick": {
              "enable": false,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 55
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      });
    })();

    updateParticleOpacity();

    document.getElementById('shows-menu-item').onclick = function(e){
      e.preventDefault();
      switchPage('shows', true);
    }
    
    let backLinks = [...document.getElementsByClassName('back-text')].concat([...document.getElementsByClassName('logo-link')]);

    for(var i = 0; i < backLinks.length; i++){
      let el = backLinks[i];
      el.onclick = function(e){
        e.preventDefault();
        switchPage('menu', true);
      }
    }
  }