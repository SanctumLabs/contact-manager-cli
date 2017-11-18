export let questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Enter first name'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Enter Lastname'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter Phone Number'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter Your Email Address'
    }
]
export let getIdQuestions = [
    {
        type: 'input',
        name: 'id',
        message: 'Enter the contact id'
    }
]
export let updateContactQuestions = [
    {
        type: 'input',
        name: 'id',
        message: 'Enter the contact id'
    },
    ...questions
]
