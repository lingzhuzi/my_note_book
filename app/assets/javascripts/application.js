// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

(function ($) {
    function Notice(type, msg) {
        this.initMsg(type, msg);
    }

    Notice.prototype = {
        type: "success",
        timer: null,
        show: function () {
            var $msg = $("#operate-message");
            $msg.fadeIn();
            if (this.type == "success") {
                if (this.timer) {
                    window.clearTimeout(this.timer);
                }
                this.timer = window.setTimeout(function () {
                    $msg.fadeOut();
                }, 5000);
            }
        },
        initMsg: function (type, msg) {
            this.type = type;
            var $msg = $("#operate-message");
            $msg.removeClass("success");
            $msg.removeClass("failed");
            $msg.text(msg);
            if (type == "failed") {
                $msg.addClass("failed");
            } else {
                $msg.addClass("success");
            }
            var $win = $(window);
            var left = ($win.width() - $msg.width()) / 2;
            $msg.css({left: left});
        }
    };
    window.Notice = Notice;
})(jQuery);