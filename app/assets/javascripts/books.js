$(function () {
    new Viewer();
});

// todo 设计消息提醒组件，替换文件中的console输出

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
            var editor = this;
            $list.on("click", "a.rename-book", function () {
                var $tr = $(this).parents("tr");
                $tr.find(".book-name").hide();
                $tr.find(".rename-input").show().focus();
                return false;
            });
            $list.on("keydown", ".rename-input.rename-book", function (evt) {
                if (evt.keyCode == 13) {
                    editor.renameBook($(this));
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
                // todo 删除笔记本
                var book_id = $(this).parents("tr.book-line").find(".book-id").val();
                editor.deleteBook(book_id);
            });
            $list.on("click", ".move-book", function () {
                // todo 移动笔记本
            });
        },
        initPostOperator: function () {
            var editor = this;
            var $list = $("table.list");
            $list.on("click", "a.rename-post", function () {
                var $tr = $(this).parents("tr");
                $tr.find(".post-title").hide();
                $tr.find(".rename-input").show().focus();
                return false;
            });
            $list.on("keydown", ".rename-input.rename-post", function (evt) {
                if (evt.keyCode == 13) {
                    editor.renamePost($(this));
                }
            });
            $list.on("focusout", ".rename-input.rename-post", function (evt) {
                var $post_name = $(this).parents("tr").find(".post-title");
                var post_name = $post_name.text();
                $(this).hide();
                $post_name.show();
                $(this).val(post_name);
            });
            $list.on("click", ".delete-post", function () {
                // todo 删除笔记

            });
            $list.on("click", ".move-post", function () {
                // todo 移动笔记
            });
        },
        initToolBarButtons: function () {
            var editor = this;
            $(".toolbar .new-book-btn").click(function () {
                editor.showNewBookWin("", "");
                return false;
            });
        },
        initNewBookWin: function () {
            var editor = this;
            var $win = $(".new-book-win");
            var $close_btn = $win.find(".close-btn");
            var $cancel_btn = $win.find(".cancel");
            var $sure_btn = $win.find(".sure");
            $close_btn.click(function () {
                $win.hide();
            });
            $sure_btn.click(function () {
                editor.createBook();
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
        createBook: function () {
            // todo
            var $win = $(".new-book-win");
            var book_name = $win.find(".book-name").val();
            if (book_name) {
                $.post("/books", {book: {name: book_name}},function (data) {
                    console.log(data);
                    var $table = $("table.list");
                    // todo 将book-line制作为模板
                    var $book_line = $table.find("tr.book-line").first().clone();
                    $book_line.addClass("book-" + data.id);  // todo remember to remove the class book-*
                    $book_line.find("a.book-name").text(data.name).attr("href", "/books/" + data.id);
                    $book_line.find(".book-id").val(data.id);
                    $book_line.find(".rename-input.rename-book").val(data.name);
                    $table.find("tbody").append($book_line);
                    $win.hide();
                }, "json").error(function () {
                        console.error("error occurs when creating the book.");
                    }
                );
            } else {
                console.error("please enter the book name.");
            }
        },
        deleteBook: function (book_id) {
            if (book_id) {
                $.ajax({
                    type: "delete",
                    url: "/books/" + book_id,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        $("table.list .book-" + book_id).remove();
                    },
                    error: function () {
                        console.error("error occurs when deleting the book.")
                    }
                });
            } else {
                console.error("the id of the book is null, can't rename it!");
            }
        },
        renameBook: function ($obj) {
            var book_id = $obj.siblings(".book-id").val();
            var book_name = $obj.val();
            if (book_id) {
                $.ajax({
                    type: "put",
                    url: "/books/" + book_id,
                    data: {book: {name: book_name}},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        $obj.hide();
                        $obj.siblings("a.book-name").text(book_name).show();
                    },
                    error: function () {
                        console.error("error occurs when renaming the book name.")
                    }
                });
            } else {
                console.error("the id of the book is null, can't rename it!");
            }
        },
        renamePost: function ($obj) {
            var post_id = $obj.siblings(".post-id").val();
            var post_name = $obj.val();
            if (post_id) {
                $.ajax({
                    type: "put",
                    url: "/posts/" + post_id,
                    data: {post: {title: post_name}},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        $obj.hide();
                        $obj.siblings("a.post-title").text(post_name).show();
                    },
                    error: function () {
                        console.error("error occurs when renaming the post name.")
                    }
                });
            } else {
                console.error("the id of the post is null, can't rename it!");
            }
        }
    };
    window.Viewer = Viewer;
})(jQuery);