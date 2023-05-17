    finding='';
    lastItem = '';

    window.onload = function(){
        restoreFromLocalStorage();
        //document.getElementById("reader").style.display='none';

    }

    window.onbeforeunload = function() {
            return "Dude, are you sure you want to leave? Think of the kittens!";
        }

    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: 500 };
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        /* handle success */

        var finding = items.find(item => item.EAN === decodedText);

        if (finding) {
            if (lastItem != finding.Name) {
                lastItem = finding.Name;

                // Check browser support
                if (typeof(Storage) !== "undefined") {
                  // Store
                  localStorage.setItem(finding.EAN, "{'Name':'" + finding.Name + "', 'Price': " + finding.Price + "}");


                } else {
                  document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
                }
                var journal = document.getElementById("journal");

                var row = journal.insertRow(1);

                var name = row.insertCell(0);
                var ean = row.insertCell(1);
                var price = row.insertCell(2);

                var qty = row.insertCell(3);
                var deleteRow = row.insertCell(4);

                // Add some text to the new cells:
                name.innerHTML = finding.Name;
                ean.innerHTML = finding.EAN;
                price.innerHTML = finding.Price;

                qty.innerHTML = "<input type='number' value=1> onChange=qtyChange()>";
                deleteRow.innerHTML = "<input type='button' Value='Delete' onClick=removeRowFromStorage(" + row.rowIndex + "," + finding.EAN + ")>";

                document.getElementById("ean").focus();
            }
        }
        else
        {
            alert('No item found');
            document.getElementById("ean").focus();

        }
    };
    // If you want to prefer front camera
    //html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

    function clearJournal(){
        for (var i = 1; i < document.getElementById("journal").rows.length; i++){

            localStorage.removeItem(document.getElementById("journal").rows[i].cells[1].innerHTML);

            document.getElementById("journal").deleteRow(i);
        }
    };
    function clearJournalTable(){
        for (var i = 1; i < document.getElementById("journal").rows.length; i++){

            document.getElementById("journal").deleteRow(i);
        }
    };
    function insertTestRow(){
        localStorage.setItem("9788776920586", "{\"Name\": \"Kresten\", \"Price\": 123, \"Quantity\": 1 }");
        restoreFromLocalStorage();
    }

    function removeRowFromStorage(rowid, ean){

        localStorage.removeItem(ean);

        //localStorage.removeItem(rowid);
        document.getElementById("journal").deleteRow(rowid);


        //9788776920586 skovstedconsulting.pythonanywhere.com:161:21
        //Object { Name: "Kresten", Price: 123 }

    };

    function qtyChange(element, ean){
        var itemToInsert = localStorage.getItem(ean);
        var itemToInsertJson = JSON.parse(itemToInsert);

        localStorage.setItem(ean, "{\"Name\":\"" + itemToInsertJson["Name"] + "\", \"Price\": " + itemToInsertJson["Price"] + ", \"Quantity\": " + element.value + "}");
    }

    function transferJournal(){
        alert('Journal has been transfered')
        clearJournal();
    }

    todo = ['separate click events','Layout','Add backend to recieve and send journal with ajax, https://towardsdatascience.com/using-python-flask-and-ajax-to-pass-information-between-the-client-and-server-90670c64d688','Get items from uniconta in backend','User management'];
    done=['separate code from html', 'Save qty','Add button to Clear journal','Delete before restore','Delete also from storage','Add button to send journal','Save journal on device.','Add button to remove individual item from journal','Add qty form','block scanning the same item twice','Add view of journal','If not found error','Render items from backend','Make title depending og setting and render','Block page reload'];

    //todo.forEach(todoPrint);

    //done.forEach(donePrint);

    //function todoPrint(item, index, arr) {
    //    var list = document.getElementById('todo');
    //    var entry = document.createElement('li');
    //    entry.appendChild(document.createTextNode(item));
    //    list.appendChild(entry);
    //}
    //function donePrint(item, index, arr) {
    //    var list = document.getElementById('done');
    //    var entry = document.createElement('li');
    //    entry.appendChild(document.createTextNode(item));
    //    list.appendChild(entry);
    //}

    function restoreFromLocalStorage() {
        clearJournalTable();

        for (var i = 0; i < localStorage.length; i++){

            var itemToInsert = localStorage.getItem(localStorage.key(i));
            var itemToInsertJson = JSON.parse(itemToInsert);

            console.log(localStorage.key(i));
            console.log(itemToInsertJson);

            var row = journal.insertRow(1);

            var name = row.insertCell(0);
            var ean = row.insertCell(1);
            var price = row.insertCell(2);

            var qty = row.insertCell(3);
            var deleteRow = row.insertCell(4);

            // Add some text to the new cells:
            name.innerHTML = itemToInsertJson["Name"]; // finding.Name;
            ean.innerHTML = localStorage.key(i); //finding.EAN;
            price.innerHTML = itemToInsertJson["Price"]; //finding.Price;
            qty.innerHTML =       "<input type='number' value='" + itemToInsertJson["Quantity"] + "' onchange='qtyChange(this, " + localStorage.key(i) + ")'>";

            deleteRow.innerHTML = "<input type='button' Value='Delete' onClick=removeRowFromStorage(" + row.rowIndex + "," + localStorage.key(i) + ")>";

        }
    }

    function gotBarcode(element){
        console.log(element.value);

        var finding = items.find(item => item.EAN === element.value);
        console.log(finding);

        if (finding) {
            if (lastItem != finding.Name) {
                lastItem = finding.Name;

                // Check browser support
                if (typeof(Storage) !== "undefined") {
                  // Store
                  localStorage.setItem(finding.EAN, "{'Name':'" + finding.Name + "', 'Price': " + finding.Price + "}");


                } else {
                  document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
                }
                var journal = document.getElementById("journal");

                var row = journal.insertRow(1);

                var name = row.insertCell(0);
                var ean = row.insertCell(1);
                var price = row.insertCell(2);

                var qty = row.insertCell(3);
                var deleteRow = row.insertCell(4);

                // Add some text to the new cells:
                name.innerHTML = finding.Name;
                ean.innerHTML = finding.EAN;
                price.innerHTML = finding.Price;

                qty.innerHTML = "<input type='number' value=1> onChange=qtyChange()>";
                deleteRow.innerHTML = "<input type='button' Value='Delete' onClick=removeRowFromStorage(" + row.rowIndex + "," + finding.EAN + ")>";

                window.setTimeout(function() {
                    document.getElementById("ean").focus();
                }, 0);

                document.getElementById("ean").value="";

            }
        }
        else
        {
            alert('No item found');
            window.setTimeout(function() {
                document.getElementById("ean").focus();
            }, 0);

            document.getElementById("ean").value="";
        }

    }








