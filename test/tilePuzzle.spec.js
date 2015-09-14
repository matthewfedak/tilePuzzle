/*global jasmine,it,expect,describe,beforeEach,loadFixtures*/
jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('tilePuzzle jQuery plugin test results', function () {
    var elem;
    var settings = {
        'level': 4, // a level, can be 3+
        'maxWidth': 300, // could also be $(window).width() or width of puzzle container div
        'imageUrl': 'images/cristo-redentor-rio-de-janeiro-brazil.jpg' // URL of an image
    };

    loadFixtures('base.html');
    elem = $('#puzzle').tilePuzzle(settings);

    it('Container should not be empty', function () {
        expect(elem.length).toBe(1);
    });

    it('Container to have width and height css attributes set', function () {
        expect(parseInt(elem.css('width'), 10)).not.toBe(null);
        expect(parseInt(elem.css('height'), 10)).not.toBe(null);
    });

    it('Container to contain unordered list element of tiles', function () {
        expect(elem).toContainElement('ul.tiles');
    });

    it('Number of tiles is the square of level setting', function () {
        expect(elem.children(0).children(0)).toHaveLength(settings.level * settings.level);
    });

    it('Last tile in list has spare class', function () {
        expect(elem.children(0).children(':last')).toHaveClass('spare');
    });

});
