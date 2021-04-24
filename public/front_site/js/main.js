!(function (e) {
  var t = {};
  function n(a) {
    if (t[a]) return t[a].exports;
    var i = (t[a] = { i: a, l: !1, exports: {} });
    return e[a].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, a) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (
        (n.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            a,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return a;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = "/"),
    n((n.s = 0));
})({
  "+lRy": function (e, t) {},
  0: function (e, t, n) {
    n("JO1w"), n("+lRy"), (e.exports = n("BLqG"));
  },
  "3Xa9": function (e, t) {
    var n;
    (n = function () {
      var e = this,
        t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
        n = arguments.length > 1 ? arguments[1] : void 0,
        a = n || {},
        i = a.timeout,
        o = void 0 === i ? -1 : i,
        s = a.leave,
        r = void 0 === s || s,
        c = a.leaveTimeout,
        l = void 0 === c ? 600 : c;
      if (t)
        (this.futureActiveState = !0),
          o < 0
            ? (this.classList.remove("leave"), this.classList.add("active"))
            : setTimeout(function () {
                e.futureActiveState &&
                  (e.classList.remove("leave"), e.classList.add("active"));
              }, o);
      else {
        this.futureActiveState = !1;
        var d = u.bind(this);
        o < 0
          ? d()
          : setTimeout(function () {
              !1 === e.futureActiveState && d();
            }, o);
      }
      function u() {
        var e = this;
        this.classList.contains("active") &&
          (this.classList.remove("active"),
          r &&
            (this.classList.add("leave"),
            setTimeout(function () {
              e.classList.remove("leave");
            }, l)));
      }
    }),
      (HTMLElement.prototype.addActive = function (e) {
        n.bind(this)(!0, e);
      }),
      (HTMLElement.prototype.removeActive = function (e) {
        n.bind(this)(!1, e);
      });
  },
  BLqG: function (e, t) {},
  JO1w: function (e, t, n) {
    "use strict";
    n.r(t);
    n("3Xa9");
    function a(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var a = t[n];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(e, a.key, a);
      }
    }
    function o(e, t, n) {
      return t && i(e.prototype, t), n && i(e, n), e;
    }
    document.elementsFromPoint ||
      (document.elementsFromPoint = document.msElementsFromPoint);
    var s = !1,
      r = !1,
      c = !1,
      l = { x: 0, y: 0 };
    function d() {
      if ("IntersectionObserver" in window) {
        lozad("[data-lazy]", {
          threshold: 0.01,
          marginRoot: "100px 0",
        }).observe();
        var e = document.querySelectorAll("[data-play-toggle]"),
          t = new IntersectionObserver(
            function (e, t) {
              e.forEach(function (e) {
                var t = document.querySelector(
                  "#" + e.target.id + " .swiper-container"
                ).swiper;
                e.intersectionRatio > 0
                  ? t.autoplay.start()
                  : t.autoplay.stop();
              });
            },
            { threshold: 0, rootMargin: "0px" }
          );
        e.forEach(function (e) {
          t.observe(e);
        });
        var n = document.querySelectorAll("[data-aos]"),
          a = new IntersectionObserver(
            function (e, t) {
              e.forEach(function (e) {
                if (e.intersectionRatio > 0) {
                  var n = e.target,
                    a = n.dataset.aosDelay,
                    i = n.dataset.aosDelayPhone,
                    o = window.innerWidth < 768;
                  a && !o
                    ? setTimeout(function () {
                        n.classList.add("aos-animate");
                      }, a)
                    : i && o
                    ? setTimeout(function () {
                        n.classList.add("aos-animate");
                      }, i)
                    : a && o
                    ? setTimeout(function () {
                        n.classList.add("aos-animate");
                      }, a)
                    : n.classList.add("aos-animate"),
                    t.unobserve(e.target);
                }
              });
            },
            { threshold: 0.1 }
          );
        n.forEach(function (e) {
          a.observe(e);
        }),
          document.querySelectorAll("[data-aos-onload]").forEach(function (e) {
            e.dataset.aosDelay
              ? setTimeout(function () {
                  e.classList.add("aos-animate");
                }, e.dataset.aosDelay)
              : e.classList.add("aos-animate");
          });
        document.querySelectorAll(".section"),
          (function () {
            for (var e = [], t = 1; t <= 20; t++) {
              var n = t / 20;
              e.push(n);
            }
            e.push(0);
          })();
      } else {
        !(function () {
          if ("function" == typeof NodeList.prototype.forEach) return !1;
          NodeList.prototype.forEach = Array.prototype.forEach;
        })(),
          $("[data-src]").each(function () {
            var e = $(this),
              t = e.attr("data-src");
            e.attr("src", t);
          }),
          $("[data-aos]").each(function () {
            $(this).addClass("aos-animate");
          }),
          document.querySelectorAll("[data-aos]").forEach(function (e) {
            e.classList.add("aos-animate");
          });
      }
    }
    function u(e, t) {
      document.querySelectorAll(e).forEach(function (e) {
        e.classList.remove(t);
      });
    }
    function p() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 600;
      $("body").addClass("menu-leave"),
        $(window).off("scroll"),
        setTimeout(function () {
          $("body").removeClass("menu-leave");
        }, e),
        $("body").removeClass("menu-active");
    }
    window.addEventListener("mousemove", function (e) {
      (l.x = e.clientX), (l.y = e.clientY);
    }),
      document.addEventListener("pjax:success", d),
      document.addEventListener(
        "click",
        function (e) {
          var t = $(".menu--wrapper, #bt-menu, [data-modal],.modal");
          t.is(e.target) ||
            0 !== t.has(e.target).length ||
            ($("body").hasClass("menu-active")
              ? ($("body").addClass("menu-leave"),
                setTimeout(function () {
                  $("body").removeClass("menu-leave");
                }, 600),
                $("body").removeClass("menu-active"),
                $(window).off("scroll"))
              : $("body").hasClass("modal-active") && modalClose());
        },
        !1
      ),
      $("#bt-menu").click(function () {
        $("body").hasClass("menu-active")
          ? p()
          : (function () {
              $(".mapa--marker").removeClass("active"),
                $(".menu--list li a").removeClass("active"),
                $("." + $(".wrapper").attr("id") + "--marker").addClass(
                  "active"
                ),
                $("." + $(".wrapper").attr("id") + "--menu").addClass("active"),
                $("body").addClass("menu-active");
              var e = $(window).scrollTop();
              $(window).scroll(function () {
                $(window).scrollTop(e);
              });
            })();
      }),
      $("[data-menu-close]").click(function () {
        p();
      });
    var f, v, m, h, w, y;
    new Pjax({
      elements: "a[data-pjax]",
      selectors: ["title", "#scripts", ".wrapper"],
      cacheBust: !1,
      maxCacheLength: 20,
      timeout: 0,
      scrollTo: 0,
      switches: {
        ".wrapper": function (e, t, n) {
          var a = this;
          setTimeout(
            function () {
              (e.outerHTML = t.outerHTML), a.onSwitch();
            },
            350,
            a,
            e,
            t
          );
        },
      },
    });
    // if (VARS.analytics) {
    //   (f = window),
    //     (v = document),
    //     (m = "script"),
    //     (h = "ga"),
    //     (f.GoogleAnalyticsObject = h),
    //     (f.ga =
    //       f.ga ||
    //       function () {
    //         (f.ga.q = f.ga.q || []).push(arguments);
    //       }),
    //     (f.ga.l = 1 * new Date()),
    //     (w = v.createElement(m)),
    //     (y = v.getElementsByTagName(m)[0]),
    //     (w.async = 1),
    //     (w.src = "https://www.google-analytics.com/analytics.js"),
    //     y.parentNode.insertBefore(w, y),
    //     ga("create", VARS.analytics, "auto"),
    //     ga("send", "pageview"),
    //     document.addEventListener("pjax:end", function () {
    //       ga("set", "location", window.location.href), ga("send", "pageview");
    //     });
    // }
    var g = 0,
      b = !1,
      E = $("img.preload").length;
    function L() {
      ++g == E && S();
    }
    function S() {
      b = !0;
    }
    0 == E && S(),
      document.querySelectorAll("img.preload").forEach(function (e) {
        var t = new Image();
        (t.onload = function () {
          L();
        }),
          (t.onerror = function () {
            L();
          }),
          (t.onAbort = function () {
            L();
          }),
          (t.src = e.dataset.src ? e.dataset.src : e.src),
          (t.srcset = e.dataset.srcset ? e.dataset.srcset : e.srcset),
          (e.src = e.dataset.src ? e.dataset.src : e.src),
          (e.srcset = e.dataset.srcset ? e.dataset.srcset : e.srcset),
          e.removeAttribute("data-lazy"),
          (e.dataset.loaded = !0),
          (e.parentElement.dataset.loaded = !0);
      });
    var A = new CustomEvent("loaderdone"),
      k = document.getElementById("loading-animation");
    function x() {
      if (document.querySelector(".btn-clientes")) {
        var e = document.querySelector(".btn-clientes"),
          t = document.querySelector(".btn-clientes-voltar"),
          n = document.querySelector(".section-clientes-2");
        e.addEventListener("click", function () {
          return n.classList.add("active");
        }),
          t.addEventListener("click", function () {
            n.classList.remove("active"),
              n.classList.add("leave"),
              setTimeout(function () {
                n.classList.remove("leave");
              }, 600);
          });
      }
      if (
        ((document.body.dataset.pg = $(".wrapper").attr("id")),
        $(".wrapper").removeClass("page-leave-active"),
        $("[data-fancybox]").fancybox({
          transitionEffect: "fade",
          animationEffect: "none",
          animationDuration: 800,
          transitionDuration: 366,
          hash: !1,
          infobar: !1,
          toolbar: "auto",
          buttons: ["close"],
          image: { animationEffect: "slide" },
          youtube: { controls: 0, showinfo: 0 },
          vimeo: { color: "f00" },
          iframe: { preload: !0 },
          spinnerTpl: "",
          beforeLoad: function (e, t) {},
          afterLoad: function (e, t) {},
        }),
        $("[data-hover]").hover(function () {
          var e = "#" + $(this).attr("data-hover");
          $("#menu--mapa .mapa--marker").removeClass("active"),
            $("#menu--mapa " + e).addClass("active");
        }),
        document.getElementById("pg-home"))
      )
        new Swiper("#fullbanner .swiper-container", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: !0,
          speed: 1e3,
          effect: "fade",
          watchSlidesProgress: !0,
          watchVisibility: !0,
          fadeEffect: { crossFade: !1 },
          autoHeight: !1,
          pagination: { el: "#fullbanner .swiper-pagination", clickable: !0 },
          navigation: {
            nextEl: "#fullbanner .swiper-button-next",
            prevEl: "#fullbanner .swiper-button-prev",
          },
          loopFillGroupWithBlank: !1,
          centerInsufficientSlides: !0,
          grabCursor: !1,
          observer: !0,
          preloadImages: !1,
          lazy: !0,
          watchOverflow: !0,
          breakpoints: {
            767: { slidesPerView: 1, slidesPerGroup: 1 },
            1025: { slidesPerView: 1, slidesPerGroup: 1 },
          },
          on: {
            init: function () {
              var e = this;
              setTimeout(function () {
                e.autoplay.running ||
                  ((e.params.autoplay = {
                    delay: 3e3,
                    disableOnInteraction: !1,
                  }),
                  e.autoplay.start());
              }, 1e3);
            },
          },
        });
      if (
        (document.getElementById("pg-sobre") &&
          $(".split").splitLines({
            tag: '<div class="wrapper-mask-reverse"><span>',
          }),
        document.getElementById("pg-portfolio") &&
          ($(".split1").splitLines({
            tag: '<div class="wrapper-mask-reverse"><span>',
          }),
          $(".split2").splitLines({
            tag: '<div class="wrapper-mask-reverse"><span>',
          }),
          $(".split3").splitLines({
            tag: '<div class="wrapper-mask-reverse"><span>',
          })),
        document.getElementById("pg-projetos"))
      ) {
        var a = function () {
          document.querySelectorAll(".swiper-slide").forEach(function (e) {
            setTimeout(function () {
              e.style.pointerEvents = "auto";
            }, 800);
          });
        };
        $(".split").splitLines({
          tag: '<div class="wrapper-mask-reverse"><span>',
        });
        var i = new Swiper("#carousel .swiper-container", {
          slidesPerView: 1.1,
          spaceBetween: 10,
          slidesPerGroup: 1,
          loop: !1,
          speed: 400,
          effect: "slide",
          updateOnWindowResize: !0,
          autoHeight: !1,
          pagination: { el: "#carousel .swiper-pagination", clickable: !0 },
          navigation: {
            nextEl: "#carousel .swiper-button-next",
            prevEl: "#carousel .swiper-button-prev",
          },
          loopFillGroupWithBlank: !1,
          centerInsufficientSlides: !1,
          grabCursor: !1,
          keyboard: { enabled: !0 },
          preloadImages: !0,
          lazy: !1,
          breakpoints: {
            767: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 60 },
            1025: { slidesPerView: "auto", slidesPerGroup: 1, spaceBetween: 0 },
          },
        });
        document.querySelectorAll(".swiper-slide").forEach(function (e) {
          e.style.pointerEvents = "none";
        }),
          c ? a() : document.addEventListener("loaderdone", a, { once: !0 });
        var o = performance.now();
        document.querySelector("#carousel .swiper-container").addEventListener(
          "wheel",
          function (e) {
            e.preventDefault(),
              e.deltaY > 0 &&
                performance.now() > o + 450 &&
                (i.slideNext(), (o = performance.now())),
              e.deltaY < 0 &&
                performance.now() > o + 450 &&
                (i.slidePrev(), (o = performance.now()));
          },
          { passive: !1 }
        );
      }
      if (document.getElementById("pg-projeto")) {
        $(".split").splitLines({
          tag: '<div class="wrapper-mask-reverse"><span>',
        }),
          (function () {
            var e = document.querySelectorAll("#slides .swiper-slide").length,
              t = document.querySelector("#slides .swiper-container"),
              n = { x: 0, y: 0 },
              a = e + 1,
              i = !1;
            function o() {
              var e = t.getBoundingClientRect();
              (n.x = e.x + (window.innerWidth > 1900 ? 150 : 0.24 * e.width)),
                (n.y = e.y + e.height / 2);
            }
            window.addEventListener("resize", o),
              window.addEventListener("scroll", o, { passive: !0 }),
              o();
            var s = new Swiper("#slides .swiper-container", {
              spaceBetween: 0,
              slidesPerView: "auto",
              loop: e > 1,
              speed: 400,
              direction: "horizontal",
              loopedSlides: e,
              touchRatio: 1,
              grabCursor: !0,
              slideToClickedSlide: !1,
              initialSlide: 0,
              shortSwipes: !0,
              resistanceRatio: 0.1,
              simulateTouch: !0,
              observer: !0,
              keyboard: { enabled: !0 },
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              on: { touchMove: c, transitionEnd: c },
            });
            document
              .querySelector("#slides .swiper-container")
              .addEventListener(
                "wheel",
                function (e) {
                  e.preventDefault(),
                    e.deltaY > 0 && s.slideNext(),
                    e.deltaY < 0 && s.slidePrev();
                },
                { passive: !1 }
              );
            var r = new Swiper("#first-slide .swiper-container", {
              spaceBetween: 5,
              slidesPerView: 1.1,
              slidesPerColumn: 1,
              speed: 400,
              slidesPerColumnFill: "column",
              loop: e > 1,
              loopedSlides: e,
              preloadImages: !1,
              longSwipes: !0,
              on: {},
              breakpoints: {
                1025: { slidesPerView: 1, spaceBetween: 0, allowTouchMove: !1 },
              },
            });
            function c() {
              i ||
                ((i = !0),
                setTimeout(function () {
                  (i = !1),
                    document.elementsFromPoint(n.x, n.y).forEach(function (t) {
                      var n = Number.parseInt(t.dataset.swiperSlideIndex) + e;
                      n &&
                        n !== a &&
                        (n === e && a === 2 * e - 1 && r.slideTo(e - 1, 0),
                        n === 2 * e - 1 && a === e && r.slideTo(2 * e, 0),
                        setTimeout(function () {
                          r.slideTo(n);
                        }, 15),
                        (a = n));
                    });
                }, 60));
            }
            document
              .querySelector("#slides .swiper-button-next")
              .addEventListener("click", function () {
                for (var e = 0; e <= 200; e += 50) setTimeout(c, e);
              }),
              document
                .querySelector("#slides .swiper-button-prev")
                .addEventListener("click", function () {
                  for (var e = 0; e <= 200; e += 50) setTimeout(c, e);
                });
          })();
      }
      if (document.getElementById("pg-servicos")) {
        $(".split1").splitLines({
          tag: '<div class="wrapper-mask-reverse"><span>',
        }),
          $(".split2").splitLines({
            tag: '<div class="wrapper-mask-reverse"><span>',
          }),
          $(".split3").splitLines({
            tag: '<div class="wrapper-mask-reverse"><span>',
          }),
          $(".split4").splitLines({
            tag: '<div class="wrapper-mask-reverse"><span>',
          });
        var s = [];
        s.push(
          new Swiper("#galeria-servicos-01 .swiper-container", {
            loop: !0,
            speed: 900,
            effect: "slide",
            lazy: !0,
            fadeEffect: { crossFade: !1 },
            autoplay: { delay: 5e3, disableOnInteraction: !1 },
            navigation: {
              nextEl: "#galeria-servicos-01 .swiper-button-next",
              prevEl: "#galeria-servicos-01 .swiper-button-prev",
            },
            pagination: {
              el: "#galeria-servicos-01 .swiper-pagination",
              type: "fraction",
            },
            breakpoints: { 1e3: { fadeEffect: { crossFade: !0 } } },
          })
        ),
          s.push(
            new Swiper("#galeria-servicos-02 .swiper-container", {
              loop: !0,
              speed: 900,
              effect: "slide",
              lazy: !0,
              fadeEffect: { crossFade: !1 },
              autoplay: { delay: 5e3, disableOnInteraction: !1 },
              navigation: {
                nextEl: "#galeria-servicos-02 .swiper-button-next",
                prevEl: "#galeria-servicos-02 .swiper-button-prev",
              },
              pagination: {
                el: "#galeria-servicos-02 .swiper-pagination",
                type: "fraction",
              },
              breakpoints: { 1e3: { fadeEffect: { crossFade: !0 } } },
            })
          ),
          s.push(
            new Swiper("#galeria-servicos-03 .swiper-container", {
              loop: !0,
              speed: 900,
              effect: "slide",
              lazy: !0,
              fadeEffect: { crossFade: !1 },
              autoplay: { delay: 5e3, disableOnInteraction: !1 },
              navigation: {
                nextEl: "#galeria-servicos-03 .swiper-button-next",
                prevEl: "#galeria-servicos-03 .swiper-button-prev",
              },
              pagination: {
                el: "#galeria-servicos-03 .swiper-pagination",
                type: "fraction",
              },
              breakpoints: { 1e3: { fadeEffect: { crossFade: !0 } } },
            })
          ),
          s.push(
            new Swiper("#galeria-servicos-04 .swiper-container", {
              loop: !0,
              speed: 900,
              effect: "slide",
              lazy: !0,
              fadeEffect: { crossFade: !1 },
              autoplay: { delay: 5e3, disableOnInteraction: !1 },
              navigation: {
                nextEl: "#galeria-servicos-04 .swiper-button-next",
                prevEl: "#galeria-servicos-04 .swiper-button-prev",
              },
              pagination: {
                el: "#galeria-servicos-04 .swiper-pagination",
                type: "fraction",
              },
              breakpoints: { 1e3: { fadeEffect: { crossFade: !0 } } },
            })
          ),
          (function e() {
            if (document.body.classList.contains("pg-loading"))
              setTimeout(function () {
                e();
              }, 25);
            else {
              var t = Array.from(
                  document.querySelectorAll(".lista-servicos>li")
                ),
                n = Array.from(document.elementsFromPoint(l.x, l.y)).find(
                  function (e) {
                    return "LI" === e.nodeName;
                  }
                );
              n || (n = t[0]),
                n.classList.add("active"),
                setTimeout(function () {
                  t.forEach(function (e) {
                    return e.classList.remove("first-active");
                  });
                }, 1e3),
                window.innerWidth <= 1025
                  ? t.forEach(function (e) {
                      e.querySelector("h2").addEventListener(
                        "click",
                        function (t) {
                          a(e);
                        }
                      );
                    })
                  : t.forEach(function (e) {
                      e.addEventListener("mouseenter", function (e) {
                        a(e.currentTarget);
                      });
                    }),
                s.forEach(function (e) {
                  return e.autoplay.stop();
                });
            }
            function a(e) {
              for (
                var n = function (n) {
                    var a = t[n],
                      i = s[n];
                    a === e
                      ? (a.classList.add("active"),
                        setTimeout(function () {
                          i.update(),
                            setTimeout(function () {
                              i.autoplay.start();
                            }, 50);
                        }, 100),
                        window.innerWidth < 768 &&
                          setTimeout(function () {
                            R(t[n]);
                          }, 1e3))
                      : (a.classList.contains("active") &&
                          (a.classList.remove("active"),
                          a.classList.add("leave"),
                          setTimeout(function () {
                            a.classList.remove("leave");
                          }, 1e3)),
                        i.autoplay.stop());
                  },
                  a = 0;
                a < t.length;
                a++
              )
                n(a);
            }
          })();
      }
      if (document.getElementById("pg-viagens")) {
        var d = function () {
            setTimeout(function () {
              p[0].addActive(), f[0].addActive(), v.addActive();
            }, 800);
          },
          u = function (e) {
            e.stopPropagation();
            var t = e.currentTarget,
              n = f.find(function (e) {
                return e.dataset.id === t.firstElementChild.dataset.id;
              });
            if (t.classList.contains("active"))
              return t.removeActive(), n.removeActive(), void v.removeActive();
            v.addActive(),
              p.forEach(function (e) {
                return e.removeActive();
              }),
              t.addActive(),
              f.forEach(function (e) {
                return e.removeActive();
              }),
              n.addActive(),
              v.addActive(),
              window.innerWidth < 768 && R(v);
          },
          p = Array.from(document.querySelectorAll(".marker")),
          f = Array.from(document.querySelectorAll(".description")),
          v = document.querySelector(".descriptions-list");
        document
          .querySelector(".container-map")
          .addEventListener("click", function () {
            p.forEach(function (e) {
              return e.removeActive();
            }),
              f.forEach(function (e) {
                return e.removeActive();
              }),
              v.removeActive();
          }),
          p.forEach(function (e) {
            e.onclick = u;
          });
        var m = window.location.search;
        m
          ? ((m = m.substring(m.lastIndexOf("=") + 1)),
            f
              .find(function (e) {
                return e.dataset.id === m;
              })
              .addActive(),
            p
              .find(function (e) {
                return e.firstElementChild.dataset.id === m;
              })
              .addActive(),
            v.addActive())
          : c
          ? d()
          : document.addEventListener("loaderdone", d, { once: !0 });
        new Swiper("#destinos .swiper-container", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: !1,
          simulateTouch: !1,
          speed: 600,
          effect: "slide",
          autoplay: !1,
          autoHeight: !0,
          pagination: { el: "#destinos .swiper-pagination", clickable: !0 },
          navigation: {
            nextEl: "#destinos .swiper-button-next",
            prevEl: "#destinos .swiper-button-prev",
          },
          loopFillGroupWithBlank: !1,
          centerInsufficientSlides: !1,
          grabCursor: !1,
          observer: !0,
          watchOverflow: !1,
          breakpoints: {
            767: { slidesPerView: 2, slidesPerGroup: 1 },
            1025: { slidesPerView: 2, slidesPerGroup: 1 },
          },
        });
      }
      if (document.getElementById("pg-historias")) {
        var h = function () {
          var e = 0;
          S.forEach(function (e) {
            return (e.style.height = "");
          }),
            S.forEach(function (t) {
              t.scrollHeight > e && (e = t.scrollHeight);
            }),
            S.forEach(function (t) {
              return (t.style.height = "".concat(e, "px"));
            });
        };
        $(".split").splitLines({
          tag: '<div class="wrapper-mask-reverse"><span>',
        });
        var w = document.querySelector(".container-search .search"),
          y = document.getElementById("no-results"),
          g = document.querySelector(".navigation"),
          b = document.querySelectorAll("#carousel .swiper-slide"),
          E = {
            slidesPerView: 1.12,
            spaceBetween: 20,
            slidesPerGroup: 1,
            loop: !1,
            speed: 600,
            effect: "slide",
            freeMode: !1,
            keyboard: { enabled: !0 },
            freeModeSticky: !0,
            updateOnWindowResize: !0,
            autoHeight: !1,
            pagination: { el: "#carousel .swiper-pagination", clickable: !0 },
            navigation: {
              nextEl: "#carousel .swiper-button-next",
              prevEl: "#carousel .swiper-button-prev",
            },
            loopFillGroupWithBlank: !1,
            centerInsufficientSlides: !1,
            grabCursor: !1,
            preloadImages: !0,
            lazy: !1,
            breakpoints: {
              767: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 60 },
              1025: {
                slidesPerView: "auto",
                slidesPerGroup: 1,
                spaceBetween: 0,
              },
            },
          },
          L = new Swiper("#carousel .swiper-container", E);
        document.querySelector("#carousel .swiper-container").addEventListener(
          "wheel",
          function (e) {
            e.preventDefault(),
              e.deltaY > 0 && L.slideNext(),
              e.deltaY < 0 && L.slidePrev();
          },
          { passive: !1 }
        );
        var S = document.querySelectorAll(".titles");
        h(),
          window.addEventListener("resize", function () {
            setTimeout(function () {
              h();
            }, 150);
          });
        var A = new T(w, b),
          k = 0;
        w.addEventListener("searchend", function () {
          A.hasResults
            ? (y.removeActive(), g.addActive())
            : (y.addActive(), g.removeActive()),
            k++,
            setTimeout(function () {
              --k < 1 &&
                (L.destroy(),
                (L = new Swiper("#carousel .swiper-container", E)));
            }, 800);
        });
      }
      if (document.getElementById("pg-historia")) {
        var x = new Swiper("#slider-historia .swiper-container", {
          slidesPerView: "auto",
          spaceBetween: 0,
          loop: !1,
          freeMode: !0,
          keyboard: { enabled: !0 },
          speed: 900,
          autoplay: { delay: 1e4, disableOnInteraction: !1 },
          navigation: {
            nextEl: "#slider-historia .swiper-button-next",
            prevEl: "#slider-historia .swiper-button-prev",
          },
          pagination: !1,
          breakpoints: { 1e3: { fadeEffect: { crossFade: !0 } } },
        });
        document
          .querySelector("#slider-historia .swiper-container")
          .addEventListener(
            "wheel",
            function (e) {
              e.preventDefault(),
                e.deltaY > 0 && x.slideNext(),
                e.deltaY < 0 && x.slidePrev();
            },
            { passive: !1 }
          );
      }
      if (
        (document.getElementById("pg-loja") &&
          (function () {
            var e = new C(
                document.querySelector(".container-search .search"),
                document.querySelectorAll(".products-list li")
              ),
              t = document.querySelectorAll("[data-filter]"),
              n = document.querySelectorAll("[data-filter-set]");
            function a(a) {
              n.forEach(function (e) {
                e === a.currentTarget
                  ? e.classList.add("active")
                  : e.classList.remove("active");
              });
              var i,
                o = a.currentTarget.dataset.filterSet;
              (i =
                "all" === o
                  ? t
                  : Array.from(t).filter(function (e) {
                      return e.dataset.filter.includes(o);
                    })),
                t.forEach(function (e) {
                  return e.classList.add("filtered");
                }),
                i.forEach(function (e) {
                  return e.classList.remove("filtered");
                }),
                e.forceSearch();
            }
            n.forEach(function (e) {
              e.addEventListener("click", a);
            });
          })(),
        document.getElementById("pg-contato"))
      ) {
        $(".split").splitLines({
          tag: '<div class="wrapper-mask-reverse"><span>',
        }),
          $.ajaxSetup({
            headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
          });
        var P = $("#form-contato"),
          I = $("#feedback-contato");
        // $(P).submit(function (e) {
        //   e.preventDefault();
        //   var t = $(P).serialize();
        //   $("#form-contato .hide-on-submit").addClass("d-none"),
        //     $(I).removeClass("d-none"),
        //     $(I).text(VARS.contactSending),
        //     $.ajax({ method: "POST", url: VARS.contactURL, data: t })
        //       .done(function (e) {
        //         $(I).removeClass("error"),
        //           $(I).addClass("notification-success"),
        //           $(P).addClass("success"),
        //           $(I).text(VARS.contactSuccess),
        //           $("#nome").val(""),
        //           $("#email").val(""),
        //           $("#assunto").val(""),
        //           $("#telefone").val(""),
        //           $("#mensagem").val("");
        //       })
        //       .fail(function (e) {
        //         $("#form-contato .hide-on-submit").removeClass("d-none"),
        //           $(I).removeClass("notification-success"),
        //           $(I).addClass("error"),
        //           $(I).text(VARS.contactError);
        //       });
        // });
      }
      if (document.getElementById("pg-product")) {
        (r = !0),
          $("[data-fancybox-close]").on("click", function () {
            try {
              parent.jQuery.fancybox.close();
            } catch (e) {
              parent.$("#fancybox-overlay").hide(),
                parent.$("#fancybox-wrap").hide();
            }
          }),
          $.ajaxSetup({
            headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
          });
        (P = $("#form-contato")), (I = $("#feedback-contato"));
        // $(P).submit(function (e) {
        //   e.preventDefault();
        //   var t = $(P).serialize();
        //   $("#form-contato .hide-on-submit").addClass("d-none"),
        //     $(I).removeClass("d-none"),
        //     $(I).text(VARS.contactSending),
        //     $.ajax({ method: "POST", url: VARS.contactURL, data: t })
        //       .done(function (e) {
        //         $(I).removeClass("error"),
        //           $(I).addClass("notification-success"),
        //           $(P).addClass("success"),
        //           $(I).text(VARS.contactSuccess),
        //           $("#nome").val(""),
        //           $("#email").val(""),
        //           $("#assunto").val(""),
        //           $("#telefone").val(""),
        //           $("#mensagem").val("");
        //       })
        //       .fail(function (e) {
        //         $("#form-contato .hide-on-submit").removeClass("d-none"),
        //           $(I).removeClass("notification-success"),
        //           $(I).addClass("error"),
        //           $(I).text(VARS.contactError);
        //       });
        // });
      }
      document.getElementById("pg-post") &&
        $(".editor iframe").wrap(
          '<div class="embed-responsive embed-responsive-16by9" />'
        );
      var q = 0;
      function B() {
        var e = document.documentElement.scrollTop,
          t = window.innerHeight,
          n = document.body.clientHeight;
        (document.body.dataset.scrollDirection =
          0 == e ? "initial" : q > e ? "up" : "down"),
          e >= 0.5 * window.innerHeight
            ? ((document.body.dataset.scrollPosition = "center"),
              (document.body.dataset.scrollPosition =
                e + t >= n - 0.3 * t ? "bottom" : "center"))
            : (document.body.dataset.scrollPosition = "top"),
          (q = e);
      }
      function R(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        $("html, body").animate({ scrollTop: $(e).offset().top - t }, 1e3);
      }
      window.addEventListener(
        "scroll",
        function (e) {
          B();
        },
        { capture: !0, passive: !0 }
      ),
        B(),
        $("input,textarea").on("focus", function () {
          $(this).parent("div").addClass("preenchido");
        }),
        $("input,textarea").on("focusout", function () {
          "" == $(this).val() &&
            $(this).parent("div").removeClass("preenchido");
        }),
        $("input:-webkit-autofill,textarea:-webkit-autofill").each(function () {
          $(this).parent("div").addClass("preenchido");
        }),
        $("[data-scrollto]").click(function (e) {
          e.preventDefault();
          var t = $(this).attr("data-scrollto"),
            n = $(this).attr("data-margin") ? $(this).attr("data-margin") : 0;
          $("html, body").animate(
            { scrollTop: $("#" + t).offset().top - n },
            1e3
          );
        }),
        $("[data-scrolltop]").click(function () {
          $("html, body").animate({ scrollTop: 0 }, 1e3);
        });
    }
    setTimeout(function () {
      s = !0;
    }, 1e3),
      (function e() {
        1 == r
          ? (k.remove(),
            u("body", "pg-loading"),
            d(),
            document.dispatchEvent(A),
            (c = !0))
          : s && b
          ? (setTimeout(function () {
              k.remove(), document.dispatchEvent(A), (c = !0);
            }, 300),
            setTimeout(function () {
              d();
            }, 400),
            u("body", "pg-loading"))
          : setTimeout(e, 50);
      })(),
      document.addEventListener("readystatechange", function () {
        "complete" == document.readyState && x();
      }),
      document.addEventListener("pjax:complete", x),
      document.addEventListener("pjax:send", function () {
        $("body").removeClass("pace-done"),
          $(".wrapper").addClass("page-leave-active");
      });
    var T = (function () {
        function e(t, n) {
          var i = this;
          a(this, e),
            (this.input = t),
            (this.elements = Array.from(n).filter(function (e) {
              return e.dataset.search;
            })),
            this.elements.forEach(function (t) {
              t.dataset.search = e.normalize(t.dataset.search);
            }),
            (this.searchQueued = 0),
            this.input.addEventListener(
              "input",
              function () {
                i.onInput();
              },
              { passive: !0 }
            ),
            (this.onSearchEnd = new CustomEvent("searchend")),
            (this.hasResults = !0);
        }
        return (
          o(
            e,
            [
              {
                key: "onInput",
                value: function () {
                  var t = this;
                  this.searchQueued++,
                    setTimeout(function () {
                      if (t.searchQueued <= 1) {
                        var n = e.find(e.normalize(t.input.value), t.elements);
                        (t.hasResults = n.hasResults),
                          n.changed && t.input.dispatchEvent(t.onSearchEnd);
                      }
                      t.searchQueued--;
                    }, 200);
                },
              },
              {
                key: "forceSearch",
                value: function () {
                  e.find(e.normalize(this.input.value), this.elements, !0);
                },
              },
            ],
            [
              {
                key: "find",
                value: function (e, t) {
                  var n =
                      arguments.length > 2 &&
                      void 0 !== arguments[2] &&
                      arguments[2],
                    a = "active",
                    i = !1,
                    o = !1;
                  return (
                    t.forEach(function (t) {
                      t.dataset.search.includes(e) && (i = !0),
                        ((t.dataset.search.includes(e) &&
                          !t.classList.contains(a)) ||
                          (!t.dataset.search.includes(e) &&
                            t.classList.contains(a))) &&
                          (o = !0);
                    }),
                    o || n
                      ? (t.forEach(function (e) {
                          e.removeActive();
                        }),
                        setTimeout(function () {
                          t.forEach(function (t) {
                            t.dataset.search.includes(e) &&
                            !t.classList.contains("filtered")
                              ? t.addActive()
                              : t.removeActive();
                          });
                        }, 600),
                        { changed: o, hasResults: i })
                      : { changed: o, hasResults: i }
                  );
                },
              },
              {
                key: "normalize",
                value: function (e) {
                  return e
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase();
                },
              },
            ]
          ),
          e
        );
      })(),
      C = (function () {
        function e(t, n) {
          var i = this;
          a(this, e),
            (this.input = t),
            (this.elements = Array.from(n).filter(function (e) {
              return e.dataset.search;
            })),
            this.elements.forEach(function (t) {
              t.dataset.search = e.normalize(t.dataset.search);
            }),
            (this.searchQueued = 0),
            this.input.addEventListener(
              "input",
              function () {
                i.onInput();
              },
              { passive: !0 }
            );
        }
        return (
          o(
            e,
            [
              {
                key: "onInput",
                value: function () {
                  var t = this;
                  this.searchQueued++,
                    setTimeout(function () {
                      t.searchQueued <= 1 &&
                        e.find(e.normalize(t.input.value), t.elements),
                        t.searchQueued--;
                    }, 200);
                },
              },
              {
                key: "forceSearch",
                value: function () {
                  e.find(e.normalize(this.input.value), this.elements, !0);
                },
              },
            ],
            [
              {
                key: "find",
                value: function (e, t) {
                  var n =
                      arguments.length > 2 &&
                      void 0 !== arguments[2] &&
                      arguments[2],
                    a = "active",
                    i = "leave",
                    o = t.length,
                    s = document.getElementById("no-results"),
                    r = t.find(function (t) {
                      return (
                        (t.dataset.search.includes(e) &&
                          !t.classList.contains(a)) ||
                        (!t.dataset.search.includes(e) &&
                          t.classList.contains(a))
                      );
                    });
                  (r || n) &&
                    (s.removeActive(),
                    t.forEach(function (t) {
                      t.classList.contains(a) &&
                        (t.classList.remove(a), t.classList.add(i)),
                        setTimeout(function () {
                          t.dataset.search.includes(e) &&
                          !t.classList.contains("filtered")
                            ? (t.classList.remove(i), t.classList.add(a))
                            : t.classList.remove(i);
                        }, 650),
                        (t.dataset.search.includes(e) &&
                          !t.classList.contains("filtered")) ||
                          o--;
                    }),
                    0 === o && s.addActive());
                },
              },
              {
                key: "normalize",
                value: function (e) {
                  return e
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase();
                },
              },
            ]
          ),
          e
        );
      })();
  },
});
