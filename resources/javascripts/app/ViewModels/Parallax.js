/**
 * Class Parallax
 */
export default class Parallax {
    /**
     * @type {number}
     */
    height = 800;

    /**
     * @type {Map}
     */
    nodes = new Map();

    /**
     * @type {string}
     */
    text = ko.observable('');

    /**
     * @param context
     */
    constructor(context:HTMLElement) {
        var nodes = context.querySelectorAll('[data-depth]');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            this.nodes.set(node, parseFloat(node.getAttribute('data-depth')));
        }

        window.addEventListener('scroll', event => {
            window.requestAnimationFrame(() => this.checkScroll());
        }, true);
        this.checkScroll();

        setTimeout(() => {
            var message  = ' In Laravel we trust ';
            var interval = setInterval(() => {
                if (this.text().length < message.length) {
                    this.text(this.text() + message.charAt(this.text().length));
                } else {
                    setTimeout(() => {
                        this.text(this.text() + '=');
                        setTimeout(() => {
                            this.text(this.text() + ')');

                            setTimeout(() => {
                                this.text('/' + this.text());
                                setTimeout(() => { this.text('/' + this.text()); }, 200);
                            }, 700);

                        }, 200);
                    }, 500);
                    clearInterval(interval);
                }
            }, 100);
        }, 2000);
    }

    /**
     * @return {void}
     */
    checkScroll() {
        var scrollY = window.pageYOffset;
        if (scrollY > this.height) {
            scrollY = this.height;
        }

        this.setPosition(scrollY);
    }

    /**
     * @param y
     * @return {void}
     */
    setPosition(y) {
        this.nodes.forEach((depth, node) => {
            node.setAttribute('style', Parallax.makeTransformsY(y * depth));
        });
    }

    /**
     * @param position
     * @returns {string}
     */
    static makeTransformsY(position) {
        return [
            `-webkit-transform:translateY(${position}px)`,
            `-khmlt-transform:translateY(${position}px)`,
            `-moz-transform:translateY(${position}px)`,
            `-o-transform:translateY(${position}px)`,
            `-ms-transform:translateY(${position}px)`,
            `transform:translateY(${position}px)`
        ].join(';');
    }
}