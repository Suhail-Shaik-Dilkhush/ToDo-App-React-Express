const mongoose = require('mongoose')

const schema = mongoose.Schema({

    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date }
})

module.exports = mongoose.model("Todo", schema)