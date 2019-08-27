$(document).ready(function () {
    //    Filter and sorting

    $('.filter__btn-js').on('click', function () {
        $(this).toggleClass("open");
        $(this).next('.filter__dropdown').slideToggle('slow');
        $('.filter__btn-js').not(this).removeClass('open').next('.filter__dropdown').slideUp('slow');
        var cardStop = $(this).closest(".card").find('.card__stop');
        if (cardStop.length) {
            $(this).next('.filter__dropdown').find('li:first').show();
        } else {
            $(this).next('.filter__dropdown').find('li:first').hide();
        }
    });

    // Scrollbar

    $('.filter__list').overlayScrollbars({});
    $('.submenu-js').overlayScrollbars({});
    $('.modal__body').overlayScrollbars({});

    //Sidebar filter

    $('.block-toggle-js').on('click', function () {
        $(this).toggleClass("close");
        $(this).next('.block__wrap').slideToggle('slow');
    });

    //Card toggle

    $('.btn-toggle').on('click', function () {
        $('.btn-toggle').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('btn-list')) {
            $('.catalog__card').addClass('list').removeClass('list2').parent().removeClass('col-lg-4 col-sm-6 col-12').addClass('col-12');
        } else if ($(this).hasClass('btn-list2')) {
            $('.catalog__card').addClass('list2').parent().removeClass('col-lg-4 col-sm-6 col-12').addClass('col-12');
        } else {
            $('.catalog__card').removeClass('list list2').parent().removeClass('col-12').addClass('col-lg-4 col-sm-6 col-12');
            ;
        }
    });

    //Bookmark

    $('.card__bookmark_add').on('click', function () {
        $(this).addClass('d-none');
        $(this).next('.card__bookmark_remove').removeClass('d-none');
    });

    $('.card__bookmark_remove').on('click', function () {
        $(this).addClass('d-none');
        $(this).prev('.card__bookmark_add').removeClass('d-none');
    });

    //Modal

    $('.modal-js').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });

    //SignIn/Up

    $('.sign-in-toggle-js').on('click', function () {
        $('.sign-in').toggleClass('d-none');
    });

    $('.sign-in-js').on('click', function () {
        $(this).parent().addClass('d-none').parent().find('.sign-in-phone').removeClass('d-none');
    });

    $('.restore-toggle-js').on('click', function () {
        $('.sign-in').addClass('d-none');
        $('.restore-password').removeClass('d-none');
    });

    $('.check-in-js').on('click', function () {
        $('.sign-in').addClass('d-none');
        $('.check-in').removeClass('d-none');
    });
    //Phone mask
    $('.phone').each(function () {
        $(this).mask('+9(999) 999-99-99', {
            completed: function () {
                $('.form__input-wrap').addClass('form__check');
            }
        }).on('input keydown', function (event) {
            if (event.keyCode == 8) {
                console.log('Change input')
                $('.form__input-wrap').removeClass('form__check');
            }
        });
    });
    // Ajax

    $('#signIn').on('submit', function (e) {
        $.ajax({
            type: 'POST',
            url: '',
            data: $(this).serialize(),
            success: function (response) {
                setTimeout(function () {
                    console.log('Data posted');
                    $('.code').slideDown();
                    $(this).trigger('reset');
                }, 300);
            }
        });
//        e.preventDefault();
    });

    // Radiobutton

    $("input[name='choice']:radio").on('change', function () {
        $(".form__phone-wrap").toggle($(this).val() == "phone");
        $(".form__email-wrap").toggle($(this).val() == "email");
    });

    // Navigation Toggle

    $('.submenu-link-js').on('click', function () {
        // $(this).toggleClass('active');
        $(this).children('.submenu').slideToggle('slow');
    });

    $('.advert-toggle-js').on('click', function (e) {
        e.preventDefault();
        $('.advert__nav').slideToggle('slow');
    });

    // Select & Card

    $('.select-js').each(function () {
        var placeholder = $(this).attr('data-placeholder');
        $(this).select2({
            width: '100%',
            placeholder: placeholder
        }).on('select2:open', function (e) {
            $('.select2-results').overlayScrollbars({});
        }).on('change', function () {
            var cardCountry = $('#country-adv2 :selected').text();
            var cardRerion = $('#region-adv2 :selected').text();
            var cardTown = $('#town :selected').text();
            $('.card__region').text(cardTown + ', ' + cardRerion + ', ' + cardCountry);
        });
    });

    $('#provider').on('change', function () {
        var cardProvider = $(this).val();
        $('.card__provider').text(cardProvider);
    });
    $('#amount').on('change', function () {
        var cardAmount = $(this).val();
        $('.card__availability span:nth-of-type(2)').text(cardAmount);
        $('#amount-units').on('change', function () {
            var cardUnit = $('#amount-units :selected').text();
            $('.card__availability span:nth-of-type(2)').text(cardAmount + ' ' + cardUnit);
        });
    });
    $('#price').on('change', function () {
        var cardPrice = $(this).val();
        $('.card__price span:nth-child(2)').text(cardPrice);
    });
    $('#amount-price').on('change', function () {
        var cardAmountPrice = $('#amount-price :selected').text();
        $('.card__price span:nth-child(3)').text('руб./' + cardAmountPrice);
    });
    $('#price-prefix').on('change', function () {
        if ($(this).prop("checked") == true) {
            $('.card__price span:first-child').text('от ');
        } else {
            $('.card__price span:first-child').text('');
        }
    });
    $('#grade-adv').on('change', function () {
        var cardTitle = $('#grade-adv :selected').text();
        $('.card__title span:nth-child(2)').text(cardTitle);
    });
    $('#size-adv').on('change', function () {
        var cardSize = $(this).val();
        $('.card__title span:nth-child(3)').text(', калибр ' + cardSize);
    });
    $('.sub-submenu > li > a').on('click', function (e) {
        var product = $(this).text();
        var subcategory = $(this).closest('ul').parent().children('a').text();
        var category = $(this).closest('ul').parent().closest('ul').parent().children('a').text();
        $(this).closest('nav').parent().children('a').hide();
        $('.card__title span:first-child').text(product + ' ');
        $('.advert__breadcrumb').removeClass('d-none');
        $('.advert__breadcrumb li:nth-child(3) a').text(product);
        $('.advert__breadcrumb li:nth-child(2) a').text(subcategory);
        $('.advert__breadcrumb li:nth-child(1) a').text(category);
    });

    // Image Load
    var i = 0;

    function readURL(input, a, imgId) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#' + imgId + a).attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    $("#imgLoad").on('change', function () {
        if (i < 10) {
            $('.img-block-js').prepend('<div class="description__img-wrap">' +
                '<img src="#" class="description__img" id="picture' + i + '">' +
                '<span class="img-close-js"></span>' +
                '</div>');
            readURL(this, i, 'picture');
            setTimeout(replaceImg, 2000);
            i++;
        }
        if (i == 10) {
            $(this).hide();
        }

        $('.img-close-js').on('click', function (e) {
            $(this).parent('.description__img-wrap').remove();
            i--;
            if ($('.card__img').attr('id') == $(this).prev().attr('id')) {
                $('.card__img').attr('src', '');
                setTimeout(replaceImg, 2000);
            }
            e.stopImmediatePropagation();
        });
    });

    function replaceImg() {
        var c = $('.description__img:first').clone().attr({
            class: 'card__img'
        });
        $('.card__img').replaceWith(c);
    };

    // Sticky Card
    $(".card-sticky-js").sticky({topSpacing: 0});

    // Form Reset
    $('button:reset').on('click', function () {
        location.reload();
    });
    // Toggle Class Active
    $('.bill-btn-js').on('click', function () {
        $('.bill-btn-js').removeClass('active');
        $(this).toggleClass('active');
    });

    // Tabs
    $('.tabs-wrap').on('click', 'button:not(.active)', function () {
        $(this).addClass('active')
            .siblings().removeClass('active')
            .closest('div.tabs').find('div.tab-content')
            .removeClass('active').eq($(this).index()).addClass('active');
        var tariffBtnText = $('.tariff-btn-js.active').contents().get(0).nodeValue;
        if ($('.btn-toggle-block').length && tariffBtnText == 'Поставщики: ') {
            $('.btn-toggle-block').addClass('d-none');
        } else {
            $('.btn-toggle-block').removeClass('d-none');
        }
    });
    $('.tariff-btn-js').on('click', function () {
        if ($('.tariff').length) {
            var tariff = $('.tab.active').text();
            console.log(tariff);
            $('.tariff').text('«' + tariff + '»');
            $.magnificPopup.close();
        }
    });

    // File Attached
    var j = 0;
    $('#file').change(function () {
        var size = this.files[0].size;
        var name = this.files[0].name;
        var ext = name.substr(name.lastIndexOf('.') + 1);
        if (this.files[0] && size <= 1000000 && ext.length > 1 && j < 10) {
            switch (ext) {
                case 'jpg':
                case 'jpeg':
                case 'png':
                    $('.files-wrap-js').append('<a href="#" class="d-flex align-items-center link"' +
                        ' download>' +
                        '<svg width="18" height="18">' +
                        '<use xlink:href="img/svg-sprite.svg#image"></use>' +
                        '</svg>' +
                        '<p>' + name + '</p>' +
                        '<span class="filter__close"></span></a>');
                    break;
                default:
                    $('.files-wrap-js').append('<a href="#" class="d-flex align-items-center link"' +
                        ' download>' +
                        '<svg width="18" height="20">' +
                        '<use xlink:href="img/svg-sprite.svg#file"></use>' +
                        '</svg>' +
                        '<p>' + name + '</p>' +
                        '<span class="filter__close"></span></a>');
            }
            j++;
        }
        if (j == 10) {
            $('#fileAttached').hide();
        }

        $('.filter__close').on('click', function (e) {
            $(this).parent().remove();
            $('#fileAttached').show();
            j--;
            e.stopImmediatePropagation();
        });
    });
})
