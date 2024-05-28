"use strict";

window.Webflow ||= [];
window.Webflow.push(() => {
  //alert("hello world");

  ////////////// PAGE LOAD ANIMATION - Left to Right //////////////

  //Page Load Animation - Will run everytime a page loads
  function animatePageLoad() {
    let tlAnimateLoad = gsap.timeline({
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(".transition_wrapper", { display: "none" }); // onComplete - transition wrapper is set to display none so you can interact with page
      },
    });

    tlAnimateLoad
      // Animates the transition panes to the right off the screen
      .to(".transition_wrapper .transition_pane", {
        duration: 0.4,
        width: "0%",
        left: "100%",
        delay: 0.2,
        stagger: -0.05,
      });
  }

  // Calls animatePageLoad everytime a page loads
  // (IMPORTANT: set transition_wrapper to display: flex and transition_pane to width: 100% in CSS)
  animatePageLoad();

  ////////////// PAGE EXIT ANIMATION //////////////

  // pass in targetUrl for onComplete function
  function animatePageExit(targetUrl) {
    // Set the wrapper to be visible
    gsap.set(".transition_wrapper", { display: "flex" });

    let tlAnimateExit = gsap.timeline({
      ease: "power4.inOut",
      onStart: () => {
        // Disable pointer events on all links during the animation to prevent multiple triggers
        document.querySelectorAll("a").forEach((link) => {
          link.style.pointerEvents = "none";
        });
      },
      onComplete: () => {
        // Navigate to the target URL after the animation completes
        window.location.href = targetUrl;
      },
    });

    // Start with the pane off-screen on the left
    gsap.set(".transition_wrapper .transition_pane", {
      left: "-100%",
      width: "0%",
    });

    // Animate the pane to cover the screen from the left, with a stagger effect
    tlAnimateExit.to(".transition_wrapper .transition_pane", {
      left: "0%", // Move pane to cover the screen from the left
      width: "100%", // Apply full width
      duration: 0.4,
      stagger: 0.05, // Stagger effect to give a more dynamic entrance
    });
  }

  /////////////// GRAB TARGET LINK URL FUNCTION //////////////

  // Add event listeners to links that are not excluded (add classes of links you want to keep from being selected in the parenthesis below)
  const links = document.querySelectorAll(
    "a:not(.excluded-class, .pagination_button, .pagination_text)"
  );

  // forEach to select each link, add click eventListener that will grab the href and save it to targetUrl variable to be used later to navigate to the clicked page.
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      let targetUrl = this.getAttribute("href"); // grab target Url from clicked link

      /*Perform checks on target url:
    - clicked link is pointing to same website and not external site
    - is not an anchor link
    - is not a link that opens in another tab
    - if all is true, default behavior is prevented until animatePageExit animiation is completed
    */
      if (
        this.hostname === window.location.host &&
        !targetUrl.includes("#") &&
        this.getAttribute("target") !== "_blank"
      ) {
        e.preventDefault(); // Prevent the default link behavior unitl animiation is completed

        animatePageExit(targetUrl); // Execute the exit animation and pass in the targetUrl for the onComplete function inside the animatePageExit animation above
      }
    });
  });

  ////////////// HANDLE BACK AND FORWARD BUTTON PRESS //////////////

  //Handles Back and Forward Button Events so animation will run when back or forward button is pressed
  window.onpageshow = function (event) {
    if (event.persisted) window.location.reload();
  };

  //End Page Load Animation

  ////////////// PAGE LOAD ANIMATION - Top to Bottom //////////////

  //Page Load Animation - Will run everytime a page loads
  function animatePageLoad() {
    let tlAnimateLoad = gsap.timeline({
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(".transition_wrapper", { display: "none" }); // onComplete - transition wrapper is set to display none so you can interact with page
      },
    });

    tlAnimateLoad
      // Animates the transition panes to the right off the screen
      .to(".transition_wrapper .transition_pane", {
        duration: 0.4,
        height: "0%",
        top: "100%", // Moves up
        delay: 0.2,
        stagger: -0.05,
      });
  }

  // Calls animatePageLoad everytime a page loads
  // (IMPORTANT: set transition_wrapper to display: flex and transition_pane to width: 100% in CSS)
  animatePageLoad();

  ////////////// PAGE EXIT ANIMATION //////////////

  // pass in targetUrl for onComplete function
  function animatePageExit(targetUrl) {
    // Set the wrapper to be visible
    gsap.set(".transition_wrapper", { display: "flex" });

    let tlAnimateExit = gsap.timeline({
      ease: "power4.inOut",
      onStart: () => {
        // Disable pointer events on all links during the animation to prevent multiple triggers
        document.querySelectorAll("a").forEach((link) => {
          link.style.pointerEvents = "none";
        });
      },
      onComplete: () => {
        // Navigate to the target URL after the animation completes
        window.location.href = targetUrl;
      },
    });

    // Start with the pane off-screen on the left
    gsap.set(".transition_wrapper .transition_pane", {
      top: "-100%",
      height: "0%",
    });

    // Animate the pane to cover the screen from the left, with a stagger effect
    tlAnimateExit.to(".transition_wrapper .transition_pane", {
      top: "0%", // Moves down
      height: "100%", // Apply full height
      duration: 0.4,
      stagger: 0.05, // Stagger effect to give a more dynamic entrance
    });
  }

  /////////////// GRAB TARGET LINK URL FUNCTION //////////////

  // Add event listeners to links that are not excluded (add classes of links you want to keep from being selected in the parenthesis below)
  const links = document.querySelectorAll(
    "a:not(.excluded-class, .pagination_button, .pagination_text)"
  );

  // forEach to select each link, add click eventListener that will grab the href and save it to targetUrl variable to be used later to navigate to the clicked page.
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      let targetUrl = this.getAttribute("href"); // grab target Url from clicked link

      /*Perform checks on target url:
    - clicked link is pointing to same website and not external site
    - is not an anchor link
    - is not a link that opens in another tab
    - if all is true, default behavior is prevented until animatePageExit animiation is completed
    */
      if (
        this.hostname === window.location.host &&
        !targetUrl.includes("#") &&
        this.getAttribute("target") !== "_blank"
      ) {
        e.preventDefault(); // Prevent the default link behavior unitl animiation is completed

        animatePageExit(targetUrl); // Execute the exit animation and pass in the targetUrl for the onComplete function inside the animatePageExit animation above
      }
    });
  });

  ////////////// HANDLE BACK AND FORWARD BUTTON PRESS //////////////

  //Handles Back and Forward Button Events so animation will run when back or forward button is pressed
  window.onpageshow = function (event) {
    if (event.persisted) window.location.reload();
  };

  //End Page Load Animation
});

/*code to add into webflow project
<script src="http://localhost:1234/app.js"></script>
*/

///////////Not Needed But can be used to refresh Scroll Trigger onComplete of an animation. However, you don't need to refresh Scroll Trigger if you set the aspect ratio of every image on the page. Also, you can use a setTimeout to refresh scrollTrigger after the page loads. See 413 Managment for how I did that. Also the code in 413 management is more performant might think about using it for these scroll based animations. Though it is only for fade-in///////

// ALLOWS FOR A CALLBACK WHEN ANIMATION IS COMPLETED - This works, but doesn't allow you to add a refresh to non-animated elements

const fadeInElements = gsap.utils.toArray("[fade-in]");

fadeInElements.forEach((fadeInElement) => {
  // Create a timeline and attach a scroll trigger to it
  const tl = gsap.timeline({
    onComplete: () => {
      // Check if the element has the 'refresh' attribute
      if (fadeInElement.hasAttribute("refresh")) {
        const id = fadeInElement.id;
        console.log(`${id} has refreshed after animation complete`);
        ScrollTrigger.refresh();
      }
    },
    scrollTrigger: {
      trigger: fadeInElement,
      start: "top 60%",
      end: "bottom 50%",
    },
  });

  // Define the animations to add to the timeline
  tl.fromTo(
    fadeInElement,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5 }
  );
});

// Refresh ScrollTrigger after everything has loaded
window.onload = function () {
  setTimeout(() => {
    ScrollTrigger.refresh(true);
    console.log("Scroll Trigger has been refreshed");
  }, 500);
};
