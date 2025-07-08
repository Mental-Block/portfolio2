!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t()
    : "function" == typeof define && define.amd
    ? define(t)
    : t();
})(this, function () {
  "use strict";
  function e(e) {
    var t = !0,
      n = !1,
      i = null,
      s = {
        text: !0,
        search: !0,
        url: !0,
        tel: !0,
        email: !0,
        password: !0,
        number: !0,
        date: !0,
        month: !0,
        week: !0,
        time: !0,
        datetime: !0,
        "datetime-local": !0,
      };
    function o(e) {
      return (
        !!e &&
        e !== document &&
        "HTML" !== e.nodeName &&
        "BODY" !== e.nodeName &&
        "classList" in e &&
        "contains" in e.classList
      );
    }
    function a(e) {
      !e.classList.contains("focus-visible") &&
        (e.classList.add("focus-visible"),
        e.setAttribute("data-focus-visible-added", ""));
    }
    function d(e) {
      t = !1;
    }
    function r() {
      document.addEventListener("mousemove", u),
        document.addEventListener("mousedown", u),
        document.addEventListener("mouseup", u),
        document.addEventListener("pointermove", u),
        document.addEventListener("pointerdown", u),
        document.addEventListener("pointerup", u),
        document.addEventListener("touchmove", u),
        document.addEventListener("touchstart", u),
        document.addEventListener("touchend", u);
    }
    function u(e) {
      (!e.target.nodeName || "html" !== e.target.nodeName.toLowerCase()) &&
        ((t = !1),
        document.removeEventListener("mousemove", u),
        document.removeEventListener("mousedown", u),
        document.removeEventListener("mouseup", u),
        document.removeEventListener("pointermove", u),
        document.removeEventListener("pointerdown", u),
        document.removeEventListener("pointerup", u),
        document.removeEventListener("touchmove", u),
        document.removeEventListener("touchstart", u),
        document.removeEventListener("touchend", u));
    }
    document.addEventListener(
      "keydown",
      function n(i) {
        !i.metaKey &&
          !i.altKey &&
          !i.ctrlKey &&
          (o(e.activeElement) && a(e.activeElement), (t = !0));
      },
      !0
    ),
      document.addEventListener("mousedown", d, !0),
      document.addEventListener("pointerdown", d, !0),
      document.addEventListener("touchstart", d, !0),
      document.addEventListener(
        "visibilitychange",
        function e(i) {
          "hidden" === document.visibilityState && (n && (t = !0), r());
        },
        !0
      ),
      r(),
      e.addEventListener(
        "focus",
        function e(n) {
          var i, d, r;
          o(n.target) &&
            (t ||
              ((d = (i = n.target).type),
              ("INPUT" === (r = i.tagName) && s[d] && !i.readOnly) ||
                ("TEXTAREA" === r && !i.readOnly) ||
                i.isContentEditable)) &&
            a(n.target);
        },
        !0
      ),
      e.addEventListener(
        "blur",
        function e(t) {
          if (o(t.target)) {
            var s;
            (t.target.classList.contains("focus-visible") ||
              t.target.hasAttribute("data-focus-visible-added")) &&
              ((n = !0),
              window.clearTimeout(i),
              (i = window.setTimeout(function () {
                n = !1;
              }, 100)),
              (s = t.target),
              s.hasAttribute("data-focus-visible-added") &&
                (s.classList.remove("focus-visible"),
                s.removeAttribute("data-focus-visible-added")));
          }
        },
        !0
      ),
      e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host
        ? e.host.setAttribute("data-js-focus-visible", "")
        : e.nodeType === Node.DOCUMENT_NODE &&
          (document.documentElement.classList.add("js-focus-visible"),
          document.documentElement.setAttribute("data-js-focus-visible", ""));
  }
  if ("undefined" != typeof window && "undefined" != typeof document) {
    var t;
    window.applyFocusVisiblePolyfill = e;
    try {
      t = new CustomEvent("focus-visible-polyfill-ready");
    } catch (n) {
      (t = document.createEvent("CustomEvent")).initCustomEvent(
        "focus-visible-polyfill-ready",
        !1,
        !1,
        {}
      );
    }
    window.dispatchEvent(t);
  }
  "undefined" != typeof document && e(document);
});
