class data {
    constructor(date, description, subject, subsubject, debit,credit){
        this.date = date
        this.description = description
        this.subject = subject
        this.subsubject = subsubject
        this.debit = debit
        this.credit = credit
    }
}

// const data = {
//     date:           '20190102',
//     description:    '春节购会员福利',
//     subject:        '501职工活动支出',
//     subsubject:     '50104其他活动支出', 
//     debit:          34000.00,                     //借方，花出去的钱记在这里
//     credit:         0                            //贷方，收进来的钱记在这里
// }
module.exports = data