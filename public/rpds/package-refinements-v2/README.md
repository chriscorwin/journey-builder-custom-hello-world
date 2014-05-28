RPD Tool
===

Rapid Pictorial Demos Tool

Overview
----

This is an Ultra Rapid "Prototyping" tool. It allows you to take screenshots (of, say, PDFs) and very quickly build an HTML page by placing those screenshots on the page. It allows for tying JS paradigms to images without programming, such as hover effects, boilerplate click events (hide/show/swapWith), and drag/drop.

The HTML/CSS/JS generated with this prototype is absolutely absurdly unusable in any end product. You can access the HTML in the console. Copy/Paste it into the index.html file in the "canvas" div to persist it (this is a stop-gap).

All images for the prototype must be placed in the img/ directory.


* Elements
 * Complex "elements". These are divs with bg images and all sorts of setable classes/js events etc. They size themselves based on the size of the main image assigned (assigning an image is not optional)

* Groups
 * Simple divs used explicitly to organize elements (show/hide groups, etc). These are resizable through jQuery UI resize handles.


Getting Started
-----

1. Download the code
 * Either click "Download Zip" (to the right) or "Clone to Desktop" (if you have Github desktop installed) or use the clone URL in the terminal (if you don't know what I'm talking about, then the clone URL isn't for you ;) )
1. Take screenshots/pictures
 * Isolate all of the elements that you want to make interactive.
 * If you are confused about how to break your piece up, remember that each interaction point must be isolated in its own image. So, if you have an element that you want two separate dropzones on, that is actually two different elements.
 * Make sure you get a shot of each state for each element (normal, hovered, highlighted, etc).
1. Locate "index.html"
1. Open "index.html" in a code editor (do NOT use MS Word or the like. Try [Sublime Text](http://www.sublimetext.com/3))
1. Locate this line in the code for future reference:
 ```HTML
			<!-- copy/paste your code BELOW here -->

 ```
1. Double click "index.html" to open in a browser (please use Chrome)
1. Add an element using the GUI (just do ONE for now!)
1. Position your element where you would like it to be
1. Open Chrome's JavaScript console (mac: Alt+Cmd+J, pc: Ctrl+Shft+Jx)
1. Click the "Show Source" button on the page (below the "Add Element" button)
 * The "source" will be printed to the console
1. Copy all of the code printed out below the `<!-- copy/paste your code BELOW here -->`
 * Pay special attention that if you have clicked the "Show Source" button multiple times that you only copy the code from the most recent console print
1. Go back to the "index.html" file in your editor
1. Paste the code you copied below the `<!-- copy/paste your code BELOW here -->` line in the file
1. save
1. refresh the browser.
 * Your element should be persisted and viewable now.
1. Rinse/Repeat.
 * Once you copy out the code and refresh the page the element will no longer be re-positionable (unless you specified that it was draggable)


Keyboard Shortcuts
--------
Cmd + Backspace: delete element
Cmd + z: undo *last* delete
Cmd + h: hide element


Using For Testing
------

Once you have all of your elements etc on the page and feel like you are ready to use it for testing:

1. Make sure you have copied the generated code into the `index.html` file (see "Getting Started" above)
2. Locate the `<body>` tag in the `index.html` file
3. Remove ` class="dev"` from the body tag
4. Save
5. The "dev pallet" will now be gone when you open `index.html` in the browser
6. You can share this entire folder with someone (you can not just share the `index.html` file) for testing


Hosting on Dropbox
-----
You can use dropbox to quickly share the test and host it live in the browser. Beware that there will be interaction delays as the images for hovers, etc, are downloaded for the user. This will probably be distracting and confusing, so make sure you adequately prepare/warn the user about this.

1. create a `public` directory in the root of your dropbox account
2. create a `site` directory in the `public` directory you just created
3. place the directory containing the project inside of the `site` directory you just created
4. right-click on the `index.html` file and get the "share link"
5. paste that link in the browser to test it
6. share to your heart's content
 * Beware that all interactions will have a delay that will most likely distract and confuse the user if you use this drop-box solution
