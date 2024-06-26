function processHabitsData() {
    const numberOfDaysToLookBack = Number(document.getElementById("daysToLookBack").value)
    const habits = JSON.parse(document.getElementById('habits').innerHTML)
    console.log(habits.length)
    if (habits.length > 0) {
        console.log('we have habits')
        // console.log(habits)
        createCompletionsTable(numberOfDaysToLookBack, habits)
    } else {
        console.log('we have not the habits')
    }
}

function createCompletionsTable(numberOfDaysToLookBack, habits) {
    document.getElementById("habittable").innerHTML = ""
    const table = document.createElement("table")
    table.classList.add("table")
    table.classList.add("table-bordered")
    const tableBody = document.createElement("tbody")
    const headerRow = document.createElement("tr")

    const dateToday = new Date()
    const dateStart = new Date()
    dateStart.setDate(dateToday.getDate() - numberOfDaysToLookBack)

    const datesName = document.createElement("td")
    const datesNameText = document.createTextNode('Habits/Dates')
    datesName.appendChild(datesNameText)
    headerRow.appendChild(datesName)

    for (let i = numberOfDaysToLookBack; i >= 0; i--) {
        const cell = document.createElement("td")
        const dateNow = new Date()
        dateNow.setDate(dateToday.getDate() - i)
        const cellText = document.createTextNode(`${dateNow.toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"})}`)
        cell.appendChild(cellText)
        headerRow.appendChild(cell)
    }
    tableBody.appendChild(headerRow)

    habits.forEach(element => {
        console.log(element)
        const completions = []
        element.completions.forEach(element => {
            completions.push((new Date(element.date).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"})))
        })
        console.log(completions)
        const habitRow = document.createElement("tr")
        const habitName = document.createElement("td")
        const habitNameLink = document.createElement('a')
        const habitNameShowURI = `/habits/${element._id}`
        habitNameLink.setAttribute('href', habitNameShowURI)
        habitNameLink.innerHTML = `${element.name}`
        const habitDidItLink = document.createElement('a')
        const habitDidItURI = `/habits/${element._id}/new`
        habitDidItLink.setAttribute('href', habitDidItURI)
        habitDidItLink.innerHTML = 'Did it!'
        const habitEditLink = document.createElement('a')
        const habitEditURI = `/habits/${element._id}/edit`
        habitEditLink.setAttribute('href', habitEditURI)
        habitEditLink.innerHTML = 'Edit'
        habitName.appendChild(habitNameLink)
        habitName.appendChild(document.createElement("br"))
        habitName.appendChild(habitDidItLink)
        habitName.appendChild(document.createElement("br"))
        habitName.appendChild(habitEditLink)
        habitRow.appendChild(habitName)

        for (let i = numberOfDaysToLookBack; i >= 0; i--) {
            const cell = document.createElement("td")
            const dateNow = new Date()
            dateNow.setDate(dateToday.getDate() - i)
            let text = "Not done it"
            if (completions.includes(dateNow.toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"}))) {
                text = 'Did it!'
                cell.classList.add("table-success")
            } else {
                cell.classList.add("table-warning")
            }
            const cellText = document.createTextNode(text)
            cell.appendChild(cellText)
            habitRow.appendChild(cell)
        }
        tableBody.appendChild(habitRow)
    });

    table.appendChild(tableBody)
    document.getElementById("habittable").appendChild(table)
    table.setAttribute("border", "1")
}

processHabitsData()
