$(document).ready(function() {
    var gunsLoaded = false;
    var itemsLoaded = false;
    var qsRegex;

    $('.row').load('index-items.html', function() {
        var $grid1 = $('.grid1').isotope({
            itemSelector: '.grid-item1',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 10
            },
            getSortData: {
                alphabetical: '[data-name]',
                quality: '[data-quality]',
                type: '[data-type]'
            },
            transitionDuration: 0
        });

        var $grid2 = $('.grid2').isotope({
            itemSelector: '.grid-item2',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 10
            },
            getSortData: {
                alphabetical: '[data-name]',
                quality: '[data-quality]',
                type: '[data-type]'
            },
            transitionDuration: 0
        });

        // David DeSandro's hideReveal plugin for isotope.js
        // http://codepen.io/desandro/pen/drpJK/
        $.fn.hideReveal = function(options) {
            options = $.extend({
                filter: '*',
                hiddenStyle: {
                    opacity: 0.1
                },
                visibleStyle: {
                    opacity: 1
                }
            }, options);
            this.each(function() {
                var $items = $(this).children();
                var $visible = $items.filter(options.filter);
                var $hidden = $items.not(options.filter);
                // reveal visible
                $visible.animate(options.visibleStyle, 0);
                // hide hidden
                $hidden.animate(options.hiddenStyle, 0);
            });
        };

        $('.sort-by-button-group').on('click', 'a#sort', function() {
            var sortValue = $(this).attr('data-sort-value');
            sortValue = sortValue.split(',');
            $grid1.isotope({ sortBy: sortValue });
            $grid2.isotope({ sortBy: sortValue });
        });
        $('.button-group').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'a#sort', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });

        // Escape all RegEx reserved characters from string
        function escRegExp(str) {
            return str.replace("/\W+/g", "");
        }

        // David DeSandro's search, modified to search full contents of
        // element
        var $search = $('.form-control').keyup(debounce(function() {
            qsRegex = new RegExp(escRegExp($search.val()), 'gi');
            $grid1.hideReveal({
                filter: function() {
                    return qsRegex ? $(this).text().match(qsRegex) : true;
                }
            });
            $grid2.hideReveal({
                filter: function() {
                    return qsRegex ? $(this).text().match(qsRegex) : true;
                }
            });
        }, 200));

        // debounce so filtering doesn't happen every millisecond
        function debounce(fn, threshold) {
            var timeout;
            return function debounced() {
                if (timeout) {
                    clearTimeout(timeout);
                }

                function delayed() {
                    fn();
                    timeout = null;
                }
                timeout = setTimeout(delayed, threshold || 100);
            }
        }

        // Copy description to sidebar on hover
        var $sidebar = $('#itemInfo');
        $('.grid-item1, .grid-item2').hover(function() {
            var $div = $('<div />');
            var $header = $('<h2 />');
            var $itemHTML = $(this).clone();
            var $itemName = $itemHTML.find('.modal-title').html();
            var $itemDesc = $itemHTML.find('.modal-body').html();

            $header.append($itemName);
            $div.append($header);
            $div.append($itemDesc);
            $sidebar.html($div);
        });
    });
});
