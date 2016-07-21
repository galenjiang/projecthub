var draggable = require('./draggable');
var translateUtil = require('./translate');
var windDom = require('wind-dom');
var addClass = windDom.addClass;
var removeClass = windDom.removeClass;
var once = windDom.once;
require('raf.js');

var rotateElement = function(element, angle) {
    if (!element) return;
    var transformProperty = translateUtil.transformProperty;

    element.style[transformProperty] = element.style[transformProperty].replace(/rotateX\(.+?deg\)/gi, '') + ' rotateX(' + angle + 'deg)';
};

var ITEM_HEIGHT = 36;
var VISIBLE_ITEMS_ANGLE_MAP = {
    3: -45,
    5: -20,
    7: -15
};

module.exports = {

    template: '  <div class="picker-slot {{classNames}}" :style="{ flex: flex }">' +
        '<div v-if="!divider" v-el:wrapper class="picker-slot-wrapper" :class="{ dragging: dragging }" :style="{ height: contentHeight + \'px\' }">' +
        '<div class="picker-item" v-for="itemValue in values" :class="{ \'picker-selected\': itemValue === value }">{{ itemValue }}</div>' +
        '</div>' +
        '<div v-if="divider">{{ content }}</div>' +
        '</div>',

    props: {
        values: {
            type: Array,
            default: function() {
                return [];
            }
        },
        value: {},
        visibleItemCount: {
            type: Number,
            default: 5
        },
        rotateEffect: {
            type: Boolean,
            default: false
        },
        divider: {
            type: Boolean,
            default: false
        },
        textAlign: {
            type: String,
            default: 'center'
        },
        flex: {},
        className: {},
        content: {}
    },

    data: function() {
        return {
            dragging: false,
            animationFrameId: null
        };
    },

    computed: {
        classNames: function() {
            var PREFIX = 'picker-slot-';
            let resultArray = [];

            if (this.rotateEffect) {
                resultArray.push(PREFIX + 'absolute');
            }

            let textAlign = this.textAlign || 'center';
            resultArray.push(PREFIX + textAlign);

            if (this.divider) {
                resultArray.push(PREFIX + 'divider');
            }

            if (this.className) {
                resultArray.push(this.className);
            }

            return resultArray.join(' ');
        },
        contentHeight: function() {
            return ITEM_HEIGHT * this.visibleItemCount;
        },
        valueIndex: function() {
            return this.values.indexOf(this.value);
        },
        dragRange: function() {
            var values = this.values;
            var visibleItemCount = this.visibleItemCount;

            return [-ITEM_HEIGHT * (values.length - Math.ceil(visibleItemCount / 2)), ITEM_HEIGHT * Math.floor(visibleItemCount / 2)];
        }
    },

    methods: {
        value2Translate: function(value) {
            var values = this.values;
            var valueIndex = values.indexOf(value);
            var offset = Math.floor(this.visibleItemCount / 2);

            if (valueIndex !== -1) {
                return (valueIndex - offset) * -ITEM_HEIGHT;
            }
        },

        translate2Value: function(translate) {
            translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT;
            var index = -(translate - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) / ITEM_HEIGHT;

            return this.values[index];
        },

        updateRotate: function(currentTranslate, pickerItems) {
            if (this.divider) return;
            var dragRange = this.dragRange;
            var wrapper = this.$els.wrapper;

            if (!pickerItems) {
                pickerItems = wrapper.querySelectorAll('.picker-item');
            }

            if (currentTranslate === undefined) {
                currentTranslate = translateUtil.getElementTranslate(wrapper).top;
            }

            var itemsFit = Math.ceil(this.visibleItemCount / 2);
            var angleUnit = VISIBLE_ITEMS_ANGLE_MAP[this.visibleItemCount] || -20;

            [].forEach.call(pickerItems, function(item, index) {
                var itemOffsetTop = index * ITEM_HEIGHT;
                var translateOffset = dragRange[1] - currentTranslate;
                var itemOffset = itemOffsetTop - translateOffset;
                var percentage = itemOffset / ITEM_HEIGHT;

                var angle = angleUnit * percentage;
                if (angle > 180) angle = 180;
                if (angle < -180) angle = -180;

                rotateElement(item, angle);

                if (Math.abs(percentage) > itemsFit) {
                    addClass(item, 'picker-item-far');
                } else {
                    removeClass(item, 'picker-item-far');
                }
            });
        },

        planUpdateRotate: function() {
            var el = this.$els.wrapper;
            cancelAnimationFrame(this.animationFrameId);

            this.animationFrameId = requestAnimationFrame(function() {
                this.updateRotate();
            }.bind(this));

            once(el, translateUtil.transitionEndProperty, function() {
                this.animationFrameId = null;
                cancelAnimationFrame(this.animationFrameId);
            }.bind(this));
        },

        initEvents: function() {
            var el = this.$els.wrapper;
            var dragState = {};

            var velocityTranslate, velocityTime, prevTranslate, pickerItems;
            var _self = this;
            draggable(el, {
                start: function(event) {
                    cancelAnimationFrame(this.animationFrameId);
                    this.animationFrameId = null;
                    dragState = {
                        range: this.dragRange,
                        start: new Date(),
                        startLeft: event.pageX,
                        startTop: event.pageY,
                        startTranslateTop: translateUtil.getElementTranslate(el).top
                    };
                    pickerItems = el.querySelectorAll('.picker-item');
                }.bind(_self),

                drag: function(event) {
                    this.dragging = true;

                    dragState.left = event.pageX;
                    dragState.top = event.pageY;

                    var deltaY = dragState.top - dragState.startTop;
                    var translate = dragState.startTranslateTop + deltaY;

                    translateUtil.translateElement(el, null, translate);

                    velocityTranslate = translate - prevTranslate || translate;
                    velocityTime = Date.now();

                    prevTranslate = translate;

                    if (this.rotateEffect) {
                        this.updateRotate(prevTranslate, pickerItems);
                    }
                }.bind(_self),

                end: function() {
                    this.dragging = false;

                    var momentumRatio = 7;
                    var currentTranslate = translateUtil.getElementTranslate(el).top;
                    var duration = new Date() - dragState.start;

                    var momentumTranslate;
                    if (duration < 300) {
                        momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
                    }

                    var dragRange = dragState.range;

                    Vue.nextTick(function() {
                        var translate;
                        if (momentumTranslate) {
                            translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
                        } else {
                            translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
                        }

                        translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);

                        translateUtil.translateElement(el, null, translate);

                        this.value = this.translate2Value(translate);

                        if (this.rotateEffect) {
                            this.planUpdateRotate();
                        }
                    }.bind(this));

                    dragState = {};
                }.bind(_self)
            });
        },

        doOnValueChange: function() {
            var value = this.value;
            var wrapper = this.$els.wrapper;

            translateUtil.translateElement(wrapper, null, this.value2Translate(value));
        },

        doOnValuesChange: function() {
            var el = this.$el;
            var items = el.querySelectorAll('.picker-item');
            [].forEach.call(items, function(item, index) {
                translateUtil.translateElement(item, null, ITEM_HEIGHT * index);
            }.bind(this));
            if (this.rotateEffect) {
                this.planUpdateRotate();
            }
        }
    },

    ready: function() {
        this.ready = true;

        if (!this.divider) {
            this.initEvents();
            this.doOnValueChange();
        }

        if (this.rotateEffect) {
            this.doOnValuesChange();
        }

    },

    watch: {
        values: function(newVal) {
            if (this.valueIndex === -1) {
                this.value = (newVal || [])[0];
            }
            if (this.rotateEffect) {
                Vue.nextTick(function() {
                    this.doOnValuesChange();
                }.bind(this));
            }
        },
        value: function() {
            this.doOnValueChange();
            if (this.rotateEffect) {
                this.planUpdateRotate();
            }
            this.$dispatch('slotValueChange', this);
        }
    }
};
