(() => {
   
    const ui = {
        fields: document.querySelectorAll('input'),
        btn: document.querySelector('.pure-button-primary'),
        table: document.querySelector('.pure-table tbody')
    }
    
    const validateFields = (e) => {
        e.preventDefault();
        let errors = 0;
        let data = {};
        ui.fields.forEach(function (field) {
            if (field.value.trim().length === 0) {
                field.classList.add('error');
                errors++;
            } else {
                field.classList.remove('error');
                data[field.id] = field.value.trim();
            }
        });

        if (errors === 0) {
            addContact(data);
        } else {
            document.querySelector('.error').focus();
        }
        console.log(errors, data)
    };

    const getContactSucess = function (list) {
        let html = [];
        list.forEach((item) => {
            let line = `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>
                    <a href="#" data-action="delete" data-id="${item.id}">excluir</a>
                </td>
            </tr>`;
            html.push(line);
        });
        ui.table.innerHTML = html.join("");
    };

    const addContactSucess = function () {
        cleanFields();
        getContact();
    };

    const genericError = function () {
        console.log('falha na conexao');
    };

    const cleanFields = () => {
        ui.fields.forEach(function (field) {
            field.value = '';
        });
    };
    
    const addContact = (contact) => {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        const config = { method: 'POST', body: JSON.stringify(contact) };
        const endpoint = 'http://localhost:8080/schedule';
        const objetasso = Object.assign({ headers: headers }, config);
        fetch(endpoint, objetasso).then(addContactSucess).catch(genericError);
        
    };

    const getContact = (contact) => {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        const config = { method: 'GET' };
        const endpoint = 'http://localhost:8080/schedule';
        const objetasso = Object.assign({ headers: headers }, config);
        fetch(endpoint, objetasso).then((res) => res.json()).then(getContactSucess).catch(genericError);
    };

    const removeContact = (id) => {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        const config = { method: 'DELETE' };
        const endpoint = 'http://localhost:8080/schedule/${id}';
        const objetasso = Object.assign({ headers: headers }, config);
        fetch(endpoint, objetasso).then(getContact).catch(genericError);
    };

    const actionHandle = (e) => {
        console.log('chamou', e.target.dataset);
        if (e.target.dataset.action === "delete") {
            console.log('apagar')
        }
        e.preventDefault();
    };
   
    const init = function () {
        ui.btn.addEventListener('click', validateFields);
        ui.table.addEventListener('click', actionHandle);
    }();
})()