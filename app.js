"use strict";

window.Webflow ||= [];
window.Webflow.push(() => {
  //alert("hello world");

  //Page Load Animation - Will run everytime a page loads
  function animatePageLoad() {
    let tlAnimateLoad = gsap.timeline({
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(".transition_wrapper", { display: "none" });
      }, // onComplete transition wrapper is set to display none
    });

    // Animates the transition panes to the right off the screen
    tlAnimateLoad.to(".transition_wrapper .transition_pane", {
      duration: 0.4,
      width: "0%",
      left: "100%",
      delay: 0.2,
      stagger: -0.05,
    });
  }

  // Calls animatePageLoad everytime a page page loads
  animatePageLoad();

  // Page Exit Animation
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

  // Add event listeners to links
  const links = document.querySelectorAll("a:not(.excluded-class)");

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      let targetUrl = this.getAttribute("href"); // grab target Url from clicked link

      /*Perform checks on target url:
      - clicked link is pointing to same website and not external site
      - is not an anchor link
      - is not a link that opens in another tab
      - if all is true, default behavior is prevented until animiation is completed
      */
      if (
        this.hostname === window.location.host &&
        !targetUrl.includes("#") &&
        this.getAttribute("target") !== "_blank"
      ) {
        e.preventDefault(); // Prevent the default link behavior unitl animiation is completed

        animatePageExit(targetUrl); // Execute the exit animation and pass in the targetUrl for the onComplete function
      }
    });
  });

  //Handles Back Button Events
  window.onpageshow = function (event) {
    if (event.persisted) window.location.reload();
  };
});

/*code to add into webflow project
<script src="http://localhost:1234/app.js"></script>
*/
