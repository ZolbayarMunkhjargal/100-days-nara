/* ========================
   FETCH + APPLY DATA
======================== */
const fetchData = async () => {
  try {
    const res = await fetch("customize.json");
    const data = await res.json();

    Object.entries(data).forEach(([key, value]) => {
      if (!value) return;

      const el = document.querySelector(`[data-node-name*="${key}"]`);
      if (!el) return;

      if (key === "imagePath") {
        el.src = value;
      } else {
        el.textContent = value;
      }
    });

    // Start animation AFTER DOM is updated
    animationTimeline();

  } catch (err) {
    console.error("Error loading customize.json:", err);
  }
};

/* ========================
   TEXT SPLITTER (Reusable)
======================== */
const splitTextToSpans = (element) => {
  if (!element) return;
  element.innerHTML = element.textContent
    .split("")
    .map(char => `<span>${char}</span>`)
    .join("");
};

/* ========================
   ANIMATION TIMELINE (GSAP v3)
======================== */
const animationTimeline = () => {
  // Elements
  const textBox = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");

  splitTextToSpans(textBox);
  splitTextToSpans(hbd);

  const ideaIn = {
    opacity: 0,
    y: -20,
    rotateX: 5,
    skewX: 15
  };

  const ideaOut = {
    opacity: 0,
    y: 20,
    rotateY: 5,
    skewX: -15
  };

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.to(".container", { opacity: 1, duration: 0.5 })

    .from(".one", { opacity: 0, y: 10, duration: 0.7 })
    .from(".two", { opacity: 0, y: 10, duration: 0.4 })

    .to(".one", { opacity: 0, y: 10, duration: 0.7 }, "+=2.5")
    .to(".two", { opacity: 0, y: 10, duration: 0.7 }, "-=1")

    .from(".three", { opacity: 0, y: 10, duration: 0.7 })
    .to(".three", { opacity: 0, y: 10, duration: 0.7 }, "+=2")

    .from(".four", { scale: 0.2, opacity: 0, duration: 0.7 })
    .from(".fake-btn", { scale: 0.2, opacity: 0, duration: 0.3 })

    .to(".hbd-chatbox span", {
      visibility: "visible",
      stagger: 0.05,
      duration: 0.5
    })

    .to(".fake-btn", {
      backgroundColor: "#7fcef8",
      duration: 0.2
    })

    .to(".four", {
      scale: 0.2,
      opacity: 0,
      y: -150,
      duration: 0.5
    }, "+=0.7")

    // Ideas sequence
    .from(".idea-1", { ...ideaIn, duration: 0.7 })
    .to(".idea-1", { ...ideaOut, duration: 0.7 }, "+=1.5")

    .from(".idea-2", { ...ideaIn, duration: 0.7 })
    .to(".idea-2", { ...ideaOut, duration: 0.7 }, "+=1.5")

    .from(".idea-3", { ...ideaIn, duration: 0.7 })
    .to(".idea-3 strong", {
      scale: 1.2,
      x: 10,
      backgroundColor: "var(--primary)",
      color: "#fff",
      duration: 0.5
    })
    .to(".idea-3", { ...ideaOut, duration: 0.7 }, "+=1.5")

    .from(".idea-4", { ...ideaIn, duration: 0.7 })
    .to(".idea-4", { ...ideaOut, duration: 0.7 }, "+=1.5")

    .from(".idea-5", {
      rotateX: 15,
      rotateZ: -10,
      skewY: -5,
      y: 50,
      opacity: 0,
      duration: 0.7
    }, "+=0.5")

    .to(".idea-5 .smiley", {
      rotation: 90,
      x: 8,
      duration: 0.7
    }, "+=0.4")

    .to(".idea-5", {
      scale: 0.2,
      opacity: 0,
      duration: 0.7
    }, "+=2")

    // Big text animation
    .from(".idea-6 span", {
      scale: 3,
      opacity: 0,
      rotation: 15,
      stagger: 0.2,
      duration: 0.8
    })

    .to(".idea-6 span", {
      scale: 3,
      opacity: 0,
      rotation: -15,
      stagger: 0.2,
      duration: 0.8
    }, "+=1")

    // Balloons
    .fromTo(".baloons img",
      { opacity: 0.9, y: 1400 },
      { opacity: 1, y: -1000, stagger: 0.2, duration: 2.5 }
    )

    // Character
    .from(".lydia-dp", {
      scale: 3.5,
      opacity: 0,
      x: 25,
      y: -25,
      rotation: -45,
      duration: 0.5
    }, "-=2")

    .from(".hat", {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
      duration: 0.5
    })

    // Birthday text
    .from(".wish-hbd span", {
      opacity: 0,
      y: -50,
      rotation: 150,
      skewX: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)"
    })

    .to(".wish-hbd span", {
      scale: 1,
      rotationY: 0,
      color: "#ff69b4",
      stagger: 0.1,
      duration: 0.7
    }, "party")

    .from(".wish h5", {
      opacity: 0,
      y: 10,
      skewX: -15,
      duration: 0.5
    }, "party")

    // Confetti
    .to(".eight svg", {
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 3,
      repeatDelay: 1.4,
      stagger: 0.3,
      duration: 1.5
    })

    .to(".six", {
      opacity: 0,
      y: 30,
      zIndex: -1,
      duration: 0.5
    })

    .from(".nine p", {
      ...ideaIn,
      stagger: 1.2,
      duration: 1
    })

    .to(".last-smile", {
      rotation: 90,
      duration: 0.5
    }, "+=1");

  // Replay
  document.getElementById("replay")?.addEventListener("click", () => {
    tl.restart();
  });
};

/* ========================
   INIT
======================== */
const fetchData = async () => {
  try {
    const res = await fetch("customize.json");

    if (!res.ok) throw new Error("Missing customize.json");

    const data = await res.json();

    Object.keys(data).forEach(key => {
      const el = document.querySelector(`[data-node-name*="${key}"]`);
      if (!el || !data[key]) return;

      if (key === "imagePath") {
        el.src = data[key];
      } else {
        el.textContent = data[key];
      }
    });

  } catch (err) {
    console.warn("Using default HTML content:", err);
  }

  // ALWAYS run animation
  animationTimeline();
};
