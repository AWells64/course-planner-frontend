import axios from '../../axios';
import { loggedIn, setUserCourses, removeUserCourse } from './state';

const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const registerUser = (newUser) => dispatch => {
    axios.post('/auth/register/', newUser).then(() => {
        console.log('request sent');
    });
};

export const loginUser = (userDetails) => dispatch => {
    axios.post('/auth/login/', userDetails).then(({data}) => {
        document.cookie = "token=" + data;
        console.log('logged in');
        dispatch(loggedIn());
    });
}

export const postCourseToUser = (id) => dispatch => {
    let token = getCookie('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;

    if (token) {
        axios.post('/courses/' + id + '/save').then(({data}) => {
            console.log('posted relation successfully');
        });
    }
}

export const getUserCourses = () => dispatch => {
    let token = getCookie('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;

    if (token) {
        axios.get('/courses/fetch').then(({data}) => {
            dispatch(setUserCourses(data.data));
        });
    }
}

export const deleteUserCourse = (id) => dispatch => {
    let token = getCookie('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;

    if (token) {
        axios.delete('/courses/' + id + '/remove/').then(({data}) => {
            dispatch(removeUserCourse(data.data));
        });
    }
}

