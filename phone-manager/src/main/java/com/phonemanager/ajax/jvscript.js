function addNewSmartPhone() {
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
    //lấy dữ liệu từ form html
    let producer = document.getElementById("producer").value;
    let model = document.getElementById("model").value;
    let price = document.getElementById("price").value;
    let newSmartphone = {
        "producer": producer,
        "model": model,
        "price": price
    };
    // gọi phương thức ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: "http://localhost:8080/api/smartphones",
        //xử lý khi thành công
        success: successHandler
    });

}
function successHandler() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/api/smartphones",
        //xử lý khi thành công
        success: function (data) {
            console.log(data);
            // hiển thị danh sách ở đây
            let content = ' <table id="display-list" border="1"><tr>\n' +
                ' <th>Producer</td>\n' +
                ' <th>Model</td>\n' +
                ' <th>Price</td>\n' +
                ' <th>Delete</td>\n' +
                ' </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>"
            document.getElementById('smartphoneList').innerHTML = content;
        }
    });
}
function getSmartphone(smartphone) {
    return `<tr>
                <td >${smartphone.producer}</td>
                <td >${smartphone.model}</td>
                <td >${smartphone.price}</td>` +
        `<td class="btn"><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Delete</button></td>
            </tr>`;
}