function validateForm(){
    var name = document.getElementById("name").value;
    var cantidad = document.getElementById("name").value;
    var pedido = document.getElementById("name").value;
    var valor = document.getElementById("name").value;

    if(name == ""){
        alert("el nombre es requerido");
        return false;
    }

    if(cantidad == ""){
        alert("la cantidad es requerida");
        return false;
    }
    else if(cantidad < 1){
        alert("la cantidad debe ser un numero positivo ");
        return false;
    }

    if(pedido == ""){
        alert("el pedido es requerido");
        return false
    }

    if(valor == ""){
        alert("el valor es requerido");
        return false;
    }

    return true;
}

function showData(){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null) {
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    var html = "";

    peoplelist.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.cantidad + "</td>";
        html += "<td>" + element.pedido + "</td>";
        html += "<td>" + element.valor + "</td>";
        html += 
            '<td><button onclick="deleteData(' + 
            index +
            ')" class="btn btn-danger">Borrar</button><button onclick="updateData(' +
            index +
            ')"class="btn btn-warning m-2">Editar</button></td>';
        html +="</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;

}

document.onload = showData();

function AddData(){
    if(validateForm() == true){
        var name = document.getElementById("name").value;
        var cantidad = document.getElementById("cantidad").value;
        var pedido = document.getElementById("pedido").value;
        var valor = document.getElementById("valor").value;

        var peoplelist;
        if(localStorage.getItem("peoplelist") == null) {
            peoplelist = [];
        }else{
            peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
        }

        peoplelist.push({
            name : name,
            cantidad : cantidad,
            pedido : pedido,
            valor : valor,
        });

        localStorage.setItem("peoplelist", JSON.stringify (peoplelist));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("pedido").value = "";
        document.getElementById("valor").value = "";
    }
}

function deleteData(index){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null) {
        peoplelist = [];
    }else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }
    peoplelist.splice(index, 1)
    localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
    showData();
}

function updateData(index){
    document.getElementById("submit").style.display = "none"; 
    document.getElementById("update").style.display = "block"; 

    var peoplelist;
    if(localStorage.getItem("peoplelist") == null) {
        peoplelist = [];
    }else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    document.getElementById("name").value = peoplelist [index].name;
    document.getElementById("cantidad").value = peoplelist [index].cantidad;
    document.getElementById("pedido").value = peoplelist [index].pedido;
    document.getElementById("valor").value = peoplelist [index].valor;

    document.querySelector("#update").onclick = function(){
        if(validateForm() == true){
            peoplelist[index].name = document.getElementById("name").value;
            peoplelist[index].cantidad = document.getElementById("cantidad").value;
            peoplelist[index].pedido = document.getElementById("pedido").value;
            peoplelist[index].valor = document.getElementById("valor").value;

            localStorage.setItem("peoplelist", JSON.stringify(peoplelist));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("cantidad").value = "";
            document.getElementById("pedido").value = "";
            document.getElementById("valor").value = "";

            document.getElementById("submit").style.display = "block"; 
            document.getElementById("update").style.display = "none"; 
        }
    }
}
