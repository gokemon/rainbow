(function () {
    'use strict';

    angular.module('app.nav')
        .directive('toggleNavCollapsedMin', ['$rootScope', toggleNavCollapsedMin])
        .directive('accordionNav', accordionNav)
        .directive('highlightActive', highlightActive)
        .directive('toggleOffCanvas', toggleOffCanvas)
        .directive('autoCloseMobileSidebar', ['$rootScope', '$timeout', autoCloseMobileSidebar]);

    // swtich for mini style NAV, realted to 'collapseNav' directive
    function toggleNavCollapsedMin($rootScope) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {
            var app;

            app = $('#app');

            ele.on('click', function(e) {
                if (app.hasClass('nav-collapsed-min')) {
                    app.removeClass('nav-collapsed-min');
                } else {
                    app.addClass('nav-collapsed-min');
                    $rootScope.$broadcast('nav:reset');
                }
                return e.preventDefault();
            });            
        }
    }

    // for accordion/collapse style NAV
    function accordionNav() {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {
            var $app,
                $nav,
                $window,
                slideTime,
                $lists,
                $listsRest,
                $As,
                Timer,
                prevWidth,
                updateClass;

            // on click, open it's own ul, close sibling li opened ul & sub ul
            // on click, close it's own ul & sub ul

            $nav = $(ele[0]);
            $app = $('#app');
            $window = $(window);
            slideTime = 250;
            $lists = ele.find('ul').parent('li'); // lists has ul
            $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>');
            $As = $lists.children('a');

            // Disable a link that has ul
            $As.on('click', function(event) {
                event.preventDefault();
            });

            // Accordion nav
            $nav.on('click', function(e) {
                // Disable it when nav is in "collapsed min nav" mode
                if ($app.hasClass('nav-collapsed-min')) {
                    return;
                }

                var target = e.target;
                var $parentLi = $(target).closest('li') // closest, insead of parent, so it still works when click on i icons
                if (!$parentLi.length) return; // return if doesn't click on li
                var $subUl = $parentLi.children('ul')


                // var depth = $subUl.parents().length; // but some li has no sub ul, so...
                var depth = $parentLi.parents().length + 1;
                
                // filter out all elements (except target) at current depth or greater
                var allAtDepth = $('#nav ul').filter(function() {
                    if($(this).parents().length >= depth && this !== $subUl.get(0)) {
                        return true; 
                    }
                })
                allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

                // Toggle target 
                if ( $parentLi.has('ul').length ) {
                    $parentLi.toggleClass('open');
                }
                $subUl.slideToggle(slideTime);

            })

            // On nav reset
            scope.$on('nav:reset', function(event) {
                $lists.removeClass('open').find('ul').slideUp(slideTime);
            });

            // On window resize
            Timer = void 0;
            prevWidth = $window.width();

            updateClass = function() {
                var currentWidth;
                currentWidth = $window.width();
                if (currentWidth < 768) {
                    $app.removeClass('nav-collapsed-min');
                }
                if (prevWidth < 768 && currentWidth >= 768) {
                    $lists.removeClass('open').find('ul').slideUp(slideTime);
                }
                prevWidth = currentWidth;
            };

            $window.resize(function() {
                var t;
                clearTimeout(t);
                t = setTimeout(updateClass, 300);
            });
          
        }
    }

    // Add 'active' class to li based on url, muli-level supported, jquery free
    function highlightActive() {
        var directive = {
            restrict: 'A',
            controller: [ '$scope', '$element', '$attrs', '$location', toggleNavCollapsedMinCtrl]
        };

        return directive;

        function toggleNavCollapsedMinCtrl($scope, $element, $attrs, $location) {
            var highlightActive, links, path;

            links = $element.find('a');

            path = function() {
                return $location.path();
            };

            highlightActive = function(links, path) {
                path = '#' + path;
                return angular.forEach(links, function(link) {
                    var $li, $link, href;
                    $link = angular.element(link);
                    $li = $link.parent('li');
                    href = $link.attr('href');
                    if ($li.hasClass('active')) {
                        $li.removeClass('active');
                    }
                    if (path.indexOf(href) === 0) {
                        return $li.addClass('active');
                    }
                });
            };

            highlightActive(links, $location.path());

            $scope.$watch(path, function(newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                return highlightActive(links, $location.path());
            });

        }

    }

    // toggle on-canvas for small screen, with CSS
    function toggleOffCanvas() {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {
            var $app = $('#app');

            ele.on('click', function() {
                $app.toggleClass('on-canvas');
            });         
        }
    }

    // Mobile only: automatically close sidebar on route change. 
    // require ui-router
    function autoCloseMobileSidebar($rootScope, $timeout) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, el) {
            var $app = $('#app');

            // `$stateChangeSuccess` for ui-router, `routeChangeSuccess` for ng-route
            $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
                $timeout(function() {
                    // .sidebar-mobile-open is mobile specific, add/remove it on desktop won't have any side effect
                    $app.removeClass('on-canvas');
                }, 0)
            });
        }
    }

})(); 



