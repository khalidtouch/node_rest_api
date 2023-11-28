const pool = require('../databases/mysql.db');

class User {
    constructor(firstName, lastName, age = 0) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age
    }

    get firstName() {
        return this._firstName
    }

    set firstName(firstName) {
        if (!firstName) throw new Error('Invalid first name value')

        firstName = firstName.trim()
        if (firstName === '') throw new Error('First name is blank')

        this._lastName = lastName
    }

    get aget() {
        return this._age
    }

    set aget(age) {
        if (age < 0) throw new Error('Age cannot be negative')
        this._age = age
    }

    async save() {
        const sql = `INSERT INTO users (id, first_name, last_name, age) VALUES (UUID(), "${this.firstName}", "${this.lastName}", "${this.age}")`
        await pool.execute(sql)
    }

    static async find() {
        const sql = 'SELECT * FROM users'
        const [rows, fields] = await pool.execute(sql)
        return rows
    }

    static async findByIdAndUpdate(id, options) {
        const sql = `UPDATE users SET first_name = "${options.firstName}", last_name = "${options.lastName}", age = "${options.age}" WHERE id = "${id}"`
        await pool.execute(sql)
    }
}

module.exports = User;