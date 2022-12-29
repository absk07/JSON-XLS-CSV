"use strict";
$(document).ready(function() {
    $('#tags').tagsinput('items');
    $(".select2").select2();
    $('.html-editor').summernote({
        height: 300,
        tabsize: 2
    });
});