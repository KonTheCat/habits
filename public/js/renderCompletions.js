const numberOfDaysToLookBack = 14

function processHabitsData() {
    const jsonHabits = document.getElementById('habits').innerHTML
    if (jsonHabits) {
        // console.log('we have habits')
        const habits = JSON.parse(jsonHabits)
        // console.log(habits)
        createCompletionsTable(numberOfDaysToLookBack, habits)

    } else {
        console.log('we have not the habits')
    }
}

function createCompletionsTable(numberOfDaysToLookBack, habits) {
    const table = document.createElement("table")
    const tableBody = document.createElement("tbody")
    const headerRow = document.createElement("tr")

    const dateToday = new Date()
    const dateStart = new Date()
    dateStart.setDate(dateToday.getDate() - numberOfDaysToLookBack)

    const datesName = document.createElement("td")
    const datesNameText = document.createTextNode('Habits/Dates')
    datesName.appendChild(datesNameText)
    headerRow.appendChild(datesName)

    for (let i = dateStart.getDate(); i <= dateToday.getDate(); i++) {
        const cell = document.createElement("td")
        const cellText = document.createTextNode(`${i}`)
        cell.appendChild(cellText)
        headerRow.appendChild(cell)
    }
    tableBody.appendChild(headerRow)

    habits.forEach(element => {
        console.log(element)
        const completions = []
        element.completions.forEach(element => {
            completions.push(Number(element.date.split('T')[0].split('-')[2]))
        })

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
        const br = document.createElement("br")
        habitName.appendChild(habitNameLink)
        habitName.appendChild(br)
        habitName.appendChild(habitDidItLink)
        habitRow.appendChild(habitName)

        for (let i = dateStart.getDate(); i <= dateToday.getDate(); i++) {
            const cell = document.createElement("td")
            let text = "Not done it"
            if (completions.includes(i)) {
                text = 'Did it!'
            }
            const cellText = document.createTextNode(text)
            cell.appendChild(cellText)
            habitRow.appendChild(cell)
        }
        tableBody.appendChild(habitRow)
    });

    table.appendChild(tableBody)
    document.body.appendChild(table)
    table.setAttribute("border", "1")
}

processHabitsData()
