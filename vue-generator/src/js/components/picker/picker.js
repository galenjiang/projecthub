module.exports = {
    name: 'mt-picker',

    template: ' <div class="picker" :class="{ \'picker-3d\': rotateEffect }">' +
        '<div class="picker-toolbar" v-if="showToolbar"><slot></slot></div>' +
        '<div class="picker-items">' +
        '<picker-slot ' +
        'v-for="slot in slots" ' +
        ':values="slot.values || []" ' +
        ':text-align="slot.textAlign || \'center\'" ' +
        ':visible-item-count="visibleItemCount" ' +
        ':class-name="slot.className" ' +
        ':flex="slot.flex" ' +
        ':value.sync="values[slot.valueIndex]" ' +
        ':rotate-effect="rotateEffect" ' +
        ':divider="slot.divider" ' +
        ':content="slot.content">' +
        '</picker-slot>' +
        '<div class="picker-center-highlight"></div>' +
        '</div>' +
        '</div>',

    props: {
        slots: {
            type: Array
        },
        showToolbar: {
            type: Boolean,
            default: false
        },
        visibleItemCount: {
            type: Number,
            default: 5
        },
        rotateEffect: {
            type: Boolean,
            default: false
        }
    },

    // 获取非divider的值，返回数组this.values
    beforeCompile: function() {
        var slots = this.slots || [];
        this.values = [];
        var values = this.values;
        var valueIndexCount = 0;
        slots.forEach(function(slot) {
            if (!slot.divider) {
                slot.valueIndex = valueIndexCount++;
                values[slot.valueIndex] = (slot.values || [])[0];
            }
        });
    },

    methods: {
        getSlot: function(slotIndex) {
            var slots = this.slots || [];
            var count = 0;
            var target;
            var children = this.$children;

            slots.forEach(function(slot, index) {
                if (!slot.divider) {
                    if (slotIndex === count) {
                        target = children[index];
                    }
                    count++;
                }
            });

            return target;
        },
        getSlotValue: function(index) {
            var slot = this.getSlot(index);
            if (slot) {
                return slot.value;
            }
            return null;
        },
        setSlotValue: function(index, value) {
            var slot = this.getSlot(index);
            if (slot) {
                slot.value = value;
            }
        },
        getSlotValues: function(index) {
            var slot = this.getSlot(index);
            if (slot) {
                return slot.values;
            }
            return null;
        },
        setSlotValues: function(index, values) {
            var slot = this.getSlot(index);
            if (slot) {
                slot.values = values;
            }
        },
        getValues: function() {
            return this.values;
        },
        setValues: function(values) {
            var slotCount = this.slotCount;
            values = values || [];
            if (slotCount !== values.length) {
                throw new Error('values length is not equal slot count.');
            }
            values.forEach(function(value, index) {
                this.setSlotValue(index, value);
            }.bind(this));
        }
    },

    events: {
        slotValueChange: function() {
            this.$emit('change', this, this.values);
        }
    },

    computed: {
        values: function() {
            var slots = this.slots || [];
            var values = [];
            slots.forEach(function(slot) {
                if (!slot.divider) values.push(slot.value);
            });

            return values;
        },
        slotCount: function() {
            var slots = this.slots || [];
            var result = 0;
            slots.forEach(function(slot) {
                if (!slot.divider) result++;
            });
            return result;
        }
    },

    components: {
        PickerSlot: require('./picker-slot')
    }
};
