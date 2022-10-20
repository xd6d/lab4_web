function formatPhone() {
    let tel = document.getElementById("tel")

    let number = tel.value.replaceAll(new RegExp(/[^0-9]/, 'g'), '')
    if (number.charAt(0) !== '3')
        number = '3' + number
    if (number.charAt(1) !== '8')
        number = '38' + number.substring(1)
    if (number.charAt(2) !== '0')
        number = '380' + number.substring(2)
    let inQuotes = number.substring(2, 5)
    let part1 = number.substring(5, 8)
    let part2 = number.substring(8, 10)
    let part3 = number.substring(10, 12)
    if (part3.length > 0)
        number = '+38(' + inQuotes + ')' + part1 + '-' + part2 + '-' + part3
    else if (part2.length > 0)
        number = '+38(' + inQuotes + ')' + part1 + '-' + part2
    else if (part1.length > 0)
        number = '+38(' + inQuotes + ')' + part1
    else if (inQuotes.length === 3)
        number = '+38(' + inQuotes
    else
        number = '+38(' + inQuotes

    tel.value = number
}

function validateName(element) {
    let name = document.getElementById(element)
    let errorAbsent = document.getElementById(element + '-absent')
    let errorCapital = document.getElementById(element + '-capital')
    let errorSymbol = document.getElementById(element + '-symbol')
    let value = name.value
    let status

    if (name.value === '') {
        errorAbsent.classList.remove('hidden')
        status = false
    } else {
        errorAbsent.classList.add('hidden')
        if (!ALLOWED_SYMBOLS.toUpperCase().includes(value.charAt(0))) {
            errorCapital.classList.remove('hidden')
            errorSymbol.classList.add('hidden')
            status = false
        } else if (Boolean(value.toLowerCase().match(/[^абвгґдеєжзиіїйклмнопрстуфхцчшщьюя-]/))) {
            errorCapital.classList.add('hidden')
            errorSymbol.classList.remove('hidden')
            status = false
        } else {
            errorCapital.classList.add('hidden')
            errorSymbol.classList.add('hidden')
            status = true
        }
    }
    return status
}

//ґҐ
const ALLOWED_SYMBOLS = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'

function validateDate() {
    let date = document.getElementById('date').value
    let noDateError = document.getElementById('no-date')
    let futureError = document.getElementById('incorrect-date')
    if (date === '') {
        noDateError.classList.remove('hidden')
        return false
    } else {
        noDateError.classList.add('hidden')
        date = new Date(document.getElementById('date').value)
        if (date > new Date()) {
            futureError.classList.remove('hidden')
            return false
        } else {
            futureError.classList.add('hidden')
            return true
        }
    }
}

function validateEmail() {
    let email = document.getElementById('email').value
    let error = document.getElementById('incorrect-email')
    if (!email.toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        error.classList.remove('hidden')
        return false
    } else {
        error.classList.add('hidden')
        return true
    }

}

function validatePhone() {
    let tel = document.getElementById('tel').value
    let error = document.getElementById('incorrect-tel')
    if (tel.length < 17) {
        error.classList.remove('hidden')
        return false
    } else {
        error.classList.add('hidden')
        return true
    }
}

function validatePassword() {
    let password = document.getElementById('password')
    let confirmPassword = document.getElementById('confirm-password')
    let error = document.getElementById('incorrect-password')
    if (password.value !== confirmPassword.value) {
        error.classList.remove('hidden')
        return false
    } else {
        error.classList.add('hidden')
        return true
    }
}

function validateForm() {
    return validateName('surname') & validateName('name') & validateName('last-name')
        & validateDate() & validateEmail() & validatePhone() & validatePassword()
}

function processForm() {
    let form = document.getElementById('reg-form')
    if (validateForm()) {
        fillTable(form)
        flushForm()
    }
}

function fillTable(form) {
    let formData = new FormData(form)
    let tbodyRow = document.getElementById('table').getElementsByTagName('tbody')[0]
    formData.delete('confirm-password')
    let newRow = tbodyRow.insertRow();
    for (const [, value] of formData) {
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(value.toString());
        newCell.appendChild(newText);
    }
    let checkboxCell = newRow.insertCell()
    let inputElement = document.createElement('input')
    inputElement.type = 'checkbox'
    inputElement.name = 'del-dupl-checkbox'
    checkboxCell.appendChild(inputElement)
}

function flushForm() {
    document.getElementById('surname').value = ''
    document.getElementById('name').value = ''
    document.getElementById('last-name').value = ''
    document.getElementById('last-name').value = ''
    document.getElementById('male').checked = false
    document.getElementById('female').checked = false
    document.getElementById('date').value = ''
    document.getElementById('group').value = 'ІА-01'
    document.getElementById('email').value = ''
    document.getElementById('tel').value = '+38(0'
    document.getElementById('password').value = ''
    document.getElementById('confirm-password').value = ''
}

function deleteRows() {
    let table = document.getElementById('table')
    let rows = table.rows
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].lastChild.lastChild.checked) {
            table.deleteRow(i)
            i--
        }
    }
}

function duplicateRows() {
    let table = document.getElementById('table')
    let rows = table.rows
    let tbodyRow = document.getElementById('table').getElementsByTagName('tbody')[0]
    const length = rows.length
    let newRows = ''
    for (let i = 1; i < length; i++) {
        if (rows[i].lastChild.lastChild.checked) {
            newRows += (rows[i].outerHTML)
        }
    }
    tbodyRow.innerHTML += newRows
}
