$(document).ready(function() {
    fetchData();
});

function fetchData() {
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/markets',  //  API ücretsizdir ve halka açıktır.
        method: 'GET',
        dataType: 'json',
        data: {
            vs_currency: 'try',
            order: 'market_cap_desc', //Piyasa değeri
            per_page: 100, 
            page: 1, 
            sparkline: false
        },
        success: function(data) {
            populateTable(data);
        },
        error: function(error) {
            console.error('Veri çekme hatası:', error);
        }
    });
}

function populateTable(data) {
    $('#dataTable').DataTable({
        data: data,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'last_updated', render: function(data) {
                return new Date(data).toLocaleDateString('tr-TR');
            }},
            { data: 'current_price', render: function(data) {
                return data.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
            }}
        ],
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5',
            'pdfHtml5',
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json'
        }
    });
}
