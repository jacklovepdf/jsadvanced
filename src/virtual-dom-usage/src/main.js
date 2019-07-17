        var h = require('virtual-dom/h');
        var diff = require('virtual-dom/diff');
        var patch = require('virtual-dom/patch');
        var createElement = require('virtual-dom/create-element');

        // 1: Create a function that declares what the DOM should look like
        function render(count)  {
            return h('div', {
                style: {
                    lineHeight: (100) + 'px'
                }
            }, [String(count)]);
        }

        // 2: Initialise the document
        var count = 0;      // We need some app data. Here we just store a count.
        var tree = render(count);               // We need an initial tree, 虚拟dom树；
        console.log('begin render tree====>', tree);
        var rootNode = createElement(tree);     // Create an initial root DOM node, 真实dom树；
        console.log('begin rootNode====>', rootNode);
        document.body.appendChild(rootNode);    // ... and it should be in the document, 将dom树挂载在body上；

        // 3: Wire up the update logic
        setTimeout(function () {
            count = count + 100;
            var newTree = render(count);
            console.log('setInterval newTree====>', newTree);
            var patches = diff(tree, newTree);
            console.log('setInterval patches====>', patches);
            var rootNode1 = patch(rootNode, patches);
            console.log('setInterval rootNode====>', rootNode1);
            tree = newTree;
        }, 3000);