const { DateTime } = require("luxon");
const parseService = require("../services/parseServiceBirthday");
const { getConnection } = require('../services/connectServiceDatabase');


const CSV_STUDENTS = "students.csv";
const CSV_TEACHERS = "intervenants.csv";

const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format YYYY-MM-DD
  };

exports.getTodaysBirthday = async (req, res) => {

    const today = new Date();
    const todaysDate = formatDate(today); // Format YYYY-MM-DD

    const conn = await getConnection();
    await conn.query("USE birthdayApp");


    const STUDENTS_BIRTHDAY = await conn.query(
        "SELECT * FROM students"
      )
    .then(students => {
        const result = students.filter(student => formatDate(student.birthday) === todaysDate);
        console.log(result)
        return result
    });

    const TEACHERS_BIRTHDAY =  await conn.query(
        "SELECT * FROM intervenants"
      )
    .then(teachers => {
        return result = teachers.filter(teacher => formatDate(teacher.birthday) === (todaysDate));
    });

    res.json({
        count_total: STUDENTS_BIRTHDAY.length + TEACHERS_BIRTHDAY.length,
        students_birthday : STUDENTS_BIRTHDAY,
        teachers_birthday : TEACHERS_BIRTHDAY
    })
}