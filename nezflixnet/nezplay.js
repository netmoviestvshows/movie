eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[e(c)] = k[c] || e(c);
      }
      k = [
        function (e) {
          return d[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
      }
    }
    return p;
  })(
    "6($('#1V').j){$(A).1U(4(){$('.1k-K').p('17','1I');$('.w-K').p('17','1r')})}6($('#G').j){4 1f(O){O+='';x=O.1W('.');u=x[0];19=x.j>1?'.'+x[1]:'';9 12=/(\\d+)(\\d{3})/;1X(12.1R(u)){u=u.1P(12,'$1'+','+'$2')}F u+19}4 18(){9 J=$('#G').a('J'),11=$('#G').a('11'),1g=B.21(B.1h()*(11-J+1)+J);$('.G-V').25(1f(1g))}(4 1b(){9 1e=B.1v(B.1h()*(1n-1c))+1c;1m(4(){18();1b()},1e)}())}28(5).2d(4($){$('.2b').29('20',4(){F 10});$(5).f(4(1p){9 1s=$(1p.1Z);9 1i=$(\".M-1q\").1o(\"M-1q 1S\");6(1i===14&&!1s.1o(\"M-q\")){$(\"1N.M-q\").f()}});6($('[a-q=\"13\"]').j){$('[a-q=\"13\"]').13({1j:\"Z\"})}6($('[a-q=\"15\"]').j){$('[a-q=\"15\"]').15({1j:\"Z\"})}$(\"#w,#1Y\").b('f',4(e){$('.w-K,#w .w-R-22').p('1J','2f');$('.1k-K').p('17','1r');1m(4(){y();$('#2M-c').c({2B:!1,2E:\"2F\"})},2D);F 10});$(\".R-S\").b('f',4(e){9 1l=$(g).a('f');A.N.P=\"/S/?2A=\"+1l});6($('.S .Y-U').j){9 X=$(\".Y-U\").a('X');$(\".Y-U\").2K({L:\"2I%\"},1n,4(){A.N.P=X})}$(\".2J-2C\").b('f',4(e){9 D=$(g).a('D'),s=$(g).a('s'),Q=$(g).a('Q');A.N.P=\"2z://2n.1t-2k.2j/1t-k:\"+2g(D)+\".2h?s.W=\"+s+\"&s.2i=\"+Q});$(\".1a\").b('f',4(e){e.I();$(\".1a\").C('1d');$(g).E('1d')});$(\".R-1u\").b('f',4(e){9 W=$(g).a('1L');1E(W,'14');$('.2u-1u').2q()});$(5).b('f','.8-7-l',4(e){e.I();1C(5.2r(\"2s\"))});$(5).b('f','.8-7-m',4(e){e.I();y()})});4 1E(D,V){9 t=1H 2t();t.2x(t.2w()+2v);5.1L=D+'='+V+';t='+t.2p()}4 T(){$('.c').2o(4(i){9 $v=$(g).v().p('1J','2l').2y('Z');9 o=B.1v(($v.1w()-$v.H('.c-16').1w())/2);o=o>0?o:0;$v.2N();$(g).H('.c-16').p(\"2G-o\",o)})}$('.c').b('2H.1G.c',T);$(A).b('2L',T);$('.c').b('1I.1G.c',4(e){$(g).H('.c-16').1D('1F');$(g).H('.c-2m').1D('1F')});4 1T(n,L,z){z=z||'0';n=n+'';F n.j>=L?n:1H 1O(L-n.j+1).1Q(z)+n}4 1C(h){6(h.1B){h.1B()}r 6(h.1x){h.1x()}r 6(h.1K){h.1K()}r 6(h.1y){h.1y()}$(\".8-7-l\").C(\"8-7-l\").E(\"8-7-m\")}4 y(){6(5.y){5.y()}r 6(5.1A){5.1A()}r 6(5.1z){5.1z()}$(\".8-7-m\").C(\"8-7-m\").E(\"8-7-l\")}$(5).b('26 2a 24',4(e){e.I();9 1M=5.23||5.27||5.2c||5.2e?14:10;6(1M){$(\".8-7-l\").C(\"8-7-l\").E(\"8-7-m\")}r{$(\".8-7-m\").C(\"8-7-m\").E(\"8-7-l\")}});",
    62,
    174,
    "||||function|document|if|size|icon|var|data|on|modal|||click|this|element||length||fullscreen|actual||top|css|toggle|else|aff|expires|x1|clone|play||exitFullscreen||window|Math|removeClass|key|addClass|return|counter|find|preventDefault|min|wrapper|width|navbar|location|nStr|href|sub|btn|offer|centerModals|bar|value|id|url|progress|body|false|max|rgx|tooltip|true|popover|content|visibility|doSomething|x2|hq|loop|500|active|rand|addCommas|number|random|_opened|container|spinner|klik|setTimeout|3000|hasClass|event|collapse|visible|clickover|download|agree|round|height|mozRequestFullScreen|msRequestFullscreen|webkitExitFullscreen|mozCancelFullScreen|requestFullscreen|launchIntoFullscreen|removeAttr|setCookie|style|bs|new|hidden|display|webkitRequestFullscreen|cookie|fullScreen|button|Array|replace|join|test|in|pad|load|videoPlayer|split|while|play_btn|target|contextmenu|floor|border|fullscreenElement|fullscreenchange|text|webkitfullscreenchange|mozFullScreenElement|jQuery|bind|mozfullscreenchange|nocontext|webkitFullscreenElement|ready|msFullscreenElement|none|encodeURIComponent|html|subid|com|genius|block|dialog|www|each|toUTCString|hide|getElementById|video|Date|alert|31536000000|getTime|setTime|appendTo|http|ref|keyboard|row|15000|backdrop|static|margin|show|100|ext|animate|resize|player|remove".split(
      "|"
    ),
    0,
    {}
  )
);
/* ---------------------------------------------- /*
        Preloader page
/* ---------------------------------------------- */

// (function () {
//   $(window).on("load", function () {
//     $(".loader").fadeOut();
//     $(".page-loader").delay(350).fadeOut("slow");
//   });
//   $(document).ready(function () {});
// })(jQuery);

/* ---------------------------------------------- /*
    Slider home
/* ---------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
        var swiper = new Swiper('.swiper-container', {
          slidesPerView: 8,
          slidesPerGroup: 1,
          spaceBetween: 18, // Jarak antara poster
          loop: true,
          loopAdditionalSlides: 3, // Pastikan ada slide tambahan untuk loop yang mulus
          navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          },
          autoplay: {
            delay: 5000, // Delay 5 detik
            disableOnInteraction: false, // Tetap berjalan meskipun ada interaksi pengguna
          },
          breakpoints: {
            220: {
              slidesPerView: 2,
            },
            576:{
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 6,
            },
            992: {
              slidesPerView: 8,
            },
          },
        });
  
        // Menambahkan event listener untuk menghentikan autoplay ketika mouse masuk
        document.querySelector('.swiper-container').addEventListener('mouseenter', function() {
          swiper.autoplay.stop();
        });
  
        // Menambahkan event listener untuk memulai ulang autoplay ketika mouse keluar
        document.querySelector('.swiper-container').addEventListener('mouseleave', function() {
          swiper.autoplay.start();
        });
      });

var apiKey = 'b2b355392c45da4dad92e5cac927bab4';
var accessToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTcwYTMwYjk1ODE5Y2IzMjA3ZTUxZjE4ZGFiNDgzNCIsInN1YiI6IjYxY2YxOTEyYWY2ZTk0MDA5ODQ3OGRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pNjePjoP03wPNnH-lYvGa9Uqn0g6WIm1WzQXaOY3Vj8';
