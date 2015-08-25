/*
 * tilePuzzle.src.js
 *
 * A simple tile puzzle jQuery plugin by @matthewfedak
 *
 */

/*jslint browser: true*/
/*global $, jQuery, alert*/

(function ($) {

    "use strict";

    $.fn.tilePuzzle = function (options) {

        var self = $(this);

        var tilePuzzle = null;

        var defaults = {
            keyAccess: false,
            tileContainerClass: 'tiles',
            level: 4,
            maxWidth: 600
        };

        var construct = {

            container : null,

            imageDimensions : {},

            tileDimensions : {},

            spareTile: null,

            init : function () {

                var _this = this;

                _this.container = $('<ul/>').addClass(tilePuzzle.tileContainerClass);

                self.append(_this.container);

                if (tilePuzzle.level < 3) {

                    tilePuzzle.level = 3;
                }

                _this.loadRemoteImage();

                _this.container.on('click', 'li', function () {

                    _this.moveTile($(this), $(this).css('top'), $(this).css('left'));

                });

                return _this;

            },

            loadRemoteImage : function () {

                var _this = this;

                var img = new Image();

                img.onload = function () {

                    _this.imageDimensions = { 'width': this.width, 'height': this.height };

                    if (_this.imageDimensions.width > _this.maxWidth) {

                        var newHeight = (_this.maxWidth / _this.imageDimensions.width) * this.height;
                        _this.imageDimensions.width = _this.maxWidth;
                        _this.imageDimensions.height = newHeight;

                    }

                    _this.createTiles();

                };

                img.src = tilePuzzle.imageUrl;

                return _this;

            },

            createTiles : function () {

                var _this = this;
                var x, n, t = null;

                _this.tileDimensions = {
                    'width': Math.abs(_this.imageDimensions.width / tilePuzzle.level),
                    'height': Math.abs(_this.imageDimensions.height / tilePuzzle.level)
                };

                for (x = 0, n = 0, t = 0; t < tilePuzzle.level * tilePuzzle.level; t++) {

                    _this.container.append(
                        $('<li/>').css({
                            'width': _this.tileDimensions.width,
                            'height': _this.tileDimensions.height,
                            'background-image': 'url(' + tilePuzzle.imageUrl + ')',
                            'background-position': '-' + (t * this.tileDimensions.width) + 'px -' + (x * _this.tileDimensions.height) + 'px',
                            'background-size': _this.imageDimensions.width + 'px ' + _this.imageDimensions.height + 'px',
                            'top': (x * _this.tileDimensions.height) + 'px',
                            'left': (n * _this.tileDimensions.width) + 'px'
                        })
                    );

                    n++;

                    if (((t + 1) % tilePuzzle.level) === 0) {
                        x++;
                        n = 0;
                    }

                }

                _this.container
                    .children(':last-child')
                    .addClass('spare');

                _this.spareTile = _this.container.find('.spare');

                self.css({
                    'width': _this.imageDimensions.width,
                    'height': _this.imageDimensions.height
                }).fadeIn();

                _this.scrambleTiles(tilePuzzle.level);

                return _this;

            },

            scrambleTiles : function (limit) {

                var _this, i, tile1, tile2, tile1Position, timer;

                _this = this;

                limit = limit * limit;

                i = 0;

                setTimeout(function () {
                    timer = setInterval(function () {

                        tile1 = _this.container.children().eq(Math.floor((Math.random() * (tilePuzzle.level * tilePuzzle.level)) + 1));

                        tile2 = _this.container.children().eq(Math.floor((Math.random() * (tilePuzzle.level * tilePuzzle.level)) + 1));

                        tile1Position = { 'top': tile1.css('top'), 'left': tile1.css('left') };

                        tile1.css({
                            'top': tile2.css('top'),
                            'left': tile2.css('left')
                        });

                        tile2.css({
                            'top': tile1Position.top,
                            'left': tile1Position.left
                        });
                        i++;
                        if (i > limit) {
                            clearInterval(timer);
                        }
                    }, 50);
                }, 1000);

            },

            moveTile: function (tile, top, left) {

                var _this, topDistance, leftDistance;

                _this = this;

                topDistance = Math.abs(parseInt(top, 10) - parseInt(_this.spareTile.css('top'), 10));

                leftDistance = Math.abs(parseInt(left, 10) - parseInt(_this.spareTile.css('left'), 10));

                if ((leftDistance + topDistance) <= Math.round(_this.tileDimensions.width) || (leftDistance + topDistance) <= Math.round(_this.tileDimensions.height)) {

                    tile.css({
                        'top': _this.spareTile.css('top'),
                        'left': _this.spareTile.css('left')
                    });

                    _this.spareTile.css({
                        'left': left,
                        'top': top
                    });

                }
            }
        };

        tilePuzzle = $.extend(construct, defaults, options);

        tilePuzzle.init();

        return self;
    };

}(jQuery));
