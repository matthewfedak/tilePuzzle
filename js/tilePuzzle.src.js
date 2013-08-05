/*
    tilePuzzle.src.js
    
    - A simple tile puzzle jQuery plugin by @matthewfedak
*/
(function ($) {

    "use strict";

    $.fn.tilePuzzle = function (options) {

        var self = $(this);

        var defaults = {
            keyAccess: false,
            tileContainerClass: 'tiles',
            level: 4
        };

        var construct = {

            container : null,

            imageDimensions : {},

            numTiles: {},

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

                _this.container.on('click', 'li', function(){
                    
                    _this.moveTile($(this), $(this).css('top'), $(this).css('left'));

                });

                return _this;

            },

            loadRemoteImage : function () {

                var _this = this;

                var img = new Image();

                img.onload = function(){

                    _this.imageDimensions = { 'width': this.width, 'height': this.height };

                    _this.createTiles();

                };

                img.src = tilePuzzle.imageUrl;

                return _this;

            },

            createTiles : function () {

                var _this = this;

                _this.tileDimensions = {
                    'width': Math.abs(_this.imageDimensions.width/tilePuzzle.level),
                    'height': Math.abs(_this.imageDimensions.height/tilePuzzle.level)
                };

                for(var x = 0, n = 0, t = 0;t<tilePuzzle.level*tilePuzzle.level;t++){

                    _this.container.append(
                        $('<li/>').css({
                            'width': _this.tileDimensions.width,
                            'height': _this.tileDimensions.height,
                            'background-image': 'url('+tilePuzzle.imageUrl+')',
                            'background-position-y':'-'+(x*_this.tileDimensions.height)+'px',
                            'background-position-x': '-'+(t*this.tileDimensions.width)+'px',
                            'top':(x*_this.tileDimensions.height)+'px',
                            'left':(n*_this.tileDimensions.width)+'px'
                            })
                    );
                    
                    n++;

                    if (((t+1) % tilePuzzle.level) === 0) {
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

                var _this, i, tile1, tile2, tile1Position;

                _this = this;

                limit = limit*limit;

                for(i = 0;i<limit;i++){

                    tile1 = _this.container.children().eq(Math.floor((Math.random()*(tilePuzzle.level*tilePuzzle.level))+1));

                    tile2 = _this.container.children().eq(Math.floor((Math.random()*(tilePuzzle.level*tilePuzzle.level))+1));
                    
                    tile1Position = { 'top':tile1.css('top'), 'left':tile1.css('left') };

                    tile1.css({
                        'top': tile2.css('top'),
                        'left': tile2.css('left')
                    });

                    tile2.css({
                        'top': tile1Position.top,
                        'left': tile1Position.left
                    });

                }

            },

            moveTile: function (tile, top, left) {
                
                var _this, topDistance, leftDistance, newSparePosition;

                _this = this;

                topDistance = Math.abs(parseInt(top)-parseInt(_this.spareTile.css('top')));

                leftDistance = Math.abs(parseInt(left)-parseInt(_this.spareTile.css('left')));

                if((leftDistance+topDistance) <= _this.tileDimensions.width || (leftDistance+topDistance) <= _this.tileDimensions.height){

                    tile.css({
                        'top':_this.spareTile.css('top'),
                        'left':_this.spareTile.css('left')
                    });

                    _this.spareTile.css({
                        'left':left,
                        'top':top
                    });

                }
            }
        };

        var tilePuzzle = $.extend(construct, defaults, options);

        tilePuzzle.init();

        return self;
    };

})( jQuery );