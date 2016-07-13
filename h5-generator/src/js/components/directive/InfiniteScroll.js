module.exports = {

    params: [
        "callback",
        "loading"
    ],

    bind: function() {
        this.el.addEventListener("scroll", function() {
            if (this.el.scrollTop + this.el.clientHeight + 10 > this.el.scrollHeight) {
                if (!this.params.loading) {
                    this.params.callback();
                }
            }
        }.bind(this), false)
    }

}
