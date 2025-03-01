/* 
  TODO: 

  - move burger out of "main" exicution path into navigation func
  - move navigation out of "main" exicution path into navigation func
  - refactor animation hook

*/

(() => {
  const { responsive } = utilites();
  const { ATTR, SCREEN_SIZE, EVENT } = constants();
  const { appendArrow, removeArrow, appendBoxArrow, removeBoxArrow } =
    ShootingStarAnimation();

  const headerArrow = Array.from(
    document.querySelectorAll(`[${ATTR.dataArrow}]`)
  );

  const cleanupEventListenersArray = navigation();
  homeAnimation();
  aboutAnimation();

  const projectsTitle = document.querySelector(
    `#projects ~ div[data-scroll-fix] .h1`
  );

  const setup = {
    to: () => {
      removeArrow(projectsTitle);
      appendBoxArrow(projectsTitle); // appendBoxArrow must be after removeArrow or BOM can't find element
    },
    from: () => {
      appendArrow(projectsTitle);
      removeBoxArrow(projectsTitle); // appendBoxArrow must be after appendArrow or BOM can't find element
    },
  };

  const cleanup = responsive(SCREEN_SIZE.mobileToDesktop, setup, setup);

  headerArrow.forEach((el) => appendArrow(el));

  //cleanEventListenersArray.forEach((cleanupfunc) => cleanupfunc());
})();

function utilites() {
  const getHTMLElementBoxHeight = (htmlElement) => {
    return htmlElement.getBoundingClientRect().height;
  };

  const memoStore = () => {
    let store = {
      sum: 0,
    };

    return function (num = 0) {
      store.sum += num;
      return store.sum;
    };
  };

  const responsive = (query, initialSetup, changeSetup) => {
    const screen = window.matchMedia(query);
    const { EVENT } = constants();

    if (screen.matches) {
      initialSetup.from();
    } else {
      initialSetup.to();
    }

    const cleanup = () => {
      if (screen.matches) {
        changeSetup.from();
      } else {
        changeSetup.to();
      }
    };

    screen.addEventListener(EVENT.change, cleanup);

    return () => screen.removeEventListener(EVENT.change, cleanup);
  };

  return {
    memoStore,
    getHTMLElementBoxHeight,
    responsive,
  };
}

function constants() {
  const style = window.getComputedStyle(document.body);

  const COLOR = {
    0: style.getPropertyValue("--blue"),
    1: style.getPropertyValue("--orange"),
    2: style.getPropertyValue("--green"),
    3: style.getPropertyValue("--purple"),
  };

  const CLASSNAME = {
    navLinkActive: "nav-link-active",
    hidden: "hidden",
    burgerFocus: "nav-burger-focus",
    burgerLineAnimation: "burger-line-animation",
    burgerLineAnimation1: "burger-line-animation-1",
    animationFadeOut: "animation-fade-out",
    animationFadeIn: "animation-fade-in",
  };

  const SCREEN_SIZE = {
    mobileToDesktop: "(width < 48em)",
    desktopToLargeDeskTop: "(width < 90em)",
  };

  const EVENT = {
    click: "click",
    keydown: "keydown",
    scroll: "scroll",
    change: "change",
  };

  const HTML_POSITION = {
    afterBegin: "afterbegin",
  };

  const ATTR = {
    inert: "inert",
    airaExpanded: "aria-expanded",
    dataScrollFix: "data-scroll-fix",
    dataArrow: "data-arrow",
    dataBoxArrow: "data-box-arrow",
    dataHomeAnimation: "data-home-animation",
  };

  return {
    EVENT,
    CLASSNAME,
    COLOR,
    ATTR,
    HTML_POSITION,
    SCREEN_SIZE,
  };
}

function ShootingStarAnimation() {
  const { COLOR, ATTR } = constants();

  const getColor = (key) => {
    if (key < 0 || key > Object.keys(COLOR).length - 1) {
      throw `number not in object. range [0-${Object.keys(COLOR).length - 1}]`;
    }

    let num = key == null ? Math.floor(Math.random() * 4).toString() : key;

    return COLOR[num];
  };

  const getRandomSpeed = () => {
    return Math.floor(Math.random() * 10 + 5).toString();
  };

  const getRandomY = () => {
    let height = window.innerHeight;
    return Math.floor(Math.random() * height);
  };

  const getRandomX = () => {
    let width = window.innerWidth;
    return Math.floor(Math.random() * width);
  };

  const arrowStyleStore = (overideStyle) => {
    return {
      position: {
        value: 0,
        measurement: "px",
      },
      positionTwo: {
        value: 0,
        measurement: "px",
      },
      speed: {
        value: getRandomSpeed(),
        measurement: "s",
      },
      delay: {
        value: 0,
        measurement: "s",
      },
      color: getColor(),
      ...overideStyle,
    };
  };

  const leftArrow = (overideStyle) => {
    const style = arrowStyleStore(overideStyle);

    return `<span class="arrow-random-x" style='top:${
      style.position.value + style.position.measurement
    }; bottom:${style.positionTwo.value + style.positionTwo.value};'>
        <span class="arrow-left" style=' background: linear-gradient(270deg, transparent, ${
          style.color
        }); animation: leftArrow ${
      style.speed.value + style.speed.measurement
    } linear infinite; animation-delay:${
      style.delay.value + style.delay.measurement
    };'></span>
      </span>`;
  };

  const downArrow = (overideStyle) => {
    const style = arrowStyleStore(overideStyle);

    return `<span class="arrow-random-y" style='right:${
      style.position.value + style.position.measurement
    }; left:${style.positionTwo.value + style.positionTwo.value};'>
        <span class="arrow-down" style='background: linear-gradient(180deg, transparent, ${
          style.color
        }); animation: downArrow ${
      style.speed.value + style.speed.measurement
    } linear infinite; animation-delay:${
      style.delay.value + style.delay.measurement
    };'></span>
      </span>`;
  };

  const rightArrow = (overideStyle) => {
    const style = arrowStyleStore(overideStyle);

    return `<span class="arrow-random-x" style='top:${
      style.position.value + style.position.measurement
    }; bottom:${style.positionTwo.value + style.positionTwo.value};'>
        <span class="arrow-right" style='background: linear-gradient(90deg, transparent, ${
          style.color
        }); animation: rightArrow ${
      style.speed.value + style.speed.measurement
    } linear infinite; animation-delay:${
      style.delay.value + style.delay.measurement
    };'></span>
      </span>`;
  };

  const upArrow = (overideStyle) => {
    const style = arrowStyleStore(overideStyle);

    return `<span class="arrow-random-y" style='right:${
      style.position.value + style.position.measurement
    }; left:${style.positionTwo.value + style.positionTwo.value};'>
        <span class="arrow-up" style='background: linear-gradient(360deg, transparent, ${
          style.color
        }); animation: upArrow ${
      style.speed.value + style.speed.measurement
    } linear infinite; animation-delay:${
      style.delay.value + style.delay.measurement
    };'></span>
      </span>`;
  };

  function appendArrow(el) {
    el.setAttribute(ATTR.dataArrow, "");
    let span = el.appendChild(document.createElement("span"));

    span.innerHTML = leftArrow({
      position: {
        value: 0,
        measurement: "px",
      },
      positionTwo: {
        value: 0,
        measurement: "px",
      },
      speed: {
        value: 4,
        measurement: "S",
      },
      color: getColor(0),
    });
  }

  function removeArrow(el) {
    if (el.children[0] != null) {
      el.children[0].remove();
      el.removeAttribute(ATTR.dataArrow, "");
    }
  }

  function appendBoxArrow(el) {
    el.setAttribute(ATTR.dataBoxArrow, "");
    let span = document.createElement("span");

    const animationBox = [
      leftArrow({
        position: {
          value: 0,
          measurement: "rem",
        },
        positionTwo: {
          value: 0,
          measurement: "rem",
        },
        speed: {
          value: 4,
          measurement: "s",
        },
        color: getColor(0),
      }),
      upArrow({
        position: {
          value: 0,
          measurement: "rem",
        },
        positionTwo: {
          value: 0,
          measurement: "rem",
        },
        speed: {
          value: 4,
          measurement: "s",
        },

        delay: {
          value: 1,
          measurement: "s",
        },
        color: getColor(0),
      }),
      rightArrow({
        position: {
          value: 0,
          measurement: "rem",
        },
        positionTwo: {
          value: 0,
          measurement: "rem",
        },
        speed: {
          value: 4,
          measurement: "s",
        },
        delay: {
          value: 2,
          measurement: "s",
        },
        color: getColor(0),
      }),
      downArrow({
        position: {
          value: 0,
          measurement: "rem",
        },
        positionTwo: {
          value: 0,
          measurement: "rem",
        },
        speed: {
          value: 4,
          measurement: "s",
        },
        delay: {
          value: 3,
          measurement: "s",
        },
        color: getColor(0),
      }),

      leftArrow({
        position: {
          value: 0,
          measurement: "rem",
        },
        positionTwo: {
          value: 0,
          measurement: "rem",
        },
        speed: {
          value: 4,
          measurement: "s",
        },
        delay: {
          value: 2,
          measurement: "s",
        },
        color: getColor(0),
      }),
      upArrow({
        position: {
          value: 0,
          measurement: "rem",
        },
        positionTwo: {
          value: 0,
          measurement: "rem",
        },
        speed: {
          value: 4,
          measurement: "s",
        },
        delay: {
          value: 3,
          measurement: "s",
        },
        color: getColor(0),
      }),
      rightArrow({
        position: {
          value: 0,
          measurement: "rem",
        },
        positionTwo: {
          value: 0,
          measurement: "rem",
        },
        speed: {
          value: 4,
          measurement: "s",
        },
        delay: {
          value: 4,
          measurement: "s",
        },
        color: getColor(0),
      }),
      downArrow({
        position: {
          value: 0,
          measurement: "rem",
        },
        positionTwo: {
          value: 0,
          measurement: "rem",
        },
        speed: {
          value: 4,
          measurement: "s",
        },
        delay: {
          value: 5,
          measurement: "s",
        },
        color: getColor(0),
      }),
    ];

    span.innerHTML = animationBox.reduce((prev, cur) => cur + prev, "");

    el.appendChild(span);
  }

  function removeBoxArrow(el) {
    if (el.children[0] != null) {
      el.children[0].remove();
      el.removeAttribute(ATTR.dataBoxArrow);
    }
  }

  return {
    arrowStyleStore,
    getRandomX,
    getRandomY,
    getRandomSpeed,
    getColor,
    leftArrow,
    upArrow,
    rightArrow,
    downArrow,
    appendArrow,
    removeArrow,
    appendBoxArrow,
    removeBoxArrow,
  };
}

function navigation() {
  const { responsive } = utilites();
  const { EVENT, CLASSNAME, ATTR, SCREEN_SIZE } = constants();

  const menu = document.getElementById("menu");
  const burgerLine = Array.from(document.querySelectorAll("#burger div"));
  const scrollFixIds = Array.from(
    document.querySelectorAll(`div[${ATTR.dataScrollFix}]`)
  );
  const nav = document.querySelector("nav.nav");
  const navLinks = Array.from(document.querySelectorAll("a.nav-link"));

  let isClickDone = true;

  function __interalDebounce__() {
    const TIME_MS = 2000;

    setTimeout(() => {
      isClickDone = true;
    }, TIME_MS);
  }

  function onNav(e) {
    isClickDone = false;

    navLinks.forEach((a) => {
      a.classList.remove(CLASSNAME.navLinkActive);
    });

    e.target.classList.add(CLASSNAME.navLinkActive);

    __interalDebounce__();
  }

  navLinks.forEach((el) => {
    el.addEventListener(EVENT.click, onNav);
  });

  const burger = (onBurger) => {
    const { EVENT } = constants();
    const burger = document.getElementById("burger");

    const cleanUp = (e) => {
      e.preventDefault();

      onBurger();

      burger.focus();
    };

    burger.addEventListener(EVENT.click, cleanUp);

    return () => burger.removeEventListener(EVENT.click, cleanUp);
  };

  const scoll = () => {
    const { getHTMLElementBoxHeight, memoStore } = utilites();

    /* 
        NAVIGATION_BAR_HEIGHT is needed as CSS position:fixed; takes 0px
        in the DOM but is rendered so we need to subtract px so the hrefs match up 
        with the id's as I used a <div> on the first off and not <StyledScrollIdFix>
      */

    const START_HEIGHT = 0; // the height of the DOM when user first loads since we use
    const PAGE_REFRESH_MARGIN = 5; /* you want -5 so it hits passed on page refresh */

    const sectionHeights = [
      START_HEIGHT,
      ...scrollFixIds.map(
        (id, index) =>
          (index = 1
            ? getHTMLElementBoxHeight(id) -
              getHTMLElementBoxHeight(nav) -
              PAGE_REFRESH_MARGIN
            : getHTMLElementBoxHeight(id))
      ),
    ];

    function cleanUp(e) {
      e.preventDefault();

      if (isClickDone === false) return;

      let SCROLL_Y = window.scrollY;
      let newHeight = memoStore();
      let oldHeight = memoStore();

      for (let index = 0; index < navLinks.length; index++) {
        let bottomHeight = oldHeight(sectionHeights[index]);
        let topHeight = newHeight(sectionHeights[index + 1]);

        if (SCROLL_Y >= bottomHeight && SCROLL_Y <= topHeight) {
          if (!navLinks[index].classList.contains(CLASSNAME.navLinkActive)) {
            navLinks.map((link) =>
              link.classList.remove(CLASSNAME.navLinkActive)
            );
          }

          navLinks[index].classList.add(CLASSNAME.navLinkActive);
        }
      }
    }

    window.addEventListener(EVENT.scroll, cleanUp);

    return () => window.removeEventListener(EVENT.scroll, cleanUp);
  };

  const responsiveCleanUp = responsive(
    SCREEN_SIZE.mobileToDesktop,
    {
      from: () => {
        menu.setAttribute(ATTR.inert, "");
        menu.classList.add(CLASSNAME.hidden);
      },
      to: () => {
        menu.classList.remove(CLASSNAME.hidden);
        menu.removeAttribute(ATTR.inert, "");
      },
    },
    {
      from: () => {
        menu.setAttribute(ATTR.inert, "");
        menu.classList.add(CLASSNAME.hidden);
        menu.classList.add(CLASSNAME.animationFadeOut);

        // if menu is close but animation still shows on screen change
        burgerLine[0].classList.remove(CLASSNAME.burgerLineAnimation);
        burgerLine[1].classList.remove(CLASSNAME.hidden);
        burgerLine[2].classList.remove(CLASSNAME.burgerLineAnimation1);
      },
      to: () => {
        menu.classList.remove(CLASSNAME.hidden);
        menu.removeAttribute(ATTR.inert, "");
        menu.classList.remove(CLASSNAME.animationFadeOut);
        menu.classList.remove(CLASSNAME.animationFadeIn);
      },
    }
  );

  const burgerCleanUp = burger(() => {
    if (menu.classList.contains(CLASSNAME.hidden)) {
      menu.classList.remove(CLASSNAME.hidden);
    }

    if (menu.classList.contains(CLASSNAME.animationFadeIn)) {
      menu.classList.remove(CLASSNAME.animationFadeIn);
      menu.classList.add(CLASSNAME.animationFadeOut);
    } else {
      menu.classList.remove(CLASSNAME.animationFadeOut);
      menu.classList.add(CLASSNAME.animationFadeIn);
    }

    burgerLine[0].classList.toggle(CLASSNAME.burgerLineAnimation);
    burgerLine[1].classList.toggle(CLASSNAME.hidden);
    burgerLine[2].classList.toggle(CLASSNAME.burgerLineAnimation1);

    menu.toggleAttribute(ATTR.inert);
    menu.toggleAttribute(ATTR.airaExpanded);
  });

  const navLinkCleanup = () =>
    navLinks.forEach((el) => el.removeEventListener(EVENT.click, onNav));

  const scrollCleanup = scoll();

  return [responsiveCleanUp, burgerCleanUp, navLinkCleanup, scrollCleanup];
}

function aboutAnimation() {
  const { SCREEN_SIZE } = constants();
  const { responsive } = utilites();
  const { downArrow, leftArrow, rightArrow, getColor } =
    ShootingStarAnimation();

  const rowLeftArrow = document.querySelector("[data-glowing-row-arrow-left]");
  const rowRightArrow = document.querySelector(
    "[data-glowing-row-arrow-right]"
  );
  const columnArrow = document.querySelector("[data-glowing-column-arrow]");

  const setupTwo = {
    to: () => {
      rowRightArrow.innerHTML = rightArrow({
        position: {
          value: 1.25,
          measurement: "rem",
        },
        positionTwo: {
          value: 1.25,
          measurement: "rem",
        },
        speed: {
          value: 10,
          measurement: "s",
        },
        delay: {
          value: 4900,
          measurement: "ms",
        },
        color: getColor(0),
      });

      columnArrow.innerHTML = downArrow({
        position: {
          value: 1.25,
          measurement: "rem",
        },
        positionTwo: {
          value: 1.25,
          measurement: "rem",
        },
        speed: {
          value: 10,
          measurement: "s",
        },
        delay: {
          value: 2500,
          measurement: "ms",
        },
        color: getColor(0),
      });

      rowLeftArrow.innerHTML = leftArrow({
        position: {
          value: 1.25,
          measurement: "rem",
        },
        positionTwo: {
          value: 1.25,
          measurement: "rem",
        },
        speed: {
          value: 10,
          measurement: "s",
        },

        color: getColor(0),
      });
    },
    from: () => {
      rowRightArrow.innerHTML = rightArrow({
        position: {
          value: 1,
          measurement: "rem",
        },
        positionTwo: {
          value: 1,
          measurement: "rem",
        },
        speed: {
          value: 10,
          measurement: "s",
        },
        delay: {
          value: 4900,
          measurement: "ms",
        },
        color: getColor(0),
      });

      columnArrow.innerHTML = downArrow({
        position: {
          value: 1,
          measurement: "rem",
        },
        positionTwo: {
          value: 1,
          measurement: "rem",
        },
        speed: {
          value: 10,
          measurement: "s",
        },
        delay: {
          value: 2500,
          measurement: "ms",
        },
        color: getColor(0),
      });

      rowLeftArrow.innerHTML = leftArrow({
        position: {
          value: 1,
          measurement: "rem",
        },
        positionTwo: {
          value: 1,
          measurement: "rem",
        },
        speed: {
          value: 10,
          measurement: "s",
        },
        color: getColor(0),
      });
    },
  };

  responsive(SCREEN_SIZE.desktopToLargeDeskTop, setupTwo, setupTwo);
}

function homeAnimation() {
  const { HTML_POSITION, ATTR } = constants();
  const { downArrow, upArrow, leftArrow, rightArrow, getRandomY, getRandomX } =
    ShootingStarAnimation();

  const homeAnimationEleRef = document.querySelector(
    `[${ATTR.dataHomeAnimation}]`
  );

  if (homeAnimationEleRef != null) {
    const animationSequence = [
      leftArrow({
        position: {
          value: getRandomY(),
          measurement: "px",
        },
        positionTwo: {
          value: getRandomY(),
          measurement: "px",
        },
      }),
      leftArrow({
        position: {
          value: getRandomY(),
          measurement: "px",
        },
        positionTwo: {
          value: getRandomY(),
          measurement: "px",
        },
      }),

      rightArrow({
        position: {
          value: getRandomY(),
          measurement: "px",
        },
        positionTwo: {
          value: getRandomY(),
          measurement: "px",
        },
      }),
      rightArrow({
        position: {
          value: getRandomY(),
          measurement: "px",
        },
        positionTwo: {
          value: getRandomY(),
          measurement: "px",
        },
      }),
      downArrow({
        position: {
          value: getRandomX(),
          measurement: "px",
        },
        positionTwo: {
          value: getRandomX(),
          measurement: "px",
        },
      }),
      downArrow({
        position: {
          value: getRandomX(),
          measurement: "px",
        },
        positionTwo: {
          value: getRandomX(),
          measurement: "px",
        },
      }),
      upArrow({
        position: {
          value: getRandomX(),
          measurement: "px",
        },
        positionTwo: {
          value: getRandomX(),
          measurement: "px",
        },
      }),
      upArrow({
        position: {
          value: getRandomX(),
          measurement: "px",
        },
        positionTwo: {
          value: getRandomX(),
          measurement: "px",
        },
      }),
    ];

    animationSequence.forEach((animation) => {
      homeAnimationEleRef.insertAdjacentHTML(
        HTML_POSITION.afterBegin,
        animation
      );
    });
  }
}
