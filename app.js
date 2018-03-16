(function () {

    'use strict'

    function appendTask(task) {
        var table = document.querySelector('table')
        var row   = table.insertRow()

        for (var property in task) {
            var val   = task[property]
            var child = document.createTextNode(val)

            row.insertCell().appendChild(child)
        }
    }

    function clearFormValues(form) {
        for (var i in [0, 1, 2]) {
            form.elements[i].value = ''
        }
    }

    function isFullyPopulatedTask(task) {
        return (task.name && task.date && task.assigned)
    }

    function isValidDate(date) {

        var dateRegEx       = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/
        var chromeDateRegEx = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/

        return (date.match(dateRegEx) !== null || date.match(chromeDateRegEx) !== null)
    }

    function mapFormElements(form) {
        return {
            name:     form.elements[0].value,
            date:     form.elements[1].value,
            assigned: form.elements[2].value
        }
    }

    function prependTask(task) {
        var table = document.querySelector('table')
        var row   = table.insertRow(0)

        for (var property in task) {
            var val   = task[property]
            var child = document.createTextNode(val)
            row.insertCell().appendChild(child)
        }
    }
    
    

    // Defined in `data.js`.
    data.forEach(appendTask)

    document.querySelector('button').addEventListener('click', function () {
        var task = mapFormElements(this.form);
        var input = task.date;
        var ptrn = /(\d{4})\-(\d{2})\-(\d{2})/;
            if(!input || !input.match(ptrn)) {
               return null;
            }
        task.date = input.replace(ptrn, '$2/$3/$1');


        if (!isFullyPopulatedTask(task)) {
            alert('All form fields must be populated.')

            return false
        }

        if (!isValidDate(task.date)) {
            alert('The "Date" must be in `mm/dd/yyyy` format.')

            return false
        }

        prependTask(task)
        clearFormValues(this.form)
    })
})()
