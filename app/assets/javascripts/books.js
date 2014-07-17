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

            $(document).on("mouseenter", "tr", function () {
                $(this).addClass("hover");
                $(this).find("td.operate-bar a").show();
            });
            $(document).on("mouseleave", "tr", function () {
                $(this).removeClass("hover");
                $(this).find("td.operate-bar a").hide();
            });

        },
        initClickLineEvent: function () {

            $(document).on("click", "tr", function () {
                var $tr = $(this);
                if ($tr.hasClass('selected')) {
                    $tr.removeClass('selected');
                    $tr.find(".checkbox").removeClass("selected");
                } else {
                    $tr.addClass("selected");
                    $tr.find(".checkbox").addClass("selected");
                }
            });
            $(document).on("focusout", "tr", function () {
                console.log("2");
            });
        },
        initClickCheckboxEvent: function () {
            $(document).on("click", "span.checkbox", function () {
                $(this).addClass("selected");
                $(this).parents("tr").addClass("selected");
                return false;
            });
        },
        initBookOperator: function () {
            var editor = this;
            $(document).on("click", "a.rename-book", function () {
                var $tr = $(this).parents("tr");
                $tr.find(".book-name").hide();
                $tr.find(".rename-input").show().focus();
                $tr.find('.btn').show();
                return false;
            });
            $(document).on("keydown", ".rename-input.rename-book", function (evt) {
                if (evt.keyCode == 13) {
                    var $tr = $(this).closest('tr'),
                        book_id = $(this).siblings('.book-id').val(),
                        book_name = $(this).val();
                    editor.renameBook(book_id, book_name, $tr);
                }
            });
            $(document).on("click", ".sure_btn", function (evt) {
                var $tr = $(this).closest('tr'),
                    book_id = $tr.find('.book-id').val(),
                    book_name = $tr.find('.rename-input').val();

                editor.renameBook(book_id, book_name, $tr);
            });

            $(document).on("click", ".cancel_btn", function (evt) {
                var $tr = $(this).parents("tr");
                var $book_name = $tr.find(".book-name");
                var book_name = $book_name.text();
                $book_name.show();
                var $input = $tr.find('.rename-input');
                $input.hide();
                $input.val(book_name);
                $tr.find('.btn').hide();
            });
            $(document).on("click", ".delete-book", function () {
                // todo 删除笔记本
                var book_id = $(this).parents("tr.book-line").find(".book-id").val();
                editor.deleteBook(book_id);
            });
            $(document).on("click", ".move-book", function () {
                // todo 移动笔记本
            });
        },
        initPostOperator: function () {
            var editor = this;

            $(document).on("click", "a.rename-post", function () {
                var $tr = $(this).parents("tr");
                $tr.find(".post-title").hide();
                $tr.find(".rename-input").show().focus();
                return false;
            });
            $(document).on("keydown", ".rename-input.rename-post", function (evt) {
                if (evt.keyCode == 13) {
                    editor.renamePost($(this));
                }
            });
            $(document).on("focusout", ".rename-input.rename-post", function (evt) {
                var $post_name = $(this).parents("tr").find(".post-title");
                var post_name = $post_name.text();
                $(this).hide();
                $post_name.show();
                $(this).val(post_name);
            });
            $(document).on("click", ".delete-post", function () {
                // todo 删除笔记

            });
            $(document).on("click", ".move-post", function () {
                // todo 移动笔记
            });
        },
        initToolBarButtons: function () {
            var editor = this, $toolbar = $('.toolbar');
            $toolbar.find(".new-book-btn").click(function () {
                editor.showNewBookWin("", "");
                return false;
            });

            $toolbar.find('.search-btn').click(function () {
                var keyWord = $.trim($('#key_word').val());

                if (keyWord) {
                    $.get('/books/search', {key_word: keyWord}, function (data) {
                        $('.list-content').html(data.res);
                        new Notice("success", "查询成功").show();
                    });
                } else {
                    new Notice("success", "请输入关键字").show();
                }
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
            var parent_book_id = $('#book_id').val();
            if (book_name) {
                $.post("/books", {book: {name: book_name, book_id: parent_book_id}}, function (data) {
                    console.log(data);
                    var $table = $("table.list");
                    // todo 将book-line制作为模板
                    var $book_line = $table.find("tr.book-line").first().clone();
                    if ($book_line.length > 0) {
                        $book_line.addClass("book-" + data.id);  // todo remember to remove the class book-*
                        $book_line.find("a.book-name").text(data.name).attr("href", "/books/" + data.id);
                        $book_line.find(".book-id").val(data.id);
                        $book_line.find(".rename-input.rename-book").val(data.name);
                        $table.find("tbody").append($book_line);
                        $win.hide();
                    } else {
                        window.location = '/books/' + $('#book_id').val();
                    }
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
        renameBook: function (book_id, book_name, $tr) {
            if (book_id) {
                $.ajax({
                    type: "put",
                    url: "/books/" + book_id,
                    data: {book: {name: book_name}},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        $tr.find('.rename-input').hide();
                        $tr.find('.btn').hide();
                        $tr.find("a.book-name").text(book_name).show();
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