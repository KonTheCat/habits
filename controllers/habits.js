const express = require("express")
const router = express.Router()
const Habits = require('../models/habit.js')

//INDUCES
//INDEX
router.get('/', async (req, res) => {
    const habits = await Habits.find({})
    res.render('index.ejs', {
        habits: habits
    })
})

//NEW
router.get('/new', (req, res) => {
    res.render('newHabit.ejs')
})

router.get('/:habitID/new', (req, res) => {
    res.render('newCompletion.ejs', {
        habitID: req.params.habitID
    })
})

//DELETE
router.delete('/:habitID', async (req, res) => {
    try {
        await Habits.findByIdAndDelete(req.params.habitID)
    } catch (err) {
        console.error(err)
    }
    res.redirect('/')
})

router.delete('/:habitID/:completionID', async (req, res) => {
    try {
        await Habits.updateOne({_id: req.params.habitID}, {$pull: {completions: {_id: req.params.completionID}}})
    } catch (err) {
        console.error(err)
    }
    res.redirect('/')
})

//UPDATE
router.put('/:habitID', async (req, res) => {
    try {
        await Habits.findByIdAndUpdate(req.params.habitID, req.body)
    } catch (err) {
        console.error(err)
    }
    res.redirect('/')
})

router.put('/:habitID/:completionID', async (req, res) => {
    try {
        await Habits.findOneAndUpdate({
            "_id": req.params.habitID, 
            "completions._id":req.params.completionID 
        },
        {
            $set:
                {
                    "completions.$.notes": req.body.notes
                }
        })
    } catch (err) {
        console.error(err)
    }
    res.redirect('/')
})

//CREATE
router.post('/new', async (req, res) => {
    try {
        await Habits.create(req.body)
        res.redirect('/')
    } catch (err) {
        console.error(err)
    }
})

router.post('/:habitID/new', async (req, res) => {
    try {
        await Habits.findByIdAndUpdate(req.params.habitID, {$push:{completions: req.body}})
    } catch (err) {
        console.error(err)
    }
    res.redirect('/')
})

//EDIT
router.get('/:habitID/edit', async (req, res) => {
    res.render('editHabit.ejs', {
        habit: await Habits.findById(req.params.habitID)
    })
})

router.get('/:habitID/:completionID/edit', async (req, res) => {
    const habit = await Habits.findById(req.params.habitID)
    const completionID = req.params.completionID
    const completion = getCompletionForGivenHabitAndCompletionID(habit, completionID)
    res.render('editCompletion.ejs', {
        habit: habit,
        completion: completion   
    })
})

//SHOW
router.get('/:habitID', async (req, res) => {
    try {
        res.render('show.ejs', {
            habit: await Habits.findById(req.params.habitID)
        })
    } catch (err) {
        console.error(err)
    }
})

function getCompletionForGivenHabitAndCompletionID(habit, completionID) {
    for (let i = 0; i < habit.completions.length; i++) {
        if (habit.completions[i]._id.toString() === completionID) {
            return habit.completions[i]
        }
    }
}

module.exports = router