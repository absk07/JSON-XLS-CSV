$(document).ready(function() {
    $('#simpletable').DataTable({
        fixedHeader: true,
        lengthMenu: [
            [50, 100, 200, -1],
            [50, 100, 200, "All"]
        ],
    });
    $('#simpletable1').DataTable({
        fixedHeader: true,
        lengthMenu: [
            [50, 100, 200, -1],
            [50, 100, 200, "All"]
        ],
    });
});