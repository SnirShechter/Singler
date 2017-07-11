const _id = '';
const uName = '';
const profile = {
    fName: '',
    lName: '',
    birthdate: 0,
    imgUrl: '',
    isMale: true,
    interests: '',
    desc: ''
}

const likes = [
    // '4': true, // ug39h4j: true
    // '5': false // u9gh39h: false
]

const filtermap = {
    female: false,
    male: false,
    minAge: 0,
    maxAge: 0 
}
const matches = [];
const usersToShow = [];


// in order to know when unregistered user tried to login
var numUnRegLogin = 0;


const state = {
    _id,
    uName,
    profile,
    likes,
    matches,
    filtermap,
    usersToShow,
    numUnRegLogin
}

export default state