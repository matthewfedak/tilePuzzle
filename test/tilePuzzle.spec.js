jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('jquery plugin', function() {
    var elem;

    beforeEach(function() {
        loadFixtures('base.html');
        elem = $('#puzzle');
    });

    it('container should not be empty', function() {
        expect(elem.length).toBe(1);
    });

    it('container to have width and height css attributes set', function() {
        expect(parseInt(elem.css('width') , 10)).not.toBe(null);
        expect(parseInt(elem.css('height'), 10)).not.toBe(null);
    });
});
