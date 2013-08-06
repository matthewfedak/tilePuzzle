tilePuzzle
==========

tilePuzzle is a simple sliding tile puzzle jQuery Plugin. All you need to do is bind the plugin to an empty div, pass in a level (3+) and an image url and a tilePuzzle will be created.

A live demo is at:

http://matthewfedak.co.uk/tilePuzzle

To do
=========

- Use css animations to slide tiles, with JS fallback when no css transition support avaialble
- Detect touch device and bind to tap not click where possible and possible abiity to drag tiles
- Scramble tiles slower and possibly make into a nicer animation you see after puzzle initialized
- Need to make reponsive so possibly add a redraw function for when a window resize happens. Alternatively re-investigate using % based fluid widths which appeared to be problematic when using for background image positions.  
