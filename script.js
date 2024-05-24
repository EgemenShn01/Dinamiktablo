$(document).ready(function() {
    fetchData();
});

function fetchData() {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
            vs_currency: 'try',
            order: 'market_cap_desc', // Piyasa değeri
            per_page: 100,
            page: 1,
            sparkline: false
        }
    })
    .then(function(response) {
        populateTable(response.data);
    })
    .catch(function(error) {
        console.error('Veri çekme hatası:', error);
    });
}

function populateTable(data) {
    var table = $('#dataTable').DataTable({
        data: data,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'last_updated', render: function(data) {
                return new Date(data).toLocaleDateString('tr-TR');
            }},
            { 
                data: 'current_price',
                render: function(data, type) {
                    if (type === 'display' || type === 'filter') {
                        return data.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
                    }
                    return data;
                },
                type: 'num'
            }
        ],
        dom: 'Bfrtip',
        buttons: [  
         'excelHtml5',
        'pdfHtml5',
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json'
        },
        order: [[3, 'asc']], // Varsayılan sıralama sütunu ve yönü (fiyat sütunu, artan sırada)
    });

}
