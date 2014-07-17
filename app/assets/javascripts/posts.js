$(document).ready(function () {
    new Editor();
});


(function ($) {
    $.fn.extend({
        insertAtCaret: function (myValue) {
            var $t = $(this)[0];
            if (document.selection) {
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        }
    });

    function Editor() {
        this.initToolButtons();
    }

    Editor.prototype = {
        savePost: function () {
            var post_id = $("#post_id").val();
            if (post_id) {
                this.updatePost();
            } else {
                this.createPost();
            }
        },
        createPost: function () {
            var post = { id: $("#post_id").val(), title: $("#post_title").val(), content: $("#post_content").val(), book_id: $('#post_book_id').val() };
            if (post.title && post.content) {
//                $.post("/posts", {post: post},function (data) {
//                    if (data.status == "created") {
//                        $("#post_id").val(data.id);
//                        new Notice("success", "保存成功").show();
//                    } else {
//                        new Notice("failed", "保存失败，请稍候再试").show();
//                    }
//                }, "json").error(function () {
//                        new Notice("failed", "保存失败，请稍候再试").show();
//                    }
//                );
//            } else {
//                alert("没有内容");
                $('form').submit();
            }

        },
        updatePost: function () {
            var post = { id: $("#post_id").val(), title: $("#post_title").val(), content: $("#post_content").val() };
            if (post.title && post.content) {
                $.ajax({
                    url: "/posts/" + post.id,
                    type: "PUT",
                    data: {post: post},
                    dataType: "json",
                    success: function (data) {
                        if (data.status == "updated") {
                            new Notice("success", "保存成功").show();
                        } else {
                            new Notice("failed", "保存失败，请稍候再试").show();
                        }
                    },
                    error: function () {
                        new Notice("failed", "保存失败，请稍候再试").show();
                    }
                });
            } else {
                alert("请输入标题和内容");
            }
        },
        initToolButtons: function () {
            var editor = this;

            // 正文
            $(".edit_toolbar .content_btn").click(function () {
                $("#post_content").insertAtCaret("<div></div>");
                return false;
            });
            // 笔记
            $(".edit_toolbar .note_btn").click(function () {
                var $content = $("#demo_div").find(".note_demo").clone();
                $("#post_content").insertAtCaret($content.html());
                return false;
            });
            // 警告
            $(".edit_toolbar .warning_btn").click(function () {
                var $content = $("#demo_div").find(".warning_demo").clone();
                $("#post_content").insertAtCaret($content.html());
                return false;
            });
            // 提示
            $(".edit_toolbar .info_btn").click(function () {
                var $content = $("#demo_div").find(".info_demo").clone();
                $("#post_content").insertAtCaret($content.html());
                return false;
            });
            // 代码
            $(".edit_toolbar .code_btn").click(function () {
                var $content = $("#demo_div").find(".code_demo").clone();
                $("#post_content").insertAtCaret($content.html());
                return false;
            });
            // 表格
            $(".edit_toolbar .table_btn").click(function () {
                var $content = $("#demo_div").find(".table_demo").clone();
                $("#post_content").insertAtCaret($content.html());
                return false;
            });
            // 链接
            $(".edit_toolbar .link_btn").click(function () {
                $("#post_content").insertAtCaret("<a href=''></a>");
                return false;
            });
            // 一级标题
            $(".edit_toolbar .title_1_btn").click(function () {
                $("#post_content").insertAtCaret("<h1 id=''></h1>");
                return false;
            });
            // 二级标题
            $(".edit_toolbar .title_2_btn").click(function () {
                $("#post_content").insertAtCaret("<h2 id=''></h2>");
                return false;
            });
            // 三级标题
            $(".edit_toolbar .title_3_btn").click(function () {
                $("#post_content").insertAtCaret("<h3 id=''></h3>");
                return false;
            });


            // 保存
            $(".post_toolbar .save_btn").click(function () {
                editor.savePost();
                return false;
            });
            // 预览
            $(".post_toolbar .preview_btn").click(function () {
                var $preview = $(".preview_div");
                $preview.find(".title label").html($("#post_title").val());
                $preview.find(".content").html($("#post_content").val());
                $preview.show();
                return false;
            });
            // 格式化
            $(".post_toolbar .format_btn").click(function () {
                editor.format();
                return false;
            });

            // 保存
            $(".preview_div .save_btn").click(function () {
                editor.savePost();
                return false;
            });
            // 关闭预览
            $(".preview_div .close_btn").click(function () {
                $(".preview_div").hide();
                return false;
            });
        },
        format: function () {
            var $post = $("#post_content");
            var js_source = $post.val().replace(/^\s+/, '');
            var tabsize = 2;
            var tabchar = ' ';
            var formatted_source = "";
            if (js_source && js_source.charAt(0) === '<') {
                formatted_source = style_html(js_source, tabsize, tabchar, 80);
            } else {
                formatted_source = js_beautify(js_source, tabsize, tabchar);
            }
            $post.val(formatted_source);
        }
    };
    window.Editor = Editor;
})(jQuery);