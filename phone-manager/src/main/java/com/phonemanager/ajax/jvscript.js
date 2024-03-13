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
                ' <th>Edit</td>\n' +
                ' </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>"
            document.getElementById('smartphoneList').innerHTML = content;
            document.getElementById('smartphoneList').style.display = "block";
            document.getElementById('add-smartphone').style.display = "none";
            document.getElementById('edit-smartphone').style.display = "none";
            document.getElementById('display-create').style.display = "block";
            document.getElementById('title').style.display = "block";
        }
    });
}
function getSmartphone(smartphone) {
    return `<tr>
                <td >${smartphone.producer}</td>
                <td >${smartphone.model}</td>
                <td >${smartphone.price}</td>` +
        `<td class="btn"><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Delete</button></td>
        <td class="btn"><button class="editSmartphone" onclick="formEditSmartphone(${smartphone.id})">Edit</button></td>
            </tr>`;
}

function displayFormCreate() {
    document.getElementById('smartphoneList').style.display = "none";
    document.getElementById('add-smartphone').style.display = "block";
    document.getElementById('display-create').style.display = "none";
    document.getElementById('title').style.display = "none";
    document.getElementById('edit-smartphone').style.display = "none";
}
function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        //tên API
        url: `http://localhost:8080/api/smartphones/${id}`,
        //xử lý khi thành công
        success: successHandler
    });
}
function getSmartphoneById(smartphone){
    return`<tr>
            <td><label for="producer">Producer:</label></td>
            <td><input type="text" id="producer-edit" value="${smartphone.producer}"></td>
        </tr>
        <tr>
            <td><label for="model">Model:</label></td>
            <td><input type="text" id="model-edit" value="${smartphone.model}"></td>
        </tr>
        <tr>
            <td><label for="price">Price:</label></td>
            <td><input type="text" id="price-edit" value="${smartphone.price}"></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" value="Edit" onclick="editSmartphone(${smartphone.id})"></td>
        </tr>`
}
function formEditSmartphone(id){
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/api/smartphones/${id}`,
        //xử lý khi thành công
        success: function (data) {
            console.log(data);
            // hiển thị danh sách ở đây
            let contentData ='<form id="edit-smartphone">\n' +
                '    <h1>Form edit</h1>\n' +
                '    <table>\n';
            contentData += getSmartphoneById(data);
            contentData+='</table>\n' +
                '</form>'
            document.getElementById('edit-smartphone-1').innerHTML = contentData;
            document.getElementById('smartphoneList').style.display = "none";
            document.getElementById('add-smartphone').style.display = "none";
            document.getElementById('display-create').style.display = "none";
            document.getElementById('title').style.display = "none";
            document.getElementById('edit-smartphone').style.display = "block";
            }
    })


}
function editSmartphone(id) {
    event.preventDefault();
    //lấy dữ liệu từ form html
    let producer = document.getElementById("producer-edit").value;
    let model = document.getElementById("model-edit").value;
    let price = document.getElementById("price-edit").value;
    let newSmartphone = {
        "producer": producer,
        "model": model,
        "price": price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: `http://localhost:8080/api/smartphones/${id}`,
        //xử lý khi thành công
        success: successHandler

    });
}