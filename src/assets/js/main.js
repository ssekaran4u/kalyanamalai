! function(c) {
    "use strict";
    c(document).on("ready", function() {
        c(window).on("load", function() {
            c(".loader-container").delay("500").fadeOut(2e3)
        }), c(document).on("click", ".side-menu-wrap .side-menu-ul>li .la-angle-down", function() {
            return c(this).closest("li").siblings().removeClass("active").find(".dropdown-menu-item").slideUp(200), c(this).closest("li").toggleClass("active").find(".dropdown-menu-item").slideToggle(200), !1
        }), c(document).on("click", ".logo-right-content .side-menu-open", function() {
            c(".side-nav-container").addClass("active")
        }), c(document).on("click", ".humburger-menu .side-menu-close", function() {
            c(".side-nav-container, .side-user-panel").removeClass("active")
        }), c(document).on("click", ".logo-right-content .side-user-menu-open", function() {
            c(".side-user-panel").addClass("active")
        }), c(window).on("scroll", function() {
            10 < c(window).scrollTop() ? c(".header-menu-wrapper").addClass("header-fixed") : c(".header-menu-wrapper").removeClass("header-fixed"), 300 < c(window).scrollTop() ? c("#back-to-top").addClass("show-back-to-top") : c("#back-to-top").removeClass("show-back-to-top"), c(".skillbar").each(function() {
                c(this).find(".skillbar-bar").animate({
                    width: c(this).attr("data-percent")
                }, 6e3)
            })
        }), c(document).on("click", "#back-to-top", function() {
            return c("html, body").animate({
                scrollTop: 0
            }, 800), !1
        })
    })
}(jQuery);