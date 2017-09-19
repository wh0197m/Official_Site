// 首页粒子效果
particlesJS("lxtech", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
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
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
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
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

//动画背景
// function translate(param) {
//     var $wrap = $(param.objectsParrent),
//         wrapW = $wrap.innerWidth(),
//         wrapH = $wrap.innerHeight(),
//         CenterX = wrapW / 2,
//         CenterY = wrapH / 2;

//     $(window).resize(function() {
//         param.objects.forEach(function(el) {
//             $(el.selector).each(function() {
//                 $(this).css({
//                     'transform': 'none',
//                     'transition': 'none'
//                 });
//             });
//         });
//     });

//     function init(x, y) {
//         param.objects.forEach(function(el) {
//             $(el.selector).each(function() {
//                 if (window.matchMedia('(min-width: ' + param.mediaTo + 'px)').matches) {
//                     translateX = el.maxTranslate * x;
//                     translateY = el.maxTranslate * y;

//                     $(this).css({
//                         'transform': 'translate(' + translateX + 'px, ' + translateY + 'px)',
//                         'transition': '.1s'
//                     });
//                 } else {
//                     $(this).css({
//                         'transform': 'none',
//                         'transition': 'none'
//                     });
//                 }
//             });
//         });
//     }

//     init(0, 0);

//     $wrap.on('mousemove', function(el) {
//         var cursorX = el.clientX,
//             cursorY = el.clientY,
//             x = -(cursorX - CenterX) / CenterX,
//             y = -(cursorY - CenterY) / CenterY;
//         init(x, y);
//     });
// }

function fixPosition(parrentObject, object, offsetTop, offsetBottom) {
    var $object = $(object),
        $parrentObject = $(parrentObject),
        objOffsetY = $object.position().top,
        objHeight,
        objWidth,
        pObjOffsetY,
        pObjHeight,
        scrollHeight,
        startFixed,
        endFixed;

    function computedVars() {
        objHeight = $object.outerHeight();
        objWidth = $object.outerWidth();
        pObjOffsetY = $parrentObject.offset().top;
        pObjHeight = $parrentObject.outerHeight();
        scrollHeight = $(window).scrollTop() + offsetTop;
        startFixed = pObjOffsetY + objOffsetY;
        endFixed = pObjOffsetY + pObjHeight - objHeight - offsetBottom;
    }

    function fixPositionInit() {
        if (window.matchMedia('(min-width: 992px)').matches) {
            computedVars();

            if (scrollHeight > startFixed && scrollHeight < endFixed) {
                $object.attr('style', '');
                $object.css({
                    'position': 'relative',
                    'top': scrollHeight - pObjOffsetY - objOffsetY + 'px'
                });
            } else if (scrollHeight > endFixed) {
                $object.attr('style', '');
                $object.css({
                    'position': 'relative',
                    'top': pObjHeight - objOffsetY - objHeight - offsetBottom + 'px'
                });
            }
        } else {
            $object.attr('style', '');
        }
    }

    $(window).load(function() {
        fixPositionInit();
    });

    $(window).resize(function() {
        fixPositionInit();
    });

    $(window).scroll(function() {
        if (window.matchMedia('(min-width: 992px)').matches) {
            computedVars();

            if (scrollHeight > startFixed && scrollHeight < endFixed) {
                $object.attr('style', '');
                $object.css({
                    'position': 'fixed',
                    'top': offsetTop + 'px',
                    'width': objWidth + 'px'
                });
            } else if (scrollHeight >= endFixed) {
                $object.attr('style', '');
                $object.css({
                    'position': 'relative',
                    'top': pObjHeight - objOffsetY - objHeight - offsetBottom + 'px'
                });
            } else if (scrollHeight <= startFixed) {
                $object.attr('style', '');
                $object.css({
                    'position': 'relative',
                    'top': 0 + 'px'
                });
            }
        } else {
            $object.attr('style', '');
        }
    });
}

$(document).ready(function() {

    //页面加载时，动画呈现Logo

    $(window).load(function() {
        $('#LxTech_Software').addClass('logo_start');
    });

    //头部导航

    if ($('body').hasClass('index') === true) {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 0) {
                $('header').addClass('header_lighten');
            } else {
                $('header').removeClass('header_lighten');
            }
        });
    }

    $('body:not(.get_estimation) header').hover(function() {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            $('body').css('overflow-y', 'hidden');
        }
    }, function() {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            $('body').css('overflow-y', 'auto');
        }
    });

    $('header .hamburger_menu').click(function() {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            if ($(window).scrollTop() === 0) {
                $('header').removeClass('header_lighten');
            }
            $('body').css('overflow-y', 'auto');
        } else {
            $(this).addClass('is-active');
            $('header').addClass('header_lighten');
            $('body').css('overflow-y', 'hidden');
        }
    });

    $('body.career .photo_item').focus(function() {
        $('body').css('overflow-y', 'hidden');
    }).focusout(function() {
        $('body').css('overflow-y', 'auto');
    });

    $('header nav li.drop_down').hover(function() {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            $('header .menu_l1 > *').removeClass('menu_l1-active');
            $('header .menu_l2 > *').removeClass('menu_l2-active');

            $('header .menu_l2').css('height', $('header .menu_l2 > *:first-child').height() + 'px');
            $('header .menu_l1 > a:first-child').addClass('menu_l1-active');
            $('header .menu_l2 > *:first-child').addClass('menu_l2-active');

            $('.overlay').toggleClass('show');
        }
    }, function() {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            $('.overlay').toggleClass('show');
        }
    });

    $('header .menu_l1 > a').mouseover(function() {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            $('header .menu_l1 > *').removeClass('menu_l1-active');
            $('header .menu_l2 > *').removeClass('menu_l2-active');

            var eNumber = $($(this)).index() + 1,
                eHeight = $('header .menu_l2 > *:nth-child(' + eNumber + ')').height();

            $($(this)).addClass('menu_l1-active');
            $('header .menu_l2').css('height', eHeight + 'px');
            $('header .menu_l2 > *:nth-child(' + eNumber + ')').addClass('menu_l2-active');
        }
    });

    $(window).resize(function() {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            $('header .menu_l2').css('height', $('.menu_l2-active').height() + 'px');
        }
    });

    //Animation .index top-bg
    // translate(window, [['#oval-level_1',20],['#oval-level_2',30],['#oval-level_3',40],['#oval-level_4',50]], ['-50%','-50%'], 20);

    // translate({
    //     mediaTo: 767,
    //     objectsParrent: window,
    //     objects: [{
    //             selector: '#oval-level_1',
    //             maxTranslate: 20
    //         },
    //         {
    //             selector: '#oval-level_2',
    //             maxTranslate: 30
    //         },
    //         {
    //             selector: '#oval-level_3',
    //             maxTranslate: 40
    //         },
    //         {
    //             selector: '#oval-level_4',
    //             maxTranslate: 50
    //         }
    //     ]
    // });

    //Estimation link to back

    $("a[href$='get_estimation.html']").click(function() {
        localStorage.setItem('backUrl', location.href);
    });

    $("header a[href$='index.html']").attr('href', localStorage.getItem('backUrl'));

    //Tabs Slider

    $('.tabs_slider .tab_item').click(function() {
        $('.' + $(this).attr('class')).removeAttr('name');
        $(this).attr('name', 'active').removeAttr('style');
    });

    //Slider

    var $slides = $('.slider .content'),
        slidesLength = $slides.length - 1,
        activeSlideIndex = $(".slider .content[slide='active']").index(),
        slidesOffset = 0,
        overlay = 90;

    slidesOffset += (overlay - 100) * activeSlideIndex;
    for (var i = 0; i <= slidesLength; i++) {
        var overlayPercent = -overlay * i;

        $($slides[i]).css('transform', 'translateX(' + (overlayPercent + slidesOffset) + '%)');
    }

    $(".slider [class^='arrow']").click(function() {
        var $slides = $('.slider .content'),
            slidesLength = $slides.length - 1,
            activeSlideIndex = $(".slider .content[slide='active']").index(),
            slidesOffset = 0,
            overlay = 90;

        if ($(this).hasClass('arrow-left')) { activeSlideIndex += -1; }
        if ($(this).hasClass('arrow-right')) { activeSlideIndex += 1; }
        if (activeSlideIndex > slidesLength) { activeSlideIndex = 0; }
        if (activeSlideIndex < 0) { activeSlideIndex = slidesLength; }

        $slides.removeAttr('slide');
        $($slides[activeSlideIndex]).attr('slide', 'active');

        slidesOffset += (overlay - 100) * activeSlideIndex;

        for (var i = 0; i <= slidesLength; i++) {
            var overlayPercent = -overlay * i;

            $($slides[i]).css('transform', 'translateX(' + (overlayPercent + slidesOffset) + '%)');
        }
    });

    //Fixed Position Get Estimation

    if ($('body').hasClass('technology_page') === true || $('body').hasClass('technologies') === true) {
        fixPosition('.content_wrap', '.get_our_media_kit-side', 160, 80);
    } else if ($('body').hasClass('blog-body')) {
        fixPosition('.content_wrap', '.get_our_media_kit-side', 160, 0);
    }

    //Photo View

    $('body.career .photo_item').focus(function() {
        $('body.career .view').attr('style', $(this).attr('style'));
    });

    $('form').submit(function(e) {
        e.preventDefault();
    });
    //Email
    function infopack(form) {
        var $form = $(form),
            $btnSubmit = $form.find(':submit'),
            btnSubmitVal = $btnSubmit.val(),
            $inputEmail = $form.find('[type=email]');


        $btnSubmit.click(function() {
            console.log($inputEmail.val());
            var mail = $inputEmail.val();
            var fail = /^[A-Za-z0-9_\-]+(\.[A-Za-z0-9_\-]+)*@[A-Za-z0-9]+((\-|\.)[A-Za-z0-9]+)*(\.[A-Za-z]{2,6})$/;

            if (fail.test(mail)) {
                $.ajax({
                    type: 'POST',
                    url: '/inc/mail.php',
                    data: {
                        mail: mail
                    },
                    success: function(data) {
                        $inputEmail.val('');
                        $btnSubmit
                            .val('Done!')
                            .css('background-color', 'hsl(95, 70%, 40%)');
                    },
                    error: function() {
                        $btnSubmit
                            .val('Error! Not Send')
                            .css('background-color', '#E61717');
                    }
                });
            }

            setTimeout(function() {
                $btnSubmit
                    .val(btnSubmitVal)
                    .removeAttr('style');
            }, 1500);
        });
    }

    infopack('#media-kit-form');

    function mail(type, form, onSuccess, onError) {
        var $form = $(form),
            $btnSubmit = $form.find(':submit'),
            btnSubmitVal = $btnSubmit.val(),
            $inputEmail = $('input[name=formEmail]');

        var url = type === 'estimation' ? '/inc/form.php' : type === 'message' ? '/inc/form-message.php' : '/inc/form-message.php';

        onSuccess = typeof onSuccess === 'function' ? onSuccess : function() {};
        onError = typeof onError === 'function' ? onError : function() {};

        $btnSubmit.click(function() {
            var mail = $inputEmail.val(),
                fail = /^[A-Za-z0-9_\-]+(\.[A-Za-z0-9_\-]+)*@[A-Za-z0-9]+((\-|\.)[A-Za-z0-9]+)*(\.[A-Za-z]{2,6})$/;

            console.log($form.serialize());
            if (fail.test(mail)) {
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: $form.serialize(),
                    success: function(data) {
                        $btnSubmit
                            .val('Done!')
                            .css('background-color', 'hsl(95, 70%, 40%)');
                        setTimeout(function() {
                            onSuccess();
                        }, 1500);
                    },
                    error: function() {
                        $btnSubmit
                            .val('Error! Not Send')
                            .css('background-color', '#E61717');
                        setTimeout(function() {
                            onEror();
                        }, 1500);
                    }
                });
            }

            setTimeout(function() {
                $btnSubmit
                    .val(btnSubmitVal)
                    .removeAttr('style');
            }, 1500);
        });
    }

    mail('estimation', '.get_estimation form', function() {
        window.location.replace('/thank_you_page.html');
    });
    mail('message', '.send_msg');

    function formValid() {
        $("form :submit").click(function() {
            var $btnSubmit = $(this),
                $form = $btnSubmit.parents('form'),
                btnSubmitVal = $btnSubmit.val();

            $form.validate({
                // errorPlacement: function(error,element) {
                //   return true;
                // }
            });

            if ($form.valid() === false) {
                $btnSubmit
                    .val('Oops!')
                    .css('background-color', '#E61717');
            }

            setTimeout(function() {
                $btnSubmit
                    .val(btnSubmitVal)
                    .removeAttr('style');
            }, 1500);
        });
    }

    formValid();

    // Blog like animation

    $('.blog_post-like button').on('click', function() {
        $(this).addClass('active');
        setTimeout(function() {
            $('.blog_post-like button').removeClass('active');
        }, 1000);
    });
});