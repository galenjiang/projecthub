import {
    MessageBox,
    toast,
    loading,
    Picker
} from './components'

import draggable from './components/picker/draggable'
import translateUtil from './components/picker/translate'

new Vue({

    el: '#demo',

    components: {
        'mt-picker': Picker
    },

    data: {
        title: 'hello',
        slots: [{
            divider: false,
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'right'
        }, {
            divider: true,
            content: '-',
            className: 'slot2'
        }, {
            divider: false,
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot3',
            textAlign: 'center'
        }, {
            divider: true,
            content: '-',
            className: 'slot2'
        }, {
            divider: false,
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot3',
            textAlign: 'left'
        }]
    },

    methods: {
        onValuesChange(picker, values) {
            console.log(values[0], values[1])
        }
    }

})
