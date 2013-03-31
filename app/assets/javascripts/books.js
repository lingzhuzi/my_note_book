$(function () {
    new Viewer();
});

(function ($) {
    function Viewer() {
        this.init();
    }

    Viewer.prototype = {
        init: function () {
            this.initHoverLineEvent();
            this.initClickLineEvent();
            this.initClickCheckboxEvent();
            this.initToolBarButtons();
            this.initNewBookWin();
            this.initBookOperator();
            this.initPostOperator();
        },
        initHoverLineEvent: function () {
            var $list = $("table.list");
            $list.on("mouseenter", "tr", function () {
                $(this).addClass("hover");
                $(this).find("td.operate-bar a").show();
            });
            $list.on("mouseleave", "tr", function () {
                $(this).removeClass("hover");
                $(this).find("td.operate-bar a").hide();
            });

        },
        initClickLineEvent: function () {
            var $list = $("table.list");
            $list.on("click", "tr", function () {
                $("table.list .selected").removeClass("selected");
                $(this).addClass("selected");
                $(this).find(".checkbox").addClass("selected");
            });
            $list.on("focusout", "tr", function () {
                console.log("2");
            });
        },
        initClickCheckboxEvent: function () {
            $("table.list").on("click", "span.checkbox", function () {
                $(this).addClass("selected");
                $(this).parents("tr").addClass("selected");
                return false;
            });
        },
        initBookOperator: function () {
            var $list = $("table.list");
            $list.on("click", "a.rename-book", function () {
                var $tr = $(this).parents("tr");
                $tr.find(".book-name").hide();
                $tr.find(".rename-input").show().focus();
                return false;
            });
            $list.on("keydown", ".rename-input.rename-book", function (evt) {
                if (evt.keyCode == 13) {
                    console.log("00000"); // todo
                }
            });
            $list.on("focusout", ".rename-input.rename-book", function (evt) {
                var $book_name = $(this).parents("tr").find(".book-name");
                var book_name = $book_name.text();
                $(this).hide();
                $book_name.show();
                $(this).val(book_name);
            });
            $list.on("click", ".delete-book", function () {
                // todo
            });
            $list.on("click", ".move-book", function () {
                // todo
            });
        },
        initPostOperator: function () {
            var $list = $("table.list");
            $list.on("click", "a.rename-post", function () {
                var $tr = $(this).parents("tr");
                $tr.find(".post-name").hide();
                $tr.find(".rename-input").show().focus();
                return false;
            });
            $list.on("keydown", ".rename-input.rename-post", function (evt) {
                if (evt.keyCode == 13) {
                    console.log("00000"); // todo
                }
            });
            $list.on("focusout", ".rename-input.rename-post", function (evt) {
                var $post_name = $(this).parents("tr").find(".post-name");
                var post_name = $post_name.text();
                $(this).hide();
                $post_name.show();
                $(this).val(post_name);
            });
            $list.on("click", ".delete-post", function () {
                // todo
            });
            $list.on("click", ".move-post", function () {
                // todo
            });
        },
        initToolBarButtons: function () {
            $(".toolbar .new-book-btn").click(function () {
                this.showNewBookWin("", "");
                return false;
            });
        },
        initNewBookWin: function () {
            var $win = $(".new-book-win");
            var $close_btn = $win.find(".close-btn");
            var $cancel_btn = $win.find(".cancel");
            var $sure_btn = $win.find(".sure");
            $close_btn.click(function () {
                $win.hide();
            });
            $sure_btn.click(function () {
                this.saveBook();
            });
            $cancel_btn.click(function () {
                $win.hide();
            });
        },
        showNewBookWin: function (book_name, book_id) {
            var $win = $(".new-book-win");
            var $window = $(window);
            var left = ($window.width() - $win.width()) / 2;
            var top = ($window.height() - $win.height()) / 2;
            $win.find(".book-id").val(book_id);
            $win.find(".book-name").val(book_name);
            $win.css({left: left, top: top});
            $win.show();
        },
        saveBook: function () {
            // todo
        }
    };
    window.Viewer = Viewer;
})(jQuery);