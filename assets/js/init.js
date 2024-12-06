(function ($) {
    $(document).ready(function () {

        $("#work-projects h3").click(function () {
            $(this).next("div").toggle("fast");
        });

        $("#work-project-controls li.expand").click(function () {
            $("#work-projects div").show();
        });

        $("#work-project-controls li.contract").click(function () {
            $("#work-projects div").hide();
        });

    });
})(jQuery);