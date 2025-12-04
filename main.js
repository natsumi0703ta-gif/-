

// ハンバーガーボタン
$(function() {
  
  // ▼ 100vh 対策
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);


  const $btn  = $('#hamburger');
  const $navi = $('#navi');

  if ($btn.length === 0 || $navi.length === 0) return;

  
  $btn.on('click', function(e) {
    e.stopPropagation(); 

    const open = $('body').toggleClass('nav-open').hasClass('nav-open');
    $(this).toggleClass('is-active', open);
  });

  $(document).on('click', function(e) {
    if (!$('body').hasClass('nav-open')) return;

    if ($(e.target).closest('#navi').length !== 0) return;
    if ($(e.target).closest('#hamburger').length !== 0) return;

    $('body').removeClass('nav-open');
    $btn.removeClass('is-active');
  });

  // メニュー内のリンクを押したら閉じる
  $navi.find('a').on('click', function() {
    $('body').removeClass('nav-open');
    $btn.removeClass('is-active');
  });

  
  // slick
  $(".slick-area").slick({
    arrows: false,
    centerMode: true,
    centerPadding: "100px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1200,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "50px",
          slidesToShow: 1,
        },
      },
    ],
  });



  // header スクロールで背景色変更
  const $headers = $('.header-inner, .header-inner-other');
  let isScrolled = false;

  $(window).on('scroll', function () {
    const shouldBeScrolled = $(this).scrollTop() > 300;

    if (shouldBeScrolled !== isScrolled) {
      $headers.toggleClass('scrolled', shouldBeScrolled);
      isScrolled = shouldBeScrolled;
    }
  });

  const $fadeIns = $('.fade-in');
  $(window).on('scroll', function () {
    const showPoint = $(this).height() * 0.8; // 画面の8割ぐらい

    $fadeIns.each(function () {
      const rectTop = this.getBoundingClientRect().top;
      if (rectTop < showPoint) {
        $(this).addClass('active');
      }
    });
  }).trigger('scroll'); 


 
  // contact-form（ステップフォーム）
  const $steps      = $(".steps li");
  const $confirmBtn = $(".confirm-btn a");
  const $backBtn    = $("#backToForm");
  const $sendBtn    = $("#toComplete");
  const $toTopBtn   = $("#toTop");

  const $step1 = $("#step1");
  const $step2 = $("#step2");
  const $step3 = $("#step3");

  // ステップの位置
  function setActiveStep(index) {
    $steps.each(function (i) {
      $(this).toggleClass("active", i === index);
    });
  }

  // confirm ボタン
  if ($confirmBtn.length) {
    $confirmBtn.on("click", function (e) {
      e.preventDefault();

      $("#confirmName").text($("input[name='name']").val());
      $("#confirmEmail").text($("input[name='email']").val());
      $("#confirmTel").text($("input[name='tel']").val());
      $("#confirmMessage").text($("textarea[name='message']").val());

      $step1.hide();
      $step2.show();
      setActiveStep(1); // confirmへ
    });
  }

  // 戻るボタン
  if ($backBtn.length) {
    $backBtn.on("click", function () {
      $step2.hide();
      $step1.show();
      setActiveStep(0); // inputに戻す
    });
  }

  // 送信ボタン
  if ($sendBtn.length) {
    $sendBtn.on("click", function () {
      $step2.hide();
      $step3.show();
      setActiveStep(2); // completeへ
    });
  }

  // もう一度ボタン
  if ($toTopBtn.length) {
    $toTopBtn.on("click", function () {
      $step3.hide();
      $step1.show();

      // フォームリセット
      $("form").each(function () {
        this.reset();
      });

      setActiveStep(0); // inputに戻す
    });
  }

});










